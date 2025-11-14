import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      
      {/* Heading */}
      <h1 className="text-5xl font-bold text-[#FF5A0A] mb-6 text-center">
        About Us
      </h1>

      {/* Subheading */}
      <p className="text-lg text-gray-600 text-center max-w-3xl mb-8">
        Welcome to Utility Bill Management! We help users track and manage
        their utility bills efficiently. Our mission is to provide a seamless
        experience for managing bills and payments.
      </p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {[
          { title: "Our Mission", desc: "Simplify bill management for everyone." },
          { title: "Our Vision", desc: "Empower users to take control of their utilities." },
          { title: "Our Values", desc: "Transparency, Efficiency, and Security." }
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer"
          >
            <h3 className="text-xl font-semibold mb-2 text-[#FF5A0A]">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
