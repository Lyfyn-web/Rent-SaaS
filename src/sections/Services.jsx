import React, { useEffect, useRef, useState } from "react";

function Services() {
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
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      id: 1,
      title: "Software Licensing",
      description:
        "Access premium software licenses on flexible terms. Pay monthly or annually with the ability to scale up or down as your needs change.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      features: [
        "No long-term contracts",
        "Instant activation",
        "Volume discounts",
      ],
      pricing: "From $29/mo",
    },
    {
      id: 2,
      title: "Enterprise Solutions",
      description:
        "Custom software packages tailored to your organization's needs. Includes dedicated support, training, and integration assistance.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
      features: [
        "Custom integrations",
        "Dedicated account manager",
        "SLA guarantee",
      ],
      pricing: "Custom pricing",
    },
    {
      id: 3,
      title: "Cloud Infrastructure",
      description:
        "Scale your operations with our cloud hosting solutions. Pay only for what you use with automatic scaling and 99.9% uptime guarantee.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
          />
        </svg>
      ),
      features: ["Auto-scaling", "99.9% uptime", "24/7 monitoring"],
      pricing: "Pay as you go",
    },
    {
      id: 4,
      title: "API Access",
      description:
        "Integrate our software marketplace directly into your applications with our comprehensive REST API. Full documentation and developer support included.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      features: ["RESTful API", "Webhook support", "Developer tools"],
      pricing: "Included with plans",
    },
    {
      id: 5,
      title: "Security & Compliance",
      description:
        "Enterprise-grade security with SOC 2 compliance, data encryption, and regular security audits. Your data is always protected.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      features: ["SOC 2 Type II", "GDPR compliant", "Data encryption"],
      pricing: "Included",
    },
    {
      id: 6,
      title: "Training & Onboarding",
      description:
        "Comprehensive training programs and dedicated onboarding support to ensure your team successfully adopts new software solutions.",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      ),
      features: ["Video tutorials", "Live training", "Documentation"],
      pricing: "Contact sales",
    },
  ];

  const categories = [
    "All",
    "Licensing",
    "Enterprise",
    "Cloud",
    "API",
    "Security",
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 bg-gray-50 overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cdefs%3E%3Cpattern id=%22services-grid%22 width=%2260%22 height=%2260%22 patternUnits=%22userSpaceOnUse%22%3E%3Cpath d=%22M 60 0 L 0 0 0 60%22 fill=%22none%22 stroke=%22%2300a1b0%22 stroke-width=%220.5%22/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23services-grid)%22 /%3E%3C/svg%3E')",
          }}
        ></div>
      </div>

      {/* Subtle Gradient Blobs */}
      <div className="absolute top-40 right-0 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-40 left-0 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            className={`transform transition-all duration-700 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-cyan-700 bg-cyan-50 rounded-full border border-cyan-200">
              OUR SERVICES
            </span>
          </div>

          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 transform transition-all duration-700 delay-100 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Comprehensive{" "}
            <span className="text-cyan-600 relative inline-block">
              Software Solutions
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="3"
                viewBox="0 0 200 3"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 1.5 Q50 3 100 1.5 Q150 0 200 1.5"
                  stroke="#0891b2"
                  strokeWidth="2"
                  fill="none"
                  className="animate-draw"
                />
              </svg>
            </span>
          </h2>

          <p
            className={`text-lg text-gray-600 max-w-3xl mx-auto transform transition-all duration-700 delay-200 ease-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            Everything you need to scale your business with flexible software
            solutions. From startups to enterprises, we have the right tools for
            your success.
          </p>
        </div>

        {/* Category Filters */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-12 transform transition-all duration-700 delay-300 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {categories.map((category, idx) => (
            <button
              key={idx}
              className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:border-cyan-300 hover:text-cyan-600 transition-all duration-300 hover:-translate-y-0.5"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <div
              key={service.id}
              className={`group transform transition-all duration-700 delay-${400 + idx * 100} ease-out ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="h-full bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-14 h-14 bg-cyan-50 rounded-lg flex items-center justify-center mb-5 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Features List */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature, fIdx) => (
                      <span
                        key={fIdx}
                        className="inline-block px-2 py-1 text-xs font-medium text-cyan-700 bg-cyan-50 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Starting at</span>
                    <span className="text-lg font-bold text-cyan-600">
                      {service.pricing}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          className={`mt-16 text-center transform transition-all duration-700 delay-700 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
              Need a custom solution?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Let's discuss your specific requirements and create a tailored
              package that fits your business needs perfectly.
            </p>
            <button className="px-8 py-3 bg-cyan-600 rounded-lg font-semibold text-white shadow-md hover:shadow-lg transition-all duration-300 hover:bg-cyan-700 hover:-translate-y-0.5">
              Contact Our Sales Team
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transform transition-all duration-700 delay-1000 ease-out ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {[
            { value: "500+", label: "Software Solutions", color: "cyan" },
            { value: "10k+", label: "Active Customers", color: "blue" },
            { value: "99.9%", label: "Uptime SLA", color: "cyan" },
            { value: "24/7", label: "Global Support", color: "blue" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
    </section>
  );
}

export default Services;
