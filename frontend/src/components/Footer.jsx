import React, { useEffect, useState } from "react";

function Footer() {
  const year = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    const footer = document.getElementById("footer");
    if (footer) observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { name: "LinkedIn", icon: "in", url: "#" },
    { name: "Twitter", icon: "🐦", url: "#" },
    { name: "GitHub", icon: "💻", url: "#" },
  ];

  return (
    <footer
      id="footer"
      className="relative bg-gray-50 border-t border-gray-200 overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22footer-grid%22 width=%2260%22 height=%2260%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 60 0 L 0 0 0 60%22 fill=%22none%22 stroke=%22%2300a1b0%22 stroke-width=%220.5%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23footer-grid)%22 /%3E%3C/svg%3E')",
          }}
        ></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto w-[92%] max-w-6xl">
        <div className="flex flex-col gap-12 py-16 md:flex-row md:items-start md:justify-between">
          {/* Brand Section */}
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "-translate-x-10 opacity-0"
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-xl font-bold text-white">R</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Rent SaaS</h3>
            </div>
            <p className="mt-4 max-w-md text-sm text-gray-600 leading-relaxed">
              Discover flexible software rentals for teams and founders. Scale
              faster with tools that match your growth.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="w-9 h-9 bg-white border border-gray-300 rounded-lg flex items-center justify-center transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-50 hover:shadow-sm"
                  aria-label={social.name}
                >
                  <span className="text-gray-600 transition-colors duration-300 group-hover:text-cyan-600">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-2 gap-12 text-sm sm:grid-cols-3">
            {[
              {
                title: "Navigate",
                links: [
                  { name: "Home", href: "#home" },
                  { name: "About", href: "#about" },
                  { name: "Contact", href: "#contact" },
                ],
              },
              {
                title: "Company",
                links: [
                  { name: "Privacy Policy", href: "#" },
                  { name: "Terms of Service", href: "#" },
                  { name: "Careers", href: "#" },
                ],
              },
              {
                title: "Support",
                links: [
                  { name: "Help Center", href: "#" },
                  { name: "FAQs", href: "#" },
                  { name: "Contact Us", href: "#" },
                ],
              },
            ].map((section, idx) => (
              <div
                key={section.title}
                className={`space-y-4 transform transition-all duration-700 delay-${
                  idx * 100
                } ease-out ${
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
              >
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                  {section.title}
                </h4>
                <div className="space-y-3">
                  {section.links.map((link) => (
                    <a
                      key={link.name}
                      className="block text-gray-500 transition-all duration-300 hover:text-cyan-600 hover:translate-x-1"
                      href={link.href}
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Bar */}
        <div
          className={`py-6 border-t border-gray-200 transform transition-all duration-700 delay-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <a
                href="mailto:support@rentsaas.com"
                className="flex items-center gap-2 text-sm text-gray-600 transition-all duration-300 hover:text-cyan-600 group"
              >
                <svg
                  className="w-4 h-4 transition-colors duration-300 group-hover:text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>support@rentsaas.com</span>
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2 text-sm text-gray-600 transition-all duration-300 hover:text-cyan-600 group"
              >
                <svg
                  className="w-4 h-4 transition-colors duration-300 group-hover:text-cyan-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+1 (555) 123-4567</span>
              </a>
            </div>

            <div className="flex gap-4">
              <span className="text-xs text-gray-400">🚀 Instant access</span>
              <span className="text-xs text-gray-400">✓ No commitments</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className={`py-6 border-t border-gray-200 transform transition-all duration-700 delay-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row">
            <p className="text-xs text-gray-400">
              © {year} Rent SaaS. All rights reserved.
            </p>
            <div className="flex gap-4 text-xs text-gray-400">
              <span>Made for modern teams</span>
              <span className="hidden sm:inline">•</span>
              <span>Enterprise ready</span>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 z-20 w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-50 group"
        style={{
          opacity: 0,
          animation: "fadeInUp 0.6s ease-out forwards",
          animationDelay: "1s",
        }}
      >
        <svg
          className="w-4 h-4 text-gray-600 transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-cyan-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </footer>
  );
}

export default Footer;
