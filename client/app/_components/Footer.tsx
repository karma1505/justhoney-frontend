"use client";
export default function Footer() {
    return (
      <footer className="bg-navy text-white mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-bold mb-4">About JustHoney</h3>
              <p className="text-sm">
                Based in Pune, we're committed to delivering pure, unadulterated honey straight from local apiaries.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/about" className="hover:text-amber-50">Our Story</a></li>
                <li><a href="/shop" className="hover:text-amber-50">Shop</a></li>
                <li><a href="/contact" className="hover:text-amber-50">Contact</a></li>
              </ul>
            </div>
  
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="text-sm">Email: info@justhoney.in</p>
              <p className="text-sm">Phone: +91 8588998900</p>
            </div>
          </div>
          
          <div className="border-t border-amber-100 mt-8 pt-4 text-center">
            <p className="text-sm">
              © {new Date().getFullYear()} JustHoney. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    )
  }