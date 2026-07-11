"use client";

import * as React from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Inbox as InboxIcon,
  Search,
  Send,
  Loader2,
  ArrowLeft,
  MessageSquareReply,
  ChevronDown,
  Lightbulb,
  AlertCircle,
  Ticket as TicketIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { PageHeader } from "@/components/portal/page-header";
import { EmptyState } from "@/components/portal/empty-state";
import { usePortalCounts } from "@/hooks/use-portal-data";
import {
  CANNED_QUESTIONS,
  relativeTime,
  formatTime,
} from "@/lib/constants";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types — mirror the API contract (dates are ISO strings after `ser()`)
// ---------------------------------------------------------------------------

type Message = {
  id: string;
  threadId: string;
  sender: string; // "guest" | "vendor"
  text: string;
  createdAt: string;
};

type Thread = {
  id: string;
  vendorName: string;
  vendorAvatar: string | null;
  reservationId: string | null;
  reservationTitle: string | null;
  lastMessage: string;
  lastMessageAt: string;
  unread: boolean;
  createdAt: string;
  messages?: Message[];
};

type FilterTab = "all" | "unread" | "vendors";

const FILTER_TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "unread", label: "Unread" },
  { value: "vendors", label: "Vendors" },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function InboxPage() {
  const { refresh } = usePortalCounts();

  const [threads, setThreads] = React.useState<Thread[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  const [filter, setFilter] = React.useState<FilterTab>("all");
  const [search, setSearch] = React.useState("");

  const [activeThreadId, setActiveThreadId] = React.useState<string | null>(null);
  const [activeThread, setActiveThread] = React.useState<Thread | null>(null);
  const [loadingThread, setLoadingThread] = React.useState(false);

  const [reply, setReply] = React.useState("");
  const [sending, setSending] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const replyRef = React.useRef<HTMLTextAreaElement>(null);

  // ----- Fetch thread list -----
  const fetchThreads = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/messages", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load inbox");
      const data = (await res.json()) as Thread[];
      setThreads(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load your inbox");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchThreads();
  }, [fetchThreads]);

  // ----- Derived: filtered thread list -----
  const filteredThreads = React.useMemo(() => {
    let list = threads;
    if (filter === "unread") list = list.filter((t) => t.unread);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.vendorName.toLowerCase().includes(q) ||
          (t.reservationTitle?.toLowerCase().includes(q) ?? false)
      );
    }
    return list;
  }, [threads, filter, search]);

  const unreadCount = React.useMemo(
    () => threads.filter((t) => t.unread).length,
    [threads]
  );

  // ----- Select a thread → fetch full messages (also marks read) -----
  const selectThread = React.useCallback(
    async (id: string) => {
      setActiveThreadId(id);
      setLoadingThread(true);
      setReply("");
      try {
        const res = await fetch(`/api/messages/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load thread");
        const data = (await res.json()) as Thread;
        setActiveThread(data);

        // Update local unread state + refresh counts if was unread
        let wasUnread = false;
        setThreads((prev) =>
          prev.map((t) => {
            if (t.id === id && t.unread) {
              wasUnread = true;
              return { ...t, unread: false };
            }
            return t;
          })
        );
        if (wasUnread) void refresh();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Could not load thread");
      } finally {
        setLoadingThread(false);
      }
    },
    [refresh]
  );

  // ----- Scroll to bottom on thread change / new message -----
  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [activeThreadId, activeThread?.messages?.length, loadingThread]);

  // ----- Send reply -----
  const onSend = React.useCallback(async () => {
    if (!activeThreadId) return;
    const text = reply.trim();
    if (!text) return;
    setReply("");
    setSending(true);

    const optimisticId = `tmp-${Date.now()}`;
    const optimisticMsg: Message = {
      id: optimisticId,
      threadId: activeThreadId,
      sender: "guest",
      text,
      createdAt: new Date().toISOString(),
    };

    // Optimistic local append
    setActiveThread((prev) =>
      prev
        ? {
            ...prev,
            messages: [...(prev.messages ?? []), optimisticMsg],
            lastMessage: text,
            lastMessageAt: optimisticMsg.createdAt,
          }
        : prev
    );
    setThreads((prev) =>
      prev.map((t) =>
        t.id === activeThreadId
          ? {
              ...t,
              lastMessage: text,
              lastMessageAt: optimisticMsg.createdAt,
              unread: false,
            }
          : t
      )
    );

    try {
      const res = await fetch(`/api/messages/${activeThreadId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, sender: "guest" }),
      });
      if (!res.ok) throw new Error("Send failed");
      const realMsg = (await res.json()) as Message;
      // Swap optimistic message for the real one
      setActiveThread((prev) =>
        prev
          ? {
              ...prev,
              messages: (prev.messages ?? []).map((m) =>
                m.id === optimisticId ? realMsg : m
              ),
            }
          : prev
      );
    } catch {
      toast.error("Could not send message");
      // Revert optimistic message
      setActiveThread((prev) =>
        prev
          ? {
              ...prev,
              messages: (prev.messages ?? []).filter((m) => m.id !== optimisticId),
            }
          : prev
      );
      setReply(text); // restore the unsent text
    } finally {
      setSending(false);
      // Re-focus the reply field
      requestAnimationFrame(() => replyRef.current?.focus());
    }
  }, [activeThreadId, reply]);

  // ----- Canned question shortcut -----
  const onPickCanned = (q: string) => {
    setReply(q);
    requestAnimationFrame(() => {
      replyRef.current?.focus();
      // Move cursor to end
      const el = replyRef.current;
      if (el) {
        const len = el.value.length;
        el.setSelectionRange(len, len);
      }
    });
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void onSend();
    }
  };

  // ----- Render -----
  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Inbox"
          description="Message your vendors"
          icon={InboxIcon}
        />
        <InboxSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Inbox"
          description="Message your vendors"
          icon={InboxIcon}
        />
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-200 bg-card px-6 py-12 text-center dark:border-rose-900">
          <AlertCircle className="size-8 text-rose-500" />
          <div>
            <p className="font-display font-600 text-navy">
              We couldn&apos;t load your inbox
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => void fetchThreads()} className="bg-teal text-white hover:bg-teal/90">
            Try again
          </Button>
        </div>
      </div>
    );
  }

  if (threads.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Inbox"
          description="Message your vendors"
          icon={InboxIcon}
        />
        <EmptyState
          icon={InboxIcon}
          title="No messages yet"
          description="When you book a reservation, your vendor conversations will appear here."
          action={
            <Button asChild className="bg-teal text-white hover:bg-teal/90">
              <Link href="/reservations">View reservations</Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inbox"
        description="Message your vendors"
        icon={InboxIcon}
        actions={
          unreadCount > 0 ? (
            <Badge className="bg-teal/10 text-teal hover:bg-teal/15">
              {unreadCount} unread
            </Badge>
          ) : undefined
        }
      />

      <div className="grid h-[600px] grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:h-[calc(100vh-220px)] lg:grid-cols-[340px_1fr]">
        {/* ---------------- LEFT PANEL — Thread list ---------------- */}
        <aside
          className={cn(
            "flex min-h-0 flex-col border-border",
            "lg:border-r",
            activeThreadId ? "hidden lg:flex" : "flex"
          )}
          aria-label="Conversation list"
        >
          {/* Filter tabs + search */}
          <div className="space-y-3 border-b border-border p-3">
            <Tabs
              value={filter}
              onValueChange={(v) => setFilter(v as FilterTab)}
            >
              <TabsList className="w-full">
                {FILTER_TABS.map((t) => (
                  <TabsTrigger key={t.value} value={t.value} className="flex-1">
                    {t.label}
                    {t.value === "unread" && unreadCount > 0 && (
                      <span className="ml-1.5 rounded-full bg-teal px-1.5 text-[10px] font-bold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            <div className="relative">
              <label htmlFor="inbox-search" className="sr-only">
                Search threads by vendor name or reservation title
              </label>
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="inbox-search"
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search…"
                className="h-8 pl-8"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Thread list — scrollable */}
          <div
            className="min-h-0 flex-1 overflow-y-auto"
            role="listbox"
            aria-label="Threads"
          >
            {filteredThreads.length === 0 ? (
              <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                No threads match your filters.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {filteredThreads.map((t) => {
                  const isActive = activeThreadId === t.id;
                  return (
                    <li key={t.id} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onClick={() => void selectThread(t.id)}
                        className={cn(
                          "flex w-full items-start gap-3 px-3 py-3 text-left transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none",
                          isActive && "bg-teal/5"
                        )}
                        aria-current={isActive ? "true" : undefined}
                      >
                        <Avatar className="size-10 shrink-0 border border-border">
                          {t.vendorAvatar && (
                            <AvatarImage src={t.vendorAvatar} alt={t.vendorName} />
                          )}
                          <AvatarFallback className="bg-teal/10 text-xs font-semibold text-teal">
                            {initials(t.vendorName)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p
                              className={cn(
                                "truncate text-sm",
                                t.unread
                                  ? "font-700 text-navy"
                                  : "font-600 text-foreground"
                              )}
                            >
                              {t.vendorName}
                            </p>
                            <span className="shrink-0 text-[10px] text-muted-foreground">
                              {relativeTime(t.lastMessageAt)}
                            </span>
                          </div>
                          {t.reservationTitle && (
                            <p className="mt-0.5 truncate text-[11px] font-medium text-teal">
                              {t.reservationTitle}
                            </p>
                          )}
                          <div className="mt-1 flex items-center gap-2">
                            <p
                              className={cn(
                                "min-w-0 flex-1 truncate text-xs",
                                t.unread
                                  ? "font-medium text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              {t.lastMessage}
                            </p>
                            {t.unread && (
                              <span
                                className="size-2 shrink-0 rounded-full bg-teal"
                                aria-label="Unread"
                              />
                            )}
                          </div>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>

        {/* ---------------- RIGHT PANEL — Conversation ---------------- */}
        <section
          className={cn(
            "flex min-h-0 flex-col bg-background",
            activeThreadId ? "flex" : "hidden lg:flex"
          )}
          aria-label="Conversation"
        >
          {activeThreadId && activeThread ? (
            <ConversationPanel
              thread={activeThread}
              loadingThread={loadingThread}
              onBack={() => {
                setActiveThreadId(null);
                setActiveThread(null);
              }}
              reply={reply}
              setReply={setReply}
              onSend={onSend}
              sending={sending}
              onKeyDown={onKeyDown}
              onPickCanned={onPickCanned}
              replyRef={replyRef}
              messagesEndRef={messagesEndRef}
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8">
              <div className="max-w-sm text-center">
                <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-teal/10 text-teal">
                  <MessageSquareReply className="size-7" />
                </div>
                <h3 className="font-display text-lg font-600 text-navy">
                  Select a conversation
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Choose a thread from the list to read and reply to messages
                  with your vendor.
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Conversation panel — header + message list + reply box
// ---------------------------------------------------------------------------

function ConversationPanel({
  thread,
  loadingThread,
  onBack,
  reply,
  setReply,
  onSend,
  sending,
  onKeyDown,
  onPickCanned,
  replyRef,
  messagesEndRef,
}: {
  thread: Thread;
  loadingThread: boolean;
  onBack: () => void;
  reply: string;
  setReply: (v: string) => void;
  onSend: () => void;
  sending: boolean;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onPickCanned: (q: string) => void;
  replyRef: React.RefObject<HTMLTextAreaElement | null>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}) {
  const messages = thread.messages ?? [];
  return (
    <>
      {/* Header — vendor + reservation card */}
      <header className="border-b border-border p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onBack}
            aria-label="Back to thread list"
          >
            <ArrowLeft className="size-5" />
          </Button>

          <Avatar className="size-10 shrink-0 border border-border">
            {thread.vendorAvatar && (
              <AvatarImage src={thread.vendorAvatar} alt={thread.vendorName} />
            )}
            <AvatarFallback className="bg-teal/10 text-xs font-semibold text-teal">
              {initials(thread.vendorName)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <h2 className="truncate font-display text-base font-600 text-navy">
              {thread.vendorName}
            </h2>
            <p className="text-xs text-muted-foreground">
              Active {relativeTime(thread.lastMessageAt)}
            </p>
          </div>
        </div>

        {thread.reservationTitle && (
          <Link
            href="/reservations"
            className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-muted/30 p-2 transition-colors hover:border-teal/40 hover:bg-teal/5"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-teal/10 text-teal">
              <TicketIcon className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                Reservation
              </p>
              <p className="truncate text-xs font-600 text-foreground">
                {thread.reservationTitle}
              </p>
            </div>
            <span className="text-[11px] font-medium text-teal">View</span>
          </Link>
        )}
      </header>

      {/* Messages — scrollable */}
      <div
        className="min-h-0 flex-1 overflow-y-auto p-3 sm:p-4"
        aria-live="polite"
        aria-label="Messages"
      >
        {loadingThread ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  i % 2 === 0 ? "justify-start" : "justify-end"
                )}
              >
                <Skeleton
                  className={cn(
                    "h-12 rounded-2xl",
                    i % 2 === 0 ? "w-2/3" : "w-1/2"
                  )}
                />
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center text-sm text-muted-foreground">
            <div>
              <p className="font-medium">No messages yet</p>
              <p className="mt-1 text-xs">Say hello to start the conversation.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => {
              const isGuest = m.sender === "guest";
              return (
                <div
                  key={m.id}
                  className={cn(
                    "flex flex-col",
                    isGuest ? "items-end" : "items-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm shadow-sm sm:max-w-[75%]",
                      isGuest
                        ? "rounded-br-sm bg-teal text-white"
                        : "rounded-bl-sm bg-muted text-foreground"
                    )}
                  >
                    <p className="whitespace-pre-wrap break-words">{m.text}</p>
                  </div>
                  <p
                    className={cn(
                      "mt-1 px-1 text-[10px] text-muted-foreground",
                      isGuest ? "text-right" : "text-left"
                    )}
                  >
                    {formatTime(m.createdAt)}
                    {isGuest && " · You"}
                  </p>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Reply box */}
      <div className="border-t border-border p-3 sm:p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <Label
            htmlFor="reply"
            className="text-xs font-semibold uppercase tracking-wide text-muted-foreground"
          >
            Reply
          </Label>

          {/* Canned questions dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-7 gap-1.5 text-xs text-muted-foreground hover:text-teal"
                aria-label="Insert a canned question"
              >
                <Lightbulb className="size-3.5" />
                <span className="hidden sm:inline">Quick questions</span>
                <ChevronDown className="size-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel>Common questions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {CANNED_QUESTIONS.map((q) => (
                <DropdownMenuItem
                  key={q}
                  onSelect={() => onPickCanned(q)}
                  className="cursor-pointer text-sm"
                >
                  {q}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-end gap-2">
          <Textarea
            id="reply"
            ref={replyRef}
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type your message…"
            rows={2}
            className="min-h-[44px] flex-1 resize-none"
            autoComplete="off"
            disabled={sending}
            aria-describedby="reply-help"
          />
          <Button
            type="button"
            size="icon"
            className="h-11 w-11 shrink-0 bg-teal text-white hover:bg-teal/90"
            onClick={() => void onSend()}
            disabled={sending || !reply.trim()}
            aria-label="Send message"
          >
            {sending ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>
        <p id="reply-help" className="mt-1.5 text-[11px] text-muted-foreground">
          Press <kbd className="rounded border border-border bg-muted px-1 text-[10px]">Enter</kbd>{" "}
          to send,{" "}
          <kbd className="rounded border border-border bg-muted px-1 text-[10px]">Shift</kbd>
          {" + "}
          <kbd className="rounded border border-border bg-muted px-1 text-[10px]">Enter</kbd>{" "}
          for a new line.
        </p>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Loading skeleton
// ---------------------------------------------------------------------------

function InboxSkeleton() {
  return (
    <div className="grid h-[600px] grid-cols-1 overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:h-[calc(100vh-220px)] lg:grid-cols-[340px_1fr]">
      <aside className="hidden flex-col border-r border-border lg:flex">
        <div className="space-y-3 border-b border-border p-3">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="flex-1 space-y-2 p-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="size-10 shrink-0 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </aside>
      <section className="flex flex-col">
        <div className="border-b border-border p-4">
          <Skeleton className="h-10 w-1/2" />
        </div>
        <div className="flex-1 space-y-3 p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                i % 2 === 0 ? "justify-start" : "justify-end"
              )}
            >
              <Skeleton
                className={cn(
                  "h-12 rounded-2xl",
                  i % 2 === 0 ? "w-2/3" : "w-1/2"
                )}
              />
            </div>
          ))}
        </div>
        <div className="border-t border-border p-4">
          <Skeleton className="h-16 w-full" />
        </div>
      </section>
    </div>
  );
}
