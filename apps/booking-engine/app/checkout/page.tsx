export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-display font-bold mb-4">Checkout</h1>
          <p className="text-xl text-neutral-300 max-w-2xl">
            Review and complete your purchase.
          </p>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Weekend Gala Experience</span>
                  <span className="font-bold">$12,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Service Fee</span>
                  <span className="font-bold">$250</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>$12,750</span>
                </div>
              </div>
            </div>

            <div className="border border-neutral-200 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <div className="space-y-3">
                <button className="w-full p-4 border border-neutral-300 rounded-lg text-left hover:border-neutral-400">
                  <div className="font-semibold">Credit Card</div>
                  <div className="text-sm text-neutral-600">Visa, Mastercard, Amex</div>
                </button>
                <button className="w-full p-4 border border-neutral-300 rounded-lg text-left hover:border-neutral-400">
                  <div className="font-semibold">PayPal</div>
                  <div className="text-sm text-neutral-600">Pay with PayPal account</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
