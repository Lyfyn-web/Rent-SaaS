import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const animationFrameId = requestAnimationFrame(() => {
      setIsVisible(true);
    });

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const features = [
    { icon: "⚡", text: "Instant Access" },
    { icon: "🔒", text: "Secure Platform" },
    { icon: "💳", text: "Flexible Payments" },
    { icon: "🚀", text: "24/7 Support" },
  ];

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-linear-to-br from-gray-50 to-white"
    >
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/homepage.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
      </div>

      {/* Subtle Gradient Blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div
          className={`transform transition-all duration-700 delay-200 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-cyan-700 bg-cyan-50 rounded-full border border-cyan-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            ENTERPRISE SOFTWARE SOLUTIONS
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 text-gray-300 transform transition-all duration-700 delay-300 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Welcome to
          <br />
          <span className="relative inline-block mt-2 text-cyan-600">
            Rent SaaS
            <svg
              className="absolute -bottom-3 left-0 w-full"
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

        {/* Description */}
        <p
          className={`text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed transform transition-all duration-700 delay-400 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          Unlock the power of premium software without long-term commitments.
          <br className="hidden sm:block" />
          Scale your business with flexible, on-demand solutions.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transform transition-all duration-700 delay-500 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <Link
            to={"/dashboard"}
            className="px-8 py-3 bg-cyan-600 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:bg-cyan-700 hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              Get Started Free
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
          </Link>

          <button className="px-8 py-3 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300">
            <span className="flex items-center gap-2">
              Watch Demo
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </span>
          </button>
        </div>

        {/* Features Grid */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transform transition-all duration-700 delay-600 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-all duration-300 hover:border-cyan-200 hover:-translate-y-0.5"
            >
              <span className="text-xl">{feature.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div
          className={`mt-12 pt-8 border-t border-gray-200 transform transition-all duration-700 delay-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <p className="text-xs text-gray-400 mb-3">
            TRUSTED BY LEADING COMPANIES
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center opacity-50">
            <span className="text-gray-400 text-sm">Company Logo</span>
            <span className="text-gray-400 text-sm">Company Logo</span>
            <span className="text-gray-400 text-sm">Company Logo</span>
            <span className="text-gray-400 text-sm">Company Logo</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll"></div>
        </div>
      </div>

      <style>{`
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
        @keyframes scroll {
          0% {
            transform: translateY(0px);
            opacity: 1;
          }
          100% {
            transform: translateY(12px);
            opacity: 0;
          }
        }
        .animate-draw {
          animation: draw 1.5s ease-out forwards;
        }
        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default Hero;
