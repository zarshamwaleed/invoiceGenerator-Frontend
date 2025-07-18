import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"; // Adjust the path if needed
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const invoiceTemplateParameters = [
  { name: "header", default: "INVOICE" },
  { name: "to_title", default: "Bill To" },
  { name: "ship_to_title", default: "Ship To" },
  { name: "invoice_number_title", default: "#" },
  { name: "date_title", default: "Date" },
  { name: "payment_terms_title", default: "Payment Terms" },
  { name: "due_date_title", default: "Due Date" },
  { name: "purchase_order_title", default: "Purchase Order" },
  { name: "quantity_header", default: "Quantity" },
  { name: "item_header", default: "Item" },
  { name: "unit_cost_header", default: "Rate" },
  { name: "amount_header", default: "Amount" },
  { name: "subtotal_title", default: "Subtotal" },
  { name: "discounts_title", default: "Discounts" },
  { name: "tax_title", default: "Tax" },
  { name: "shipping_title", default: "Shipping" },
  { name: "total_title", default: "Total" },
  { name: "amount_paid_title", default: "Amount Paid" },
  { name: "balance_title", default: "Balance" },
  { name: "terms_title", default: "Terms" },
  { name: "notes_title", default: "Notes" },
];

export default function APIDocumentation() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  
  const parameters = [
    { name: "logo", desc: "URL of your logo", default: "null" },
    { name: "from", desc: "Your organization billing address and contact info", default: "null" },
    { name: "to", desc: "Entity being billed – multiple lines ok", default: "null" },
    { name: "ship_to", desc: "Shipping address – multiple lines ok", default: "null" },
    { name: "number", desc: "Invoice number", default: "null" },
    { name: "currency", desc: "ISO 4217 3-digit currency code", default: "USD" },
    { name: "custom_fields", desc: "Array of objects – see Custom Fields below", default: "[]" },
    { name: "date", desc: "Invoice date", default: "current date" },
    { name: "payment_terms", desc: "Payment terms summary (i.e. NET 30)", default: "null" },
    { name: "due_date", desc: "Invoice due date", default: "null" },
    { name: "items", desc: "Array of objects – see Line Items below", default: "[]" },
    { name: "fields", desc: "Object – see Subtotal Lines below", default: `{"tax":"%","discounts":false,"shipping":false}` },
    { name: "discounts", desc: "Subtotal discounts – numbers only", default: "0" },
    { name: "tax", desc: "Tax – numbers only", default: "0" },
    { name: "shipping", desc: "Shipping – numbers only", default: "0" },
    { name: "amount_paid", desc: "Amount paid – numbers only", default: "0" },
    { name: "notes", desc: "Notes – any extra information not included elsewhere", default: "null" },
    { name: "terms", desc: "Terms and conditions – all the details", default: "null" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      {/* <Navbar /> */}
      <div className={`px-6 md:px-20 py-10 max-w-6xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <h1 className="text-2xl font-bold mb-4">Invoice Generator API</h1>
        <p className="mb-4">
          We created a simple API at Invoice-Generator.com to generate invoice PDFs on the fly. This service has been used internally by us for some time. We believe this could be helpful in your project as well.
        </p>
        <p className="mb-6">
          The API has a primary endpoint that returns a PDF given details of an invoice. We don't store any of your invoice data.
        </p>
        <p className="mb-6">
          In addition to PDF, the API can also generate e-invoices in UBL (Universal Business Language) with the invoice PDF embedded. This is useful as the world shifts to e-invoicing because UBL invoices are tricky to generate.
        </p>

        <h2 className="text-xl font-semibold mb-2">Use Cases</h2>
        <ul className="list-disc ml-5 mb-6">
          <li>Creating invoices for VAT compliance</li>
          <li>Generate a PDF of an invoice that you have the details to (recipient, line items, etc)</li>
          <li>Produce invoices for B2B buyers from an order or receipt</li>
          <li>Selling products or services on credit terms</li>
          <li>Creating e-invoices in UBL (Universal Business Language)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">Table of Contents</h2>
        <ul className="list-disc ml-5 mb-6 space-y-1">
          <li>
            <a href="#getting-started" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>Getting Started</a>
          </li>
          <li>
            <a href="#examples" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>Examples</a>
            <ul className="list-disc ml-5 space-y-1">
              <li><a href="#simple-invoice" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>Simple Invoice</a></li>
              <li><a href="#json-input" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>JSON Input</a></li>
              <li><a href="#vat-invoice" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>VAT Invoice</a></li>
              <li><a href="#localization" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>Localization</a></li>
              <li><a href="#custom-fields" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>Custom Fields</a></li>
              <li><a href="#e-invoice" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>E-invoice</a></li>
            </ul>
          </li>
          <li>
            <a href="#sample-projects" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>Sample Projects</a>
          </li>
          <li>
            <a href="#api-reference" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>API Reference</a>
            <ul className="list-disc ml-5 space-y-1">
              <li><a href="#create-invoice-pdf" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>Create Invoice PDF</a></li>
              <li><a href="#create-e-invoice" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>Create E-invoice</a></li>
            </ul>
          </li>
          <li>
            <a href="#support" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>Support</a>
          </li>
        </ul>

        <h2 id="getting-started" className="text-xl font-semibold mb-2">Getting Started</h2>
        <p className="mb-2">In order to begin using the Invoice-Generator.com API, you first need to create an API key. The process for obtaining an API key is as follows.</p>
        <ol className="list-decimal ml-5 mb-4">
          <li>
            Create a free Invoice-Generator.com account{" "}
            <Link
              to="/signup"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              here
            </Link>
            , or sign in if you already have one.
          </li>
          <li>Go to the Settings page.</li>
          <li>In the "API Keys" section, click New API Key.</li>
        </ol>
        <p className="mb-6">Now you have an API key and are ready to start invoicing!</p>
        <p className={`mb-6 font-medium text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
          The free API plan has a limit of 100 invoices per month. In order to generate more invoices you will need to purchase an API subscription.
        </p>

        <h2 id="examples" className="text-xl font-semibold mb-2">Examples</h2>

        <h3 id="simple-invoice" className="font-semibold mb-1">Simple Invoice</h3>
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com \ <br />
  -H "Authorization: Bearer myApiKey" \ <br />
  -d from="Nikolaus Ltd" \ <br />
  -d to="Acme, Corp." \ <br />
  -d logo="https://example.com/img/logo-invoice.png" \ <br />
  -d number=1 \ <br />
  -d date="Feb 9, 2015" \ <br />
  -d due_date="Feb 16, 2015" \ <br />
  -d "items[0][name]"="Starter plan monthly" \ <br />
  -d "items[0][quantity]"=1 \ <br />
  -d "items[0][unit_cost]"=99 \ <br />
  -d notes="Thanks for being an awesome customer!" \ <br />
  -d terms="Please pay by the due date." \ <br />
&gt; invoice.pdf
        </pre>

        <h3 id="vat-invoice" className="font-semibold mb-1">VAT Invoice</h3>
        <p>Here's a simple cURL example for generating invoices with VAT:</p> <br />
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com \ <br />
  -H "Authorization: Bearer myApiKey" \ <br />
  -d from="Nikolaus Ltd%0AVAT ID: 1234" \ <br />
  -d logo="https://example.com/img/logo-invoice.png" \ <br />
  -d number=1 \ <br />
  -d date="Feb 9, 2015" \ <br />
  -d payment_terms="Charged - Do Not Pay" \ <br />
  -d "items[0][name]"="Starter Plan Monthly" \ <br />
  -d "items[0][quantity]"=1 \ <br />
  -d "items[0][unit_cost]"=99 \ <br />
  -d tax_title="VAT" \ <br />
  -d "fields[tax]"="%" \ <br />
  -d tax=8 \ <br />
  -d notes="Thanks for being an awesome customer!" \ <br />
  -d terms="No need to submit payment. You will be auto-billed for this invoice." \ <br />
&gt; invoice.vat.pdf
        </pre>

        <h3 id="json-input" className="font-semibold mb-1">JSON Input</h3>
        <p>JSON input is also accepted with the Content-Type header set to application/json</p> <br />
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
{`curl https://invoice-generator.com \\
  -H "Authorization: Bearer myApiKey" \\
  -H "Content-Type: application/json" \\
  -d '{\\"from\\":\\"Nikolaus Ltd\\",\\"to\\":\\"Acme, Corp.\\",\\"logo\\":\\"https://example.com/img/logo-invoice.png\\",\\"number\\":1,\\"items\\":[{\\"name\\":\\"Starter plan\\",\\"quantity\\":1,\\"unit_cost\\":99}],\\"notes\\":\\"Thanks for your business!\\"}' \\
> invoice.pdf`}
        </pre>

        <h3 id="localization" className="font-semibold mb-1">Localization</h3>
        <p>It is possible to change the localization used to generate the invoice by supplying a locale in the Accept-Language header. The default locale is en-US.</p><br />
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com \<br />
  -H "Authorization: Bearer myApiKey" \<br />
  -H "Accept-Language: fr-FR" \<br />
  -d from="Nikolaus Ltd" \<br />
  -d to="Acme Corp." \<br />
  -d logo="https://example.com/img/logo-invoice.png" \<br />
  -d number=1 \<br />
  -d currency=eur \<br />
  -d date="Feb 9, 2015" \<br />
  -d due_date="Feb 16, 2015" \<br />
  -d "items[0][name]"="Starter plan monthly" \<br />
  -d "items[0][quantity]"=1 \<br />
  -d "items[0][unit_cost]"=99 \<br />
&gt; invoice.pdf</pre>

        <h3 className="font-semibold mb-1">Supported Languages</h3>
        <p className="mb-6">We currently have translations available in English, French, German, Spanish, and Thai.</p>

        <h3 id="custom-fields" className="font-semibold mb-1">Custom Fields</h3>
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com \<br />
  -H "Authorization: Bearer myApiKey" \<br />
  -d from="Nikolaus Ltd" \<br />
  -d to="My Customer" \<br />
  -d ship_to="Shipping Address" \<br />
  -d logo="https://example.com/img/logo-invoice.png" \<br />
  -d number=1 \<br />
  -d date="Feb 9, 2015" \<br />
  -d "custom_fields[0][name]"="My Custom Field" \<br />
  -d "custom_fields[0][value]"="Some Value" \<br />
  -d "items[0][name]"="Starter Plan Monthly" \<br />
  -d "items[0][quantity]"=1 \<br />
  -d "items[0][unit_cost]"=99 \<br />
&gt; invoice.custom_fields.pdf</pre>

        <h3 id="e-invoice" className="font-semibold mb-1">E-invoice</h3>
        <p>Here's a simple cURL example for generating e-invoices in UBL XML:</p> <br />
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com/ubl \<br />
  -H "Authorization: Bearer myApiKey" \<br />
  -d from="Nikolaus Ltd%0AVAT ID: 1234" \<br />
  -d to="Foster Moen%0AVAT ID: 4567" \<br />
  -d logo="https://example.com/img/logo-invoice.png" \<br />
  -d number=1 \<br />
  -d date="Feb 9, 2015" \<br />
  -d date="Mar 9, 2015" \<br />
  -d payment_terms="NET 30" \<br />
  -d "items[0][name]"="Starter Plan Monthly" \<br />
  -d "items[0][quantity]"=1 \<br />
  -d "items[0][unit_cost]"=99 \<br />
  -d tax_title="VAT" \<br />
  -d "fields[tax]"="%" \<br />
  -d tax=8 \<br />
  -d notes="Thanks for being an awesome customer!" \<br />
&gt; invoice.xml</pre>

        <h3 id="sample-projects" className="font-semibold mb-1">Sample Projects</h3>
        <ul className="list-disc ml-5 mb-6 space-y-1">
          <li> Go: {" "}
            <a
              href="https://github.com/Invoice-Generator/go-invoice-generator-connector"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              generate invoices programmatically
            </a>
          </li>
          <li>Ruby:{" "}
            <a
              href="https://github.com/Invoice-Generator/ruby-stripe-invoice-generator"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              generate invoices from Stripe webhooks
            </a>
          </li>
          <li> Node.js:{" "}
            <a
              href="https://github.com/Invoice-Generator/invoice-generator.js"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              invoice-generator.js
            </a>
          </li>
          <li> Python:{" "}
            <a
              href="https://github.com/aleaforny/python-invoice-generator"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              python-invoice-generator
            </a>
          </li>
        </ul>

        <hr className={`${darkMode ? 'border-gray-700' : 'border-gray-300'}`} />
        
        <h1 id="api-reference" className="text-xl font-bold mb-4">API Reference</h1>
        <h1 id="create-invoice-pdf" className="text-xl font-semibold mb-4">Create Invoice PDF</h1>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-black'} text-white p-4 rounded font-mono text-sm mb-6`}>
          POST https://invoice-generator.com
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Invoice Parameters</h2>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            When a value is null or zero, the field will not be shown on the invoice.
            The exception to this are the required fields{" "}
            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>from</span>,{" "}
            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>to</span>,{" "}
            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>date</span>, and{" "}
            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>items</span>.
          </p>

          <div className="overflow-x-auto">
            <table className={`table-auto w-full border-t border-b text-sm ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <thead>
                <tr className={`text-left ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <th className={`py-2 px-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>PARAMETER</th>
                  <th className="py-2 px-4">DESCRIPTION</th>
                  <th className="py-2 px-4">DEFAULT VALUE</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, index) => (
                  <tr 
                    key={index} 
                    className={`border-t ${darkMode ? 'border-gray-700 odd:bg-gray-900 even:bg-gray-800' : 'border-gray-200 odd:bg-white even:bg-gray-50'}`}
                  >
                    <td className={`py-2 px-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} whitespace-nowrap`}>{param.name}</td>
                    <td className="py-2 px-4">{param.desc}</td>
                    <td className="py-2 px-4">{param.default}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Line Item Parameters --- */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Line Item Parameters</h2>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Line items are represented as an array of objects. Here's an example:
          </p>
          <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm font-mono p-4 rounded overflow-x-auto`}>
            {`{
  "items": [
    {
      "name": "Gizmo",
      "quantity": 10,
      "unit_cost": 99.99,
      "description": "The best gizmos there are around."
    },
    {
      "name": "Gizmo v2",
      "quantity": 5,
      "unit_cost": 199.99
    }
  ]
}`}
          </pre>
        </div>

        {/* --- Subtotal Line Parameters --- */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Subtotal Line Parameters</h2>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            The <code className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'} px-1 rounded`}>fields</code> object toggles the discounts, tax, and shipping subtotal lines.
            Each setting can have a value of <code className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'} px-1 rounded`}>%</code>, <code className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'} px-1 rounded`}>true</code>, or <code className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'} px-1 rounded`}>false</code>.
            For example:
          </p>
          <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm font-mono p-4 rounded overflow-x-auto`}>
            {`{
  "fields": {
    "tax": "%",
    "discounts": false,
    "shipping": true
  },
  "tax": 7,
  "shipping": 15
}`}
          </pre>
        </div>

        {/* --- Custom Field Parameters --- */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Custom Field Parameters</h2>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Custom fields allow you to add additional fields to the invoice details in the top-right. Example:
          </p>
          <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm font-mono p-4 rounded overflow-x-auto`}>
            {`{
  "custom_fields": [
    {
      "name": "Gizmo",
      "value": "PO-1234"
    },
    {
      "name": "Account Number",
      "value": "CUST-456"
    }
  ]
}`}
          </pre>
        </div>

        {/* --- Invoice Template Parameters --- */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-2">Invoice Template Parameters</h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            These parameters control the titles of the fields on the invoice template. If localization is used, the default values
            are translated to the specified language. Any invoice template parameter given will override the localized default.
          </p>
        </div>

        <br />
        <div className="overflow-x-auto">
          <table className={`table-auto w-full border-t border-b text-sm ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <thead>
              <tr className={`text-left ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <th className={`py-2 px-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>PARAMETER</th>
                <th className="py-2 px-4">DEFAULT VALUE</th>
              </tr>
            </thead>
            <tbody>
              {invoiceTemplateParameters.map((param, index) => (
                <tr
                  key={index}
                  className={`border-t ${darkMode ? 'border-gray-700 odd:bg-gray-900 even:bg-gray-800' : 'border-gray-200 odd:bg-white even:bg-gray-50'}`}
                >
                  <td className={`py-2 px-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'} whitespace-nowrap`}>{param.name}</td>
                  <td className="py-2 px-4">{param.default}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />

        <h2 id="create-e-invoice" className="text-lg font-semibold mb-2">Create E-invoice</h2>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-black'} text-white p-4 rounded font-mono text-sm mb-6`}>
          POST https://invoice-generator.com/ubl
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold mb-1">Parameters</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Creating an invoice with Universal Business Language uses the same parameters as the{" "}
            <a 
              href="#create-invoice-pdf" 
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              Create Invoice PDF
            </a>{" "}
            endpoint.
          </p>
        </div>

        <div className="mb-6">
          <h3 id="support" className="text-md font-semibold mb-1">Support</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            Have a feature request or bug report? We would love to hear your thoughts! You can{" "}
            <a
              href="https://github.com/Invoice-Generator/invoice-generator-api/issues"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              create an issue
            </a>{" "}
            on GitHub for any issues you encounter or feature requests.
          </p>
        </div>

        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          Using invoice-generator.com is subject to the{" "}
          <Link
            to="/privacy-policy"
            className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline transition duration-200`}
          >
            Privacy Policy 
          </Link>
          {" "}and {" "}
          
          <Link to="/terms-of-service"
            className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline transition duration-200`}
          >
          Terms of Use
          </Link> .
        </p>

        <Footer/>
      </div>
    </div>
  );
}