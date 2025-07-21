import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import Footer from './Footer';
import { ThemeContext } from '../context/ThemeContext';
import { InvoiceContext } from '../context/InvoiceContext';
import { useInvoiceContext } from '../context/InvoiceContext';
export default function History() {
  const { darkMode } = useContext(ThemeContext);  
  const { setInvoiceData } = useContext(InvoiceContext);
  const navigate = useNavigate();
  const location = useLocation();
// const { resetInvoiceData } = useContext(InvoiceContext);
 const { resetInvoiceData } = useInvoiceContext(); // Only declare once here
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const getTypeFromPath = (path) => {
    if (path === '/') return 'INVOICE';
    if (path.includes('credit-note')) return 'CREDIT NOTE';
    if (path.includes('quote')) return 'QUOTE';
    if (path.includes('purchase-order')) return 'PURCHASE ORDER';
    return 'UNKNOWN';
  };

  const handleNewInvoice = () => {
    resetInvoiceData(); // Use the one from context
    navigate('/new-invoice');
  };

  const type = getTypeFromPath(location.pathname);

useEffect(() => {
  const fetchInvoices = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id || localStorage.getItem("visitorId"); // ✅ same logic

      const response = await fetch(
        `https://invoice-generator-backend-liard.vercel.app/invoices?visitorId=${userId}`
      );

      if (!response.ok) throw new Error("Failed to fetch invoices");
      const data = await response.json();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchInvoices();
}, []);



  const handleDelete = async (id) => {
  try {
  const response = await fetch(`https://invoice-generator-backend-liard.vercel.app/invoice/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to delete invoice');
  setInvoices(invoices.filter(inv => inv._id !== id));
}
 catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const eraseEverything = async () => {
  try {
  const response = await fetch('https://invoice-generator-backend-liard.vercel.app/invoices', {
    method: 'DELETE'
  });
  if (!response.ok) throw new Error('Failed to clear invoices');
  setInvoices([]);
}
catch (error) {
      console.error('Error clearing invoices:', error);
    }
  };

  const viewInvoice = (invoice) => {
    const transformedInvoice = {
      ...invoice,
      lineItems: invoice.lineItems.map(item => ({
        id: Math.random().toString(36).substr(2, 9),
        description: item.description,
        quantity: item.quantity,
        price: item.rate,
        amount: item.amount
      })),
      labels: invoice.labels || {
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
    setInvoiceData(transformedInvoice);
    navigate('/');
  };

  const filteredInvoices = invoices.filter(invoice =>
    invoice.billTo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const sheetData = [
      ["customer", "type", "number", "date", "due_date", "currency", "total", "item", "description", "quantity", "unit_cost", "discount", "tax", "shipping"],
      ...filteredInvoices.flatMap(inv =>
        inv.lineItems.map(item => [
          inv.billTo || '',
          inv.type || 'INVOICE',
          inv.invoiceNumber || '',
          inv.date || '',
          inv.dueDate || '',
          inv.currency || '',
          inv.total || 0,
          item.name || '',
          item.description || '',
          item.quantity || 0,
          item.rate || 0,
          item.discount || 0,
          item.tax || 0,
          item.shipping || 0
        ])
      )
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Invoices");

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${type.replace(/\s+/g, '_')}_export.xlsx`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen px-6 py-10 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white'}`}>
        <p>Loading invoices...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen px-6 py-10 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
      <h1 className="text-2xl font-bold mb-2">History</h1>
      <p className={`text-sm mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        We automatically save invoices that you created recently to your device. This is useful when you need to quickly make an edit to an invoice.
      </p>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`border px-3 py-1 rounded text-sm w-1/3 ${darkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500'}`}
        />
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="border px-4 py-2 rounded text-sm hover:text-green-600 transition-colors duration-200"
          >
            ⬇ Export
          </button>
<button
  onClick={() => window.location.href = '/'}
  className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded text-sm"
>
  New Invoice
</button>


        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className={darkMode ? 'bg-gray-800 border-b border-gray-700' : 'bg-gray-50 border-b'}>
            <tr className={`text-left ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              <th className="p-3"> </th>
              <th className="p-3">CUSTOMER</th>
              <th className="p-3">TYPE</th>
              <th className="p-3">REFERENCE</th>
              <th className="p-3">DATE</th>
              <th className="p-3">DUE DATE</th>
              <th className="p-3">TOTAL</th>
              <th className="p-3"> </th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.map(invoice => (
              <tr key={invoice._id} className={darkMode ? 'border-b border-gray-700 hover:bg-gray-800' : 'border-b hover:bg-gray-50'}>
                <td className="p-3">
                  <button
                    onClick={() => viewInvoice(invoice)}
                    className="border px-3 py-1 rounded text-sm hover:bg-blue-500 hover:text-white transition-colors duration-200"
                  >
                    View
                  </button>
                </td>
                <td className="p-3">{invoice.billTo || 'No customer'}</td>
                <td className="p-3">{invoice.type || 'INVOICE'}</td>
                <td className="p-3">{invoice.invoiceNumber || 'N/A'}</td>
                <td className="p-3">{invoice.date || 'No date'}</td>
                <td className="p-3">{invoice.dueDate || 'No due date'}</td>
                <td className="p-3">
                  {getCurrencySymbol(invoice.currency)}{invoice.total?.toFixed(2) || '0.00'}
                </td>
                <td className="p-3">
                  <button onClick={() => handleDelete(invoice._id)} className="text-rose-500 hover:text-rose-600">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredInvoices.length === 0 && (
        <div className="text-center py-10">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            {searchTerm ? 'No invoices match your search' : 'No invoices found'}
          </p>
        </div>
      )}

      <div className="text-sm mt-6">
        {/* <p className={`mb-2 ${darkMode ? 'text-rose-400' : 'text-rose-500'}`}>
          ⚠️ These invoices are stored in our database. You can access them from any device.
        </p> */}
        <button
          onClick={eraseEverything}
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded"
        >
          Erase Everything
        </button>
      </div>

      <Footer />
    </div>
  );
}

function getCurrencySymbol(currency = 'USD') {
  const symbols = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    PKR: '₨',
    NZD: 'NZ$',
    PGK: 'PGK '
  };
  return symbols[currency] || '$';
}
