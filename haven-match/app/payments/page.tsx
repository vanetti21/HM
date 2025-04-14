// app/payments/page.tsx
"use client";

import CheckoutPage from "../components/CheckoutPage";
import convertToSubcurrency from "../libs/convertToSubrrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSearchParams } from "next/navigation";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
    locale: "en",
});

export default function PaymentPage() {
const searchParams = useSearchParams();
const amountParam = searchParams?.get("amount");
const amount = amountParam ? parseFloat(amountParam) : 0;


  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-[#34495e] to-[#6e99c4]">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Reserve Payment</h1>
        <h2 className="text-2xl">
          Total: <span className="font-bold"> ${amount.toFixed(2)}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}
