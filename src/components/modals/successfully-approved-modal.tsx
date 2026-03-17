import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

interface SuccessfullyApprovedModalProps {
  title: string;
  desc: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuccessfullyApprovedModal: React.FC<SuccessfullyApprovedModalProps> = ({
  title,
  desc,
  open,
  onOpenChange,
}) => {
  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-white !rounded-[12px]">
          <DialogHeader>
            <div className="flex items-center justify-center pb-3">
              <div className="p-[10px] bg-[#E6E6E6] rounded-full">
                <div className="p-[10px] bg-[#CCCCCC] rounded-full">
                  <div className="p-[6px] bg-[#6A93B6] rounded-full flex items-center justify-center">
                    <Check className="w-[35px] h-[35px] text-white" />
                  </div>
                </div>
              </div>
            </div>
            <DialogTitle className="text-center text-black text-2xl md:text-[28px] lg:text-[32px] font-semibold leading-normal">
              {title}
            </DialogTitle>
            <DialogDescription className="text-center text-black text-lg md:text-xl font-normal leading-normal pt-1 pb-6 md:pb-7 lg:pb-8">
              {desc}
            </DialogDescription>
            <div className="w-full flex items-center justify-center">
              <Link href="/login">
              <Button className="w-full h-[48px] bg-primary text-white py-[13px] px-10 md:px-14 rounded-full text-lg font-bold leading-normal">
                Back to Login
              </Button>
            </Link>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessfullyApprovedModal;