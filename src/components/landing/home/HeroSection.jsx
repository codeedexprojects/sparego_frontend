"use client";
import { IMG_URL } from "@/redux/baseUrl";
import { getHomecards } from "@/redux/slices/homeCardSlice";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function HeroSection() {
  const staticCard = [
    {
      _id: "static-1",
      title: "Spare Parts",
      description: "All types of precision spare parts for your vehicles.",
      image: "/landing/spare.png",
      buttonText: "Explore Spare Parts",
      path: "/spare/home",
    },
  ];

  const dispatch = useDispatch();
  const {
    cards = [],
    loading,
    error,
  } = useSelector((state) => state.homecards);

  useEffect(() => {
    dispatch(getHomecards());
  }, [dispatch]);

  const allCards = [...staticCard, ...cards];

  if (loading) {
    return (
      <section className="bg-gray-100 relative overflow-hidden h-[500px] sm:h-[550px] md:h-[600px] lg:h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading carousel...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-100 relative overflow-hidden h-[500px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">
            Error loading carousel:{" "}
            {typeof error === "string"
              ? error
              : error.message || "Unknown error"}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/landing/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
      </div>

      <div
        className="max-w-7xl mx-auto px-2 text-center relative z-10"
        id="home"
      >
        {/* Two Column Layout */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 mt-16">
          {/* LEFT SIDE — Content */}
          <div className="text-left flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-6 leading-tight">
              Your One-Stop Destination for
              <br />
              <span className="text-red-700">Quality, Variety & Value</span>
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              Explore our specialized stores — starting with SpareGo. More
              exciting sections are coming soon with a wide range of products
              and unbeatable value.
            </p>
          </div>

          {/* RIGHT SIDE — Cards (Currently Only SpareGo) */}
          <div className="flex flex-col gap-6">
            {allCards.map((item) => (
              <div
                key={item._id}
                className="group relative w-full max-w-sm mx-auto"
              >
                <div className="bg-gray-800 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border-4 border-gray-700 flex flex-col h-[450px]">
                  {/* Image */}
                  <div className="bg-white mx-4 mt-4 rounded-2xl p-6 flex items-center justify-center h-[220px]">
                    <div className="w-36 h-36 relative">
                      <Image
                        src={
                          item.path ? item.image : `${IMG_URL}/${item.image}`
                        }
                        alt={item.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Title + Desc */}
                  <div className="px-6 py-4 text-white text-center flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Button */}
                  <div className="px-6 pb-6">
                    <Link
                      href={
                        item._id === "static-1"
                          ? "/spare/home"
                          : `/homeappliances/home/${item._id}`
                      }
                      onClick={() => {
                        localStorage.setItem(
                          "sectionId",
                          item._id === "static-1" ? "spare" : item._id
                        );
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                    >
                      {item.buttonText}
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
