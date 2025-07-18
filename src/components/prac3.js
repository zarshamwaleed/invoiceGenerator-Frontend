// ✅ define outside so it's always accessible
let formattedItems = [];

// If invoice has line items, map them
if (invoice.lineItems && invoice.lineItems.length > 0) {
  formattedItems = invoice.lineItems.map((item, index) => ({
    id: index + 1,
    description: item.description || "",
    quantity: item.quantity || 1,
    price: item.rate || 0,
    amount: item.amount || 0
  }));

  setItems(formattedItems);
}

// Set labels if present
if (invoice.labels) {
  setLabels(invoice.labels);
}

// Set tax and discount
setTaxRate(invoice.taxRate || 0);
setTaxAmount(invoice.tax || 0);
setDiscountPercentage(invoice.discountPercentage || 0);
setDiscountFixed(invoice.discount || 0);

// ✅ Now formattedItems is always defined, even if empty
setInvoiceData({
  ...invoiceData,
  ...invoice,
  lineItems: formattedItems.length > 0 ? formattedItems : invoiceData.lineItems
});
