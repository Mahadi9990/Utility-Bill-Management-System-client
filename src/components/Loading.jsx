import React from "react";

export default function Loading() {
  return (
    <div>
      <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="backdrop-blur-xl bg-white/10 p-10 rounded-3xl shadow-2xl flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-xl font-semibold tracking-wide animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
}
