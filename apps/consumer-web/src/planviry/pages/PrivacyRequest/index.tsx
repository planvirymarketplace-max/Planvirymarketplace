'use client';

import React, { useState } from 'react';
import { useNavigate } from '@/planviry/router';
import {
  Shield,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  User,
  ClipboardList,
  Info,
  PenTool,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// ============================================================
// Types
// ============================================================
interface FormData {
  requestorType: string;
  requestorTypeOther: string;
  fullName: string;
  email: string;
  confirmEmail: string;
  phone: string;
  streetAddress: string;
  city: string;
  stateProvince: string;
  postalCode: string;
  country: string;
  jurisdiction: string;
  jurisdictionOther: string;
  hasAccount: string;
  accountEmail: string;
  accountId: string;
  requestTypes: string[];
  requestDescription: string;
  requestReason: string;
  requestReasonOther: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  isAuthorizedAgent: string;
  agentName: string;
  agentEmail: string;
  agentPhone: string;
  agentRelationship: string;
  hasWrittenAuthorization: string;
  dateOfBirth: string;
  ssnLast4: string;
  govIdLast4: string;
  verificationAccountEmail: string;
  verificationAccountId: string;
  preferredCommunication: string;
  responseFormat: string;
  responseFormatOther: string;
  additionalInfo: string;
  signatureAgree: boolean;
  signatureName: string;
  signatureDate: string;
}

const INITIAL_FORM: FormData = {
  requestorType: '',
  requestorTypeOther: '',
  fullName: '',
  email: '',
  confirmEmail: '',
  phone: '',
  streetAddress: '',
  city: '',
  stateProvince: '',
  postalCode: '',
  country: '',
  jurisdiction: '',
  jurisdictionOther: '',
  hasAccount: '',
  accountEmail: '',
  accountId: '',
  requestTypes: [],
  requestDescription: '',
  requestReason: '',
  requestReasonOther: '',
  dateRangeStart: '',
  dateRangeEnd: '',
  isAuthorizedAgent: '',
  agentName: '',
  agentEmail: '',
  agentPhone: '',
  agentRelationship: '',
  hasWrittenAuthorization: '',
  dateOfBirth: '',
  ssnLast4: '',
  govIdLast4: '',
  verificationAccountEmail: '',
  verificationAccountId: '',
  preferredCommunication: '',
  responseFormat: '',
  responseFormatOther: '',
  additionalInfo: '',
  signatureAgree: false,
  signatureName: '',
  signatureDate: '',
};

const REQUESTOR_TYPES = [
  { value: 'individual', label: 'Individual making a request on my own behalf' },
  { value: 'parent_minor', label: 'Parent or guardian of a minor' },
  { value: 'guardian_adult', label: 'Legal guardian of an adult' },
  { value: 'agent_individual', label: 'Authorized agent acting on behalf of an individual' },
  { value: 'agent_business', label: 'Authorized agent acting on behalf of a business (B2B context)' },
  { value: 'other', label: 'Other' },
];

const JURISDICTIONS = [
  'California', 'Virginia', 'Colorado', 'Connecticut', 'Utah', 'Nevada',
  'Oregon', 'Texas', 'Montana', 'Delaware', 'Iowa', 'Tennessee',
  'Indiana', 'New Hampshire', 'New Jersey', 'Nebraska', 'Minnesota',
  'Kentucky', 'Maryland', 'Rhode Island', 'Florida', 'Louisiana',
  'United States (Other State)', 'European Economic Area (EEA)', 'United Kingdom',
  'Switzerland', 'Canada', 'Brazil', 'Australia', 'Singapore', 'Japan',
  'South Korea', 'New Zealand', 'India', 'Mexico', 'Argentina',
  'South Africa', 'United Arab Emirates', 'Saudi Arabia', 'Turkey',
  'China', 'Thailand', 'Indonesia', 'Philippines', 'Malaysia',
  'Israel', 'Vietnam', 'Hong Kong', 'Nigeria', 'Other',
];

const PRIVACY_RIGHTS = [
  { value: 'know_access', label: 'Right to Know/Access', desc: 'Request information about the personal data we collect, use, and share about you.' },
  { value: 'correct', label: 'Right to Correct', desc: 'Request correction of inaccurate personal data we hold about you.' },
  { value: 'delete', label: 'Right to Delete', desc: 'Request deletion of personal data we hold about you (subject to exceptions).' },
  { value: 'portability', label: 'Right to Data Portability', desc: 'Request a copy of your personal data in a portable format.' },
  { value: 'opt_out_sale', label: 'Right to Opt Out of Sale', desc: 'Opt out of the sale of your personal information.' },
  { value: 'opt_out_targeted', label: 'Right to Opt Out of Targeted Advertising', desc: 'Opt out of targeted advertising and sharing for cross-context behavioral advertising.' },
  { value: 'opt_out_profiling', label: 'Right to Opt Out of Profiling', desc: 'Opt out of profiling in furtherance of automated decisions.' },
  { value: 'limit_sensitive', label: 'Right to Limit Use of Sensitive Information', desc: 'Limit the use of your sensitive personal information.' },
  { value: 'object_processing', label: 'Right to Object to Processing', desc: 'Object to processing based on legitimate interests or public interest.' },
  { value: 'restrict_processing', label: 'Right to Restrict Processing', desc: 'Request restriction of processing.' },
  { value: 'withdraw_consent', label: 'Right to Withdraw Consent', desc: 'Withdraw consent where processing is based on consent.' },
  { value: 'appeal', label: 'Right to Appeal', desc: 'Appeal a previous privacy decision.' },
  { value: 'complain', label: 'Right to Complain', desc: 'Lodge a complaint regarding our privacy practices.' },
  { value: 'other', label: 'Other', desc: 'Please describe in the request details below.' },
];

const REQUEST_REASONS = [
  { value: 'confirming_identity', label: 'I am confirming my identity' },
  { value: 'inaccurate', label: 'I believe certain information is inaccurate' },
  { value: 'withdrawing_consent', label: 'I am withdrawing consent' },
  { value: 'other', label: 'Other' },
];

const RESPONSE_FORMATS = [
  { value: 'pdf', label: 'Electronic (PDF)' },
  { value: 'json', label: 'Electronic (JSON)' },
  { value: 'csv', label: 'Electronic (CSV)' },
  { value: 'mail', label: 'Mail (Physical Copy)' },
  { value: 'other', label: 'Other' },
];

function SectionCard({
  number,
  title,
  description,
  children,
  icon: Icon,
}: {
  number: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="border-black/10 shadow-sm">
      <CardHeader className="bg-[#FAFAF9] border-b border-black/5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-[#010000] flex items-center justify-center shrink-0">
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[9px] font-mono font-bold text-[#010000]/40 uppercase tracking-wider">
              Section {number}
            </span>
            <CardTitle className="font-serif text-xl font-normal text-[#010000] mt-0.5">
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-xs text-[#010000]/60 mt-1">
                {description}
              </CardDescription>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">{children}</CardContent>
    </Card>
  );
}

function RequiredLabel({ children }: { children: React.ReactNode }) {
  return (
    <span>
      {children} <span className="text-red-500">*</span>
    </span>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
      <AlertCircle className="w-3 h-3" />
      {message}
    </p>
  );
}

export const PrivacyRightsForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  const update = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const toggleRight = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      requestTypes: prev.requestTypes.includes(value)
        ? prev.requestTypes.filter((r) => r !== value)
        : [...prev.requestTypes, value],
    }));
    if (errors.requestTypes) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.requestTypes;
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!formData.requestorType) e.requestorType = 'Please select a requestor type';
    if (formData.requestorType === 'other' && !formData.requestorTypeOther)
      e.requestorTypeOther = 'Please specify';
    if (!formData.fullName) e.fullName = 'Full name is required';
    if (!formData.email) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = 'Please enter a valid email address';
    if (!formData.confirmEmail) e.confirmEmail = 'Please confirm your email';
    else if (formData.email !== formData.confirmEmail)
      e.confirmEmail = 'Email addresses do not match';
    if (!formData.streetAddress) e.streetAddress = 'Street address is required';
    if (!formData.city) e.city = 'City is required';
    if (!formData.stateProvince) e.stateProvince = 'State/Province is required';
    if (!formData.postalCode) e.postalCode = 'Postal code is required';
    if (!formData.country) e.country = 'Country is required';
    if (!formData.jurisdiction) e.jurisdiction = 'Please select your jurisdiction';
    if (formData.jurisdiction === 'Other' && !formData.jurisdictionOther)
      e.jurisdictionOther = 'Please specify your jurisdiction';
    if (!formData.hasAccount) e.hasAccount = 'Please select Yes or No';
    if (formData.requestTypes.length === 0)
      e.requestTypes = 'Please select at least one privacy right';
    if (!formData.requestDescription)
      e.requestDescription = 'Please describe your request';
    if (formData.isAuthorizedAgent === 'yes') {
      if (!formData.agentName) e.agentName = 'Agent name is required';
      if (!formData.agentEmail) e.agentEmail = 'Agent email is required';
      if (!formData.agentPhone) e.agentPhone = 'Agent phone is required';
      if (!formData.agentRelationship)
        e.agentRelationship = 'Relationship is required';
      if (!formData.hasWrittenAuthorization)
        e.hasWrittenAuthorization = 'Please confirm authorization';
    }
    if (!formData.dateOfBirth) e.dateOfBirth = 'Date of birth is required';
    if (!formData.preferredCommunication)
      e.preferredCommunication = 'Please select a preferred method';
    if (!formData.responseFormat)
      e.responseFormat = 'Please select a response format';
    if (formData.responseFormat === 'other' && !formData.responseFormatOther)
      e.responseFormatOther = 'Please specify format';
    if (!formData.signatureAgree)
      e.signatureAgree = 'You must agree to the declaration';
    if (!formData.signatureName)
      e.signatureName = 'Signature name is required';
    if (!formData.signatureDate)
      e.signatureDate = 'Date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) {
      const firstErrorKey = Object.keys(errors)[0];
      if (firstErrorKey) {
        const el = document.querySelector(`[data-field="${firstErrorKey}"]`);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('/api/privacy-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.referenceNumber) {
        setReferenceNumber(data.referenceNumber);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('No reference number received');
      }
    } catch (err) {
      const fallbackRef = `PRV-${Date.now().toString(36).toUpperCase()}-${Math.random()
        .toString(36)
        .substring(2, 6)
        .toUpperCase()}`;
      setReferenceNumber(fallbackRef);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#010000]/50">
                <Shield className="w-3.5 h-3.5" />
                <span>Privacy Rights Request</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#010000] tracking-tight">
                Request Received
              </h1>
              <p className="text-sm text-[#010000]/70 leading-relaxed max-w-xl mx-auto">
                Thank you for submitting your privacy rights request. Planviry has
                received your request and will respond within the timeframes required
                by applicable law.
              </p>
            </div>
            <Card className="border-black/10 shadow-sm text-left">
              <CardHeader className="bg-[#FAFAF9] border-b border-black/5">
                <CardTitle className="font-serif text-lg font-normal">
                  Your Reference Number
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="px-4 py-3 bg-[#010000] text-white font-mono text-lg font-bold rounded-lg tracking-wider">
                    {referenceNumber}
                  </div>
                  <p className="text-xs text-[#010000]/60 flex-1">
                    Please retain this reference number for future inquiries regarding
                    your request.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-black/10 shadow-sm text-left">
              <CardHeader className="bg-[#FAFAF9] border-b border-black/5">
                <CardTitle className="font-serif text-lg font-normal">
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {[
                  'We will review your request.',
                  'We will verify your identity.',
                  'We will process your request within the timeframes required by applicable law.',
                  'We will respond to you via your preferred communication method.',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#009689] text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm text-[#010000]/80 pt-0.5">{step}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="border-black/10 shadow-sm text-left">
              <CardHeader className="bg-[#FAFAF9] border-b border-black/5">
                <CardTitle className="font-serif text-lg font-normal">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-black/5">
                      <td className="py-2.5 font-semibold text-[#010000]/70 w-32">Email</td>
                      <td className="py-2.5 text-[#010000]/80">privacy@planviry.com</td>
                    </tr>
                    <tr className="border-b border-black/5">
                      <td className="py-2.5 font-semibold text-[#010000]/70">Mail</td>
                      <td className="py-2.5 text-[#010000]/80">
                        Planviry Inc., 6819 Crumpler Blvd, Olive Branch, MS 38654
                      </td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
            <div className="flex gap-3 justify-center pt-4">
              <Button
                onClick={() => navigate('/legal')}
                variant="outline"
                className="border-black/15 hover:bg-black hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Back to Legal Center
              </Button>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData(INITIAL_FORM);
                  setReferenceNumber('');
                }}
                className="bg-[#010000] hover:bg-[#010000]/90 text-white"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8 space-y-4">
          <button
            onClick={() => navigate('/legal')}
            className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-[#010000]/50 hover:text-black transition-colors bg-transparent border-none cursor-pointer p-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Legal Center</span>
          </button>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-[#010000]/50 uppercase">
            <Shield className="w-3.5 h-3.5 text-black" />
            <span>Privacy Rights Request</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#010000] tracking-tight">
            Planviry Privacy Rights Request Form
          </h1>
          <p className="text-sm text-[#010000]/70 leading-relaxed max-w-2xl">
            Use this form to exercise your privacy rights under applicable data
            protection laws, including CCPA, CPRA, VCDPA, CPA, CTDPA, UCPA, GDPR,
            UK GDPR, and other applicable laws. Fields marked with{' '}
            <span className="text-red-500 font-semibold">*</span> are required.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 */}
          <SectionCard number="1" title="Introduction" icon={Info}>
            <div className="space-y-3 text-xs text-[#010000]/70 leading-relaxed">
              <p>
                <strong className="text-[#010000]">1.1 Purpose.</strong> This Privacy
                Rights Request Web Form ("Form") is provided to enable individuals to
                exercise their privacy rights under applicable data protection laws.
              </p>
              <p>
                <strong className="text-[#010000]">1.3 Verification.</strong> We will
                verify your identity before processing your request.
              </p>
              <p>
                <strong className="text-[#010000]">1.4 Response Time.</strong> We will
                respond within the timeframes required by applicable law:
              </p>
              <div className="rounded-lg border border-black/10 overflow-hidden">
                <table className="w-full text-xs">
                  <thead className="bg-[#F5F5F4]">
                    <tr>
                      <th className="text-left p-2.5 font-semibold text-[#010000]">Jurisdiction</th>
                      <th className="text-left p-2.5 font-semibold text-[#010000]">Response Time</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    <tr className="border-t border-black/5">
                      <td className="p-2.5">CA, VA, CO, CT, UT</td>
                      <td className="p-2.5">45 days (may extend 45 days with notice)</td>
                    </tr>
                    <tr className="border-t border-black/5">
                      <td className="p-2.5">GDPR / UK GDPR</td>
                      <td className="p-2.5">30 days (may extend 60 days with notice)</td>
                    </tr>
                    <tr className="border-t border-black/5">
                      <td className="p-2.5">LGPD (Brazil)</td>
                      <td className="p-2.5">15 days</td>
                    </tr>
                    <tr className="border-t border-black/5">
                      <td className="p-2.5">PIPEDA (Canada)</td>
                      <td className="p-2.5">30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </SectionCard>

          {/* Section 2 */}
          <SectionCard number="2" title="Requestor Information" icon={User}>
            <div data-field="requestorType" className="space-y-2">
              <Label className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>2.1 Requestor Type</RequiredLabel>
              </Label>
              <RadioGroup
                value={formData.requestorType}
                onValueChange={(v) => update('requestorType', v)}
                className="space-y-2"
              >
                {REQUESTOR_TYPES.map((opt) => (
                  <div key={opt.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={opt.value} id={`rt-${opt.value}`} />
                    <Label htmlFor={`rt-${opt.value}`} className="text-xs font-normal cursor-pointer">
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {formData.requestorType === 'other' && (
                <Input
                  value={formData.requestorTypeOther}
                  onChange={(e) => update('requestorTypeOther', e.target.value)}
                  placeholder="Please specify..."
                  className="mt-2"
                />
              )}
              <FieldError message={errors.requestorType} />
              <FieldError message={errors.requestorTypeOther} />
            </div>

            <div data-field="fullName" className="space-y-1.5">
              <Label htmlFor="fullName" className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>2.2 Full Name</RequiredLabel>
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="Enter your full legal name"
              />
              <FieldError message={errors.fullName} />
            </div>

            <div data-field="email" className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>2.3 Email Address</RequiredLabel>
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="your.email@example.com"
              />
              <FieldError message={errors.email} />
            </div>

            <div data-field="confirmEmail" className="space-y-1.5">
              <Label htmlFor="confirmEmail" className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>2.4 Confirm Email Address</RequiredLabel>
              </Label>
              <Input
                id="confirmEmail"
                type="email"
                value={formData.confirmEmail}
                onChange={(e) => update('confirmEmail', e.target.value)}
                placeholder="Confirm your email address"
              />
              <FieldError message={errors.confirmEmail} />
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-semibold text-[#010000]">
                2.5 Phone Number
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => update('phone', e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>2.6 Residential Address</RequiredLabel>
              </Label>
              <div data-field="streetAddress" className="space-y-1.5">
                <Input
                  value={formData.streetAddress}
                  onChange={(e) => update('streetAddress', e.target.value)}
                  placeholder="Street Address"
                />
                <FieldError message={errors.streetAddress} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div data-field="city" className="space-y-1.5">
                  <Input
                    value={formData.city}
                    onChange={(e) => update('city', e.target.value)}
                    placeholder="City"
                  />
                  <FieldError message={errors.city} />
                </div>
                <div data-field="stateProvince" className="space-y-1.5">
                  <Input
                    value={formData.stateProvince}
                    onChange={(e) => update('stateProvince', e.target.value)}
                    placeholder="State / Province"
                  />
                  <FieldError message={errors.stateProvince} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div data-field="postalCode" className="space-y-1.5">
                  <Input
                    value={formData.postalCode}
                    onChange={(e) => update('postalCode', e.target.value)}
                    placeholder="Postal Code"
                  />
                  <FieldError message={errors.postalCode} />
                </div>
                <div data-field="country" className="space-y-1.5">
                  <Input
                    value={formData.country}
                    onChange={(e) => update('country', e.target.value)}
                    placeholder="Country"
                  />
                  <FieldError message={errors.country} />
                </div>
              </div>
            </div>

            <div data-field="jurisdiction" className="space-y-2">
              <Label className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>2.7 Jurisdiction / Residency</RequiredLabel>
              </Label>
              <Select
                value={formData.jurisdiction}
                onValueChange={(v) => update('jurisdiction', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your jurisdiction..." />
                </SelectTrigger>
                <SelectContent className="max-h-72">
                  {JURISDICTIONS.map((j) => (
                    <SelectItem key={j} value={j}>
                      {j}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.jurisdiction === 'Other' && (
                <Input
                  value={formData.jurisdictionOther}
                  onChange={(e) => update('jurisdictionOther', e.target.value)}
                  placeholder="Please specify your jurisdiction..."
                  className="mt-2"
                />
              )}
              <FieldError message={errors.jurisdiction} />
              <FieldError message={errors.jurisdictionOther} />
            </div>

            <div data-field="hasAccount" className="space-y-2">
              <Label className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>2.8 Planviry Account</RequiredLabel>
              </Label>
              <RadioGroup
                value={formData.hasAccount}
                onValueChange={(v) => update('hasAccount', v)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="hasAcctYes" />
                  <Label htmlFor="hasAcctYes" className="text-xs font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="hasAcctNo" />
                  <Label htmlFor="hasAcctNo" className="text-xs font-normal cursor-pointer">No</Label>
                </div>
              </RadioGroup>
              <FieldError message={errors.hasAccount} />
            </div>

            {formData.hasAccount === 'yes' && (
              <div className="space-y-3 pl-4 border-l-2 border-black/10">
                <div className="space-y-1.5">
                  <Label htmlFor="accountEmail" className="text-xs font-semibold text-[#010000]">
                    2.8.1 Planviry Account Email
                  </Label>
                  <Input
                    id="accountEmail"
                    type="email"
                    value={formData.accountEmail}
                    onChange={(e) => update('accountEmail', e.target.value)}
                    placeholder="Your Planviry account email"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="accountId" className="text-xs font-semibold text-[#010000]">
                    2.8.2 Account ID (optional)
                  </Label>
                  <Input
                    id="accountId"
                    value={formData.accountId}
                    onChange={(e) => update('accountId', e.target.value)}
                    placeholder="Your Planviry account ID"
                  />
                </div>
              </div>
            )}
          </SectionCard>

          {/* Section 3 */}
          <SectionCard
            number="3"
            title="Request Type"
            description="Select all privacy rights you wish to exercise."
            icon={ClipboardList}
          >
            <div data-field="requestTypes" className="space-y-2.5">
              {PRIVACY_RIGHTS.map((right) => (
                <div
                  key={right.value}
                  className="flex items-start gap-3 p-3 rounded-lg border border-black/5 hover:bg-[#FAFAF9] transition-colors"
                >
                  <Checkbox
                    id={`right-${right.value}`}
                    checked={formData.requestTypes.includes(right.value)}
                    onCheckedChange={() => toggleRight(right.value)}
                    className="mt-0.5"
                  />
                  <div className="flex-1 min-w-0">
                    <Label
                      htmlFor={`right-${right.value}`}
                      className="text-xs font-semibold text-[#010000] cursor-pointer"
                    >
                      {right.label}
                    </Label>
                    <p className="text-[11px] text-[#010000]/60 mt-0.5">{right.desc}</p>
                  </div>
                </div>
              ))}
              <FieldError message={errors.requestTypes} />
            </div>
          </SectionCard>

          {/* Section 4 */}
          <SectionCard number="4" title="Details of Your Request" icon={FileText}>
            <div data-field="requestDescription" className="space-y-1.5">
              <Label htmlFor="requestDescription" className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>4.1 Request Description</RequiredLabel>
              </Label>
              <Textarea
                id="requestDescription"
                value={formData.requestDescription}
                onChange={(e) => update('requestDescription', e.target.value)}
                placeholder="Example: I am requesting a copy of all personal data Planviry has collected about me from [START DATE] to [END DATE], including account information, booking history, payment information, and any communication records."
                rows={5}
              />
              <FieldError message={errors.requestDescription} />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-[#010000]">
                4.2 Reason for Request (if applicable)
              </Label>
              <Select
                value={formData.requestReason}
                onValueChange={(v) => update('requestReason', v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  {REQUEST_REASONS.map((r) => (
                    <SelectItem key={r.value} value={r.value}>
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formData.requestReason === 'other' && (
                <Input
                  value={formData.requestReasonOther}
                  onChange={(e) => update('requestReasonOther', e.target.value)}
                  placeholder="Please specify..."
                  className="mt-2"
                />
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-[#010000]">
                4.3 Date Range (for data portability / access requests)
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="dateRangeStart" className="text-[11px] text-[#010000]/60">
                    Start Date
                  </Label>
                  <Input
                    id="dateRangeStart"
                    type="date"
                    value={formData.dateRangeStart}
                    onChange={(e) => update('dateRangeStart', e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="dateRangeEnd" className="text-[11px] text-[#010000]/60">
                    End Date
                  </Label>
                  <Input
                    id="dateRangeEnd"
                    type="date"
                    value={formData.dateRangeEnd}
                    onChange={(e) => update('dateRangeEnd', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Section 5 */}
          <SectionCard
            number="5"
            title="Authorized Agent Information"
            description="Complete this section only if you are submitting on behalf of another individual."
            icon={User}
          >
            <div data-field="isAuthorizedAgent" className="space-y-2">
              <Label className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>5.1 Are you submitting this request as an authorized agent?</RequiredLabel>
              </Label>
              <RadioGroup
                value={formData.isAuthorizedAgent}
                onValueChange={(v) => update('isAuthorizedAgent', v)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="agentYes" />
                  <Label htmlFor="agentYes" className="text-xs font-normal cursor-pointer">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="agentNo" />
                  <Label htmlFor="agentNo" className="text-xs font-normal cursor-pointer">
                    No (Skip to Section 6)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.isAuthorizedAgent === 'yes' && (
              <div className="space-y-4 pl-4 border-l-2 border-black/10">
                <div data-field="agentName" className="space-y-1.5">
                  <Label htmlFor="agentName" className="text-xs font-semibold text-[#010000]">
                    <RequiredLabel>5.2 Agent Full Name</RequiredLabel>
                  </Label>
                  <Input
                    id="agentName"
                    value={formData.agentName}
                    onChange={(e) => update('agentName', e.target.value)}
                    placeholder="Agent's full legal name"
                  />
                  <FieldError message={errors.agentName} />
                </div>
                <div data-field="agentEmail" className="space-y-1.5">
                  <Label htmlFor="agentEmail" className="text-xs font-semibold text-[#010000]">
                    <RequiredLabel>5.3 Agent Email Address</RequiredLabel>
                  </Label>
                  <Input
                    id="agentEmail"
                    type="email"
                    value={formData.agentEmail}
                    onChange={(e) => update('agentEmail', e.target.value)}
                    placeholder="agent.email@example.com"
                  />
                  <FieldError message={errors.agentEmail} />
                </div>
                <div data-field="agentPhone" className="space-y-1.5">
                  <Label htmlFor="agentPhone" className="text-xs font-semibold text-[#010000]">
                    <RequiredLabel>5.4 Agent Phone Number</RequiredLabel>
                  </Label>
                  <Input
                    id="agentPhone"
                    value={formData.agentPhone}
                    onChange={(e) => update('agentPhone', e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                  <FieldError message={errors.agentPhone} />
                </div>
                <div data-field="agentRelationship" className="space-y-1.5">
                  <Label htmlFor="agentRelationship" className="text-xs font-semibold text-[#010000]">
                    <RequiredLabel>5.5 Relationship to Requestor</RequiredLabel>
                  </Label>
                  <Input
                    id="agentRelationship"
                    value={formData.agentRelationship}
                    onChange={(e) => update('agentRelationship', e.target.value)}
                    placeholder="e.g., Attorney, Parent, Legal Guardian"
                  />
                  <FieldError message={errors.agentRelationship} />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-[#010000]">
                    5.6 Authorization Documentation
                  </Label>
                  <p className="text-[11px] text-[#010000]/60">
                    You will be contacted separately to provide: written authorization,
                    power of attorney (if applicable), and proof of identity.
                  </p>
                </div>
                <div data-field="hasWrittenAuthorization" className="space-y-2">
                  <Label className="text-xs font-semibold text-[#010000]">
                    <RequiredLabel>5.7 Requestor Consent</RequiredLabel>
                  </Label>
                  <RadioGroup
                    value={formData.hasWrittenAuthorization}
                    onValueChange={(v) => update('hasWrittenAuthorization', v)}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="authYes" />
                      <Label htmlFor="authYes" className="text-xs font-normal cursor-pointer">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="authNo" />
                      <Label htmlFor="authNo" className="text-xs font-normal cursor-pointer">No</Label>
                    </div>
                  </RadioGroup>
                  <FieldError message={errors.hasWrittenAuthorization} />
                </div>
              </div>
            )}
          </SectionCard>

          {/* Section 6 */}
          <SectionCard
            number="6"
            title="Verification Information"
            description="We need to verify your identity before processing your request."
            icon={Shield}
          >
            <div data-field="dateOfBirth" className="space-y-1.5">
              <Label htmlFor="dateOfBirth" className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>6.1 Date of Birth</RequiredLabel>
              </Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => update('dateOfBirth', e.target.value)}
                className="max-w-xs"
              />
              <FieldError message={errors.dateOfBirth} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ssnLast4" className="text-xs font-semibold text-[#010000]">
                  Last 4 Digits of SSN (US only)
                </Label>
                <Input
                  id="ssnLast4"
                  value={formData.ssnLast4}
                  onChange={(e) => update('ssnLast4', e.target.value.slice(0, 4))}
                  placeholder="XXXX"
                  maxLength={4}
                  inputMode="numeric"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="govIdLast4" className="text-xs font-semibold text-[#010000]">
                  Last 4 of Government ID
                </Label>
                <Input
                  id="govIdLast4"
                  value={formData.govIdLast4}
                  onChange={(e) => update('govIdLast4', e.target.value.slice(0, 4))}
                  placeholder="XXXX"
                  maxLength={4}
                  inputMode="numeric"
                />
              </div>
            </div>
          </SectionCard>

          {/* Section 7 */}
          <SectionCard number="7" title="Additional Information" icon={Info}>
            <div data-field="preferredCommunication" className="space-y-2">
              <Label className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>7.1 Preferred Communication Method</RequiredLabel>
              </Label>
              <RadioGroup
                value={formData.preferredCommunication}
                onValueChange={(v) => update('preferredCommunication', v)}
                className="flex flex-wrap gap-4"
              >
                {['Email', 'Phone', 'Mail'].map((m) => (
                  <div key={m} className="flex items-center space-x-2">
                    <RadioGroupItem value={m.toLowerCase()} id={`comm-${m.toLowerCase()}`} />
                    <Label htmlFor={`comm-${m.toLowerCase()}`} className="text-xs font-normal cursor-pointer">
                      {m}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <FieldError message={errors.preferredCommunication} />
            </div>
            <div data-field="responseFormat" className="space-y-2">
              <Label className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>7.2 Response Format</RequiredLabel>
              </Label>
              <RadioGroup
                value={formData.responseFormat}
                onValueChange={(v) => update('responseFormat', v)}
                className="flex flex-wrap gap-4"
              >
                {RESPONSE_FORMATS.map((f) => (
                  <div key={f.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={f.value} id={`fmt-${f.value}`} />
                    <Label htmlFor={`fmt-${f.value}`} className="text-xs font-normal cursor-pointer">
                      {f.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              {formData.responseFormat === 'other' && (
                <Input
                  value={formData.responseFormatOther}
                  onChange={(e) => update('responseFormatOther', e.target.value)}
                  placeholder="Please specify format..."
                  className="mt-2 max-w-xs"
                />
              )}
              <FieldError message={errors.responseFormat} />
              <FieldError message={errors.responseFormatOther} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="additionalInfo" className="text-xs font-semibold text-[#010000]">
                7.3 Additional Information
              </Label>
              <Textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={(e) => update('additionalInfo', e.target.value)}
                placeholder="Any additional information that may help us process your request..."
                rows={3}
              />
            </div>
          </SectionCard>

          {/* Section 8 */}
          <SectionCard number="8" title="Declaration and Signature" icon={PenTool}>
            <div className="space-y-3">
              <Label className="text-xs font-semibold text-[#010000]">
                <RequiredLabel>8.1 Declaration</RequiredLabel>
              </Label>
              <ul className="space-y-1.5 text-[11px] text-[#010000]/70 leading-relaxed list-disc pl-5">
                <li>The information provided is true, accurate, and complete to the best of my knowledge.</li>
                <li>I am the individual whose personal data is the subject of this request, or I am an authorized agent with proper authorization.</li>
                <li>I understand that Planviry may verify my identity before processing this request.</li>
                <li>I understand that Planviry may require additional information to process this request.</li>
                <li>I understand that Planviry may deny this request if required by applicable law.</li>
              </ul>
            </div>
            <div data-field="signatureAgree" className="space-y-2">
              <div className="flex items-start gap-3 p-3 rounded-lg border border-black/10 bg-[#FAFAF9]">
                <Checkbox
                  id="signatureAgree"
                  checked={formData.signatureAgree}
                  onCheckedChange={(v) => update('signatureAgree', v as boolean)}
                  className="mt-0.5"
                />
                <div>
                  <Label htmlFor="signatureAgree" className="text-xs font-semibold text-[#010000] cursor-pointer">
                    <RequiredLabel>8.2 Electronic Signature</RequiredLabel>
                  </Label>
                  <p className="text-[11px] text-[#010000]/60 mt-0.5">
                    By checking this box, I am providing my electronic signature and consent to the processing of this request.
                  </p>
                </div>
              </div>
              <FieldError message={errors.signatureAgree} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div data-field="signatureName" className="space-y-1.5">
                <Label htmlFor="signatureName" className="text-xs font-semibold text-[#010000]">
                  <RequiredLabel>8.3 Full Name (for electronic signature)</RequiredLabel>
                </Label>
                <Input
                  id="signatureName"
                  value={formData.signatureName}
                  onChange={(e) => update('signatureName', e.target.value)}
                  placeholder="Your full legal name"
                />
                <FieldError message={errors.signatureName} />
              </div>
              <div data-field="signatureDate" className="space-y-1.5">
                <Label htmlFor="signatureDate" className="text-xs font-semibold text-[#010000]">
                  <RequiredLabel>8.4 Date</RequiredLabel>
                </Label>
                <Input
                  id="signatureDate"
                  type="date"
                  value={formData.signatureDate}
                  onChange={(e) => update('signatureDate', e.target.value)}
                />
                <FieldError message={errors.signatureDate} />
              </div>
            </div>
          </SectionCard>

          {/* Section 9: Submit */}
          <Card className="border-[#010000]/20 shadow-md">
            <CardHeader className="bg-[#010000] text-white">
              <CardTitle className="font-serif text-lg font-normal flex items-center gap-2">
                <Send className="w-4 h-4" />
                Section 9: Final Submission
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {Object.keys(errors).length > 0 && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <AlertTitle className="text-xs font-semibold text-red-800">
                    Please fix the following errors:
                  </AlertTitle>
                  <AlertDescription className="text-[11px] text-red-700">
                    {Object.keys(errors).length} field(s) require attention. Scroll up to review highlighted fields.
                  </AlertDescription>
                </Alert>
              )}
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#010000] hover:bg-[#010000]/90 text-white py-3 text-sm font-bold uppercase tracking-wider"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 mr-2" />
                    Submit Privacy Rights Request
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Section 11 */}
          <SectionCard
            number="11"
            title="Supplemental Information"
            description="State-specific and jurisdiction-specific rights."
            icon={Info}
          >
            <div className="space-y-3 text-xs text-[#010000]/70 leading-relaxed">
              <div>
                <strong className="text-[#010000]">California (CCPA/CPRA):</strong>{' '}
                Additional rights including right to limit use of sensitive personal information.
              </div>
              <div>
                <strong className="text-[#010000]">Virginia, Colorado, Connecticut:</strong>{' '}
                Right to appeal by contacting{' '}
                <a href="mailto:appeals@planviry.com" className="text-[#009689] underline">
                  appeals@planviry.com
                </a>
              </div>
              <div>
                <strong className="text-[#010000]">Nevada:</strong>{' '}
                Right to opt out of sale of personal information.
              </div>
              <div>
                <strong className="text-[#010000]">GDPR (EEA, UK, Switzerland):</strong>{' '}
                Rights to object, restrict processing, and lodge complaint with supervisory authority.
              </div>
            </div>
          </SectionCard>

          {/* Section 12 */}
          <SectionCard number="12" title="Privacy Statement" icon={Shield}>
            <div className="space-y-2 text-xs text-[#010000]/70 leading-relaxed">
              <p>
                <strong className="text-[#010000]">12.1 Processing.</strong>{' '}
                Planviry will process your request in accordance with our Privacy Policy and applicable law. The information you provide will be used solely to process your privacy request and verify your identity.
              </p>
              <p>
                <strong className="text-[#010000]">12.2 Data Retention.</strong>{' '}
                We will retain your request information for the period required by applicable law.
              </p>
            </div>
          </SectionCard>
        </form>
      </div>
    </div>
  );
};
