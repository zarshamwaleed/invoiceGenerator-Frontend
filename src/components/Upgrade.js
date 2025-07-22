import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import Footer from "./Footer";
import { useTranslation } from 'react-i18next';

export default function Upgrade() {
  const { darkMode } = useContext(ThemeContext);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { t } = useTranslation();

  const isMonthly = billingCycle === "monthly";

  const plans = {
    monthly: [
      {
        name: t("Starter"),
        price: "$5",
        description: t("StarterMonthlyDesc"),
        features: [t("NoAds"), t("Fee0_6")],
        popular: true,
      },
      {
        name: t("Premium"),
        price: "$19",
        description: t("PremiumMonthlyDesc"),
        features: [t("NoAds"), t("NoFee")],
      },
    ],
    yearly: [
      {
        name: t("Starter"),
        price: "$50",
        description: t("StarterYearlyDesc"),
        features: [t("NoAds"), t("Fee0_6")],
        popular: true,
      },
      {
        name: t("Premium"),
        price: "$190",
        description: t("PremiumYearlyDesc"),
        features: [t("NoAds"), t("NoFee")],
      },
    ],
  };

  return (
    <div
      className={`min-h-screen py-12 px-6 transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold text-center mb-4">{t("Upgrade")}</h1>
      <p className="text-center mb-8 text-gray-500 dark:text-gray-400">
        {t("UpgradeDescription")}
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
            {t("Monthly")}
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
              !isMonthly
                ? "bg-green-500 text-white"
                : "text-gray-600 dark:text-gray-300 hover:text-green-500"
            }`}
          >
            {t("Yearly")}
          </button>
        </div>
      </div>

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
                {t("MostPopular")}
              </div>
            )}
            <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{plan.description}</p>
            <div className="text-3xl font-bold mb-2">
              {plan.price}
              <span className="text-base font-normal"> {t("PerMonth")}</span>
            </div>

            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded mb-4">
              {t("Subscribe")}
            </button>

            <div>
              <p className="text-sm font-medium mb-1">{t("ThisIncludes")}</p>
              <ul className="text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
                {plan.features.map((feature, i) => (
                  <li key={i}>✔ {feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
