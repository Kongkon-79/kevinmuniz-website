"use client";

import { LoaderCircle } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CampaignStatusModalProps = {
  isOpen: boolean;
  isClosing: boolean;
  isPending: boolean;
  campaignTitle: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function CampaignStatusModal({
  isOpen,
  isClosing,
  isPending,
  campaignTitle,
  onClose,
  onConfirm,
}: CampaignStatusModalProps) {
  const title = isClosing ? "Close this campaign?" : "Open this campaign?";
  const description = isClosing
    ? `This will stop new support on "${campaignTitle}" and mark it as closed.`
    : `This will reopen "${campaignTitle}" and make it available again based on its approval status.`;
  const confirmLabel = isClosing ? "Yes, Close Campaign" : "Yes, Open Campaign";

  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="max-w-[92%] border-[#E7DFFF] bg-white p-0 sm:max-w-[460px]">
        <div className="h-1.5 w-full rounded-t-[12px] bg-gradient-to-r from-[#8C5CFF] to-[#2EABFC]" />
        <div className="space-y-6 p-6">
          <DialogHeader className="space-y-3 text-left">
            <DialogTitle className="text-2xl font-bold text-[#111827]">
              {title}
            </DialogTitle>
            <DialogDescription className="text-sm leading-6 text-[#5C5C5C]">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div
            className={`rounded-[18px] border p-4 ${
              isClosing
                ? "border-[#FFD9D6] bg-[#FFF6F5]"
                : "border-[#D9F5E6] bg-[#F4FCF8]"
            }`}
          >
            <p className="text-sm font-semibold text-[#111827]">{campaignTitle}</p>
            <p className="mt-1 text-xs text-[#6B7280]">
              {isClosing
                ? "You can reopen it later from this page."
                : "If the campaign is accepted, it will become active again."}
            </p>
          </div>

          <DialogFooter className="flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="h-12 rounded-full border border-[#D9CCFF] px-6 text-sm font-semibold text-[#6B46FF] transition-colors hover:bg-[#F7F3FF] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isPending}
              className={`flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                isClosing
                  ? "bg-[#EF4444] hover:bg-[#DC2626]"
                  : "bg-[#0E9F6E] hover:bg-[#0C8A61]"
              }`}
            >
              {isPending ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                confirmLabel
              )}
            </button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
