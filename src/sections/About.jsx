import React, { useEffect, useRef, useState } from "react";

function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex flex-col items-center justify-center min-h-screen bg-white px-4 py-16 md:px-8"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22grid%22 width=%2260%22 height=%2260%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 60 0 L 0 0 0 60%22 fill=%22none%22 stroke=%22%2300a1b0%22 stroke-width=%220.5%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23grid)%22 /%3E%3C/svg%3E')",
          }}
        ></div>
      </div>

      {/* Subtle Gradient Blob */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        {/* Badge */}
        <div
          className={`transform transition-all duration-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-8 text-xs font-semibold tracking-wider text-cyan-700 bg-cyan-50 rounded-full border border-cyan-200">
            ABOUT US
          </span>
        </div>

        {/* Main Title */}
        <h1
          className={`text-5xl md:text-6xl font-bold mb-6 text-gray-900 transform transition-all duration-700 delay-100 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          About{" "}
          <span className="text-cyan-600 relative inline-block">
            Rent SaaS
            <svg
              className="absolute -bottom-2 left-0 w-full"
              height="4"
              viewBox="0 0 200 4"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 2 Q50 4 100 2 Q150 0 200 2"
                stroke="#0891b2"
                strokeWidth="2"
                fill="none"
                className="animate-draw"
              />
            </svg>
          </span>
        </h1>

        {/* Animated Underline */}
        <div
          className={`flex justify-center mb-12 transform transition-all duration-700 delay-200 ease-out ${
            isVisible ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
          }`}
        >
          <div className="w-20 h-0.5 bg-cyan-600 rounded-full"></div>
        </div>

        {/* Description Text */}
        <div
          className={`transform transition-all duration-700 delay-300 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-lg md:text-xl leading-relaxed text-gray-600 max-w-3xl mx-auto">
            <span className="font-semibold text-cyan-700">Rent SaaS</span> is a
            leading platform that connects renters with top-quality software
            solutions. Our mission is to provide businesses and individuals with
            easy access to the best software tools on the market, without the
            hassle of long-term commitments or high upfront costs.
          </p>

          <div className="mt-10 max-w-2xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-cyan-200 to-transparent my-10"></div>
            <p className="text-base md:text-lg leading-relaxed text-gray-600">
              Whether you're a startup looking for essential tools or an
              established company seeking specialized software,{" "}
              <span className="font-semibold text-cyan-700">
                Rent SaaS has you covered.
              </span>
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto transform transition-all duration-700 delay-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {[
            { value: "500+", label: "Software Solutions", icon: "💼" },
            { value: "10k+", label: "Happy Customers", icon: "👥" },
            { value: "99.9%", label: "Uptime Guarantee", icon: "⚡" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-xl border border-gray-100 bg-gray-50/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className={`mt-12 transform transition-all duration-700 delay-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <button className="group relative px-8 py-3 bg-cyan-600 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:bg-cyan-700">
            <span className="relative z-10 flex items-center gap-2">
              Learn More About Us
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

// Add this to your global CSS file
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes draw {
    0% {
      stroke-dasharray: 0 200;
      stroke-dashoffset: 0;
    }
    100% {
      stroke-dasharray: 200 0;
      stroke-dashoffset: 0;
    }
  }
  
  .animate-draw {
    animation: draw 1.5s ease-out forwards;
  }
`;
document.head.appendChild(styleSheet);

export default About;
