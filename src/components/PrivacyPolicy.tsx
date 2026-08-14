const PrivacyPolicy = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-surface border border-line rounded-2xl p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy for Spelling App</h1>
          <p className="text-sm text-ink-soft mb-8">Last updated: 2025-05-23</p>

          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-lg mb-6">Your privacy is important to us. Spelling App does <b>not</b> collect, store, or transmit any personal data. All data you create remains on your device and is not shared with anyone. No analytics or tracking is performed.</p>

          <h2 className="text-2xl font-semibold mb-4">Data Collection</h2>
          <p className="text-lg mb-6">Spelling App does <b>not</b> collect any personal information, usage data, or technical data from users. All spelling lists, words, and app usage remain strictly local to your device.</p>

          <h2 className="text-2xl font-semibold mb-4">Data Storage</h2>
          <p className="text-lg mb-6">All data is stored only on your device. We do not transmit, process, or store your data on any external servers or third-party services.</p>

          <h2 className="text-2xl font-semibold mb-4">Analytics and Tracking</h2>
          <p className="text-lg mb-6">Spelling App does <b>not</b> use any analytics, tracking, or crash reporting tools. Your activity is never monitored or shared.</p>

          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-lg mb-6">We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg mb-2">If you have any questions about this Privacy Policy, please contact us at:</p>
          <ul className="text-lg mb-2 list-disc list-inside">
            <li>Email: <a href="mailto:info@codedcheese.com" className="underline decoration-brand decoration-2 underline-offset-2 hover:text-ink-soft transition-colors">info@codedcheese.com</a></li>
            <li>Website: <a href="https://www.codedcheese.com" className="underline decoration-brand decoration-2 underline-offset-2 hover:text-ink-soft transition-colors">https://www.codedcheese.com</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
