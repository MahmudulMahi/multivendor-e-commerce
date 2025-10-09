import PageLayout from "@/components/ui/PageLayout";

export default function CancelPolicyPage() {
  return (
    <PageLayout>
      <main className="max-w-4xl mx-auto p-6 md:p-12 font-poppins text-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-primary text-center">
          Return & Cancellation Policy
        </h1>

        <section className="space-y-6">
          <article>
            <h2 className="text-2xl font-semibold mb-3">
              1. Order Cancellation
            </h2>
            <p className="leading-relaxed text-justify">
              Customers can cancel orders within 24 hours of placement, provided
              the order has not been shipped. To cancel, contact our support
              team as soon as possible.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              2. Return Eligibility
            </h2>
            <p className="leading-relaxed text-justify">
              Products eligible for return must be unused, in original
              packaging, and returned within 7 days of delivery. Some items may
              be exempt due to hygiene or custom nature.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">3. Return Process</h2>
            <p className="leading-relaxed text-justify">
              To initiate a return, contact the vendor or our customer service.
              Upon approval, follow the provided instructions for shipping the
              product back.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">4. Refunds</h2>
            <p className="leading-relaxed text-justify">
              Refunds will be processed within 7-10 business days after the
              returned product is received and inspected. Refunds will be made
              via the original payment method.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">5. Exchanges</h2>
            <p className="leading-relaxed text-justify">
              Exchanges are subject to product availability. Please contact
              customer support to discuss exchange options.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">6. Shipping Costs</h2>
            <p className="leading-relaxed text-justify">
              Customers may be responsible for return shipping costs unless the
              return is due to a defect or error on our part.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
            <p className="leading-relaxed text-justify">
              For questions or assistance regarding returns or cancellations,
              please reach out to our support team via the contact page.
            </p>
          </article>
        </section>
      </main>
    </PageLayout>
  );
}
