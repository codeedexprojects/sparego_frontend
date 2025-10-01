export default function WhyChooseUs() {
  const features = [
    {
      id: 1,
      title: "All-in-One Access",
      description: "Four stores, one login",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
        </svg>
      )
    },
    {
      id: 2,
      title: "Trusted Quality",
      description: "Verified products from reliable sources",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 15l3.5-3.5L12 8l-3.5 3.5L12 15z"/>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22L12 18.77L5.82 22L7 14.14l-5-4.87 6.91-1.01L12 2z"/>
        </svg>
      )
    },
    {
      id: 3,
      title: "Fast Shipping",
      description: "Speedy and safe delivery nationwide",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13" rx="2"/>
          <path d="m16 16 2 2 4-4"/>
          <path d="M7 13h3"/>
          <path d="M7 9h8"/>
          <path d="m16 8 2-2 2 2"/>
        </svg>
      )
    },
    {
      id: 4,
      title: "Secure Payments",
      description: "Shop with confidence",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
          <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose Us
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-red-50 transition-colors duration-300">
                <div className="text-red-600">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}