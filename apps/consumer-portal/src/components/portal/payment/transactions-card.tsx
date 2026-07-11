"use client";

import { Download, FileText, Receipt } from "lucide-react";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { StatusBadge } from "@/components/portal/status-badge";
import { formatCurrency, formatDate } from "@/lib/constants";

export type Transaction = {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: string;
  invoiceUrl: string | null;
  createdAt?: string | Date;
};

function csvCell(value: string | number): string {
  const s = String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

function exportStatementsCsv(transactions: Transaction[]) {
  const header = ["Date", "Description", "Amount", "Status"];
  const rows = transactions.map((t) => [
    formatDate(t.date),
    t.description,
    t.status === "Refunded" ? -Math.abs(t.amount).toFixed(2) : t.amount.toFixed(2),
    t.status,
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map(csvCell).join(","))
    .join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `concierge-statements-${new Date()
    .toISOString()
    .slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast.success("Statements exported");
}

export function TransactionsCard({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-3 space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2 text-base font-600 text-navy">
            <Receipt className="size-4 text-teal" />
            Transaction History
          </CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {transactions.length} transactions on file
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportStatementsCsv(transactions)}
          disabled={transactions.length === 0}
          aria-label="Download all statements as CSV"
        >
          <Download className="size-4" />
          <span className="hidden sm:inline">Download all statements</span>
          <span className="sm:hidden">Export</span>
        </Button>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <Receipt className="size-7 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-navy">
              No transactions yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Your payments and refunds will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop / tablet table */}
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                      Date
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                      Description
                    </TableHead>
                    <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
                      Amount
                    </TableHead>
                    <TableHead className="text-xs uppercase tracking-wide text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-right text-xs uppercase tracking-wide text-muted-foreground">
                      Invoice
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((t) => (
                    <TransactionRow key={t.id} t={t} />
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Mobile stacked cards */}
            <div className="space-y-3 md:hidden">
              {transactions.map((t) => (
                <TransactionMobileCard key={t.id} t={t} />
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function TransactionRow({ t }: { t: Transaction }) {
  const refunded = t.status === "Refunded";
  const failed = t.status === "Failed";
  const signedAmount = refunded ? -Math.abs(t.amount) : t.amount;

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
        {formatDate(t.date)}
      </TableCell>
      <TableCell className="text-sm font-medium text-navy">
        {t.description}
      </TableCell>
      <TableCell
        className={`whitespace-nowrap text-right text-sm font-600 ${
          refunded
            ? "text-rose-600"
            : failed
              ? "text-muted-foreground"
              : "text-navy"
        }`}
      >
        {formatCurrency(signedAmount)}
      </TableCell>
      <TableCell>
        <StatusBadge status={t.status} />
      </TableCell>
      <TableCell className="text-right">
        <InvoiceDownload />
      </TableCell>
    </TableRow>
  );
}

function TransactionMobileCard({ t }: { t: Transaction }) {
  const refunded = t.status === "Refunded";
  const failed = t.status === "Failed";
  const signedAmount = refunded ? -Math.abs(t.amount) : t.amount;

  return (
    <div className="rounded-xl border border-border bg-card/60 p-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-600 text-navy">
            {t.description}
          </p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {formatDate(t.date)}
          </p>
        </div>
        <StatusBadge status={t.status} />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span
          className={`text-sm font-700 ${
            refunded
              ? "text-rose-600"
              : failed
                ? "text-muted-foreground"
                : "text-navy"
          }`}
        >
          {formatCurrency(signedAmount)}
        </span>
        <InvoiceDownload />
      </div>
    </div>
  );
}

function InvoiceDownload() {
  return (
    <button
      type="button"
      onClick={() => toast.success("Invoice downloaded")}
      className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-teal transition-colors hover:bg-teal/5 hover:text-teal/80"
      aria-label="Download invoice"
    >
      <FileText className="size-3.5" />
      <span className="hidden sm:inline">Download</span>
    </button>
  );
}
