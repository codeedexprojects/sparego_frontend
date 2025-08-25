"use client";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const features = [
    {
      id: 1,
      title: "Spare Parts Store",
      description:
        "From automotive components to machinery spares, find genuine, durable parts to keep your machines running smoothly.",
      img: "/landing/image3.png",
      btnText: "Explore parts",
      btnLink: "/spareparts",
    },
    {
      id: 2,
      title: "Cleaning & Home Appliances",
      description:
        "Upgrade your home with innovative cleaning tools and energy-efficient appliances designed to make life easier.",
      img: "/landing/image2.png",
      btnText: "Shop now",
      btnLink: "/appliances",
    },
    {
      id: 3,
      title: "Watches Store",
      description:
        "Discover timeless elegance and modern designs from trusted watchmakers. For every style, occasion, and collection.",
      img: "/landing/image1.png",
      btnText: "Explore Watches",
      btnLink: "/watches",
    },
  ];

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

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-6 leading-tight">
            Your One-Stop Destination for<br />
            <span className="text-red-700">Quality, Variety & Value</span>
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto leading-relaxed">
            Explore our specialized stores — all in one place. From precision spare parts to elegant watches,
            and from modern cleaning solutions to home essentials, we've got you covered.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
          {features.map((item) => (
            <div key={item.id} className="group relative">
              <div className="bg-gray-800 rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 border-4 border-gray-700">
                
                <div className="bg-white mx-4 mt-4 rounded-2xl p-8 flex items-center justify-center min-h-[200px]">
                  <div className="w-20 h-20 relative">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="px-6 py-6 text-white">
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-red-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6 min-h-[4rem]">
                    {item.description}
                  </p>
                </div>

                {/* Button */}
                <div className="px-6 pb-6">
                  <Link
                    href={item.btnLink}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25"
                  >
                    {item.btnText}
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
    </section>
  );
}
