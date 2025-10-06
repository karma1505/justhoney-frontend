"use client";
import Link from 'next/link';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="bg-navy text-white mt-auto py-12 -mb-[10px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">About JustHoney</h3>
            <p className="text-sm mb-4">
              Based in Pune, we&apos;re committed to delivering pure, unadulterated honey 
              straight from local apiaries.
            </p>
            <div className="flex space-x-4">
              <Link href="https://x.com" target="_blank" className="hover:text-gold">
                <FontAwesomeIcon icon={faXTwitter} className="h-7 w-7" />
              </Link>
              <Link href="https://facebook.com" target="_blank" className="hover:text-gold">
                <FontAwesomeIcon icon={faFacebook} className="h-7 w-7" />
              </Link>
              <Link href="https://www.instagram.com/justhoney.india?igsh=dzI0eG53M2IwcXJi" target="_blank" className="hover:text-gold">
                <FontAwesomeIcon icon={faInstagram} className="h-7 w-7" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about/" className="hover:text-gold">Our Story</Link></li>
              <li><Link href="/shop" className="hover:text-gold">Shop</Link></li>
              <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-gold">FAQ</Link></li>
              <li><Link href="#" className="hover:text-gold">Wholesale Inquiry</Link></li>
            </ul>
          </div>

          {/* Contact & Policies */}
          <div>
            <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2" />
                <Link href="mailto:madhu@justhoney.co.in" className="hover:text-gold">
                  madhu@justhoney.co.in
                </Link>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2" />
                <Link href="tel:+918588998900" className="hover:text-gold">
                  +91 85889-98900
                </Link>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h4 className="font-semibold mb-2">Policies</h4>
              <div className="space-y-2 text-sm">
                <Link href="/JustHoney_Privacy_Policy.pdf" className="block hover:text-gold">Privacy Policy</Link>
                <Link href="/JustHoney_Terms_And_Conditions.pdf" className="block hover:text-gold">Terms & Conditions</Link>
                <Link href="/JustHoney_Returns_Policy.pdf" className="block hover:text-gold">Returns Policy</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} JustHoney. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}