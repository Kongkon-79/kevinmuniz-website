"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

const PrivacyPolicyContainer = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["privacy-policy"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/cms/privacy_policy`,
      );
      if (!res.ok) throw new Error("Failed to fetch Terms & Conditions");
      return res.json();
    },
  });

  const description = data?.data?.description;

  // ✅ Professional Loading UI
  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black"></div>
          <p className="text-gray-500 text-sm">Loading Terms & Conditions...</p>
        </div>
      </div>
    );
  }

  // ✅ Professional Error UI
  if (isError) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-lg text-center max-w-md">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm mb-3">
            {(error as Error).message || "Failed to load content"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main Content
  return (
    <div className="container px-4 py-10 md:py-14 lg:py-20">
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default PrivacyPolicyContainer;
