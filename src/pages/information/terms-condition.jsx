import PageLayout from "@/components/ui/PageLayout";

export default function TermsConditionPage() {
  return (
    <PageLayout>
      <main className="max-w-4xl mx-auto  font-poppins text-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-primary text-center">
          Terms & Conditions
        </h1>

        <section className="space-y-6">
          <article>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="leading-relaxed text-justify">
              Welcome to our multivendor marketplace platform. By accessing or
              using our website, you agree to comply with and be bound by the
              following terms and conditions.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              2. Vendor Responsibilities
            </h2>
            <p className="leading-relaxed text-justify">
              Vendors must provide accurate and truthful information about their
              products. They are responsible for ensuring timely delivery and
              quality of goods.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              3. Customer Obligations
            </h2>
            <p className="leading-relaxed text-justify">
              Customers agree to use the platform for lawful purposes only and
              respect the rights of vendors and other users.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">4. Payment Terms</h2>
            <p className="leading-relaxed text-justify">
              All payments are processed securely via integrated gateways. The
              platform does not hold payment funds; funds are transferred
              directly between customers and vendors.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              5. Returns and Refunds
            </h2>
            <p className="leading-relaxed text-justify">
              Return and refund policies vary by vendor. Customers should review
              the vendor’s policy before making a purchase.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              6. Limitation of Liability
            </h2>
            <p className="leading-relaxed text-justify">
              We are not liable for any damages arising from the use of the
              platform or transactions between vendors and customers.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">7. Changes to Terms</h2>
            <p className="leading-relaxed text-justify">
              We reserve the right to update these terms at any time. Continued
              use of the platform constitutes acceptance of the updated terms.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <p className="leading-relaxed text-justify">
              For any questions regarding these terms, please contact our
              support team via the contact page.
            </p>
          </article>
        </section>
      </main>
    </PageLayout>
  );
}
