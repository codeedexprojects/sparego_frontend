import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Orders", href: "/orders" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "/help" },
    { name: "Track My Order", href: "/track-order" },
    { name: "Return Policy", href: "/return-policy" },
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms" }
  ];

  return (
    <footer className="bg-black text-white" id="contact">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Logo Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-red-600 font-bold text-xl">SPAREGO</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className=" font-semibold text-lg mb-4 text-[#BE1E2D]">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h3 className="text-[#BE1E2D] font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-red-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="col-span-1">
            <h3 className="text-[#BE1E2D] font-semibold text-lg mb-4">Get in Touch</h3>
            <div className="space-y-4 text-sm">
              
              {/* Address */}
              <div>
                <p className="text-gray-400 mb-1">Address:</p>
                <p className="text-gray-300 leading-relaxed">
                  SPARE GO, Technopark, Kazhakoottam, Kerala<br />
                  695581
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-gray-400 mb-1">Email:</p>
                <Link 
                  href="mailto:support@sparego.in"
                  className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                >
                  support@sparego.in
                </Link>
              </div>

              {/* Phone */}
              <div>
                <p className="text-gray-400 mb-1">Phone:</p>
                <Link 
                  href="tel:+918176543210"
                  className="text-gray-300 hover:text-red-400 transition-colors duration-300"
                >
                  +91 81765 43210
                </Link>
              </div>

              {/* Services */}
              <div>
                <p className="text-gray-400 mb-1">Services:</p>
                <p className="text-gray-300">24/7</p>
              </div>

              {/* Timings */}
              <div>
                <p className="text-gray-400 mb-1">Timings:</p>
                <p className="text-gray-300">Mon - Sat: 9:00 AM - 6:00 PM</p>
              </div>

            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} SPARE GO. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}