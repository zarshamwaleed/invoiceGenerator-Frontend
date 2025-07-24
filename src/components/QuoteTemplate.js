// src/components/HomePage.js
import React, { useState, useRef, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import Footer from "./Footer";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { InvoiceContext } from "../context/InvoiceContext";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // <-- Added
import i18n from "../i18n"; // adjust the path if needed

export default function HomePage() {
  const { darkMode } = useContext(ThemeContext);

  const navigate = useNavigate();

  const { invoiceData, setInvoiceData, hardReset } = useContext(InvoiceContext);

  const location = useLocation();

  const [isDownloading, setIsDownloading] = useState(false);
 const { t, i18n } = useTranslation();

  // Helper to map pathname to invoice type
  const getInvoiceType = (path) => {
    if (path === "/") return "INVOICE";
    if (path.includes("credit-note")) return "CREDIT NOTE";
    if (path.includes("quote")) return "QUOTE";
    if (path.includes("purchase-order")) return "PURCHASE ORDER";
    return "INVOICE";
  };

  const invoiceType = getInvoiceType(location.pathname);

  // UI States
  const [isVisible, setIsVisible] = useState(true);
  const [currency, setCurrency] = useState(invoiceData.currency || "USD");
  const [logo, setLogo] = useState(invoiceData.logo || null);
  const [showTaxInput, setShowTaxInput] = useState(false);
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [showShippingInput, setShowShippingInput] = useState(false);
  const fileInputRef = useRef(null);

  // Tax and Discount states
  const [taxRate, setTaxRate] = useState(invoiceData.taxRate || 0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingAmount, setShippingAmount] = useState(
    invoiceData.shipping || 0
  );
  const [amountPaid, setAmountPaid] = useState(invoiceData.amountPaid || 0);
  const [isTaxPercentage, setIsTaxPercentage] = useState(
    invoiceData.isTaxPercentage !== false
  );
  const [isDiscountPercentage, setIsDiscountPercentage] = useState(
    invoiceData.isDiscountPercentage || false
  );

  const [taxAmount, setTaxAmount] = useState(invoiceData.taxAmount || 0);
  const [discountRate, setDiscountRate] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(
    invoiceData.discountPercentage || 0
  );
  const [discountFixed, setDiscountFixed] = useState(
    invoiceData.discountFixed || 0
  );

  // Invoice form data - initialize from context
  const [from, setFrom] = useState(invoiceData.from || "");
  const [billTo, setBillTo] = useState(invoiceData.billTo || "");
  const [shipTo, setShipTo] = useState(invoiceData.shipTo || "");
  const [date, setDate] = useState(invoiceData.date || "");
  const [paymentTerms, setPaymentTerms] = useState(
    invoiceData.paymentTerms || ""
  );
  const [dueDate, setDueDate] = useState(invoiceData.dueDate || "");
  const [poNumber, setPoNumber] = useState(invoiceData.poNumber || "");
  const [invoiceNumber, setInvoiceNumber] = useState(
    invoiceData.invoiceNumber || ""
  );
  const [notes, setNotes] = useState(invoiceData.notes || "");
  const [terms, setTerms] = useState(invoiceData.terms || "");

  // Backend specific states
  const [ilogo, setiLogo] = useState(invoiceData.logo || "");
  const [icurrency, setiCurrency] = useState(invoiceData.currency || "PKR");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);
  const [iamountPaid, setiAmountPaid] = useState(invoiceData.amountPaid || 0);
  const [balanceDue, setBalanceDue] = useState(0);
  const [createdAt] = useState(new Date().toISOString());
  const [error, setError] = useState("");

  // Line Items - initialize from context
  const [items, setItems] = useState(
    invoiceData.lineItems || [
      { id: 1, description: "", quantity: 1, price: 0, amount: 0 },
    ]
  );

  const [lineItems, setLineItems] = useState([
    { name: "", description: "", quantity: 1, rate: 0, amount: 0 },
  ]);

  // Labels - initialize from context with fallback defaults
 const [labels, setLabels] = useState(
  invoiceData.labels || {
    billTo: t("Bill To"),
    shipTo: t("Ship To"),
    date: t("Date"),
    paymentTerms: t("Payment Terms"),
    dueDate: t("Due Date"),
    poNumber: t("PO Number"),
    item: t("Item"),
    quantity: t("Quantity"),
    rate: t("Rate"),
    amount: t("Amount"),
    notes: t("Notes"),
    terms: t("Terms"),
    subtotal: t("Subtotal"),
    tax: t("Tax"),
    discount: t("Discount"),
    shipping: t("Shipping"),
    total: t("Total"),
    amountPaid: t("Amount Paid"),
    balanceDue: t("Balance Due"),
  }
);

const [ilabels, setiLabels] = useState({
  item: t("Item"),
  quantity: t("Quantity"),
  rate: t("Rate"),
  amount: t("Amount"),
  notes: t("Notes"),
  terms: t("Terms"),
  subtotal: t("Subtotal"),
  tax: t("Tax"),
  discount: t("Discount"),
  shipping: t("Shipping"),
  total: t("Total"),
  amountPaid: t("Amount Paid"),
  balanceDue: t("Balance Due"),
  from: t("From"),
  billTo: t("Bill To"),
  shipTo: t("Ship To"),
  paymentTerms: t("Payment Terms"),
  dueDate: t("Due Date"),
  poNumber: t("PO Number"),
  currency: t("Currency"),
});

  // Label editing states
  const [isEditingLabel, setIsEditingLabel] = useState(null);
  const [tempLabelValue, setTempLabelValue] = useState("");

useEffect(() => {
  const handleLanguageChange = () => {
    const updateLabel = (key, defaultText) =>
      !labels[key] || labels[key] === defaultText ? t(defaultText) : labels[key];

    const updateILabel = (key, defaultText) =>
      !ilabels[key] || ilabels[key] === defaultText ? t(defaultText) : ilabels[key];

    setLabels({
      billTo: updateLabel("billTo", "Bill To"),
      shipTo: updateLabel("shipTo", "Ship To"),
      date: updateLabel("date", "Date"),
      paymentTerms: updateLabel("paymentTerms", "Payment Terms"),
      dueDate: updateLabel("dueDate", "Due Date"),
      poNumber: updateLabel("poNumber", "PO Number"),
      item: updateLabel("item", "Item"),
      quantity: updateLabel("quantity", "Quantity"),
      rate: updateLabel("rate", "Rate"),
      amount: updateLabel("amount", "Amount"),
      notes: updateLabel("notes", "Notes"),
      terms: updateLabel("terms", "Terms"),
      subtotal: updateLabel("subtotal", "Subtotal"),
      tax: updateLabel("tax", "Tax"),
      discount: updateLabel("discount", "Discount"),
      shipping: updateLabel("shipping", "Shipping"),
      total: updateLabel("total", "Total"),
      amountPaid: updateLabel("amountPaid", "Amount Paid"),
      balanceDue: updateLabel("balanceDue", "Balance Due"),
    });

    setiLabels({
      item: updateILabel("item", "Item"),
      quantity: updateILabel("quantity", "Quantity"),
      rate: updateILabel("rate", "Rate"),
      amount: updateILabel("amount", "Amount"),
      notes: updateILabel("notes", "Notes"),
      terms: updateILabel("terms", "Terms"),
      subtotal: updateILabel("subtotal", "Subtotal"),
      tax: updateILabel("tax", "Tax"),
      discount: updateILabel("discount", "Discount"),
      shipping: updateILabel("shipping", "Shipping"),
      total: updateILabel("total", "Total"),
      amountPaid: updateILabel("amountPaid", "Amount Paid"),
      balanceDue: updateILabel("balanceDue", "Balance Due"),
      from: updateILabel("from", "From"),
      billTo: updateILabel("billTo", "Bill To"),
      shipTo: updateILabel("shipTo", "Ship To"),
      paymentTerms: updateILabel("paymentTerms", "Payment Terms"),
      dueDate: updateILabel("dueDate", "Due Date"),
      poNumber: updateILabel("poNumber", "PO Number"),
      currency: updateILabel("currency", "Currency"),
    });
  };

  i18n.on('languageChanged', handleLanguageChange); // listen when language is changed
  handleLanguageChange(); // run once initially

  return () => {
    i18n.off('languageChanged', handleLanguageChange); // cleanup listener
  };
}, []);


  useEffect(() => {
  const dismissed = Cookies.get('welcomeDismissed');
  if (dismissed === 'true') {
    setIsVisible(false);
  }
}, []);

  // Force reset when component mounts
  useEffect(() => {
    const shouldReset = sessionStorage.getItem("shouldReset");
    if (shouldReset) {
      hardReset();
      sessionStorage.removeItem("shouldReset");
    }
  }, []);

  // Calculate amounts whenever items change
  useEffect(() => {
    if (Array.isArray(items)) {
      setItems(
        items.map((item) => ({
          ...item,
          amount: item.quantity * item.price,
        }))
      );
    }
  }, []);

  // Sync currency states
  useEffect(() => {
    setiCurrency(currency);
  }, [currency]);

  // Sync amount paid states
  useEffect(() => {
    setiAmountPaid(amountPaid);
  }, [amountPaid]);

 const handleHide = () => {
  setIsVisible(false);
  Cookies.set('welcomeDismissed', 'true', { expires: 7 }); // Expires in 30 days
};


  const addItem = () => {
    const newId =
      items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([
      ...items,
      { id: newId, description: "", quantity: 1, price: 0, amount: 0 },
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Update item quantity and recalculate amount
  const handleQuantityChange = (id, value) => {
    const quantity = parseFloat(value) || 0;
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, quantity, amount: quantity * item.price }
          : item
      )
    );
  };

  // Update item price and recalculate amount
  const handlePriceChange = (id, value) => {
    const price = parseFloat(value) || 0;
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, price, amount: item.quantity * price }
          : item
      )
    );
  };

  // Update item description
  const handleDescriptionChange = (id, value) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, description: value } : item
      )
    );
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleLogoClick = () => {
    fileInputRef.current.click();
  };

 const handleLogoUpload = (e) => {
  const file = e.target.files[0];

  if (file) {
    // Check if file size is more than 2MB
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: 'error',
        title: 'Image Too Large',
        text: 'Image size must be 2MB or less!',
        confirmButtonColor: '#10B981', // Optional: matches Tailwind emerald
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setLogo(base64);   // For preview
      setiLogo(base64);  // For backend
    };
    reader.readAsDataURL(file);
  }
};

  // Store currency code → symbol mapping
  const currencySymbols = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    AUD: "A$",
    CAD: "C$",
    CHF: "CHF",
    INR: "₹",
    PKR: "₨",
    ZAR: "R",
    SEK: "kr",
    NOK: "kr",
    DKK: "kr",
    RUB: "₽",
    SGD: "S$",
    HKD: "HK$",
    NZD: "NZ$",
    THB: "฿",
    MYR: "RM",
    SAR: "﷼",
  };

  // This returns the correct symbol for the currently selected currency
  const getCurrencySymbol = () => currencySymbols[icurrency] || "$";

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.amount, 0);
  };

  const calculateTaxAmount = () => {
    const subtotal = calculateSubtotal();
    return isTaxPercentage ? (subtotal * taxRate) / 100 : taxAmount;
  };

  const calculateDiscountAmount = () => {
    const subtotal = calculateSubtotal();
    return isDiscountPercentage
      ? (subtotal * discountPercentage) / 100
      : discountFixed;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const taxAmount = calculateTaxAmount();
    const discountAmount = calculateDiscountAmount();
    return subtotal + taxAmount - discountAmount + shippingAmount;
  };

  const calculateBalanceDue = () => {
    return calculateTotal() - amountPaid;
  };

  const startEditingLabel = (labelKey) => {
    setIsEditingLabel(labelKey);
    setTempLabelValue(labels[labelKey]);
  };

  const saveLabel = () => {
    if (isEditingLabel && tempLabelValue.trim()) {
      setLabels({
        ...labels,
        [isEditingLabel]: tempLabelValue,
      });
    }
    setIsEditingLabel(null);
    setTempLabelValue("");
  };

  const cancelEditingLabel = () => {
    setIsEditingLabel(null);
    setTempLabelValue("");
  };

  // PDF generation
  const { toPDF, targetRef } = usePDF({
    filename: `invoice_${
      invoiceNumber || new Date().toISOString().slice(0, 10)
    }.pdf`,
    page: {
      margin: 20,
      format: "a4",
      orientation: "portrait",
    },
  });

  // Update the handleSubmit function to update context and save to backend
  const handleSubmit = async () => {
    // ✅ Get logged-in user (if any)
    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ Only send real userId if logged in, otherwise null
    const userId = user?.id || null;

    // ✅ Always include visitorId (guest tracking)
    const visitorId = localStorage.getItem("visitorId");

    // ✅ Calculate all amounts
    const subtotal = calculateSubtotal();
    const tax = calculateTaxAmount();
    const discount = calculateDiscountAmount();
    const total = calculateTotal();
    const balanceDue = calculateBalanceDue();

    // ✅ Build invoice payload
    const invoiceDataToSave = {
      userId, // ✅ logged-in userId if valid, else null
      visitorId, // ✅ always set
      type: invoiceType,
      logo: ilogo,
      from,
      billTo,
      shipTo,
      date: date || new Date().toISOString().split("T")[0],
      paymentTerms,
      dueDate,
      poNumber,
      currency: icurrency,
      subtotal,
      tax,
      discount,
      shipping: shippingAmount,
      total,
      amountPaid,
      balanceDue,
      notes,
      terms,
      invoiceNumber: invoiceNumber || `INV-${Date.now()}`,
      lineItems: items.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.price,
        amount: item.amount,
      })),
      labels: {
  ...labels,
  from: labels.from || t("from"),
  billTo: labels.billTo || t("Bill To"),
  shipTo: labels.shipTo || t("Ship To"),
  paymentTerms: labels.paymentTerms || t("Payment Terms"),
  dueDate: labels.dueDate || t("Due Date"),
  poNumber: labels.poNumber || t("PO Number"),
  currency: labels.currency || t("Currency"),
}

    };

    // ✅ Save in state for PDF generation
    setInvoiceData(invoiceDataToSave);

    try {
      const response = await fetch(
        "https://invoice-generator-backend-liard.vercel.app/invoice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(invoiceDataToSave),
          credentials: "include", // Only if you're using cookies/auth
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to save invoice");
      }

      const result = await response.json();
      console.log("✅ Invoice saved:", result);
      return result;
    } catch (error) {
      console.error("❌ Error saving invoice:", error.message);
      throw error;
    }
  };

  // Update the download handler
  const handleDownloadClick = async (e) => {
  e.preventDefault();

  if (isDownloading) return; // Prevent multiple clicks

  setIsDownloading(true);

  try {
    // ✅ Save invoice first
    const savedInvoice = await handleSubmit();

    // ✅ Update invoice number if backend returned it
    if (savedInvoice.invoice?.invoiceNumber) {
      setInvoiceNumber(savedInvoice.invoice.invoiceNumber);
    }

    // ✅ Generate PDF & navigate
    requestAnimationFrame(() => {
      toPDF();
      setTimeout(() => {
        setIsDownloading(false); // ✅ Reset after short delay
        navigate("/thankyou");
      }, 1000); // adjust timing if necessary
    });
  } catch (error) {
    console.error("Error in download process:", error);

    Swal.fire({
      title: "❌ Failed to Generate Invoice",
      text: "Something went wrong during the download process. Please try again.",
      icon: "error",
      confirmButtonText: "OK",
      confirmButtonColor: "#d33",
    });

    setIsDownloading(false); // Ensure we re-enable the button
  }
};


  const handleSaveDefault = async () => {
    if (!invoiceNumber) {
      Swal.fire({
        title: "⚠️ Missing Invoice Number",
        text: "Please enter an invoice number before continuing.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#f0ad4e",
      });
      return;
    }

    const confirmUpdate = await Swal.fire({
      title: "Overwrite Default Template?",
      text: "Do you want to make this invoice the default template, overwriting the current one?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "✅ Yes, overwrite",
      cancelButtonText: "❌ No, keep current",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });

    // Only proceed if user confirms
    if (!confirmUpdate.isConfirmed) return;

    try {
      // Prepare the updated invoice data
      const updatedInvoice = {
        from,
        billTo,
        shipTo,
        date,
        paymentTerms,
        dueDate,
        poNumber,
        currency: icurrency,
        amountPaid,
        lineItems: items.map((item) => ({
          description: item.description,
          quantity: item.quantity,
          rate: item.price,
          amount: item.amount,
        })),
        notes,
        terms,
        invoiceNumber,
        shipping: shippingAmount,
        taxRate,
        taxAmount,
        discountPercentage,
        discountFixed,
        isTaxPercentage,
        isDiscountPercentage,
        labels: { ...labels },
      };

      // Update the invoice in the database
      const response = await fetch(
        `https://invoice-generator-backend-liard.vercel.app/invoice/${invoiceNumber}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedInvoice),
        }
      );

      if (!response.ok) throw new Error("Failed to update invoice");

      const result = await response.json();
      Swal.fire({
        title: "✅ Invoice Updated!",
        text: "Your invoice has been updated successfully.",
        icon: "success",
        confirmButtonText: "Great!",
        confirmButtonColor: "#28a745",
      });

      return result;
    } catch (error) {
      console.error("Error updating invoice:", error);

      Swal.fire({
        title: "❌ Failed to Update Invoice",
        text: "Something went wrong while updating the invoice. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
  };

  const checkInvoiceExists = async (invoiceNumber) => {
    try {
      const response = await fetch(
        `https://invoice-generator-backend-liard.vercel.app/invoice/check/${invoiceNumber}`
      );

      if (!response.ok) throw new Error("Failed to check invoice");
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking invoice:", error);
      return false;
    }
  };

  // Invoice PDF template
  const InvoicePDFTemplate = () => (
    <div
      ref={targetRef}
      className="mx-auto px-12 py-10 w-[794px] text-gray-900 text-sm font-sans"
      style={{ boxSizing: "border-box" }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        {/* Logo & From */}
        <div className="flex flex-col">
          {logo && <img src={logo} alt="Logo" className="h-20 w-auto mb-2" />}
          <div className="font-bold whitespace-pre-line">{from}</div>
        </div>

        {/* Invoice Info */}
        <div className="text-right">
          <h1 className="text-3xl font-semibold tracking-wide mb-1">
            {invoiceType}
          </h1>

          <p className="text-sm text-gray-500">
            # {invoiceNumber || "Pending"}
          </p>
          <div className="mt-2 text-sm space-y-1">
            <p>
              <strong>{labels.date || t("Date")}:</strong> {date}

            </p>
            <p>
              <strong>{labels.paymentTerms || t("Payment Terms")}:</strong>{" "}
              {paymentTerms}
            </p>
            <p>
              <strong>{labels.dueDate || t("Due Date")}:</strong> {dueDate}
            </p>
            <p>
              <strong>{labels.poNumber || t("PO Number")}:</strong> {poNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Bill/Ship Info */}
      <div className="flex justify-between text-sm mb-8">
        <div>
          <p className="text-gray-500 font-semibold">
            {labels.billTo || t("Bill To")}:
          </p>
          <p className="font-bold whitespace-pre-line">{billTo}</p>
        </div>
        <div>
          <p className="text-gray-500 font-semibold">
            {labels.shipTo || "Ship To"}:
          </p>
          <p className="font-bold whitespace-pre-line">{shipTo}</p>
        </div>
      </div>

      {/* Balance Due */}
      <div className="mb-6">
        <div className="bg-gray-100 px-4 py-2 text-right rounded">
          <span className="text-gray-700 font-semibold">
            {labels.balanceDue || "Balance Due"}:
          </span>
          <span className="text-black font-bold ml-4">
            {getCurrencySymbol()}
            {calculateBalanceDue().toFixed(2)}
          </span>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full border-collapse text-sm mb-10">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="text-left px-4 py-2">{labels.item || "Item"}</th>
            <th className="text-center px-4 py-2">
              {labels.quantity || "Quantity"}
            </th>
            <th className="text-right px-4 py-2">{labels.rate || "Rate"}</th>
            <th className="text-right px-4 py-2">
              {labels.amount || "Amount"}
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
            >
              <td className="px-4 py-2 border">{item.description || "Item"}</td>
              <td className="px-4 py-2 text-center border">{item.quantity}</td>
              <td className="px-4 py-2 text-right border">
                {getCurrencySymbol()}
                {(Number(item.price) || 0).toFixed(2)}
              </td>
              <td className="px-4 py-2 text-right border">
                {getCurrencySymbol()}
                {(Number(item.amount) || 0).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Section */}
      <div className="flex justify-end mb-6">
        <div className="w-full max-w-sm space-y-1">
          <div className="flex justify-between">
            <span>{labels.subtotal || t("Subtotal")}:</span>
            <span>
              {getCurrencySymbol()}
              {calculateSubtotal().toFixed(2)}
            </span>
          </div>
          {(taxRate > 0 || taxAmount > 0) && (
            <div className="flex justify-between">
              <span>
                {labels.tax || t("Tax")} ({taxRate}%):
              </span>
              <span>
                {getCurrencySymbol()}
                {calculateTaxAmount().toFixed(2)}
              </span>
            </div>
          )}
          {shippingAmount > 0 && (
            <div className="flex justify-between">
              <span>{labels.shipping || t("Shipping")}:</span>
              <span>
                {getCurrencySymbol()}
                {(Number(shippingAmount) || 0).toFixed(2)}
              </span>
            </div>
          )}
          {(discountPercentage > 0 || discountFixed > 0) && (
            <div className="flex justify-between">
              <span>{labels.discount || t("Discount")}:</span>
              <span>
                -{getCurrencySymbol()}
                {calculateDiscountAmount().toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t pt-2 mt-2 text-lg">
            <span>{labels.total || "Total"}:</span>
            <span>
              {getCurrencySymbol()}
              {calculateTotal().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between pt-1 text-sm">
            <span>{labels.amountPaid || t("Amount Paid")}:</span>
            <span>
              {getCurrencySymbol()}
              {(amountPaid ?? 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-bold pt-1 border-t mt-2 text-sm">
            <span>{labels.balanceDue || t("Balance Due")}:</span>
            <span>
              {getCurrencySymbol()}
              {calculateBalanceDue().toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Notes and Terms */}
      {notes && (
        <div className="mb-4">
          <p className="font-semibold mb-1">{labels.notes || "Notes"}:</p>
          <p className="text-gray-700 whitespace-pre-line">{notes}</p>
        </div>
      )}
      {terms && (
        <div>
          <p className="font-semibold mb-1">{labels.terms || "Terms"}:</p>
          <p className="text-gray-700 whitespace-pre-line">{terms}</p>
        </div>
      )}

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-10">
        Thank you for your business!
      </div>
    </div>
  );

  // Edit Invoice Button Handler
  const handleEditInvoice = () => {
    // No need to manually set invoiceData here since it's already in context
    navigate("/");
  };

  return (
 <div
  key={isVisible ? "with-header" : "no-header"} // ✅ Forces repaint
  className={`min-h-screen transition-colors duration-300 ${
    darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
  }`}
>
  {/* Hidden PDF template */}
  <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
    <InvoicePDFTemplate />
  </div>

   {/* Header Section */}
  {isVisible && (
    <div
      className={`max-w-7xl mx-auto p-6 rounded-lg ${
        darkMode ? "bg-gray-800" : "bg-gray-50"
      } transition-colors duration-300`}
    >
      <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
       {t("HeroTitle")}
      </h1>
      <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
        {t("HeroSubtitle")}
      </h2>
      <p className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {t("HeroParagraph1")}
      </p>
      <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
        {t("HeroParagraph2")}
      </p>
      <button
        className={`px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 ${
          darkMode ? "bg-green-600 text-white" : "bg-green-600 text-white"
        }`}
        onClick={handleHide}
      >
     {t("HeroCTA")}
      </button>
    </div>
  )}

  {/* Invoice Section */}
<div
  className={`max-w-7xl mx-auto ${
    isVisible ? "mt-10" : "mt-0"
  } border rounded-lg p-6 flex flex-col lg:flex-row transition-all duration-300 ${
    darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
  }`}
>


    {/* Left section… */}

        <div className="flex-1 space-y-4">
                <div
  className={`border w-40 h-24 flex items-center justify-center cursor-pointer transition-colors duration-300 relative group ${
    darkMode
      ? "border-gray-600 text-gray-400 hover:border-gray-500"
      : "border-gray-300 text-gray-400 hover:border-gray-400"
  }`}
  onClick={() => !logo && handleLogoClick()}
>
  {logo ? (
    <div className="w-full h-full relative">
      <img
        src={logo}
        alt="Logo"
        className="w-full h-full object-contain"
      />
      <button
        onClick={(e) => {
          e.stopPropagation();
          setLogo(null);
        }}
        className="absolute top-1 left-1 bg-black text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        title="Remove Logo"
      >
        ×
      </button>
    </div>
  ) : (
    t("+ Add Your Logo")
  )}
  <input
    type="file"
    ref={fileInputRef}
    onChange={handleLogoUpload}
    accept="image/*"
    className="hidden"
  />
</div>

          <input
            placeholder={t("Company Name")}

            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className={`w-full border rounded px-3 py-2 transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
            }`}
          />

          <div className="flex space-x-4">
            {/* Bill To */}
          <div className="flex-1">
  <div className="flex items-center">
    {isEditingLabel === "billTo" ? (
      <div className="flex items-center">
        <input
          type="text"
          value={tempLabelValue}
          onChange={(e) => setTempLabelValue(e.target.value)}
          className={`border rounded px-2 py-1 w-32 mr-2 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />
        <button
          onClick={saveLabel}
          className={`text-xs mr-1 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          ✓
        </button>
        <button
          onClick={cancelEditingLabel}
          className={`text-xs ${
            darkMode ? "text-red-400" : "text-red-500"
          }`}
        >
          ×
        </button>
      </div>
    ) : (
      <label
        className={`block mb-1 text-sm font-medium ${
          darkMode ? "text-white" : "text-gray-800"
        } cursor-pointer`}
        onClick={() => startEditingLabel("billTo")}
      >
        {labels.billTo || t("Bill To")}
      </label>
    )}
  </div>
  <input
    placeholder={t("Customer Address")}
    value={billTo}
    onChange={(e) => setBillTo(e.target.value)}
    className={`w-full border rounded px-3 py-2 transition-colors duration-300 
      ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
      }`}
  />
</div>

            {/* Ship To */}
           <div className="flex-1">
  <div className="flex items-center">
    {isEditingLabel === "shipTo" ? (
      <div className="flex items-center">
        <input
          type="text"
          value={tempLabelValue}
          onChange={(e) => setTempLabelValue(e.target.value)}
          className={`border rounded px-2 py-1 w-32 mr-2 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />
        <button
          onClick={saveLabel}
          className={`text-xs mr-1 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          ✓
        </button>
        <button
          onClick={cancelEditingLabel}
          className={`text-xs ${
            darkMode ? "text-red-400" : "text-red-500"
          }`}
        >
          ×
        </button>
      </div>
    ) : (
      <label
        className={`block mb-1 text-sm font-medium ${
          darkMode ? "text-white" : "text-gray-800"
        } cursor-pointer`}
        onClick={() => startEditingLabel("shipTo")}
      >
        {labels.shipTo || t("Ship To")}
      </label>
    )}
  </div>

  <input
    placeholder={t("Customer Address")}
    value={shipTo}
    onChange={(e) => setShipTo(e.target.value)}
    className={`w-full border rounded px-3 py-2 transition-colors duration-300 
      ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
      }`}
  />
</div>
          </div>
        </div>

       {/* Middle section */}
<div className="flex-1 mt-10 lg:mt-0 lg:px-8">
  <h2
    className={`text-2xl font-semibold text-right pr-24 mb-2 ${
      darkMode ? "text-white" : "text-gray-900"
    }`}
  >
    {t("QUOTE")}
  </h2>

  <div className="space-y-6">
    {/* Invoice Number */}
    <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-[80%] ml-auto gap-2 sm:gap-x-4">
      <label
        className={`w-full sm:w-32 text-sm font-medium ${
          darkMode ? "text-white" : "text-gray-800"
        }`}
      >
      {t("#")}
      </label>
      <input
       placeholder={t("Invoice Number")}
        value={invoiceNumber}
        onChange={(e) => setInvoiceNumber(e.target.value)}
        className={`w-full sm:flex-1 border rounded px-3 py-2 transition-colors duration-300 
          ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
          }`}
      />
    </div>

    {/* Date Field */}
    <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-[80%] ml-auto gap-2 sm:gap-x-4">
      <div className="flex items-center">
        {isEditingLabel === "date" ? (
          <div className="flex items-center w-full sm:w-32">
            <input
              type="text"
              value={tempLabelValue}
              onChange={(e) => setTempLabelValue(e.target.value)}
              className={`border rounded px-2 py-1 w-full mr-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <button
              onClick={saveLabel}
              className={`text-xs mr-1 ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              ✓
            </button>
            <button
              onClick={cancelEditingLabel}
              className={`text-xs ${
                darkMode ? "text-red-400" : "text-red-500"
              }`}
            >
              ×
            </button>
          </div>
        ) : (
          <label
            className={`w-full sm:w-32 text-sm font-medium ${
              darkMode ? "text-white" : "text-gray-800"
            } cursor-pointer`}
            onClick={() => startEditingLabel("date")}
          >
            {labels.date || t("Date")}
          </label>
        )}
      </div>
      <div className="w-full sm:flex-1">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className={`w-full border rounded px-3 py-2 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 dark-calendar-icon"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
          }`}
        />
      </div>
    </div>

    {/* Payment Terms */}
    <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-[80%] ml-auto gap-2 sm:gap-x-4">
      <div className="flex items-center">
        {isEditingLabel === "paymentTerms" ? (
          <div className="flex items-center w-full sm:w-32">
            <input
              type="text"
              value={tempLabelValue}
              onChange={(e) => setTempLabelValue(e.target.value)}
              className={`border rounded px-2 py-1 w-full mr-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <button
              onClick={saveLabel}
              className={`text-xs mr-1 ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              ✓
            </button>
            <button
              onClick={cancelEditingLabel}
              className={`text-xs ${
                darkMode ? "text-red-400" : "text-red-500"
              }`}
            >
              ×
            </button>
          </div>
        ) : (
          <label
            className={`w-full sm:w-32 text-sm font-medium ${
              darkMode ? "text-white" : "text-gray-800"
            } cursor-pointer`}
            onClick={() => startEditingLabel("paymentTerms")}
          >
            {labels.paymentTerms || t("Payment Terms")}
          </label>
        )}
      </div>
      <input
        placeholder={t("Payment Terms")}
        value={paymentTerms}
        onChange={(e) => setPaymentTerms(e.target.value)}
        className={`w-full sm:flex-1 border rounded px-3 py-2 transition-colors duration-300 
          ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
          }`}
      />
    </div>

    {/* Due Date */}
    {/* <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-[80%] ml-auto gap-2 sm:gap-x-4">
      <div className="flex items-center">
        {isEditingLabel === "dueDate" ? (
          <div className="flex items-center w-full sm:w-32">
            <input
              type="text"
              value={tempLabelValue}
              onChange={(e) => setTempLabelValue(e.target.value)}
              className={`border rounded px-2 py-1 w-full mr-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <button
              onClick={saveLabel}
              className={`text-xs mr-1 ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              ✓
            </button>
            <button
              onClick={cancelEditingLabel}
              className={`text-xs ${
                darkMode ? "text-red-400" : "text-red-500"
              }`}
            >
              ×
            </button>
          </div>
        ) : (
          <label
            className={`w-full sm:w-32 text-sm font-medium ${
              darkMode ? "text-white" : "text-gray-800"
            } cursor-pointer`}
            onClick={() => startEditingLabel("dueDate")}
          >
            {labels.dueDate || t("Due Date")}
          </label>
        )}
      </div>
      <div className="w-full sm:flex-1">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`w-full border rounded px-3 py-2 transition-colors duration-300 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 dark-calendar-icon"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
          }`}
        />
      </div>
    </div> */}

    {/* PO Number */}
    <div className="flex flex-col sm:flex-row sm:items-center w-full sm:w-[80%] ml-auto gap-2 sm:gap-x-4">
      <div className="flex items-center">
        {isEditingLabel === "poNumber" ? (
          <div className="flex items-center w-full sm:w-32">
            <input
              type="text"
              value={tempLabelValue}
              onChange={(e) => setTempLabelValue(e.target.value)}
              className={`border rounded px-2 py-1 w-full mr-2 ${
                darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />
            <button
              onClick={saveLabel}
              className={`text-xs mr-1 ${
                darkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              ✓
            </button>
            <button
              onClick={cancelEditingLabel}
              className={`text-xs ${
                darkMode ? "text-red-400" : "text-red-500"
              }`}
            >
              ×
            </button>
          </div>
        ) : (
          <label
            className={`w-full sm:w-32 text-sm font-medium ${
              darkMode ? "text-white" : "text-gray-800"
            } cursor-pointer`}
            onClick={() => startEditingLabel("poNumber")}
          >
            {labels.poNumber || t("PO Number")}
          </label>
        )}
      </div>
      <input
        placeholder={t("PO Number")}
        value={poNumber}
        onChange={(e) => setPoNumber(e.target.value)}
        className={`w-full sm:flex-1 border rounded px-3 py-2 transition-colors duration-300 
          ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
          }`}
      />
    </div>
  </div>
</div>

{/* Right section */}
<div className="lg:w-48 mt-10 lg:mt-0 space-y-4 pt-20">
  <button
    onClick={handleDownloadClick}
    disabled={isDownloading}
    className={`mt-6 w-full py-2 rounded flex justify-center items-center transition-colors duration-300 ${
      darkMode
        ? isDownloading
          ? "bg-emerald-800 text-white cursor-not-allowed"
          : "bg-emerald-700 hover:bg-emerald-600 text-white"
        : isDownloading
          ? "bg-emerald-500 text-white cursor-not-allowed"
          : "bg-emerald-600 hover:bg-emerald-700 text-white"
    }`}
  >
    {isDownloading ? (
      <>
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
          />
        </svg>
        {t("Preparing PDF...")}
      </>
    ) : (
      t("Download Invoice")
    )}
  </button>

  <div>
    <label
      className={`block text-sm mb-1 ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      {t("Currency")}
    </label>
    <select
      className={`w-full border rounded px-2 py-1 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-700 border-gray-600 text-white"
          : "bg-white border-gray-300 text-gray-900"
      }`}
      value={icurrency}
      onChange={(e) => setiCurrency(e.target.value)}
    >
     <option value="USD">{t("USD ($)")}</option>
  <option value="EUR">{t("EUR (€)")}</option>
  <option value="GBP">{t("GBP (£)")}</option>
  <option value="JPY">{t("JPY (¥)")}</option>
  <option value="CNY">{t("CNY (¥)")}</option>
  <option value="AUD">{t("AUD (A$)")}</option>
  <option value="CAD">{t("CAD (C$)")}</option>
  <option value="CHF">{t("CHF (CHF)")}</option>
  <option value="INR">{t("INR (₹)")}</option>
  <option value="PKR">{t("PKR (₨)")}</option>
  <option value="ZAR">{t("ZAR (R)")}</option>
  <option value="SEK">{t("SEK (kr)")}</option>
  <option value="NOK">{t("NOK (kr)")}</option>
  <option value="DKK">{t("DKK (kr)")}</option>
  <option value="RUB">{t("RUB (₽)")}</option>
  <option value="SGD">{t("SGD (S$)")}</option>
  <option value="HKD">{t("HKD (HK$)")}</option>
  <option value="NZD">{t("NZD (NZ$)")}</option>
  <option value="THB">{t("THB (฿)")}</option>
  <option value="MYR">{t("MYR (RM)")}</option>
  <option value="SAR">{t("SAR (﷼)")}</option>

      </select>
  </div>

  <p
    onClick={handleSaveDefault}
    className={`text-sm cursor-pointer hover:underline ${
      darkMode ? "text-green-400" : "text-green-600"
    }`}
  >
    {t("Save Default")}
  </p>
</div>

      </div>

      {/* Item Table */}
      <div className="max-w-7xl mx-auto mt-8">
         <div
    className={`grid grid-cols-5 text-sm font-semibold rounded-t overflow-hidden transition-colors duration-300 ${
      darkMode ? "bg-gray-800 text-gray-100" : "bg-[#101C4E] text-white"
    }`}
  >
    {/* Item Label */}
    <div className="col-span-2 px-3 py-2">
      {isEditingLabel === "item" ? (
        <div className="flex items-center">
          <input
            type="text"
            value={tempLabelValue}
            onChange={(e) => setTempLabelValue(e.target.value)}
            className={`border rounded px-2 py-1 w-full mr-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <button
            onClick={saveLabel}
            className={`text-xs mr-1 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            ✓
          </button>
          <button
            onClick={cancelEditingLabel}
            className={`text-xs ${
              darkMode ? "text-red-400" : "text-red-500"
            }`}
          >
            ×
          </button>
        </div>
      ) : (
        <span
          onClick={() => startEditingLabel("item")}
          className="cursor-pointer"
        >
          {t(labels.item)}
        </span>
      )}
    </div>

    {/* Quantity */}
    <div className="px-3 py-2 text-center">
      {isEditingLabel === "quantity" ? (
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={tempLabelValue}
            onChange={(e) => setTempLabelValue(e.target.value)}
            className={`border rounded px-2 py-1 w-full mr-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <button
            onClick={saveLabel}
            className={`text-xs mr-1 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            ✓
          </button>
          <button
            onClick={cancelEditingLabel}
            className={`text-xs ${
              darkMode ? "text-red-400" : "text-red-500"
            }`}
          >
            ×
          </button>
        </div>
      ) : (
        <span
          onClick={() => startEditingLabel("quantity")}
          className="cursor-pointer"
        >
          {t(labels.quantity)}
        </span>
      )}
    </div>

    {/* Rate */}
    <div className="px-3 py-2 text-center">
      {isEditingLabel === "rate" ? (
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={tempLabelValue}
            onChange={(e) => setTempLabelValue(e.target.value)}
            className={`border rounded px-2 py-1 w-full mr-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <button
            onClick={saveLabel}
            className={`text-xs mr-1 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            ✓
          </button>
          <button
            onClick={cancelEditingLabel}
            className={`text-xs ${
              darkMode ? "text-red-400" : "text-red-500"
            }`}
          >
            ×
          </button>
        </div>
      ) : (
        <span
          onClick={() => startEditingLabel("rate")}
          className="cursor-pointer"
        >
          {t(labels.rate)}
        </span>
      )}
    </div>

    {/* Amount */}
    <div className="px-3 py-2 text-center">
      {isEditingLabel === "amount" ? (
        <div className="flex items-center justify-center">
          <input
            type="text"
            value={tempLabelValue}
            onChange={(e) => setTempLabelValue(e.target.value)}
            className={`border rounded px-2 py-1 w-full mr-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <button
            onClick={saveLabel}
            className={`text-xs mr-1 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            ✓
          </button>
          <button
            onClick={cancelEditingLabel}
            className={`text-xs ${
              darkMode ? "text-red-400" : "text-red-500"
            }`}
          >
            ×
          </button>
        </div>
      ) : (
        <span
          onClick={() => startEditingLabel("amount")}
          className="cursor-pointer"
        >
          {t(labels.amount)}
        </span>
      )}
    </div>
  </div>
         <div>
    {items.map((item) => (
      <div
        key={item.id}
        className={`group grid grid-cols-5 items-center relative transition-colors duration-300 ${
          darkMode
            ? "border-b border-gray-700"
            : "border-b border-gray-200"
        }`}
      >
        <input
          className={`col-span-2 px-3 py-2 border-r ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              : "bg-white border-gray-200 text-gray-900 placeholder-gray-500"
          }`}
          placeholder={t("Description of item/service...")}
          value={item.description}
          onChange={(e) =>
            handleDescriptionChange(item.id, e.target.value)
          }
        />
        <input
          type="number"
          className={`px-3 py-2 text-center border-r ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-200 text-gray-900"
          }`}
          value={item.quantity || ""}
          onChange={(e) =>
            handleQuantityChange(item.id, e.target.value)
          }
           placeholder= "0"
          min="0"
          step="1"
        />
        <div
          className={`flex items-center px-2 py-2 border-r ${
            darkMode
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          <span className="mr-1">{getCurrencySymbol()}</span>
          <input
            className={`w-full outline-none text-right ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
            type="number"
            value={item.price || ""}
            onChange={(e) =>
              handlePriceChange(item.id, e.target.value)
            }
             placeholder= "0"
            min="0"
            step="0.01"
          />
        </div>
        <div
          className={`text-right px-3 py-2 ${
            darkMode ? "text-gray-100" : "text-gray-800"
          }`}
        >
          {getCurrencySymbol()}
          {(Number(item.amount) || 0).toFixed(2)}
        </div>

        {/* X button (shown on hover) */}
        <button
          onClick={() => removeItem(item.id)}
          className={`absolute right-[-1.5rem] font-bold opacity-0 group-hover:opacity-100 transition ${
            darkMode ? "text-red-400" : "text-red-500"
          }`}
        >
          ×
        </button>
      </div>
    ))}

    {/* Add Line Item Button */}
    <button
      onClick={addItem}
      className={`mt-2 px-4 py-1 border rounded hover:bg-green-50 transition-colors duration-300 ${
        darkMode
          ? "border-green-500 text-green-400 hover:bg-gray-800"
          : "border-green-600 text-green-600 hover:bg-green-50"
      }`}
    >
      + {t("Line Item")}
    </button>
  </div>

        {/* Remaining Section After Line Item */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notes and Terms */}
       <div className="space-y-4">
  {/* Notes Section */}
  <div>
    <div className="flex items-center">
      {isEditingLabel === "notes" ? (
        <div className="flex items-center">
          <input
            type="text"
            value={tempLabelValue}
            onChange={(e) => setTempLabelValue(e.target.value)}
            className={`border rounded px-2 py-1 w-32 mr-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <button
            onClick={saveLabel}
            className={`text-xs mr-1 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            ✓
          </button>
          <button
            onClick={cancelEditingLabel}
            className={`text-xs ${
              darkMode ? "text-red-400" : "text-red-500"
            }`}
          >
            ×
          </button>
        </div>
      ) : (
        <label
          className={`block text-sm font-medium mb-1 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } cursor-pointer`}
          onClick={() => startEditingLabel("notes")}
        >
          {t(labels.notes)}
        </label>
      )}
    </div>
    <textarea
      placeholder={t("Notes – any relevant information not already covered")}
      value={notes}
      onChange={(e) => setNotes(e.target.value)}
      className={`w-full border rounded px-3 py-2 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
      }`}
      rows={3}
    ></textarea>
  </div>

  {/* Terms Section */}
  <div>
    <div className="flex items-center">
      {isEditingLabel === "terms" ? (
        <div className="flex items-center">
          <input
            type="text"
            value={tempLabelValue}
            onChange={(e) => setTempLabelValue(e.target.value)}
            className={`border rounded px-2 py-1 w-32 mr-2 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
          <button
            onClick={saveLabel}
            className={`text-xs mr-1 ${
              darkMode ? "text-green-400" : "text-green-600"
            }`}
          >
            ✓
          </button>
          <button
            onClick={cancelEditingLabel}
            className={`text-xs ${
              darkMode ? "text-red-400" : "text-red-500"
            }`}
          >
            ×
          </button>
        </div>
      ) : (
        <label
          className={`block text-sm font-medium mb-1 ${
            darkMode ? "text-gray-300" : "text-gray-700"
          } cursor-pointer`}
          onClick={() => startEditingLabel("terms")}
        >
          {t(labels.terms)}
        </label>
      )}
    </div>
    <textarea
      placeholder={t("Terms and conditions – late fees, payment methods, delivery schedule")}
      value={terms}
      onChange={(e) => setTerms(e.target.value)}
      className={`w-full border rounded px-3 py-2 transition-colors duration-300 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
      }`}
      rows={3}
    />
  </div>
</div>


          {/* Summary */}
          <div
            className={`space-y-2 p-4 rounded-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
          >
          <div className="flex justify-between">
  <div className="flex items-center">
    {isEditingLabel === "subtotal" ? (
      <div className="flex items-center">
        <input
          type="text"
          value={tempLabelValue}
          onChange={(e) => setTempLabelValue(e.target.value)}
          className={`border rounded px-2 py-1 w-32 mr-2 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />
        <button
          onClick={saveLabel}
          className={`text-xs mr-1 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          ✓
        </button>
        <button
          onClick={cancelEditingLabel}
          className={`text-xs ${
            darkMode ? "text-red-400" : "text-red-500"
          }`}
        >
          ×
        </button>
      </div>
    ) : (
      <span
        className={`cursor-pointer ${
          darkMode ? "text-gray-300" : "text-gray-700"
        }`}
        onClick={() => startEditingLabel("subtotal")}
      >
        {t(labels.subtotal)}
      </span>
    )}
  </div>
  <span className={darkMode ? "text-gray-100" : "text-gray-900"}>
    {getCurrencySymbol()}
    {calculateSubtotal().toFixed(2)}
  </span>
</div>


            {/* Tax Section */}
           <div className="flex justify-between items-center">
  <div className="flex items-center">
    {isEditingLabel === "tax" ? (
      <div className="flex items-center">
        <input
          type="text"
          value={tempLabelValue}
          onChange={(e) => setTempLabelValue(e.target.value)}
          className={`border rounded px-2 py-1 w-32 mr-2 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />
        <button
          onClick={saveLabel}
          className={`text-xs mr-1 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          ✓
        </button>
        <button
          onClick={cancelEditingLabel}
          className={`text-xs ${
            darkMode ? "text-red-400" : "text-red-500"
          }`}
        >
          ×
        </button>
      </div>
    ) : (
      <span
        className={`cursor-pointer ${
          darkMode ? "text-green-400" : "text-green-600"
        }`}
        onClick={() => startEditingLabel("tax")}
      >
        {t(labels.tax)}
      </span>
    )}
    {!showTaxInput && (
      <button
        onClick={() => setShowTaxInput(true)}
        className={`ml-2 ${
          darkMode
            ? "text-green-400 hover:text-green-300"
            : "text-green-600 hover:text-green-800"
        }`}
      >
        +
      </button>
    )}
  </div>

  {showTaxInput ? (
    <div className="flex items-center group">
      {isTaxPercentage ? (
        <>
          <input
            type="number"
            value={taxRate || ""}
            onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
            className={`border rounded px-2 py-1 w-20 mr-2 text-right transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
             placeholder= "0"
            min="0"
            max="100"
            step="0.1"
          />
          <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
            %
          </span>
        </>
      ) : (
        <>
          <span
            className={`mr-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {getCurrencySymbol()}
          </span>
          <input
            type="number"
            value={taxAmount || ""}
            onChange={(e) => setTaxAmount(parseFloat(e.target.value) || 0)}
            className={`border rounded px-2 py-1 w-20 text-right transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
             placeholder= "0"
            min="0"
            step="0.01"
          />
        </>
      )}
      <button
        onClick={() => setIsTaxPercentage(!isTaxPercentage)}
        className={`ml-2 ${
          darkMode
            ? "text-blue-400 hover:text-blue-300"
            : "text-blue-600 hover:text-blue-800"
        }`}
        title="Toggle between percentage and amount"
      >
        ⇄
      </button>
      <button
        onClick={() => {
          setShowTaxInput(false);
          setTaxRate(0);
          setTaxAmount(0);
        }}
        className={`ml-2 opacity-0 group-hover:opacity-100 ${
          darkMode ? "text-red-400" : "text-red-500"
        }`}
      >
        ×
      </button>
    </div>
  ) : (
    <span className={darkMode ? "text-green-400" : "text-green-600"}>
      {getCurrencySymbol()}
      {calculateTaxAmount().toFixed(2)}
    </span>
  )}
</div>


            {/* Discount Section */}
        <div className="flex justify-between items-center">
  <div className="flex items-center">
    {isEditingLabel === "discount" ? (
      <div className="flex items-center">
        <input
          type="text"
          value={tempLabelValue}
          onChange={(e) => setTempLabelValue(e.target.value)}
          className={`border rounded px-2 py-1 w-32 mr-2 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />
        <button
          onClick={saveLabel}
          className={`text-xs mr-1 ${
            darkMode ? "text-green-400" : "text-green-600"
          }`}
        >
          ✓
        </button>
        <button
          onClick={cancelEditingLabel}
          className={`text-xs ${
            darkMode ? "text-red-400" : "text-red-500"
          }`}
        >
          ×
        </button>
      </div>
    ) : (
      <span
        className={`cursor-pointer ${
          darkMode ? "text-green-400" : "text-green-600"
        }`}
        onClick={() => startEditingLabel("discount")}
      >
        {t(labels.discount)}
      </span>
    )}
    {!showDiscountInput && (
      <button
        onClick={() => setShowDiscountInput(true)}
        className={`ml-2 ${
          darkMode
            ? "text-green-400 hover:text-green-300"
            : "text-green-600 hover:text-green-800"
        }`}
      >
        +
      </button>
    )}
  </div>

  {showDiscountInput ? (
    <div className="flex items-center group">
      {isDiscountPercentage ? (
        <>
          <input
            type="number"
            value={discountPercentage || ""}
            onChange={(e) =>
              setDiscountPercentage(parseFloat(e.target.value) || 0)
            }
            className={`border rounded px-2 py-1 w-20 mr-2 text-right transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
             placeholder= "0"
            min="0"
            max="100"
            step="0.1"
          />
          <span
            className={darkMode ? "text-gray-300" : "text-gray-700"}
          >
            %
          </span>
        </>
      ) : (
        <>
          <span
            className={`mr-1 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {getCurrencySymbol()}
          </span>
          <input
            type="number"
            value={discountFixed || ""}
            onChange={(e) =>
              setDiscountFixed(parseFloat(e.target.value) || 0)
            }
            className={`border rounded px-2 py-1 w-20 text-right transition-colors duration-300 ${
              darkMode
                ? "bg-gray-700 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
             placeholder= "0"
            min="0"
            step="0.1"
          />
        </>
      )}
      <button
        onClick={() => setIsDiscountPercentage(!isDiscountPercentage)}
        className={`ml-2 ${
          darkMode
            ? "text-blue-400 hover:text-blue-300"
            : "text-blue-600 hover:text-blue-800"
        }`}
        title="Toggle between percentage and amount"
      >
        ⇄
      </button>
      <button
        onClick={() => {
          setShowDiscountInput(false);
          setDiscountPercentage(0);
          setDiscountFixed(0);
        }}
        className={`ml-2 opacity-0 group-hover:opacity-100 ${
          darkMode ? "text-red-400" : "text-red-500"
        }`}
      >
        ×
      </button>
    </div>
  ) : (
    <span className={darkMode ? "text-green-400" : "text-green-600"}>
      -{getCurrencySymbol()}
      {calculateDiscountAmount().toFixed(2)}
    </span>
  )}
</div>


            {/* Shipping Section */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {isEditingLabel === "shipping" ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={tempLabelValue}
                      onChange={(e) => setTempLabelValue(e.target.value)}
                      className={`border rounded px-2 py-1 w-32 mr-2 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                    <button
                      onClick={saveLabel}
                      className={`text-xs mr-1 ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelEditingLabel}
                      className={`text-xs ${
                        darkMode ? "text-red-400" : "text-red-500"
                      }`}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span
                    className={
                      darkMode
                        ? "text-green-400 cursor-pointer"
                        : "text-green-600 cursor-pointer"
                    }
                    onClick={() => startEditingLabel("shipping")}
                  >
                 {t(labels.shipping)}

                  </span>
                )}
                {!showShippingInput && (
                  <button
                    onClick={() => setShowShippingInput(true)}
                    className={`ml-2 ${
                      darkMode
                        ? "text-green-400 hover:text-green-300"
                        : "text-green-600 hover:text-green-800"
                    }`}
                  >
                    +
                  </button>
                )}
              </div>
              {showShippingInput ? (
                <div className="flex items-center group">
                  <span
                    className={`mr-1 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    {getCurrencySymbol()}
                  </span>
                  <input
                    type="number"
                    value={shippingAmount || ""}
                    onChange={(e) =>
                      setShippingAmount(parseFloat(e.target.value) || 0)
                    }
                    className={`border rounded px-2 py-1 w-20 text-right transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                     placeholder= "0"
                    min="0"
                    step="0.01"
                  />
                  <button
                    onClick={() => {
                      setShowShippingInput(false);
                      setShippingAmount(0);
                    }}
                    className={`ml-2 opacity-0 group-hover:opacity-100 ${
                      darkMode ? "text-red-400" : "text-red-500"
                    }`}
                  >
                    ×
                  </button>
                </div>
              ) : (
                <span
                  className={darkMode ? "text-green-400" : "text-green-600"}
                >
                  +{getCurrencySymbol()}
                  {(Number(shippingAmount) || 0).toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <div className="flex items-center">
                {isEditingLabel === "total" ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={tempLabelValue}
                      onChange={(e) => setTempLabelValue(e.target.value)}
                      className={`border rounded px-2 py-1 w-32 mr-2 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                    <button
                      onClick={saveLabel}
                      className={`text-xs mr-1 ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelEditingLabel}
                      className={`text-xs ${
                        darkMode ? "text-red-400" : "text-red-500"
                      }`}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span
                    className={
                      darkMode
                        ? "text-white cursor-pointer"
                        : "text-gray-900 cursor-pointer"
                    }
                    onClick={() => startEditingLabel("total")}
                  >
                    {t(labels.total)}
                  </span>
                )}
              </div>
              <span className={darkMode ? "text-white" : "text-gray-900"}>
                {getCurrencySymbol()}
                {calculateTotal().toFixed(2)}
              </span>
            </div>

            {/* <div className="flex justify-between items-center">
              <div className="flex items-center">
                {isEditingLabel === "amountPaid" ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={tempLabelValue}
                      onChange={(e) => setTempLabelValue(e.target.value)}
                      className={`border rounded px-2 py-1 w-32 mr-2 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                    <button
                      onClick={saveLabel}
                      className={`text-xs mr-1 ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelEditingLabel}
                      className={`text-xs ${
                        darkMode ? "text-red-400" : "text-red-500"
                      }`}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span
                    className={
                      darkMode
                        ? "text-gray-300 cursor-pointer"
                        : "text-gray-700 cursor-pointer"
                    }
                    onClick={() => startEditingLabel("amountPaid")}
                  >
                   {t(labels.amountPaid)}
                  </span>
                )}
              </div>
              <div className="flex items-center">
                <span
                  className={`mr-1 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {getCurrencySymbol()}
                </span>
                <input
                  type="number"
                  value={amountPaid}
                  onChange={(e) =>
                    setAmountPaid(parseFloat(e.target.value) || 0)
                  }
                  className={`border rounded px-2 py-1 w-24 text-right transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                  min="0"
                  step="0.01"
                />
              </div>
            </div> */}
{/* 
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <div className="flex items-center">
                {isEditingLabel === "balanceDue" ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={tempLabelValue}
                      onChange={(e) => setTempLabelValue(e.target.value)}
                      className={`border rounded px-2 py-1 w-32 mr-2 ${
                        darkMode
                          ? "bg-gray-700 border-gray-600 text-white"
                          : "bg-white border-gray-300 text-gray-900"
                      }`}
                    />
                    <button
                      onClick={saveLabel}
                      className={`text-xs mr-1 ${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                    >
                      ✓
                    </button>
                    <button
                      onClick={cancelEditingLabel}
                      className={`text-xs ${
                        darkMode ? "text-red-400" : "text-red-500"
                      }`}
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <span
                    className={
                      darkMode
                        ? "text-white cursor-pointer"
                        : "text-gray-900 cursor-pointer"
                    }
                    onClick={() => startEditingLabel("balanceDue")}
                  >
               {t(labels.balanceDue)}
                  </span>
                )}
              </div>
              <span className={darkMode ? "text-white" : "text-gray-900"}>
                {getCurrencySymbol()}
                {calculateBalanceDue().toFixed(2)}
              </span>
            </div> */}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
