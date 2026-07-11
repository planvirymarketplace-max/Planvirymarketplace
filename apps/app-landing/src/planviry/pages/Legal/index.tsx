import React, { useState, useMemo } from 'react';
import { useNavigate } from '@/planviry/router';
import {
  FileText,
  Search,
  Shield,
  Scale,
  FileCheck,
  Printer,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { LEGAL_DOCS, PARENT_CATEGORIES, PORTALS, LegalDoc } from '../../lib/legalDocs';
import { LEGAL_DOC_HTML } from '../../lib/legalDocHtml';
import { LEGAL_DOC_CLAUSES } from '../../lib/legalDocRaw';

const HYPERLINK_MAP: { text: string; docId: string }[] = [
  // Provider/Business Operations docs
  { text: 'Business Services Agreement', docId: 'business-services-agreement' },
  { text: 'Selling on Planviry Service Terms', docId: 'selling-on-planviry-terms' },
  { text: 'Selling on Planviry', docId: 'selling-on-planviry-terms' },
  { text: 'Host Terms of Service', docId: 'host-tos' },
  { text: 'Host Terms', docId: 'host-tos' },
  { text: 'Guest Terms of Service', docId: 'guest-tos' },
  { text: 'Guest Terms', docId: 'guest-tos' },
  { text: 'Merchant Agreement', docId: 'merchant-agreement' },
  { text: 'Partner & Vendor Terms', docId: 'partner-vendor-terms' },
  { text: 'Accommodation Fee Collection Agreement', docId: 'accommodation-fee-collection' },
  { text: 'Program Policies', docId: 'program-policies' },
  { text: 'Program Policy', docId: 'program-policies' },
  { text: 'Provider Rating Policy', docId: 'provider-rating' },
  { text: 'Provider Rating', docId: 'provider-rating' },
  { text: 'Restricted Services Policy', docId: 'restricted-services' },
  { text: 'Restricted Services pages', docId: 'restricted-services' },
  { text: 'Tax Policies', docId: 'tax-policies' },
  { text: 'Fee Schedule', docId: 'fee-schedule-stripe' },
  { text: 'Variable Closing Fee Schedule', docId: 'variable-fee-schedule' },
  { text: 'Variable Fee Schedule', docId: 'variable-fee-schedule' },
  { text: 'Agent Policy', docId: 'agent-policy' },
  { text: 'Trademark Usage Guidelines', docId: 'trademark-usage-policy' },
  { text: 'Trademark Usage Policy', docId: 'trademark-usage-policy' },
  { text: 'Rating and Review Policy', docId: 'rating-and-review-policy' },
  // Consumer docs
  { text: 'Terms of Service', docId: 'tos-unified' },
  { text: 'Privacy Policy', docId: 'privacy-policy-unified' },
  { text: 'Privacy Notice', docId: 'privacy-policy-unified' },
  { text: 'Privacy Notices', docId: 'privacy-notices' },
  { text: 'Cookie Policy', docId: 'cookie-policy-unified' },
  { text: 'Communications Policy', docId: 'sms-terms' },
  { text: 'Accessibility Statement', docId: 'accessibility-statement' },
  { text: 'DMCA Policy', docId: 'dmca-policy' },
  { text: 'Biometric Privacy Notice', docId: 'biometric-privacy-notice' },
  { text: 'Standard Purchase Policy', docId: 'standard-purchase-policy' },
  { text: 'Resale Purchase Policy', docId: 'resale-purchase-policy' },
  { text: 'Travel & Experiences Policy', docId: 'travel-experiences-policy' },
  { text: 'Travel & Experiences', docId: 'travel-experiences-policy' },
  { text: 'Transfer Recipient Policy', docId: 'transfer-recipient-policy' },
  { text: 'Cancellation & Refund Policy', docId: 'cancellation-refund-policy' },
  { text: 'Cancellation and Refund Policy', docId: 'cancellation-refund-policy' },
  { text: 'Cancelled Event Policy', docId: 'cancelled-event-policy' },
  { text: 'Travel Insurance Policy', docId: 'travel-insurance-policy' },
  { text: 'Group Travel Policy', docId: 'group-travel-policy' },
  { text: 'Loyalty Program Terms', docId: 'loyalty-program-terms' },
  { text: 'VIP/Club Access Program Terms', docId: 'vip-club-access-terms' },
  { text: 'VIP Terms', docId: 'vip-club-access-terms' },
  // Trust Center docs
  { text: 'Security Policy', docId: 'security-policy' },
  { text: 'Payment Security & PCI Compliance Policy', docId: 'payment-security-pci' },
  { text: 'Payment Security & PCI Compliance', docId: 'payment-security-pci' },
  { text: 'Data Deletion & Retention Policy', docId: 'data-deletion-retention' },
  { text: 'Data Deletion and Retention Policy', docId: 'data-deletion-retention' },
  { text: 'Acceptable Use Policy', docId: 'acceptable-use-policy' },
  { text: 'AI Use Policy', docId: 'ai-use-policy' },
  { text: 'Data Processing Agreement', docId: 'data-processing-agreement' },
];

function renderClauseBody(body: string, onNavigate: (docId: string) => void): React.ReactNode {
  const sortedLinks = [...HYPERLINK_MAP].sort((a, b) => b.text.length - a.text.length);
  const escaped = sortedLinks.map((l) => l.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`(${escaped.join('|')})`, 'g');

  const parts = body.split(regex);
  return parts.map((part, idx) => {
    const link = sortedLinks.find((l) => l.text === part);
    if (link) {
      return (
        <button
          key={idx}
          onClick={() => onNavigate(link.docId)}
          className="text-[#009689] underline underline-offset-2 hover:text-[#006B62] bg-transparent border-none cursor-pointer p-0 font-inherit inline"
        >
          {part}
        </button>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

/**
 * Strip pandoc leftovers that break table consistency:
 * - <col> and <colgroup> tags with explicit widths
 * - width="..." attributes on th/td
 * - style="width:..." on th/td
 * - class="header"/"odd"/"even" on <tr> (pandoc striping)
 * - bare <p>**bold**</p> markdown leftovers (defensive — convert to <strong>)
 * - Inject cross-document hyperlinks for policy names in HYPERLINK_MAP
 *   (only in text nodes, NOT inside existing <a> tags or table cells)
 */
function cleanLegalHtml(html: string): string {
  let out = html;
  out = out.replace(/<colgroup[\s\S]*?<\/colgroup>/gi, '');
  out = out.replace(/<col\b[^>]*>/gi, '');
  out = out.replace(/(<(?:th|td)\b[^>]*?)\s+width="[^"]*"/gi, '$1');
  out = out.replace(/(<(?:th|td)\b[^>]*?)\s+style="[^"]*width:[^"]*"/gi, '$1');
  out = out.replace(/(<tr\b[^>]*?)\s+class="[^"]*"/gi, '$1');
  // Defensive: convert any literal **text** markdown bold to <strong>text</strong>
  out = out.replace(/\*\*([^*<]+?)\*\*/g, '<strong>$1</strong>');
  // Defensive: convert any literal *text* markdown italic to <em>text</em>
  out = out.replace(/(^|[^*])\*([^*<]+?)\*(?!\*)/g, '$1<em>$2</em>');

  // UNIFORM DEFINITION BOLDING: bold the defined term in "Term" means ... patterns.
  // Matches: "Cancelled Event" means ...  ->  <strong>"Cancelled Event"</strong> means ...
  // Only applies inside <p> tags, not inside table cells or existing <strong>.
  out = out.replace(
    /(<p>)(&quot;|"|')([^"'<]+?)(&quot;|"|')(\s+means\s+)/g,
    '$1<strong>$2$3$4</strong>$5'
  );

  // UNIFORM SUBSECTION LABEL BOLDING: bold the "N.N Label." prefix in subsection paragraphs.
  // Matches: <p>1.1 Purpose. This Policy...  ->  <p><strong>1.1 Purpose.</strong> This Policy...
  // Only matches if the <p> doesn't already start with <strong> (to avoid double-bolding).
  // Pattern: <p>(not <strong>) + digits.digits + space + capitalized label + period + space
  out = out.replace(
    /<p>(?!<strong>)(\d+\.\d+\s+[A-Z][^<]*?\.)\s/g,
    '<p><strong>$1</strong> '
  );

  // Inject cross-document hyperlinks for policy name references.
  // We only inject inside <p> and <li> text content (NOT inside <a>, <th>, <td>,
  // or existing tags) to avoid breaking HTML structure.
  // Strategy: split by tags, process only text-between-tags, skip text inside <a>...</a>.
  const sortedLinks = [...HYPERLINK_MAP].sort((a, b) => b.text.length - a.text.length);
  const escaped = sortedLinks.map((l) => l.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const linkRegex = new RegExp(`(${escaped.join('|')})`, 'g');

  // Tokenize: split into tags and text
  const tokens = out.split(/(<[^>]+>)/g);
  let insideAnchor = 0;
  for (let i = 0; i < tokens.length; i++) {
    const tok = tokens[i];
    if (tok.startsWith('<')) {
      if (/^<a\b/i.test(tok)) insideAnchor++;
      else if (/^<\/a>/i.test(tok) && insideAnchor > 0) insideAnchor--;
      continue;
    }
    // Text node — only process if NOT inside an <a> tag
    if (insideAnchor === 0) {
      tokens[i] = tok.replace(linkRegex, (match) => {
        const link = sortedLinks.find((l) => l.text === match);
        if (link) {
          return `<a href="#doc-${link.docId}" data-doc-id="${link.docId}" style="color:#009689;text-decoration:underline;cursor:pointer">${match}</a>`;
        }
        return match;
      });
    }
  }
  out = tokens.join('');

  return out;
}

export const LegalCenter: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDocId, setSelectedDocId] = useState<string>('business-services-agreement');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activePortal, setActivePortal] = useState<'consumer' | 'provider' | 'developer'>('provider');

  const filteredDocs = useMemo(() => {
    let docs = LEGAL_DOCS.filter((d) => d.portals.includes(activePortal));
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      docs = docs.filter(
        (doc) =>
          doc.title.toLowerCase().includes(query) ||
          doc.purpose.toLowerCase().includes(query),
      );
    }
    return docs;
  }, [searchQuery, activePortal]);

  const activeDoc = useMemo(() => {
    const doc = LEGAL_DOCS.find((d) => d.id === selectedDocId) || LEGAL_DOCS[0];
    const clauses = LEGAL_DOC_CLAUSES[doc.id] || [];
    const docHtml = LEGAL_DOC_HTML[doc.id] || '';
    return { ...doc, clauses, docHtml };
  }, [selectedDocId]);

  const docsByCategory = useMemo(() => {
    return PARENT_CATEGORIES.map((cat) => ({
      category: cat,
      docs: filteredDocs.filter((d) => d.parentCategory === cat.label),
    })).filter((g) => g.docs.length > 0);
  }, [filteredDocs]);

  const handlePrint = () => {
    window.print();
  };

  const navigateToDoc = (docId: string) => {
    setSelectedDocId(docId);
    // Switch portal if the target doc is in a different portal so it appears in the sidebar
    const targetDoc = LEGAL_DOCS.find((d) => d.id === docId);
    if (targetDoc && !targetDoc.portals.includes(activePortal)) {
      setActivePortal(targetDoc.portals[0]);
    }
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#010000] font-sans flex flex-col selection:bg-[#009689]/20">

      <div className="flex-1 flex flex-col md:flex-row items-start">

        {/* LEFT SIDEBAR */}
        <div className="w-full md:w-85 shrink-0 bg-[#F5F5F4] border-r border-black/10 flex flex-col no-scrollbar md:sticky md:top-0 md:h-screen">

          {/* Header */}
          <div className="p-6 border-b border-black/5 bg-[#FAFAF9]">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-[#010000]/50 hover:text-black transition-colors mb-3 bg-transparent border-none cursor-pointer p-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-[#010000]/50 uppercase mb-2">
              <Shield className="w-3.5 h-3.5 text-black" />
              <span>Trust &amp; Legal</span>
            </div>
            <h1 className="font-serif text-2xl font-normal leading-tight tracking-tight text-[#010000]">
              Planviry Trust Center
            </h1>
            <p className="text-[11px] text-[#010000]/60 mt-2 leading-relaxed font-light">
              Official regulatory agreements, customer terms, vendor codes, and privacy standards.
            </p>
          </div>

          {/* Portal Tabs */}
          <div className="flex border-b border-black/10 bg-[#FAFAF9]">
            {PORTALS.map((portal) => (
              <button
                key={portal.id}
                onClick={() => setActivePortal(portal.id)}
                className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer border-none ${
                  activePortal === portal.id
                    ? 'bg-white text-black border-b-2 border-black'
                    : 'bg-transparent text-[#010000]/40 hover:text-black hover:bg-white/50'
                }`}
              >
                {portal.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="p-4 border-b border-black/5 bg-white">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#010000]/40" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FAFAF9] rounded-lg border border-black/10 text-xs font-medium placeholder:text-black/30 text-black outline-none focus:border-black/40 transition-all"
              />
            </div>
          </div>

          {/* Document Tree */}
          <div className="flex-1 p-3 space-y-3 overflow-y-auto hide-scrollbar">
            {docsByCategory.map((group) => (
              <div key={group.category.label} className="space-y-0.5">
                <h3 className="text-[9px] font-bold text-[#010000]/40 uppercase tracking-[0.12em] px-2">
                  {group.category.label}
                </h3>

                <div className="space-y-0.5">
                  {group.docs.map((doc) => {
                    const isActive = doc.id === selectedDocId;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDocId(doc.id)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-all flex items-start gap-2 border cursor-pointer ${
                          isActive
                            ? 'bg-white border-black/15 shadow-sm'
                            : 'bg-transparent border-transparent hover:bg-black/5'
                        }`}
                      >
                        <FileText className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isActive ? 'text-black' : 'text-black/35'}`} />
                        <div className="min-w-0 flex-1">
                          <span className={`text-xs block leading-tight ${isActive ? 'text-black font-semibold' : 'text-black/80 font-medium'}`}>
                            {doc.title}
                          </span>
                        </div>
                        {isActive && <ChevronRight className="w-3 h-3 text-black shrink-0 mt-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            {filteredDocs.length === 0 && (
              <div className="text-center py-8 px-4 text-black/40 space-y-1">
                <p className="text-xs font-semibold">No documents found</p>
                <p className="text-[10px] font-light">Try another keyword</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT MAIN CONTENT AREA */}
        <main className="flex-1 bg-white p-6 md:p-12 lg:p-16 flex flex-col justify-between min-w-0">

          <div className="space-y-8">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/5">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap text-[10px] text-black/50 font-mono">
                  <span className="font-semibold text-black">{activeDoc.parentCategory}</span>
                  <span>•</span>
                  <span>
                    Last Revised: <span className="font-semibold text-black">{activeDoc.lastUpdated}</span>
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-normal text-black tracking-tight">
                  {activeDoc.title}
                </h2>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={() => navigate('/privacy-request')}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#009689] hover:bg-[#006B62] transition-all rounded-lg cursor-pointer flex items-center gap-1.5"
                  title="Privacy Rights Request Form"
                >
                  <Shield className="w-3.5 h-3.5" />
                  <span>Privacy Request</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-black border border-black/15 bg-white hover:bg-black hover:text-white transition-all rounded-lg cursor-pointer flex items-center gap-1.5"
                  title="Print Document"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

            {/* Purpose */}
            <div className="p-5 bg-[#FAFAF9] border border-black/5 rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-black/50 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/40 block mb-1">Purpose</span>
                  <p className="text-xs text-black/80 leading-relaxed font-medium">{activeDoc.purpose}</p>
                </div>
              </div>
            </div>

            {/* Clauses */}
            {activeDoc.clauses && activeDoc.clauses.length > 0 ? (
              <div className="space-y-8" onClick={(e) => {
                const target = e.target as HTMLElement;
                if (target.tagName === 'A') {
                  const href = target.getAttribute('href') || '';
                  if (href.startsWith('#toc-')) {
                    e.preventDefault();
                    const sectionId = href.substring(1);
                    const el = document.getElementById(sectionId);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else if (href.startsWith('#doc-')) {
                    e.preventDefault();
                    const docId = target.getAttribute('data-doc-id') || href.substring(5);
                    navigateToDoc(docId);
                  } else if (href.startsWith('#/')) {
                    // Route navigation (e.g., #/privacy-request)
                    e.preventDefault();
                    navigate(href.substring(1));
                  }
                }
              }}>
                {activeDoc.clauses.map((clause, idx) => {
                  const sectionMatch = clause.title.match(/^(\d+(?:\.\d+)?)/);
                  const sectionId = sectionMatch ? `toc-${sectionMatch[1]}` : `toc-${idx}`;

                  let bodyHtml = clause.bodyHtml;

                  // Strip pandoc leftovers + defensive markdown cleanup
                  bodyHtml = cleanLegalHtml(bodyHtml);

                  // Convert ALL CAPS bold-only paragraphs to section-like headers with dot bullet
                  // <p><strong>SOME HEADER TEXT</strong></p> -> <h4 class="legal-sub-header">SOME HEADER TEXT</h4>
                  bodyHtml = bodyHtml.replace(
                    /<p><strong>([A-Z][A-Z\s;&'\/,\-]+?)<\/strong><\/p>/g,
                    '<h4 class="legal-sub-header"><span class="legal-dot"></span>$1</h4>'
                  );

                  // Convert sub-header bold lines (Title Case ending with period) to styled sub-headers
                  bodyHtml = bodyHtml.replace(
                    /<p><strong>([A-Z][a-zA-Z\s]+?\.)<\/strong><\/p>/g,
                    '<h4 class="legal-sub-header"><span class="legal-dot"></span>$1</h4>'
                  );

                  if (clause.title === 'TABLE OF CONTENTS') {
                    const titleToId = new Map<string, string>();
                    activeDoc.clauses.forEach((c) => {
                      const sm = c.title.match(/^(\d+(?:\.\d+)?)/);
                      if (sm) titleToId.set(c.title.toLowerCase(), `toc-${sm[1]}`);
                    });

                    bodyHtml = bodyHtml.replace(/<p>(\d+)\.\s+(.+?)<\/p>/g,
                      '<p><a href="#toc-$1" style="color:#009689;text-decoration:underline;cursor:pointer">$1. $2</a></p>');

                    bodyHtml = bodyHtml.replace(/<p>([^<]+?)<\/p>/g, (match, titleText) => {
                      if (titleText.startsWith('<a ')) return match;
                      for (const [sectionTitle, sid] of titleToId.entries()) {
                        const cleanTitle = sectionTitle.replace(/^\d+\.\s+/, '').trim();
                        if (cleanTitle === titleText.trim().toLowerCase() ||
                            cleanTitle.includes(titleText.trim().toLowerCase()) ||
                            titleText.trim().toLowerCase().includes(cleanTitle)) {
                          return `<p><a href="#${sid}" style="color:#009689;text-decoration:underline;cursor:pointer">${titleText}</a></p>`;
                        }
                      }
                      return match;
                    });
                  }

                  return (
                  <div key={idx} id={sectionId} className="space-y-3 scroll-mt-4">
                    <h3 className="text-xs font-sans font-bold text-[#010000] uppercase tracking-wider flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-black" />
                      {clause.title}
                    </h3>
                    <div
                      className="legal-doc-content text-xs md:text-sm text-[#010000]/80 leading-relaxed font-sans pl-3.5 border-l-2 border-black/5"
                      dangerouslySetInnerHTML={{ __html: bodyHtml }}
                    />
                  </div>
                  );
                })}
              </div>
            ) : activeDoc.docHtml ? (
              <div
                className="legal-doc-content text-xs md:text-sm text-[#010000]/80 leading-relaxed font-sans"
                dangerouslySetInnerHTML={{ __html: cleanLegalHtml(activeDoc.docHtml) }}
              />
            ) : null}

          </div>

          {/* Sign-off */}
          <div className="pt-12 mt-12 border-t border-black/5 flex flex-col sm:flex-row justify-between items-center text-[9px] text-black/40 font-mono gap-4">
            <div className="flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-black/60" />
              <span>Authorized by Planviry Operations</span>
            </div>
          </div>

        </main>

      </div>
    </div>
  );
};
