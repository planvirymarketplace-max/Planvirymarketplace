"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function TicketReplyBox({ ticketId }: { ticketId: string }) {
  const router = useRouter();
  const [text, setText] = React.useState("");
  const [sending, setSending] = React.useState(false);

  async function send(e?: React.FormEvent) {
    e?.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    setSending(true);
    try {
      const res = await fetch(`/api/support/${ticketId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed, author: "guest" }),
      });
      if (!res.ok) throw new Error("Failed");
      setText("");
      toast.success("Reply sent");
      router.refresh();
    } catch {
      toast.error("Could not send reply");
    } finally {
      setSending(false);
    }
  }

  return (
    <form
      onSubmit={send}
      className="space-y-2 rounded-xl border border-border bg-card p-3"
    >
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a reply…"
        rows={3}
        maxLength={4000}
        onKeyDown={(e) => {
          // Enter to send, Shift+Enter for a newline (per spec).
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            void send();
          }
        }}
        aria-label="Reply message"
      />
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Press <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px]">↵</kbd>{" "}
          to send ·{" "}
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px]">Shift</kbd>{" "}
          <kbd className="rounded bg-muted px-1.5 py-0.5 text-[10px]">↵</kbd> for
          newline
        </p>
        <Button
          type="submit"
          disabled={sending || !text.trim()}
          className="bg-teal text-white hover:bg-teal/90"
        >
          {sending ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          Send
        </Button>
      </div>
    </form>
  );
}
