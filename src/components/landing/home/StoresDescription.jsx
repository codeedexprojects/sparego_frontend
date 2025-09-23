export default function FourStoresSection() {
    const stores = [
    {
      id: 1,
      name: "Tech Repair Hub",
      category: "Electronics & Gadgets",
      demoPrice: "$29.99",
      image: "https://honeywell.scene7.com/is/image/Honeywell65/pmt-hps-marine-spare-parts-portable-gauging-and-sampling-image",
      description: "Professional device repairs and tech solutions"
    },
    {
      id: 2,
      name: "Style Watches",
      category: "Fashion & Accessories",
      demoPrice: "$49.99",
      image: "https://m.media-amazon.com/images/I/616jllf33ZL._UY1000_.jpg",
      description: "Trendy clothing and fashion accessories"
    },
    {
      id: 3,
      name: "Home Appliances",
      category: "Home & Living",
      demoPrice: "$24.99",
      image: "https://cdn.firstcry.com/education/2023/01/13101355/Names-Of-Household-Appliances-In-English.jpg",
      description: "Everything you need for a beautiful home"
    },
    {
      id: 4,
      name: "Latest Styles",
      category: "Mens",
      demoPrice: "$19.99",
      image: "https://img.tatacliq.com/images/i24//437Wx649H/MP000000026546356_437Wx649H_202505110335481.jpeg",
      description: "Professional cleaning products and services"
    },
    {
      id: 5,
      name: "Auto Care Plus",
      category: "Automotive",
      demoPrice: "$89.99",
      image: "https://www.garimaglobal.com/blogs/wp-content/uploads/2024/09/y.png",
      description: "Complete automotive care and accessories"
    },
    {
      id: 6,
      name: "Beauty Box",
      category: "Beauty & Wellness",
      demoPrice: "$34.99",
      image: "https://img.freepik.com/free-vector/realistic-kitchen-utensils_23-2147518394.jpg?semt=ais_hybrid&w=740&q=80",
      description: "Premium beauty and wellness products"
    }
  ];

  return (
   <div className="bg-white">
      <section className="py-16 bg-white">
        <div className="px-6">
          <div className="relative">
            <div className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory">
              {stores.map((store) => (
                <div 
                  key={store.id}
                  className="flex-none w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 snap-start group hover:-translate-y-3 overflow-hidden"
                >
                  {/* Image Section */}
                  <div className="relative h-48 bg-gradient-to-br from-red-50 to-red-100 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                    <img 
                      src={store.image} 
                      alt={store.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                        {store.category}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    {/* Title */}
                    <h4 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {store.name}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {store.description}
                    </p>

                    {/* Price and Button Section */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wide">Starting from</span>
                        <span className="text-2xl font-bold text-red-600">
                          {store.demoPrice}
                        </span>
                      </div>
                      
                      <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                        Explore
                      </button>
                    </div>

                    {/* Bottom Border Accent */}
                    <div className="mt-4 h-1 bg-gradient-to-r from-red-600 to-red-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
        <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-8 leading-tight">
            Four Specialized Stores. One Easy Access.
          </h2>
          
          <p className="text-gray-700 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
            Why search across multiple platforms when everything you need is under one roof? Our 
            platform connects you to four unique shopping experiences, each dedicated to quality, 
            authenticity, and service. Whether you're fixing, upgrading, styling, or cleaning — we 
            bring the best of every category together.
          </p>
        </div>
      </section>
    </div>
  );
}