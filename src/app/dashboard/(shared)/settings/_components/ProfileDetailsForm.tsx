"use client";

import { Camera, LoaderCircle, Info } from "lucide-react";
import Image from "next/image";
import { RefObject } from "react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { ProfileFormValues } from "../schema";
import type { UserProfile } from "../types";
import ChangePasswordDialog from "./ChangePasswordDialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProfileDetailsFormProps {
  profile: UserProfile | undefined;
  form: UseFormReturn<ProfileFormValues>;
  isEditing: boolean;
  isSaving: boolean;
  isUploadingAvatar: boolean;
  isPasswordDialogOpen: boolean;
  isChangingPassword: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  cvInputRef: RefObject<HTMLInputElement>;
  isUploadingCV: boolean;
  onEditToggle: () => void;
  onSubmit: (values: ProfileFormValues) => void;
  onAvatarClick: () => void;
  onAvatarChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCVClick: () => void;
  onCVChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordDialogOpenChange: (open: boolean) => void;
  onPasswordSubmit: (values: import("../schema").ChangePasswordFormValues) => void;
  passwordForm: UseFormReturn<import("../schema").ChangePasswordFormValues>;
}

const fieldClassName =
  "h-[52px] rounded-[10px] border border-transparent bg-[#F4F4F4] px-4 text-[16px] text-[#3B3B3B] shadow-none focus-visible:ring-1 focus-visible:ring-[#33BAFF] read-only:cursor-default";

export default function ProfileDetailsForm({
  profile,
  form,
  isEditing,
  isSaving,
  isUploadingAvatar,
  isPasswordDialogOpen,
  isChangingPassword,
  fileInputRef,
  cvInputRef,
  isUploadingCV,
  onEditToggle,
  onSubmit,
  onAvatarClick,
  onAvatarChange,
  onCVClick,
  onCVChange,
  onPasswordDialogOpenChange,
  onPasswordSubmit,
  passwordForm,
}: ProfileDetailsFormProps) {
  const isBacker = profile?.role === "USER";

  return (
    <div className="rounded-[2px] bg-white p-6 md:p-10 shadow-sm">
      <div className="flex flex-col gap-6 border-b border-[#F0F0F0] pb-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative h-[100px] w-[100px] shrink-0 overflow-hidden rounded-full border-2 border-[#DCEEFE]">
            <Image
              src={profile?.profileImage || "/assets/images/autoLogo.png"}
              alt="Profile"
              fill
              sizes="100px"
              className="object-cover"
            />
            <button
              type="button"
              onClick={onAvatarClick}
              disabled={isUploadingAvatar}
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 transition-opacity hover:opacity-100 disabled:opacity-60"
              aria-label="Upload profile image"
            >
              {isUploadingAvatar ? (
                <LoaderCircle className="h-6 w-6 animate-spin" />
              ) : (
                <Camera className="h-6 w-6" />
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarChange}
            />
          </div>

          <div>
            <h2 className="text-[18px] font-semibold text-[#1E1E1E]">
              {profile?.name || "Admin User"}
            </h2>
            <p className="pt-1 text-[16px] text-[#909090]">
              {form.watch("userName") ? `@${form.watch("userName")}` : "@admin"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ChangePasswordDialog
            form={passwordForm}
            isOpen={isPasswordDialogOpen}
            isPending={isChangingPassword}
            onOpenChange={onPasswordDialogOpenChange}
            onSubmit={onPasswordSubmit}
          />

          <Button
            type="button"
            onClick={onEditToggle}
            disabled={isSaving}
            className={`h-[44px] rounded-full border px-6 text-[16px] font-medium transition-all ${isEditing
              ? "border-red-500 bg-white text-red-500 hover:bg-red-50"
              : "bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"
              }`}
          >
            {isEditing ? "Cancel Update" : "Update Profile"}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    User Name
                  </FormLabel>
                  <FormControl>
                    <Input {...field} readOnly className={fieldClassName} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <Label className="text-[16px] font-medium text-[#999999]">
                Email
              </Label>
              <Input
                value={profile?.email || ""}
                readOnly
                className={`${fieldClassName} mt-2`}
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isEditing}
                      className={fieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    Gender
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isEditing}
                      className={fieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    Bio
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isEditing}
                      className={fieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isEditing}
                      className={fieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="cityState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    City/State
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isEditing}
                      className={fieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="roadArea"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    Road/Area
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isEditing}
                      className={fieldClassName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="jobRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    Job Role
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        list="job-roles-list"
                        readOnly={!isEditing}
                        className={fieldClassName}
                        placeholder="e.g. Writer, Producer, Director"
                      />
                      <datalist id="job-roles-list">
                        <option value="Writer" />
                        <option value="Producer" />
                        <option value="Director" />
                        <option value="Actor" />
                        <option value="Cinematographer" />
                        <option value="Editor" />
                        <option value="Sound Designer" />
                        <option value="Production Designer" />
                        <option value="Script Supervisor" />
                        <option value="Casting Director" />
                      </datalist>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imdbLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    IMDb Link (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      readOnly={!isEditing}
                      className={fieldClassName}
                      placeholder="https://imdb.com/name/..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="cv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[16px] font-medium text-[#999999]">
                    CV Document (PDF)
                  </FormLabel>
                  <div className="flex items-center gap-3">
                    <FormControl>
                      <Input
                        {...field}
                        readOnly
                        className={fieldClassName}
                        value={
                          isUploadingCV
                            ? "Uploading..."
                            : (field.value ? field.value.split('/').pop() : '')
                        }
                        placeholder="No file uploaded"
                      />
                    </FormControl>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={!isEditing || isUploadingCV}
                      onClick={onCVClick}
                      className="h-[52px]"
                    >
                      {isUploadingCV ? <LoaderCircle className="h-5 w-5 animate-spin" /> : "Upload"}
                    </Button>
                    <input
                      ref={cvInputRef}
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={onCVChange}
                    />
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isBacker ? (
              <FormField
                control={form.control}
                name="communityStatus"
                render={({ field }) => (
                  <FormItem>
                    <div className="mb-2 flex items-center gap-2">
                      <FormLabel className="text-[16px] font-medium text-[#999999]">
                        Community Status
                      </FormLabel>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button type="button" className="text-gray-400 hover:text-gray-600">
                            <Info className="h-4 w-4" />
                            <span className="sr-only">How it works?</span>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-white">
                          <DialogHeader>
                            <DialogTitle>Community Status</DialogTitle>
                            <DialogDescription className="pt-2 text-[15px] leading-relaxed text-[#5C5C5C]">
                              Set your community profile to <strong>active</strong> to appear on the <strong>Community page</strong>.
                              <br /><br />
                              Set it to <strong>inactive</strong> if you want to hide your profile from community listings.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormControl>
                      <Select
                        value={field.value || "active"}
                        onValueChange={field.onChange}
                        disabled={!isEditing}
                      >
                        <SelectTrigger
                          className={`${fieldClassName} cursor-pointer transition-colors hover:bg-[#EAF6FF] disabled:cursor-not-allowed disabled:hover:bg-[#F4F4F4]`}
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem
                            value="active"
                            className="cursor-pointer transition-colors hover:bg-[#EAF6FF] focus:bg-[#EAF6FF]"
                          >
                            active
                          </SelectItem>
                          <SelectItem
                            value="inactive"
                            className="cursor-pointer transition-colors hover:bg-[#EAF6FF] focus:bg-[#EAF6FF]"
                          >
                            inactive
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <FormField
                control={form.control}
                name="isLive"
                render={({ field }) => (
                  <FormItem className="mt-8 flex h-[52px] flex-row items-center justify-between rounded-lg border border-[#F0F0F0] p-4 shadow-sm">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-[16px] font-medium text-[#1E1E1E]">
                        Community Visibility
                      </FormLabel>
                      <Dialog>
                        <DialogTrigger asChild>
                          <button type="button" className="text-gray-400 hover:text-gray-600">
                            <Info className="h-4 w-4" />
                            <span className="sr-only">How it works?</span>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-white">
                          <DialogHeader>
                            <DialogTitle>Community Visibility</DialogTitle>
                            <DialogDescription className="pt-2 text-[15px] leading-relaxed text-[#5C5C5C]">
                              When this is <strong>enabled</strong>, your professional profile (Name, Job Role, IMDb link, and CV) will be visible to other members on the <strong>Community page</strong>.
                              <br /><br />
                              This helps industry professionals, producers, and fellow writers discover your work and connect with you for potential collaborations.
                              <br /><br />
                              If <strong>disabled</strong>, your profile will remain private and won&apos;t appear in the community listings.
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!isEditing}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end">
              <Button
                type="submit"
                disabled={isSaving}
                className="h-[48px] min-w-[160px] rounded-[10px] bg-[#0052FF] px-8 text-[16px] font-semibold text-white hover:bg-blue-700"
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
