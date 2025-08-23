import PageLayout from "@/components/ui/PageLayout";

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <main className="max-w-4xl mx-auto  font-poppins text-gray-800">
        <h1 className="text-4xl font-bold mb-8 text-primary text-center">
          Privacy Policy
        </h1>

        <section className="space-y-6">
          <article>
            <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
            <p className="leading-relaxed text-justify">
              We value your privacy and are committed to protecting your
              personal information. This policy explains how we collect, use,
              and safeguard your data when you use our multivendor marketplace
              platform.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              2. Information We Collect
            </h2>
            <p className="leading-relaxed text-justify">
              We collect information that you provide during registration,
              purchases, and communication with vendors and support. This may
              include your name, email address, payment details, and shipping
              information.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              3. How We Use Your Information
            </h2>
            <p className="leading-relaxed text-justify">
              Your data is used to facilitate transactions, improve our
              services, and communicate important updates. We do not sell your
              personal information to third parties.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
            <p className="leading-relaxed text-justify">
              We implement industry-standard security measures to protect your
              information from unauthorized access, alteration, or disclosure.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">5. Cookies</h2>
            <p className="leading-relaxed text-justify">
              Our website uses cookies to enhance your browsing experience and
              analyze traffic. You can control cookie preferences through your
              browser settings.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
            <p className="leading-relaxed text-justify">
              You have the right to access, correct, or delete your personal
              information. Please contact our support team for assistance.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">
              7. Changes to This Policy
            </h2>
            <p className="leading-relaxed text-justify">
              We may update this policy periodically. Continued use of the
              platform signifies your acceptance of the updated terms.
            </p>
          </article>

          <article>
            <h2 className="text-2xl font-semibold mb-3">8. Contact Us</h2>
            <p className="leading-relaxed text-justify">
              For any questions about this Privacy Policy, please reach out to
              our support team via the contact page.
            </p>
          </article>
        </section>
      </main>
    </PageLayout>
  );
}
