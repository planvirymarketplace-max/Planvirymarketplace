import { User } from "lucide-react";

import { db } from "@/lib/db";
import { PageHeader } from "@/components/portal/page-header";
import {
  ProfileForm,
  type Guest,
} from "@/components/portal/profile/profile-form";
import { SecurityCard } from "@/components/portal/profile/security-card";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const guest = await db.guest.findFirst();

  if (!guest) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Profile"
          description="Manage your account details"
          icon={User}
        />
        <div className="rounded-xl border border-dashed border-border bg-card/50 px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No guest profile found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Profile"
        description="Manage your account details"
        icon={User}
      />
      <ProfileForm guest={guest as Guest} />
      <SecurityCard twoFactor={guest.twoFactor} />
    </div>
  );
}
