import React from "react";
import PageLayout from "@/components/ui/PageLayout";
import Image from "next/image";
const About = () => {
  return (
    <PageLayout><div className="bg-white text-[#111827] font-poppins">
      {/* Hero Section */}
      <section className="relative bg-primary text-white">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 px-6 md:px-12 py-20 text-center max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            About Our Marketplace
          </h1>
          <p className="text-md md:text-lg leading-relaxed max-w-2xl mx-auto">
            We connect thousands of sellers with millions of buyers in a
            dynamic, secure, and user-friendly e-commerce ecosystem.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who We Are</h2>
          <p className="text-gray-600 text-md md:text-lg max-w-3xl mx-auto">
            We are a passionate team driven to revolutionize multivendor
            e-commerce, empowering vendors of all sizes to reach a broader
            audience and grow their business online.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <Image
              src="/products/1.png"
              alt="Multivendor platform"
              width={600}
              height={400}
              className="rounded-xl shadow-md object-cover w-full h-auto"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-semibold">Our Mission</h3>
            <p className="text-gray-700">
              To provide a seamless, trustworthy platform for vendors to sell,
              and customers to shop — creating mutual growth through technology
              and transparency.
            </p>
            <h3 className="text-xl md:text-2xl font-semibold">Our Vision</h3>
            <p className="text-gray-700">
              To become the most vendor-friendly online marketplace in the
              region by offering robust tools, secure payment systems, and a
              supportive seller community.
            </p>
          </div>
        </div>
      </section>

      {/* Marketplace Stats */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Marketplace in Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-4xl font-bold text-primary">5K+</h3>
              <p className="text-sm text-gray-600">Active Vendors</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">200K+</h3>
              <p className="text-sm text-gray-600">Products Listed</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">50K+</h3>
              <p className="text-sm text-gray-600">Happy Customers</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-primary">98%</h3>
              <p className="text-sm text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A diverse group of experts behind the scenes, dedicated to making
            this platform efficient and powerful for everyone.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {["Malek", "Hasan", "Bokhtier", "Alamin"].map((name, idx) => (
            <div key={idx} className="text-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                {name[0]}
              </div>
              <h4 className="mt-2 font-semibold text-md">{name}</h4>
              <p className="text-xs text-gray-500">Team Member</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-white py-10 text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-2">
          Ready to join our seller community?
        </h3>
        <p className="text-sm md:text-base mb-4">
          Grow your business with us. Start selling in minutes.
        </p>
        <button className="bg-white text-primary px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
          Become a Seller
        </button>
      </section>
    </div></PageLayout>
    
  );
};

export default About;
