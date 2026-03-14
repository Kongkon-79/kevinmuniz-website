import React from "react";

export default function BackerOverview() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Backer Dashboard</h1>
      <p className="mt-2 text-balance text-sm text-gray-500">
        Welcome back! View your historical support and find new projects that
        match your interests.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-400">Total Donated</h3>
          <p className="mt-1 text-2xl font-bold">$0.00</p>
        </div>
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-gray-400">
            Supported Projects
          </h3>
          <p className="mt-1 text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
}
