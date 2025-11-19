
import React, { use } from "react";
import { FiSearch, FiLayers, FiUsers, FiRadio, FiRepeat, FiTrendingUp } from "react-icons/fi";
import { AuthContext } from "../providers/AuthContext";

export default function Extra_1() {
  const {toggle} =use(AuthContext)
  const light = toggle === true
  const features = [
    {
      icon: <FiLayers className="text-blue-400 text-3xl" />,
      title: "Project Milestones",
      desc: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
    },
    {
      icon: <FiUsers className="text-blue-400 text-3xl" />,
      title: "Team Views",
      desc: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
    },
    {
      icon: <FiSearch className="text-blue-400 text-3xl" />,
      title: "Advanced Search",
      desc: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
    },
    {
      icon: <FiRadio className="text-blue-400 text-3xl" />,
      title: "Strategic Initiatives",
      desc: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
    },
    {
      icon: <FiRepeat className="text-blue-400 text-3xl" />,
      title: "Flexible Workflows",
      desc: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
    },
    {
      icon: <FiTrendingUp className="text-blue-400 text-3xl" />,
      title: "Unified Timeline",
      desc: "Track progress across custom flows for your team. Find the right balance for the user, privacy and security.",
    },
  ];

  return (
    <div className=" text-white py-16 px-6">
      <h1 className={`text-4xl ${light ? "text-black":"text-white"} text-center my-5 font-bold`}>Extra-1</h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {features.map((f, i) => (
          <div key={i} className={`space-y-3 rounded-2xl shadow-2xl p-5 hover:scale-90 transition-all outline-1 outline-[#FF5A0A]`}>
            <div>{f.icon}</div>
            <h3 className={`text-xl font-semibold ${light ? "text-black":"text-white"} `}>{f.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
