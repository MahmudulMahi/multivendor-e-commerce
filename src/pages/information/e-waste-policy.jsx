import PageLayout from "@/components/ui/PageLayout";

export default function EWastePolicyPage() {
  return (
    <PageLayout>
      <main className="max-w-4xl mx-auto p-6 md:p-12 font-poppins text-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-primary text-center">
          E-Waste Policy
        </h1>

        <section className="space-y-6">
          <article>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="leading-relaxed text-justify">
              We are committed to responsible management and disposal of
              electronic waste (e-waste) generated through our platform. This
              policy outlines our approach to minimizing environmental impact.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">2. What is E-Waste?</h2>
            <p className="leading-relaxed text-justify">
              E-waste refers to discarded electrical or electronic devices such
              as computers, phones, batteries, and other gadgets. Improper
              disposal can harm the environment and human health.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">3. Our Commitment</h2>
            <p className="leading-relaxed text-justify">
              We encourage vendors and customers to follow best practices for
              recycling and disposing of e-waste. We partner with certified
              e-waste recyclers to ensure safe handling and disposal.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              4. Vendor Responsibilities
            </h2>
            <p className="leading-relaxed text-justify">
              Vendors must inform customers about e-waste disposal options and
              provide guidance on how to return or recycle electronic products.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              5. Customer Guidance
            </h2>
            <p className="leading-relaxed text-justify">
              Customers are encouraged to dispose of e-waste responsibly by
              utilizing authorized collection centers or return programs offered
              by vendors.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              6. Compliance and Updates
            </h2>
            <p className="leading-relaxed text-justify">
              We comply with all applicable laws and regulations related to
              e-waste management. This policy may be updated periodically to
              reflect changes in legislation or company practices.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
            <p className="leading-relaxed text-justify">
              For questions or concerns regarding our e-waste policy, please
              contact our support team via the contact page.
            </p>
          </article>
        </section>
      </main>
    </PageLayout>
  );
}
