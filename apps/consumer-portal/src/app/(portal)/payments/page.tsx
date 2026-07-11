import { CreditCard } from "lucide-react";

import { db } from "@/lib/db";
import { PageHeader } from "@/components/portal/page-header";
import {
  PaymentMethodsCard,
  type PaymentMethod,
} from "@/components/portal/payment/payment-methods-card";
import {
  TransactionsCard,
  type Transaction,
} from "@/components/portal/payment/transactions-card";

export const dynamic = "force-dynamic";

export default async function PaymentsPage() {
  const [methods, transactions] = await Promise.all([
    db.paymentMethod.findMany({
      orderBy: [{ isDefault: "desc" }, { createdAt: "desc" }],
    }),
    db.transaction.findMany({ orderBy: { date: "desc" } }),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments"
        description="Methods, transactions & invoices"
        icon={CreditCard}
      />
      <PaymentMethodsCard methods={methods as PaymentMethod[]} />
      <TransactionsCard transactions={transactions as Transaction[]} />
    </div>
  );
}
