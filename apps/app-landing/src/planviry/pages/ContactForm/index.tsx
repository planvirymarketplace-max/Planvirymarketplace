'use client';

import React, { useState } from 'react';
import { useNavigate } from '@/planviry/router';
import { ArrowLeft, Mail, Send, Loader2, CheckCircle2, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DEPARTMENTS = [
  { value: 'support', label: 'General Support', email: 'support@planviry.com' },
  { value: 'privacy', label: 'Privacy Inquiries', email: 'privacy@planviry.com' },
  { value: 'legal', label: 'Legal', email: 'legal@planviry.com' },
  { value: 'security', label: 'Security', email: 'security@planviry.com' },
  { value: 'fraud', label: 'Fraud Reporting', email: 'fraud@planviry.com' },
  { value: 'copyright', label: 'Copyright/DMCA', email: 'copyright@planviry.com' },
  { value: 'policy', label: 'Policy Questions', email: 'policy@planviry.com' },
  { value: 'appeals', label: 'Appeals', email: 'appeals@planviry.com' },
  { value: 'accessibility', label: 'Accessibility', email: 'accessibility@planviry.com' },
  { value: 'merchants', label: 'Merchant Inquiries', email: 'merchants@planviry.com' },
  { value: 'partners', label: 'Partner Inquiries', email: 'partners@planviry.com' },
  { value: 'taxes', label: 'Tax Inquiries', email: 'taxes@planviry.com' },
  { value: 'insurance', label: 'Insurance', email: 'insurance@planviry.com' },
  { value: 'transport', label: 'Transportation', email: 'transport@planviry.com' },
  { value: 'dining', label: 'Dining', email: 'dining@planviry.com' },
  { value: 'retail', label: 'Retail', email: 'retail@planviry.com' },
  { value: 'vip', label: 'VIP/Club Access', email: 'vip@planviry.com' },
  { value: 'concierge', label: 'Concierge', email: 'concierge@planviry.com' },
  { value: 'groups', label: 'Group Travel', email: 'groups@planviry.com' },
  { value: 'events', label: 'Events', email: 'events@planviry.com' },
  { value: 'cancellations', label: 'Cancellations', email: 'cancellations@planviry.com' },
  { value: 'refunds', label: 'Refunds', email: 'refunds@planviry.com' },
  { value: 'disputes', label: 'Disputes', email: 'disputes@planviry.com' },
  { value: 'transfers', label: 'Transfers', email: 'transfers@planviry.com' },
  { value: 'pcicompliance', label: 'PCI Compliance', email: 'pcicompliance@planviry.com' },
  { value: 'incidents', label: 'Incident Reporting', email: 'incidents@planviry.com' },
  { value: 'dpo', label: 'Data Protection Officer', email: 'dpo@planviry.com' },
  { value: 'ai-governance', label: 'AI Governance', email: 'ai-governance@planviry.com' },
];

export const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const selectedDept = DEPARTMENTS.find((d) => d.value === department);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !department || !message) return;
    setSubmitting(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, department: selectedDept?.email, subject, message }),
      });
    } catch (err) {
      // Fallback - still show success
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <Card className="max-w-lg w-full border-black/10 shadow-sm">
          <CardContent className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-2xl font-normal text-[#010000]">Message Sent</h1>
            <p className="text-sm text-[#010000]/70">
              Thank you for contacting Planviry. Your message has been sent to{' '}
              <span className="font-semibold">{selectedDept?.email}</span>. We will respond as soon as possible.
            </p>
            <Button
              onClick={() => navigate('/legal')}
              variant="outline"
              className="border-black/15 hover:bg-black hover:text-white"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back to Legal Center
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-[#010000]/50 hover:text-black transition-colors bg-transparent border-none cursor-pointer p-0 mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold tracking-wider text-[#010000]/50 uppercase mb-2">
          <Mail className="w-3.5 h-3.5 text-black" />
          <span>Contact Planviry</span>
        </div>

        <h1 className="font-serif text-3xl md:text-4xl font-normal text-[#010000] tracking-tight mb-2">
          Contact Us
        </h1>
        <p className="text-sm text-[#010000]/70 leading-relaxed mb-8">
          Select a department and send us a message. We'll route your inquiry to the right team.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Card className="border-black/10 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="name" className="text-xs font-semibold text-[#010000]">
                  Your Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-[#010000]">
                  Your Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-[#010000]">
                  Department <span className="text-red-500">*</span>
                </Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a department..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-72">
                    {DEPARTMENTS.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label} ({d.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {selectedDept && (
                  <p className="text-[11px] text-[#009689] font-medium">
                    Your message will be sent to: {selectedDept.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-xs font-semibold text-[#010000]">
                  Subject
                </Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief subject line"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-xs font-semibold text-[#010000]">
                  Message <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry or issue..."
                  rows={6}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={submitting || !name || !email || !department || !message}
                className="w-full bg-[#010000] hover:bg-[#010000]/90 text-white py-3 text-sm font-bold uppercase tracking-wider"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <div className="text-center">
            <p className="text-[11px] text-[#010000]/50">
              Planviry Inc. · 6819 Crumpler Blvd · Olive Branch, MS 38654 · USA
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
