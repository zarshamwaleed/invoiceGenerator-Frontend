// src/components/HomePage.js
import React, { useState, useRef, useContext, useEffect } from "react";
import Swal from 'sweetalert2';
import Footer from "./Footer";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { InvoiceContext } from "../context/InvoiceContext";
 import { useLocation } from 'react-router-dom';
export default function HomePage() {
  const { darkMode } = useContext(ThemeContext);
  const { invoiceData, setInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();

 

const location = useLocation();

// Helper to map pathname to invoice type
const getInvoiceType = (path) => {
  if (path === '/') return 'INVOICE';
  if (path.includes('credit-note')) return 'CREDIT NOTE';
  if (path.includes('quote')) return 'QUOTE';
  if (path.includes('purchase-order')) return 'PURCHASE ORDER';
  return 'INVOICE';
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
      billTo: "Bill To",
      shipTo: "Ship To",
      date: "Date",
      paymentTerms: "Payment Terms",
      dueDate: "Due Date",
      poNumber: "PO Number",
      item: "Item",
      quantity: "Quantity",
      rate: "Rate",
      amount: "Amount",
      notes: "Notes",
      terms: "Terms",
      subtotal: "Subtotal",
      tax: "Tax",
      discount: "Discount",
      shipping: "Shipping",
      total: "Total",
      amountPaid: "Amount Paid",
      balanceDue: "Balance Due",
    }
  );

  const [ilabels, setiLabels] = useState({
    item: "Item",
    quantity: "Quantity",
    rate: "Rate",
    amount: "Amount",
    notes: "Notes",
    terms: "Terms",
    subtotal: "Subtotal",
    tax: "Tax",
    discount: "Discount",
    shipping: "Shipping",
    total: "Total",
    amountPaid: "Amount Paid",
    balanceDue: "Balance Due",
    from: "From",
    billTo: "Bill To",
    shipTo: "Ship To",
    paymentTerms: "Payment Terms",
    dueDate: "Due Date",
    poNumber: "PO Number",
    currency: "Currency",
  });

  // Label editing states
  const [isEditingLabel, setIsEditingLabel] = useState(null);
  const [tempLabelValue, setTempLabelValue] = useState("");

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
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setLogo(base64); // Preview in UI
        setiLogo(base64); // Send to backend
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
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Calculate all amounts
  const subtotal = calculateSubtotal();
  const tax = calculateTaxAmount();
  const discount = calculateDiscountAmount();
  const total = calculateTotal();
  const balanceDue = calculateBalanceDue();

  const invoiceDataToSave = {
     type: invoiceType,
    logo: ilogo,
    from,
    billTo,
    shipTo,
    date: date || new Date().toISOString().split('T')[0],
    paymentTerms,
    dueDate,
    poNumber,
    currency: icurrency,
    subtotal,
    tax,
    discount,
    shipping: shippingAmount,
    total,
    amountPaid: amountPaid,
    balanceDue,
    notes,
    terms,
    invoiceNumber: invoiceNumber || `INV-${Date.now()}`,
    lineItems: items.map(item => ({
      description: item.description,
      quantity: item.quantity,
      rate: item.price,
      amount: item.amount
    })),
    labels: {
      ...labels,
      // Ensure all label fields are included
      from: labels.from || "From",
      billTo: labels.billTo || "Bill To",
      shipTo: labels.shipTo || "Ship To",
      paymentTerms: labels.paymentTerms || "Payment Terms",
      dueDate: labels.dueDate || "Due Date",
      poNumber: labels.poNumber || "PO Number",
      currency: labels.currency || "Currency"
    }
  };

  // Update context
  setInvoiceData(invoiceDataToSave);

  try {
    const response = await fetch("http://localhost:5000/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoiceDataToSave),
    });

    if (!response.ok) {
      throw new Error("Failed to save invoice");
    }

    const result = await response.json();
    console.log("✅ Invoice saved:", result);
    return result;
  } catch (error) {
    console.error("❌ Error saving invoice:", error);
    throw error;
  }
};

  // Update the download handler
 const handleDownloadClick = async (e) => {
  e.preventDefault();

  try {
    // First save invoice to database
    const savedInvoice = await handleSubmit(e);

    // Update invoice number if returned by backend
    if (savedInvoice.invoice?.invoiceNumber) {
      setInvoiceNumber(savedInvoice.invoice.invoiceNumber);
    }

    // Generate PDF
    requestAnimationFrame(() => {
      toPDF();
      navigate('/thankyou');
    });

  } catch (error) {
  console.error("Error in download process:", error);

  Swal.fire({
    title: '❌ Failed to Generate Invoice',
    text: 'Something went wrong during the download process. Please try again.',
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d33'
  });
}

};

const handleSaveDefault = async () => {
 if (!invoiceNumber) {
  Swal.fire({
    title: '⚠️ Missing Invoice Number',
    text: 'Please enter an invoice number before continuing.',
    icon: 'warning',
    confirmButtonText: 'OK',
    confirmButtonColor: '#f0ad4e'
  });
  return;
}

  const confirmUpdate = window.confirm(
    "Do you want to make this invoice the default template, overwriting the current one?"
  );

  if (!confirmUpdate) return;

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
      lineItems: items.map(item => ({
        description: item.description,
        quantity: item.quantity,
        rate: item.price,
        amount: item.amount
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
      labels: { ...labels }
    };

    // Update the invoice in the database
    const response = await fetch(`http://localhost:5000/invoice/${invoiceNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInvoice)
    });

    if (!response.ok) throw new Error('Failed to update invoice');

    const result = await response.json();
    Swal.fire({
  title: '✅ Invoice Updated!',
  text: 'Your invoice has been updated successfully.',
  icon: 'success',
  confirmButtonText: 'Great!',
  confirmButtonColor: '#28a745'
});

    return result;
  } catch (error) {
  console.error('Error updating invoice:', error);

  Swal.fire({
    title: '❌ Failed to Update Invoice',
    text: 'Something went wrong while updating the invoice. Please try again.',
    icon: 'error',
    confirmButtonText: 'OK',
    confirmButtonColor: '#d33'
  });
}

};

const checkInvoiceExists = async (invoiceNumber) => {
  try {
    const response = await fetch(`http://localhost:5000/invoice/check/${invoiceNumber}`);
    if (!response.ok) throw new Error('Failed to check invoice');
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error('Error checking invoice:', error);
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
          <h1 className="text-3xl font-semibold tracking-wide mb-1">{invoiceType}</h1>

          <p className="text-sm text-gray-500">
            # {invoiceNumber || "Pending"}
          </p>
          <div className="mt-2 text-sm space-y-1">
            <p>
              <strong>{labels.date || "Date"}:</strong> {date}
            </p>
            <p>
              <strong>{labels.paymentTerms || "Payment Terms"}:</strong>{" "}
              {paymentTerms}
            </p>
            <p>
              <strong>{labels.dueDate || "Due Date"}:</strong> {dueDate}
            </p>
            <p>
              <strong>{labels.poNumber || "PO Number"}:</strong> {poNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Bill/Ship Info */}
      <div className="flex justify-between text-sm mb-8">
        <div>
          <p className="text-gray-500 font-semibold">
            {labels.billTo || "Bill To"}:
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
            <span>{labels.subtotal || "Subtotal"}:</span>
            <span>
              {getCurrencySymbol()}
              {calculateSubtotal().toFixed(2)}
            </span>
          </div>
          {(taxRate > 0 || taxAmount > 0) && (
            <div className="flex justify-between">
              <span>
                {labels.tax || "Tax"} ({taxRate}%):
              </span>
              <span>
                {getCurrencySymbol()}
                {calculateTaxAmount().toFixed(2)}
              </span>
            </div>
          )}
          {shippingAmount > 0 && (
            <div className="flex justify-between">
              <span>{labels.shipping || "Shipping"}:</span>
              <span>
                {getCurrencySymbol()}
                {(Number(shippingAmount) || 0).toFixed(2)}
              </span>
            </div>
          )}
          {(discountPercentage > 0 || discountFixed > 0) && (
            <div className="flex justify-between">
              <span>{labels.discount || "Discount"}:</span>
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
            <span>{labels.amountPaid || "Amount Paid"}:</span>
            <span>
              {getCurrencySymbol()}
              {(amountPaid ?? 0).toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between font-bold pt-1 border-t mt-2 text-sm">
            <span>{labels.balanceDue || "Balance Due"}:</span>
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
          <h1
            className={`text-3xl font-bold mb-2 ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Free Invoice Template
          </h1>
          <h2
            className={`text-xl font-semibold mb-4 ${
              darkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Make beautiful Invoices with one click!
          </h2>
          <p className={`mb-2 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Welcome to the original Invoice Generator, trusted by millions of
            people. Invoice Generator lets you instantly make Invoices with our
            attractive invoice template straight from your web browser.
          </p>
          <p className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            Did we also mention that Invoice Generator lets you generate an
            unlimited number of Invoices?
          </p>
          <button
            className={`px-4 py-2 rounded hover:bg-green-700 transition-colors duration-300 ${
              darkMode ? "bg-green-600 text-white" : "bg-green-600 text-white"
            }`}
            onClick={handleHide}
          >
            OK, got it!
          </button>
        </div>
      )}

      {/* Invoice Section */}
      <div
        className={`max-w-7xl mx-auto mt-10 border rounded-lg p-6 flex flex-col lg:flex-row transition-colors duration-300 ${
          darkMode
            ? "bg-gray-800 border-gray-700"
            : "bg-gray-50 border-gray-200"
        }`}
      >
        {/* Left section */}
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
              "+ Add Your Logo"
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
            placeholder="Who is this from?"
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
                    {labels.billTo}
                  </label>
                )}
              </div>
              <input
                placeholder="Who is this to?"
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
                    {labels.shipTo}
                  </label>
                )}
              </div>

              <input
                placeholder="(optional)"
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
    <div className="flex">
  <h2 className={`text-2xl font-semibold ml-auto mb-2 pr-20 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
    CREDIT NOTE
  </h2>
</div>
          <div className="space-y-4">
            <div className="flex items-center w-[80%] ml-auto gap-x-4">
              <label
                className={`w-32 text-sm font-medium ${
                  darkMode ? "text-white" : "text-gray-800"
                }`}
              >
                #
              </label>

              <input
                placeholder="#"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className={`flex-1 border rounded px-3 py-2 transition-colors duration-300 max-w-[200px] 
                    ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    }`}
              />
            </div>

            <div className="flex items-center w-[80%] ml-auto gap-x-4">
              <div className="flex items-center">
                {isEditingLabel === "date" ? (
                  <div className="flex items-center w-32">
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
                    className={`w-32 text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    } cursor-pointer`}
                    onClick={() => startEditingLabel("date")}
                  >
                    {labels.date}
                  </label>
                )}
              </div>

              <input
                type="text"
                placeholder="Date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                className={`flex-1 border rounded px-3 py-2 transition-colors duration-300 max-w-[200px]
    ${
      darkMode
        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
    }`}
              />
            </div>

            <div className="flex items-center w-[80%] ml-auto gap-x-4">
              <div className="flex items-center">
                {isEditingLabel === "paymentTerms" ? (
                  <div className="flex items-center w-32">
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
                    className={`w-32 text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    } cursor-pointer`}
                    onClick={() => startEditingLabel("paymentTerms")}
                  >
                    {labels.paymentTerms}
                  </label>
                )}
              </div>

              <input
                placeholder="Payment Terms"
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                className={`flex-1 border rounded px-3 py-2 transition-colors duration-300 max-w-[200px] 
                    ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                    }`}
              />
            </div>

           
            <div className="flex items-center w-[80%] ml-auto gap-x-4">
              <div className="flex items-center">
                {isEditingLabel === "poNumber" ? (
                  <div className="flex items-center w-32">
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
                    className={`w-32 text-sm font-medium ${
                      darkMode ? "text-white" : "text-gray-800"
                    } cursor-pointer`}
                    onClick={() => startEditingLabel("poNumber")}
                  >
                    {labels.poNumber}
                  </label>
                )}
              </div>

              <input
                placeholder="PO Number"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                className={`flex-1 border rounded px-3 py-2 transition-colors duration-300 max-w-[200px] 
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
            onClick={handleDownloadClick} // Only call handleDownloadClick, it handles everything
            className={`mt-6 w-full py-2 rounded transition-colors duration-300 ${
              darkMode
                ? "bg-emerald-700 hover:bg-emerald-600 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            Download Invoice
          </button>

          <div>
            <label
              className={`block text-sm mb-1 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Currency
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
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="CNY">CNY (¥)</option>
              <option value="AUD">AUD (A$)</option>
              <option value="CAD">CAD (C$)</option>
              <option value="CHF">CHF (CHF)</option>
              <option value="INR">INR (₹)</option>
              <option value="PKR">PKR (₨)</option>
              <option value="ZAR">ZAR (R)</option>
              <option value="SEK">SEK (kr)</option>
              <option value="NOK">NOK (kr)</option>
              <option value="DKK">DKK (kr)</option>
              <option value="RUB">RUB (₽)</option>
              <option value="SGD">SGD (S$)</option>
              <option value="HKD">HKD (HK$)</option>
              <option value="NZD">NZD (NZ$)</option>
              <option value="THB">THB (฿)</option>
              <option value="MYR">MYR (RM)</option>
              <option value="SAR">SAR (﷼)</option>
            </select>
          </div>

         <p
  onClick={handleSaveDefault}
  className={`text-sm cursor-pointer hover:underline ${
    darkMode ? "text-green-400" : "text-green-600"
  }`}
>
  Save Default
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
                {labels.item}
              </span>
            )}
          </div>
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
                {labels.quantity}
              </span>
            )}
          </div>
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
                {labels.rate}
              </span>
            )}
          </div>
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
                {labels.amount}
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
                placeholder="Description of item/service..."
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
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
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
                    darkMode
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-900"
                  }`}
                  type="number"
                  value={item.price}
                  onChange={(e) => handlePriceChange(item.id, e.target.value)}
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

          <button
            onClick={addItem}
            className={`mt-2 px-4 py-1 border rounded hover:bg-green-50 transition-colors duration-300 ${
              darkMode
                ? "border-green-500 text-green-400 hover:bg-gray-800"
                : "border-green-600 text-green-600 hover:bg-green-50"
            }`}
          >
            + Line Item
          </button>
        </div>

        {/* Remaining Section After Line Item */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notes and Terms */}
          <div className="space-y-4">
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
                    {labels.notes}
                  </label>
                )}
              </div>
              <textarea
                placeholder="Notes – any relevant information not already covered"
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
                    {labels.terms}
                  </label>
                )}
              </div>
              <textarea
                placeholder="Terms and conditions – late fees, payment methods, delivery schedule"
                value={terms} // ✅ bind value
                onChange={(e) => setTerms(e.target.value)} // ✅ update state
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
                    className={
                      darkMode
                        ? "text-gray-300 cursor-pointer"
                        : "text-gray-700 cursor-pointer"
                    }
                    onClick={() => startEditingLabel("subtotal")}
                  >
                    {labels.subtotal}
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
                    className={
                      darkMode
                        ? "text-green-400 cursor-pointer"
                        : "text-green-600 cursor-pointer"
                    }
                    onClick={() => startEditingLabel("tax")}
                  >
                    {labels.tax}
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
                        value={taxRate}
                        onChange={(e) =>
                          setTaxRate(parseFloat(e.target.value) || 0)
                        }
                        className={`border rounded px-2 py-1 w-20 mr-2 text-right transition-colors duration-300 ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
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
                        value={taxAmount}
                        onChange={(e) =>
                          setTaxAmount(parseFloat(e.target.value) || 0)
                        }
                        className={`border rounded px-2 py-1 w-20 text-right transition-colors duration-300 ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
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
                <span
                  className={darkMode ? "text-green-400" : "text-green-600"}
                >
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
                    className={
                      darkMode
                        ? "text-green-400 cursor-pointer"
                        : "text-green-600 cursor-pointer"
                    }
                    onClick={() => startEditingLabel("discount")}
                  >
                    {labels.discount}
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
                        value={discountPercentage}
                        onChange={(e) =>
                          setDiscountPercentage(parseFloat(e.target.value) || 0)
                        }
                        className={`border rounded px-2 py-1 w-20 mr-2 text-right transition-colors duration-300 ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
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
                        value={discountFixed}
                        onChange={(e) =>
                          setDiscountFixed(parseFloat(e.target.value) || 0)
                        }
                        className={`border rounded px-2 py-1 w-20 text-right transition-colors duration-300 ${
                          darkMode
                            ? "bg-gray-700 border-gray-600 text-white"
                            : "bg-white border-gray-300 text-gray-900"
                        }`}
                        min="0"
                        step="0.01"
                      />
                    </>
                  )}
                  <button
                    onClick={() =>
                      setIsDiscountPercentage(!isDiscountPercentage)
                    }
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
                <span
                  className={darkMode ? "text-green-400" : "text-green-600"}
                >
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
                    {labels.shipping}
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
                    value={shippingAmount}
                    onChange={(e) =>
                      setShippingAmount(parseFloat(e.target.value) || 0)
                    }
                    className={`border rounded px-2 py-1 w-20 text-right transition-colors duration-300 ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-white"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
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
                    {labels.total}
                  </span>
                )}
              </div>
              <span className={darkMode ? "text-white" : "text-gray-900"}>
                {getCurrencySymbol()}
                {calculateTotal().toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
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
                    {labels.amountPaid}
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
            </div>

           
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
