import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "./Footer";

export default function Upgrade() {
  const { darkMode } = useContext(ThemeContext);
  const [billingCycle, setBillingCycle] = useState("monthly");

  const isMonthly = billingCycle === "monthly";

  const plans = {
    monthly: [
      {
        name: "Starter",
        price: "$5",
        description: "Subscription to Invoice-Generator.com Starter plan.",
        features: ["No Ads", "Payment Processing Fee: 0.6%"],
        popular: true,
      },
      {
        name: "Premium",
        price: "$19",
        description: "Subscription to Invoice-Generator.com Premium plan.",
        features: ["No Ads", "No Payment Processing Fee"],
      },
    ],
    yearly: [
      {
        name: "Starter",
        price: "$50",
        description: "Subscription to Invoice-Generator.com Starter plan (Yearly).",
        features: ["No Ads", "Payment Processing Fee: 0.6%"],
        popular: true,
      },
      {
        name: "Premium",
        price: "$190",
        description: "Subscription to Invoice-Generator.com Premium plan (Yearly).",
        features: ["No Ads", "No Payment Processing Fee"],
      },
    ],
  };

  return (
    <div
      className={`min-h-screen py-12 px-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">Upgrade</h1>
      <p className="text-center mb-8 text-gray-500 dark:text-gray-400">
        Purchase an Invoice-Generator.com subscription in order to remove ads and reduce payment processing costs.
      </p>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex rounded-md bg-gray-100 dark:bg-gray-800 p-1">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              isMonthly
                ? "bg-green-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-green-500"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              !isMonthly
                ? "bg-green-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-green-500"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      {/* Plans */}
      {/* Plans */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
  {plans[billingCycle].map((plan, idx) => (
    <div
      key={idx}
      className={`flex flex-col justify-between rounded-lg p-6 shadow w-full max-w-sm h-full transition-colors duration-300 ${
        darkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      {plan.popular && (
        <div className="self-start text-xs mb-2 inline-block px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-full w-auto whitespace-nowrap">
  Most popular
</div>

      )}
      <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
      <div className="text-3xl font-bold mb-2">{plan.price}<span className="text-base font-normal"> per month</span></div>

      <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-4">
        Subscribe
      </button>

      <div>
        <p className="text-sm font-medium mb-1">This includes:</p>
        <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
          {plan.features.map((feature, i) => (
            <li key={i}>✔ {feature}</li>
          ))}
        </ul>
      </div>
    </div>
  ))}
</div>

      <Footer/>
    </div>
  );
}
