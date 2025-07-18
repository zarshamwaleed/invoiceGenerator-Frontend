import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const PrivacyPolicy = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-[#0e1d34]'}`}>
     <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}`}>
    <div className={`max-w-6xl mx-auto px-6 py-10 text-sm transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'}`}>
      <h1 className={`text-5xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Terms of Service</h1>
      <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated: March 8, 2024</p>

      <p className="mb-4">Please read this agreement carefully before using this service.</p>

      <p className="mb-4">
        By using the service or clicking "agree" customer is agreeing to be bound by this agreement. If customer is agreeing to this agreement on behalf of or for the benefit of its employer, then customer represents and warrants that it has the necessary authority to agree to this agreement on its employer's behalf.
      </p>

      <p className="mb-4">
        This agreement is between Idealist Software, LLC (<strong>Invoice Generator</strong>), and the customer agreeing to these terms ( <strong>Customer</strong> ).
      </p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>1. Software-as-a-Service</h2>
      <p className="mb-4">
        This agreement provides Customer access to and usage of an Internet based software service as specified on an order and as further outlined at:{" "}
        <Link
          to="/"
          className={`${darkMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-emerald-600 hover:text-emerald-700'} underline transition duration-200 font-semibold`}
        >
          invoice-generator.com
        </Link>{" "}
        (<strong>Service</strong>).
      </p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>2. Use of Service</h2>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>a. Customer Owned Data</p>
      <p className="mb-4">
        All data and logos uploaded by Customer remains the property of Customer, as between Invoice Generator and Customer (Customer Data). Customer grants Invoice Generator the right to use, publicly display and distribute the Customer Data for purposes of performing under this agreement.
      </p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>b. Contractor Access and Usage</p>
      <p className="mb-4">
        Customer may allow its contractors to access the Service in compliance with the terms of this agreement, which access must be for the sole benefit of Customer. Customer is responsible for the compliance with this agreement by its contractors.
      </p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>c. Customer Responsibilities</p>
      <p className="mb-4">
        Customer (i) must keep its passwords secure and confidential; (ii) is solely responsible for Customer Data and all activity in its account in the Service; (iii) must use commercially reasonable efforts to prevent unauthorized access to its account, and notify Invoice Generator promptly of any such unauthorized access; and (iv) may use the Service only in accordance with the Service's Knowledge Base and applicable law.
      </p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>d. API</p>
      <p className="mb-4">
        Invoice Generator provides access to its application-programming interface (API) as part of the Service. Subject to the other terms of this agreement, Invoice Generator grants Customer a non-exclusive, nontransferable, terminable license to interact with the API only for purposes of the Service as allowed by the API.
      </p>
      <ul className={`mb-4 list-disc list-inside pl-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        <li>
          Customer may not use the API in a manner that fails to comply with the API technical documentation or with any part of the API. If any of these occur, Invoice Generator can suspend or terminate Customer's access to the API on a temporary or permanent basis.
        </li>
        <li>
          Invoice Generator may change or remove existing endpoints or fields in API results upon at least 30 days' notice to Customer, but Invoice Generator will use commercially reasonable efforts to support the previous version of the API for at least 6 months. Invoice Generator may add new endpoints or fields in API results without prior notice to Customer.
        </li>
        <li>
          The API is provided on an 'AS IS' and 'WHEN AVAILABLE' basis. Invoice Generator has no liability to Customer as a result of any change, temporary unavailability, suspension, or termination of access to the API.
        </li>
      </ul>

      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>f. 30-Day Trial Version</p>
      <p className="mb-4">
        If Customer has registered for a trial use of the Service, Customer may access the Service for a 30-day time period (unless extended by Invoice Generator in writing). The Service is provided AS IS, with no warranty during this time period. All Customer data will be deleted after the trial period, unless Customer converts its account to a paid Service.
      </p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>3. Disclaimer</h2>
      <p className="mb-4">
        INVOICE GENERATOR DISCLAIMS ALL WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, TITLE AND FITNESS FOR A PARTICULAR PURPOSE. WHILE INVOICE GENERATOR TAKES REASONABLE PHYSICAL, TECHNICAL AND ADMINISTRATIVE MEASURES TO SECURE THE SERVICE, INVOICE GENERATOR DOES NOT GUARANTEE THAT THE SERVICE CANNOT BE COMPROMISED. CUSTOMER UNDERSTANDS THAT THE SERVICE MAY NOT BE ERROR FREE, AND USE MAY BE INTERRUPTED.
      </p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>4. Payment</h2>
      <p className="mb-4">
        Customer must pay all fees as specified on the order, but if not specified then within 30 days of receipt of an invoice. Customer is responsible for the payment of all sales, use, withholding, VAT and other similar taxes. This agreement contemplates one or more orders for the Service, which orders are governed by the terms of this agreement.
      </p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>5. Mutual Confidentiality and Data Protection</h2>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>a. Definition of Confidential Information</p>
      <p className="mb-4">Confidential Information means all non-public information disclosed by a party (<strong>Discloser</strong>) to the other party (<strong>Recipient</strong>), whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure ( <strong>Confidential Information</strong>  ). Invoice Generator's Confidential Information includes without limitation the Service (including without limitation the Service user interface design and layout, and pricing information).</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>b. Protection of Confidential Information</p>
      <p className="mb-4">The Recipient must use the same degree of care that it uses to protect the confidentiality of its own confidential information (but in no event less than reasonable care) not to disclose or use any Confidential Information of the Discloser for any purpose outside the scope of this agreement. The Recipient must make commercially reasonable efforts to limit access to Confidential Information of Discloser to those of its employees and contractors who need such access for purposes consistent with this agreement and who have signed confidentiality agreements with Recipient no less restrictive than the confidentiality terms of this agreement.</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>c. Exclusions</p>
      <p className="mb-4">Confidential Information excludes information that: (i) is or becomes generally known to the public without breach of any obligation owed to Discloser, (ii) was known to the Recipient prior to its disclosure by the Discloser without breach of any obligation owed to the Discloser, (iii) is received from a third party without breach of any obligation owed to Discloser, or (iv) was independently developed by the Recipient without use or access to the Confidential Information. The Recipient may disclose Confidential Information to the extent required by law or court order, but will provide Discloser with advance notice to seek a protective order.</p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>6. Proprietary Property</h2>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>a. Reservation of Rights</p>
      <p className="mb-4">The software, workflow processes, user interface, designs, know-how, and other technologies provided by Invoice Generator as part of the Service are the proprietary property of Invoice Generator and its licensors, and all right, title and interest in and to such items, including all associated intellectual property rights, remain only with Invoice Generator. Customer may not remove or modify any proprietary marking or restrictive legends in the Service. Invoice Generator reserves all rights unless expressly granted in this agreement.</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>b. Restrictions</p>
      <p className="mb-4">Customer may not (i) sell, resell, rent or lease the Service or use it in a service provider capacity; (ii) use the Service to store or transmit infringing, unsolicited marketing emails, libelous, or otherwise objectionable, unlawful or tortious material, or to store or transmit material in violation of third-party rights; (iii) interfere with or disrupt the integrity or performance of the Service; (iv) attempt to gain unauthorized access to the Service or their related systems or networks; (v) reverse engineer the Service; or (vi) access the Service to build a competitive service or product, or copy any feature, function or graphic for competitive purposes.</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>c. Aggregate Data</p>
      <p className="mb-4">During and after the term of this agreement, Invoice Generator may use non-personally identifiable Customer Data within the Service for purposes of enhancing the Service, aggregated statistical analysis, technical support and other business purposes.</p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>7. Term and Termination</h2>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>a. Term</p>
      <p className="mb-4">This agreement continues until all orders have terminated.</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>b. Mutual Termination for Material Breach</p>
      <p className="mb-4">If either party is in material breach of this agreement, the other party may terminate this agreement at the end of a written 14-day notice/cure period, if the breach has not been cured.</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>c. Suspension for Non-Payment</p>
      <p className="mb-4">Invoice Generator may temporarily suspend or terminate, or both, the Service if Customer's payment on any invoice is more than 15 days past due.</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>d. Maintenance of Customer Data</p>
      <p className="mb-4">Within 90-days after termination, Customer Data will be available. After such 90-day period, Invoice Generator has no obligation to maintain the Customer Data and may destroy it.</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>e. Return Invoice Generator Property Upon Termination</p>
      <p className="mb-4">Upon termination of this agreement for any reason, Customer must pay Invoice Generator for any unpaid amounts, and destroy or return all property of Invoice Generator. Upon Invoice Generator's request, Customer will confirm in writing its compliance with this destruction or return requirement.</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>f. Suspension for Violations of Law</p>
      <p className="mb-4">Invoice Generator may temporarily suspend the Service or remove the applicable Customer Data, or both, if it in good faith believes that, as part of using the Service, Customer has violated a law. Invoice Generator will attempt to contact Customer in advance.</p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>8. Liability Limit</h2>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>a. Exclusion of indirect damages</p>
      <p className="mb-4">To the maximum extent allowed by law, Invoice Generator is not liable for any indirect, special, incidental or consequential damages arising out of or related to this agreement (including, without limitation, costs of delay; loss of data, records or information; and lost profits), even if it knows of the possibility of such damage or loss.</p>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>b. Total limit on liability</p>
      <p className="mb-4">To the maximum extent allowed by law, Invoice Generator's total liability arising out of or related to this agreement (whether in contract, tort or otherwise) does not exceed the amount paid by Customer within the 6-month period prior to the event that gave rise to the liability.</p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>9. Indemnity</h2>
      <p className="mb-4">If any third-party brings a claim against Invoice Generator, or requires Invoice Generator to respond to a legal process, related to Customer's acts, omissions, data or information within the Software, Customer must defend, indemnify and hold Invoice Generator harmless from and against all damages, losses, and expenses of any kind (including reasonable legal fees and costs) related to such claim or request.</p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>10. Governing Law and Forum</h2>
      <p className="mb-4">This agreement is governed by the laws of the State of Texas (without regard to conflicts of law principles) for any dispute between the parties or relating in any way to the subject matter of this agreement. Any suit or legal proceeding must be exclusively brought in the federal or state courts for Travis County, Texas, and Customer submits to this personal jurisdiction and venue. Nothing in this agreement prevents either party from seeking injunctive relief in a court of competent jurisdiction. The prevailing party in any litigation is entitled to recover its attorneys' fees and costs from the other party.</p>

      <h2 className={`text-lg font-semibold mt-8 mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>11. Other Terms</h2>
      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>a. Entire Agreement and Changes</p>
      <p className="mb-4">This agreement and the order constitute the entire agreement between the parties and supersede any prior or contemporaneous negotiations or agreements, whether oral or written, related to this subject matter. Customer is not relying on any representation concerning this subject matter, oral or written, not included in this agreement. No representation, promise or inducement not included in this agreement is binding. No modification of this agreement is effective unless both parties sign it, and no waiver is effective unless the party waiving the right signs a waiver in writing.</p>

      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>b. No Assignment</p>
      <p className="mb-4">Neither party may assign or transfer this agreement or an order to a third party, except that this agreement with all orders may be assigned, without the consent of the other party, as part of a merger, or sale of substantially all the assets, of a party.</p>

      <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>c. Independent Contractors</p>
      <p className="mb-4">The parties are independent contractors with respect to each other.</p>
      
            <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>d. Enforceability and Force Majeure</p>
            <p className="mb-4">If any term of this agreement is invalid or unenforceable, the other terms remain in effect. Except for the payment of monies, neither party is liable for events beyond its reasonable control, including, without limitation force majeure events.</p>
      
            <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>e. Money Damages Insufficient</p>
            <p className="mb-4">Any breach by a party of this agreement or violation of the other party’s intellectual property rights could cause irreparable injury or harm to the other party. The other party may seek a court order to stop any breach or avoid any future breach.</p>
      
            <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>f. No Additional Terms</p>
            <p className="mb-4">Invoice Generator rejects additional or conflicting terms of any Customer form-purchasing document.</p>
      
            <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>g. Order of Precedence</p>
            <p className="mb-4">If there is an inconsistency between this agreement and an order, the order prevails.</p>
      
            <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>h. Survival of Terms</p>
            <p className="mb-4">Any terms that by their nature survive termination of this agreement for a party to assert its rights and receive the protections of this agreement, will survive. The UN Convention on Contracts for the International Sale of Goods does not apply.</p>
      
            <p className={`mb-2 font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>i. Feedback</p>
            <p className="mb-4">By submitting ideas, suggestions or feedback to Invoice Generator regarding the Service, Customer agrees that such items submitted do not contain confidential or proprietary information; and Customer hereby grants Invoice Generator an irrevocable, unlimited, royalty-free and fully-paid perpetual license to use such items for any business purpose.</p>
        
      
      
      <Footer/>
          </div>
          </div>
          </div>
        );
      };
      
      export default PrivacyPolicy;
      