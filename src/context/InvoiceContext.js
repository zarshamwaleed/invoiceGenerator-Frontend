import React, { createContext, useState, useContext } from 'react';

export const InvoiceContext = createContext();

const defaultInvoiceData = {
  from: "",
  billTo: "",
  shipTo: "",
  date: "",
  paymentTerms: "",
  dueDate: "",
  poNumber: "",
  currency: "USD",
  amountPaid: 0,
  lineItems: [{ id: 1, description: "", quantity: 1, price: 0, amount: 0 }],
  notes: "",
  terms: "",
  invoiceNumber: "",
  shipping: 0,
  taxRate: 0,
  taxAmount: 0,
  discountPercentage: 0,
  discountFixed: 0,
  isTaxPercentage: true,
  isDiscountPercentage: false,
  labels: {
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
    balanceDue: "Balance Due"
  }
};

export const InvoiceProvider = ({ children }) => {
  const [invoiceData, setInvoiceData] = useState(defaultInvoiceData);

  const resetInvoiceData = () => setInvoiceData(defaultInvoiceData);

  return (
    <InvoiceContext.Provider value={{ invoiceData, setInvoiceData, resetInvoiceData }}>
      {children}
    </InvoiceContext.Provider>
  );
};

// ✅ This is the missing export you need in History.js
export const useInvoiceContext = () => useContext(InvoiceContext);
