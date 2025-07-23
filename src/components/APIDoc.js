import React from "react";
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"; // Adjust the path if needed
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';



export default function APIDocumentation() {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const invoiceTemplateParameters = [
  { name: t("header"), default: t("INVOICE") },
  { name: t("to_title"), default: t("Bill To") },
  { name: t("ship_to_title"), default: t("Ship To") },
  { name: t("invoice_number_title"), default: t("#") },
  { name: t("date_title"), default: t("Date") },
  { name: t("payment_terms_title"), default: t("Payment Terms") },
  { name: t("due_date_title"), default: t("Due Date") },
  { name: t("purchase_order_title"), default: t("Purchase Order") },
  { name: t("quantity_header"), default: t("Quantity") },
  { name: t("item_header"), default: t("Item") },
  { name: t("unit_cost_header"), default: t("Rate") },
  { name: t("amount_header"), default: t("Amount") },
  { name: t("subtotal_title"), default: t("Subtotal") },
  { name: t("discounts_title"), default: t("Discounts") },
  { name: t("tax_title"), default: t("Tax") },
  { name: t("shipping_title"), default: t("Shipping") },
  { name: t("total_title"), default: t("Total") },
  { name: t("amount_paid_title"), default: t("Amount Paid") },
  { name: t("balance_title"), default: t("Balance") },
  { name: t("terms_title"), default: t("Terms") },
  { name: t("notes_title"), default: t("Notes") },
];
  
  const parameters = [
  { name: t("logo"), desc: t("URL of your logo"), default: t("null") },
  { name: t("from"), desc: t("Your organization billing address and contact info"), default: t("null") },
  { name: t("to"), desc: t("Entity being billed – multiple lines ok"), default: t("null") },
  { name: t("ship_to"), desc: t("Shipping address – multiple lines ok"), default: t("null") },
  { name: t("number"), desc: t("Invoice number"), default: t("null") },
  { name: t("currency"), desc: t("ISO 4217 3-digit currency code"), default: t("USD") },
  { name: t("custom_fields"), desc: t("Array of objects – see Custom Fields below"), default: t("[]") },
  { name: t("date"), desc: t("Invoice date"), default: t("current date") },
  { name: t("payment_terms"), desc: t("Payment terms summary (i.e. NET 30)"), default: t("null") },
  { name: t("due_date"), desc: t("Invoice due date"), default: t("null") },
  { name: t("items"), desc: t("Array of objects – see Line Items below"), default: t("[]") },
{
  name: t("fields"),
  desc: t("Object – see Subtotal Lines below"),
  default: JSON.stringify({
    [t("tax")]: "%",
    [t("discounts")]: false,
    [t("shipping")]: false,
  }),
},

  { name: t("discounts"), desc: t("Subtotal discounts – numbers only"), default: t("0") },
  { name: t("tax"), desc: t("Tax – numbers only"), default: t("0") },
  { name: t("shipping"), desc: t("Shipping – numbers only"), default: t("0") },
  { name: t("amount_paid"), desc: t("Amount paid – numbers only"), default: t("0") },
  { name: t("notes"), desc: t("Notes – any extra information not included elsewhere"), default: t("null") },
  { name: t("terms"), desc: t("Terms and conditions – all the details"), default: t("null") },
];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      {/* <Navbar /> */}
      <div className={`px-6 md:px-20 py-10 max-w-6xl mx-auto ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
        <h1 className="text-2xl font-bold mb-4">{t("Invoice Generator API")}</h1>
        <p className="mb-4">
          {t("We created a simple API at Invoice-Generator.com to generate invoice PDFs on the fly. This service has been used internally by us for some time. We believe this could be helpful in your project as well.")}
        </p>
        <p className="mb-6">
          {t("The API has a primary endpoint that returns a PDF given details of an invoice. We don't store any of your invoice data.")}
        </p>
        <p className="mb-6">
          {t("In addition to PDF, the API can also generate e-invoices in UBL (Universal Business Language) with the invoice PDF embedded. This is useful as the world shifts to e-invoicing because UBL invoices are tricky to generate.")}
        </p>

        <h2 className="text-xl font-semibold mb-2">{t("Use Cases")}</h2>
        <ul className="list-disc ml-5 mb-6">
          <li>{t("Creating invoices for VAT compliance")}</li>
          <li>{t("Generate a PDF of an invoice that you have the details to (recipient, line items, etc)")}</li>
          <li>{t("Produce invoices for B2B buyers from an order or receipt")}</li>
          <li>{t("Selling products or services on credit terms")}</li>
          <li>{t("Creating e-invoices in UBL (Universal Business Language)")}</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">{t("Table of Contents")}</h2>
        <ul className="list-disc ml-5 mb-6 space-y-1">
          <li>
            <a href="#getting-started" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("Getting Started")}</a>
          </li>
          <li>
            <a href="#examples" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("Examples")}</a>
            <ul className="list-disc ml-5 space-y-1">
              <li><a href="#simple-invoice" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("Simple Invoice")}</a></li>
              <li><a href="#json-input" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("JSON Input")}</a></li>
              <li><a href="#vat-invoice" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("VAT Invoice")}</a></li>
              <li><a href="#localization" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("Localization")}</a></li>
              <li><a href="#custom-fields" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("Custom Fields")}</a></li>
              <li><a href="#e-invoice" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("E-invoice")}</a></li>
            </ul>
          </li>
          <li>
            <a href="#sample-projects" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("Sample Projects")}</a>
          </li>
          <li>
            <a href="#api-reference" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("API Reference")}</a>
            <ul className="list-disc ml-5 space-y-1">
              <li><a href="#create-invoice-pdf" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("Create Invoice PDF")}</a></li>
              <li><a href="#create-e-invoice" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("Create E-invoice")}</a></li>
            </ul>
          </li>
          <li>
            <a href="#support" className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}>{t("Support")}</a>
          </li>
        </ul>

        <h2 id="getting-started" className="text-xl font-semibold mb-2">{t("Getting Started")}</h2>
        <p className="mb-2">{t("In order to begin using the Invoice-Generator.com API, you first need to create an API key. The process for obtaining an API key is as follows.")}</p>
        <ol className="list-decimal ml-5 mb-4">
          <li>
            {t("Create a free Invoice-Generator.com account")}{" "}
            <Link
              to="/signup"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              {t("here")}
            </Link>
            {t(", or sign in if you already have one.") }
          </li>
          <li>{t("Go to the Settings page.")}</li>
          <li>{t('In the "API Keys" section, click New API Key.')}</li>
        </ol>
        <p className="mb-6">{t("Now you have an API key and are ready to start invoicing!")}</p>
        <p className={`mb-6 font-medium text-sm ${darkMode ? 'text-emerald-300' : 'text-emerald-600'}`}>
          {t("The free API plan has a limit of 100 invoices per month. In order to generate more invoices you will need to purchase an API subscription.")}
        </p>

        <h2 id="examples" className="text-xl font-semibold mb-2">{t("Examples")}</h2>

        <h3 id="simple-invoice" className="font-semibold mb-1">{t("Simple Invoice")}</h3>
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com \ <br />
  -H {t('"Authorization: Bearer myApiKey"')} \ <br />
  -d {t('from="Nikolaus Ltd"')} \ <br />
  -d {t('to="Acme, Corp."')} \ <br />
  -d {t('logo="https://example.com/img/logo-invoice.png"')} \ <br />
  -d {t('number=1')} \ <br />
  -d {t('date="Feb 9, 2015"')} \ <br />
  -d {t('due_date="Feb 16, 2015"')} \ <br />
  -d {t('"items[0][name]"="Starter plan monthly"')} \ <br />
  -d {t('"items[0][quantity]"=1')} \ <br />
  -d {t('"items[0][unit_cost]"=99')} \ <br />
  -d {t('notes="Thanks for being an awesome customer!"')} \ <br />
  -d {t('terms="Please pay by the due date."')} \ <br />
&gt; invoice.pdf
        </pre>

        <h3 id="vat-invoice" className="font-semibold mb-1">{t("VAT Invoice")}</h3>
        <p>{t("Here's a simple cURL example for generating invoices with VAT:")}</p> <br />
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com \ <br />
  -H {t('"Authorization: Bearer myApiKey"')} \ <br />
  -d {t('from="Nikolaus Ltd%0AVAT ID: 1234"')} \ <br />
  -d {t('logo="https://example.com/img/logo-invoice.png"')} \ <br />
  -d {t('number=1')} \ <br />
  -d {t('date="Feb 9, 2015"')} \ <br />
  -d {t('payment_terms="Charged - Do Not Pay"')} \ <br />
  -d {t('"items[0][name]"="Starter Plan Monthly"')} \ <br />
  -d {t('"items[0][quantity]"=1')} \ <br />
  -d {t('"items[0][unit_cost]"=99')} \ <br />
  -d {t('tax_title="VAT"')} \ <br />
  -d {t('"fields[tax]"="%"')} \ <br />
  -d {t('tax=8')} \ <br />
  -d {t('notes="Thanks for being an awesome customer!"')} \ <br />
  -d {t('terms="No need to submit payment. You will be auto-billed for this invoice."')} \ <br />
&gt; invoice.vat.pdf
        </pre>

        <h3 id="json-input" className="font-semibold mb-1">{t("JSON Input")}</h3>
        <p>{t("JSON input is also accepted with the Content-Type header set to application/json")}</p> <br />
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
{`curl https://invoice-generator.com \\
  -H "Authorization: Bearer myApiKey" \\
  -H "Content-Type: application/json" \\
  -d '{\\"from\\":\\"Nikolaus Ltd\\",\\"to\\":\\"Acme, Corp.\\",\\"logo\\":\\"https://example.com/img/logo-invoice.png\\",\\"number\\":1,\\"items\\":[{\\"name\\":\\"Starter plan\\",\\"quantity\\":1,\\"unit_cost\\":99}],\\"notes\\":\\"Thanks for your business!\\"}' \\
> invoice.pdf`}
        </pre>

        <h3 id="localization" className="font-semibold mb-1">{t("Localization")}</h3>
        <p>{t("It is possible to change the localization used to generate the invoice by supplying a locale in the Accept-Language header. The default locale is en-US.")}</p><br />
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com \<br />
  -H {t('"Authorization: Bearer myApiKey"')} \<br />
  -H {t('"Accept-Language: fr-FR"')} \<br />
  -d {t('from="Nikolaus Ltd"')} \<br />
  -d {t('to="Acme Corp."')} \<br />
  -d {t('logo="https://example.com/img/logo-invoice.png"')} \<br />
  -d {t('number=1')} \<br />
  -d {t('currency=eur')} \<br />
  -d {t('date="Feb 9, 2015"')} \<br />
  -d {t('due_date="Feb 16, 2015"')} \<br />
  -d {t('"items[0][name]"="Starter plan monthly"')} \<br />
  -d {t('"items[0][quantity]"=1')} \<br />
  -d {t('"items[0][unit_cost]"=99')} \<br />
&gt; invoice.pdf</pre>

        <h3 className="font-semibold mb-1">{t("Supported Languages")}</h3>
        <p className="mb-6">{t("We currently have translations available in English, French, German, Spanish, and Thai.")}</p>

        <h3 id="custom-fields" className="font-semibold mb-1">{t("Custom Fields")}</h3>
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com \<br />
  -H {t('"Authorization: Bearer myApiKey"')} \<br />
  -d {t('from="Nikolaus Ltd"')} \<br />
  -d {t('to="My Customer"')} \<br />
  -d {t('ship_to="Shipping Address"')} \<br />
  -d {t('logo="https://example.com/img/logo-invoice.png"')} \<br />
  -d {t('number=1')} \<br />
  -d {t('date="Feb 9, 2015"')} \<br />
  -d {t('"custom_fields[0][name]"="My Custom Field"')} \<br />
  -d {t('"custom_fields[0][value]"="Some Value"')} \<br />
  -d {t('"items[0][name]"="Starter Plan Monthly"')} \<br />
  -d {t('"items[0][quantity]"=1')} \<br />
  -d {t('"items[0][unit_cost]"=99')} \<br />
&gt; invoice.custom_fields.pdf</pre>

        <h3 id="e-invoice" className="font-semibold mb-1">{t("E-invoice")}</h3>
        <p>{t("Here's a simple cURL example for generating e-invoices in UBL XML:")}</p> <br />
        <pre className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-sm p-4 rounded mb-6 overflow-auto`}>
curl https://invoice-generator.com/ubl \<br />
  -H {t('"Authorization: Bearer myApiKey"')} \<br />
  -d {t('from="Nikolaus Ltd%0AVAT ID: 1234"')} \<br />
  -d {t('to="Foster Moen%0AVAT ID: 4567"')} \<br />
  -d {t('logo="https://example.com/img/logo-invoice.png"')} \<br />
  -d {t('number=1')} \<br />
  -d {t('date="Feb 9, 2015"')} \<br />
  -d {t('date="Mar 9, 2015"')} \<br />
  -d {t('payment_terms="NET 30"')} \<br />
  -d {t('"items[0][name]"="Starter Plan Monthly"')} \<br />
  -d {t('"items[0][quantity]"=1')} \<br />
  -d {t('"items[0][unit_cost]"=99')} \<br />
  -d {t('tax_title="VAT"')} \<br />
  -d {t('"fields[tax]"="%"')} \<br />
  -d {t('tax=8')} \<br />
  -d {t('notes="Thanks for being an awesome customer!"')} \<br />
&gt; invoice.xml</pre>

        <h3 id="sample-projects" className="font-semibold mb-1">{t("Sample Projects")}</h3>
        <ul className="list-disc ml-5 mb-6 space-y-1">
          <li> {t("Go")}: {" "}
            <a
              href="https://github.com/Invoice-Generator/go-invoice-generator-connector"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              {t("generate invoices programmatically")}
            </a>
          </li>
          <li>{t("Ruby")}:{" "}
            <a
              href="https://github.com/Invoice-Generator/ruby-stripe-invoice-generator"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              {t("generate invoices from Stripe webhooks")}
            </a>
          </li>




 <li>
            {t("Node.js")}:{" "}
            <a
              href="https://github.com/Invoice-Generator/invoice-generator.js"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              invoice-generator.js
            </a>
          </li>
          <li>
            {t("Python")}:{" "}
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

        <h1 id="api-reference" className="text-xl font-bold mb-4">{t("API Reference")}</h1>
        <h1 id="create-invoice-pdf" className="text-xl font-semibold mb-4">{t("Create Invoice PDF")}</h1>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-black'} text-white p-4 rounded font-mono text-sm mb-6`}>
          POST https://invoice-generator.com
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">{t("Invoice Parameters")}</h2>
          <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {t("When a value is null or zero, the field will not be shown on the invoice. The exception to this are the required fields")}{" "}
            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t("from")}</span>,{" "}
            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t("to")}</span>,{" "}
            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t("date")}</span>, {t("and")}{" "}
            <span className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t("items")}</span>.
          </p>

          <div className="overflow-x-auto">
            <table className={`table-auto w-full border-t border-b text-sm ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              <thead>
                <tr className={`text-left ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <th className={`py-2 px-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t("PARAMETER")}</th>
                  <th className="py-2 px-4">{t("DESCRIPTION")}</th>
                  <th className="py-2 px-4">{t("DEFAULT VALUE")}</th>
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
          <h2 className="text-lg font-semibold mb-2">{t("Line Item Parameters")}</h2>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {t("Line items are represented as an array of objects. Here's an example:")}
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
          <h2 className="text-lg font-semibold mb-2">{t("Subtotal Line Parameters")}</h2>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {t("The")} <code className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'} px-1 rounded`}>{t("fields")}</code> {t("object toggles the discounts, tax, and shipping subtotal lines.")}
            {t("Each setting can have a value of")} <code className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'} px-1 rounded`}>%</code>, <code className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'} px-1 rounded`}>{t("true")}</code>, {t("or")} <code className={`${darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-200'} px-1 rounded`}>{t("false")}</code>.
            {t("For example:")}
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
          <h2 className="text-lg font-semibold mb-2">{t("Custom Field Parameters")}</h2>
          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {t("Custom fields allow you to add additional fields to the invoice details in the top-right. Example:")}
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
          <h2 className="text-lg font-semibold mb-2">{t("Invoice Template Parameters")}</h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {t("These parameters control the titles of the fields on the invoice template. If localization is used, the default values are translated to the specified language. Any invoice template parameter given will override the localized default.")}
          </p>
        </div>

        <br />
        <div className="overflow-x-auto">
          <table className={`table-auto w-full border-t border-b text-sm ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
            <thead>
              <tr className={`text-left ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <th className={`py-2 px-4 ${darkMode ? 'text-emerald-400' : 'text-emerald-600'}`}>{t("PARAMETER")}</th>
                <th className="py-2 px-4">{t("DEFAULT VALUE")}</th>
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

        <h2 id="create-e-invoice" className="text-lg font-semibold mb-2">{t("Create E-invoice")}</h2>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-black'} text-white p-4 rounded font-mono text-sm mb-6`}>
          POST https://invoice-generator.com/ubl
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold mb-1">{t("Parameters")}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {t("Creating an invoice with Universal Business Language uses the same parameters as the")}{" "}
            <a 
              href="#create-invoice-pdf" 
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              {t("Create Invoice PDF")}
            </a>{" "}
            {t("endpoint.")} 
          </p>
        </div>

        <div className="mb-6">
          <h3 id="support" className="text-md font-semibold mb-1">{t("Support")}</h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
            {t("Have a feature request or bug report? We would love to hear your thoughts! You can")}{" "}
            <a
              href="https://github.com/Invoice-Generator/invoice-generator-api/issues"
              target="_blank"
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline`}
            >
              {t("create an issue")}
            </a>{" "}
            {t("on GitHub for any issues you encounter or feature requests.")}
          </p>
        </div>

        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
          {t("Using invoice-generator.com is subject to the")}{" "}
          <Link
            to="/privacy-policy"
            className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline transition duration-200`}
          >
            {t("Privacy Policy")}
          </Link>
          {" "}{t("and")}{" "}
          <Link 
            to="/terms-of-service"
            className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} hover:underline transition duration-200`}
          >
            {t("Terms of Use")}
          </Link>
          {"."}
        </p>

        <Footer/>
      </div>
    </div>
  );
}