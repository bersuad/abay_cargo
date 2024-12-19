import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  useNavigation,
  ScrollView,
} from './../../../../components/index';

export default function App() {
  
  const navigation = useNavigation();

  return (
    <ScrollView style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
        <View style={styles.container}>

            <View style={[styles.boxShadow, styles.offers, {marginTop: 0, height: 60}]}>
                <Text style={{...styles.cardText, fontSize:13, position: "absolute", left: 10, marginLeft: 1, marginTop: 20, top: 1, textAlign: 'left' }}>ABAY LOGISTICS PLC STANDARD TERMS AND CONDITIONS FOR THE PROVISION OF FREIGHT & LOGISTICS SERVICES</Text>                
            </View>

            <View style={[styles.boxShadow, styles.offers, {marginTop: 0, minHeight: 1000, maxHeight:'auto', width: '98%', padding:19}]}>
                <Text style={{...styles.cardText, fontSize:13, marginTop: 20, top: 1, textAlign: 'justify' }}>
                  1 INTERPRETATION
                  
                    {"\n"}{"\n"}
                    1.1 In this Services Agreement the definitions set out below shall apply:
                    {"\n"}{"\n"}
                    a) “Bill of Lading” shall mean where Abay is acting as an agent pursuant to Condition, the bill of lading issued by a Third-Party carrier in respect of the Goods.
                    {"\n"}{"\n"}
                    b) “Charges” means:
                    {"\n"}{"\n"}
                    i. Abay’s own commission (rates) for the provision of the Services as set out in the price quote or otherwise notified to the Customer; and
                    {"\n"}{"\n"}
                    ii. All fees, costs, surcharges, pass-through costs, out of pocket expenses and any other expenses incurred by Abay that includes third party costs in connection with the provision of the Services to the Customer.
                    {"\n"}{"\n"}
                    c) “Confidential Information” means each item of proprietary information which would reasonably be regarded as confidential, and the intellectual property rights therein, disclosed by one Party to another, including but not limited to any financial information, procurement and purchasing requirements, business forecasts, sales and marketing plans and information and customer lists relating to that Party or any of its affiliates.
                    {"\n"}{"\n"}
                    d) “Abay” shall either:
                    {"\n"}{"\n"}
                    i. have the meaning given to it in the FLSA; or ii. Where the Parties have not entered into a FLSA, mean the entity providing the Services under these STCs.
                    {"\n"}{"\n"}
                    ii. Where the Parties have not entered into a FLSA, mean the entity providing the Services under these STCs.
                    {"\n"}{"\n"}
                    e) “Consignee” shall mean any person, agent or employee appointed by the Customer or named in the Bill of Lading to take delivery of the Goods being transported.
                    {"\n"}{"\n"}
                    “Container”means, without limitation, any pallet, packing case, container, tank or any other unit or item used to transport Goods.
                    {"\n"}{"\n"}
                    g) “Customer”shall either:
                    {"\n"}{"\n"}
                    i. have the meaning given to it in the FLSA; or
                    {"\n"}{"\n"}
                    ii. Where the Parties have not entered into a FLSA, mean the entity receiving the Services under these STCs.
                    {"\n"}{"\n"}
                    h) “Delivery Point”means the premises of either the Consignee or the Relevant customs point.
                    {"\n"}{"\n"}
                    i) “FLSA”or “Freight and Logistics Service Agreement”shall mean, where applicable, the agreement with that title entered into between Abay and the Customer.
                    {"\n"}{"\n"}
                    j) “Goods”means any consignment of freight to which the Services relate, which are the subject of an Order and includes any packaging, containers or equipment.
                    {"\n"}{"\n"}
                    k) “Order”means a request made by the Customer to Abay for Services to be performed in relation to Goods.
                    {"\n"}{"\n"}
                    l) “Owner”means the person who owns or is entitled to the possession of the Goods or, where applicable, the Bill of Lading.
                    {"\n"}{"\n"}
                    m) “Party”means Abay and the Customer and “Parties” shall be construed accordingly.
                    {"\n"}{"\n"}
                    n) “Port of Discharge”means the port to which the Customer has stated in the Order that delivery of the Goods shall be made.
                    {"\n"}{"\n"}
                    o) “Port of Loading”means the port to which the Customer has stated in the Order that pick up of the Goods shall be made.
                    {"\n"}{"\n"}
                    p) “Port Authority”means the organization responsible for managing and maintaining the traffic and regulations at the relevant port.
                    {"\n"}{"\n"}
                    q) “Public Official”means (i) any official or employee of any government agency or government- owned or controlled enterprise, (ii) any person performing a public function, (iii) any official or employee of a public international organization.
                    {"\n"}{"\n"}
                    r) “Relevant Operator”Operator” means the operator or operators of any vessel nominated by the Customer to take delivery of the Goods at a Port.
                    {"\n"}{"\n"}
                    s) “Services” shall mean either:
                    {"\n"}{"\n"}
                    i. the services set out in the FLSA; or
                    {"\n"}{"\n"}
                    ii. Where the Parties have not entered into a FLSA, the services that Abay has agreed to provide to the Customer.
                    {"\n"}{"\n"}
                    t) “Services Agreement”shall mean either:
                    {"\n"}{"\n"}
                    i. The FLSA; or
                    {"\n"}{"\n"}
                    ii. Where the Parties have not entered into a FLSA, an agreement for the provision of the Services by Abay to the Customer, and shall incorporate these STCs and, where applicable, any Bill of Lading.
                    {"\n"}{"\n"}
                    u) “Shipper”shall mean a person who coordinates the transport of goods.
                    {"\n"}{"\n"}
                    v) “STCs”or“Standard Terms and Conditions”shall mean these standard terms and conditions for the provision of freight and logistics services including its schedule(s), as such are amended from time to time.
                    {"\n"}{"\n"}
                    w) “Third Party” or “Third Parties”shall mean persons other than the Parties.
                    {"\n"}{"\n"}
                    1.2 As used in these STCs:
                    {"\n"}{"\n"}
                    i. the masculine includes the feminine and the neuter; and
                    {"\n"}{"\n"}
                    ii. The singular includes the plural and vice versa.
                    {"\n"}{"\n"}
                    1.3 Headings are included in these STCs for ease of reference only and shall not affect their interpretation or construction.
                    {"\n"}{"\n"}
                    1.4 References to Conditions are, unless otherwise provided, references to conditions of these STCs.
                    {"\n"}{"\n"}
                    1.5 Where there is a conflict between a Bill of Lading, the FLSA and these STCs, the conflict shall be resolved in accordance with the following order of precedence:
                    {"\n"}{"\n"}
                    i. the Bill of Lading (where applicable);
                    {"\n"}{"\n"}
                    ii. the FLSA or, if there is no FLSA, any other agreement for services between Abay and the Customer; and
                    {"\n"}{"\n"}
                    iii. These STCs.
                    {"\n"}{"\n"}
                    1.6 Any reference to any statute or legislation shall be deemed to include any amendments, re- enactments or replacements of such statute or legislation.
                    {"\n"}{"\n"}
                    2 APPLICATIONS
                    {"\n"}{"\n"}
                    2.1 If any mandatory laws are applicable to the provision of the Services under these STCs, these STCs shall be construed as being subject to such laws. Nothing in these STCs shall be construed as a waiver by Abay of any of its rights or protections or as an extension of any of its obligations or responsibilities under such mandatory laws.
                    {"\n"}{"\n"}
                    2.2 Abay shall be entitled to retain and be paid all amounts customarily retained by, or paid to providers of services similar to the Services. These shall not affect the Charges payable by the Customer.
                    {"\n"}{"\n"}
                    3 APPOINTMENTS AND SCOPE OF WORK
                    {"\n"}{"\n"}
                    3.1 The Customer appoints Abay to provide the Services, in consideration for the Charges. Abay reserves the right to refuse any Order.
                    {"\n"}{"\n"}
                    3.2 To the extent required, the Customer hereby appoints Abay as its agent to enter into any contracts on behalf of the Customer which Abay in its absolute discretion believes are necessary for the performance of the Services or as may be necessary or desirable to carry out the Customer’s instructions including, where applicable, any services to be performed under the specific agreement entered or pursuant to the FLSA or other agreement for the provision of services between Abay and the Customer.
                    {"\n"}{"\n"}
                    3.4 Abay shall, following reasonable written notice from the Customer, provide the Customer with evidence of any contract Abay has entered into on the Customer’s behalf as the Customer’s agent.
                    {"\n"}{"\n"}
                    3.5 Abay may in its absolute discretion subcontract any of its rights and obligations under this Services Agreement without the prior written consent of the Customer.
                    {"\n"}{"\n"}
                    4 ABAY’S OBLIGATIONS
                    {"\n"}{"\n"}
                    4.1 In relation to the Services to be provided, Abay shall:
                    {"\n"}{"\n"}
                    i. comply with and act in accordance with any mandatory law; and
                    {"\n"}{"\n"}
                    ii. exercise reasonable skill and care in the performance of its responsibilities; and
                    {"\n"}{"\n"}
                    iii. Use reasonable endeavours to comply with all reasonable specific instructions in writing which the Customer may give (provided that such instructions do not conflict with the Services Agreement).
                    {"\n"}{"\n"}
                    4.2 Abay reserves the right to deviate from any specific instructions given by the Customer, or from any stated means by which it will provide the Services if any event or situation arises rendering the provision of the Services in that manner not commercially viable, despite the reasonable endeavours of Abay to the contrary.
                    {"\n"}{"\n"}
                    4.3 The Customer shall have no recourse against Abay in respect of any deviation by Abay from the instructions of the Customer in accordance with Condition 4.2.
                    {"\n"}{"\n"}
                    5. THE CUSTOMER’S OBLIGATIONS
                    {"\n"}{"\n"}
                    5.1 In relation to the Services to be provided by Abay, the Customer shall for the benefit of Abay:
                    {"\n"}{"\n"}
                    i. comply with and act in accordance with any mandatory law;
                    {"\n"}{"\n"}
                    ii. provide to Abay in good time and in advance all information necessary for Abay to provide the Services on a timely basis, including but not limited to details of the Shipper/Consignee or the relevant appointed agent, the details of the Goods to be shipped and desired timings for performance of the Services;
                    {"\n"}{"\n"}
                    iii. Provide all documentation and information necessary for Abay to provide the Services. pursuant to these STCs within a reasonable time of any request for such information being made; and
                    {"\n"}{"\n"}
                    iv. Cooperate with all authorities on all matters relating to the provision of the Services.
                    {"\n"}{"\n"}
                    5.2 The Customer shall accept, and shall procure that any Shipper/Consignee or appointed agent accepts, delivery of the Services in accordance with these STCs.
                    {"\n"}{"\n"}
                    5.3 Should the Consignee or any appointed agent fail to take delivery of the Goods at the Delivery Point, Abay shall be entitled to store the Goods or any part thereof at the sole risk of the Customer, Consignee or appointed agent, whereupon the liability (if any) of Abay in respect of the Goods or that part thereof shall wholly cease. All costs (including but not limited to storage costs and legal fees) incurred by Abay as a result of the failure to take timely delivery shall be paid by the Customer to Abay upon demand.
                    {"\n"}{"\n"}
                    5.4 Receipt by the Consignee entitled to delivery of the Goods without complaint is prima facie evidence that the Goods have been delivered in good condition and in accordance with this Services Agreement.
                    {"\n"}{"\n"}
                    5.5 The Customer warrants that:
                    {"\n"}{"\n"}
                    i. all information provided by or on behalf of the Customer which relates to required Services or Goods shall be complete and accurate;
                    {"\n"}{"\n"}
                    ii. all equipment and other materials provided by the Customer in relation to or for the purposes of the performance of the Services, including but not limited to any Container, is fully fit for purpose and in good condition;
                    {"\n"}{"\n"}
                    iii. all Goods are fit for carriage and all steps have been taken to ensure the Goods have been appropriately prepared and packaged and are capable of being identified; and
                    {"\n"}{"\n"}
                    iv. Any Container provided by the Customer is in good condition and is suitable for the carriage of the Goods.
                    {"\n"}{"\n"}
                    5.6 Where Abay provides the Container, the Customer accepts that, by loading the Goods onto or into such Container, the Container is in good condition and is suitable for the carriage of the Goods.
                    {"\n"}{"\n"}
                    5.7 The Customer acknowledges that, where the Customer delivers to Abay, or causes Abay to deal with or handle Goods which are or may be considered to be hazardous, dangerous or capable of causing damage or adversely affecting other goods or Goods likely to attract rodents or other animal life whether declared to Abay or not, the Customer shall be liable for all losses or damage that may arise in connection with such Goods.
                    {"\n"}{"\n"}
                    5.8 Where Condition 5.7 applies, the Customer:
                    {"\n"}{"\n"}
                    i. shall at all times fully indemnify Abay and hold it harmless against all penalties, claims, damages, losses, costs and expenses (including but not limited to legal expenses) whatsoever arising in connection with any such Goods; and
                    {"\n"}{"\n"}
                    ii. Accepts that Abay shall be entitled to deal with the Goods in such manner as Abay, or any other person in whose custody the Goods may be at any relevant time, thinks fit.
                    {"\n"}{"\n"}
                    6. REMUNERATION
                    {"\n"}{"\n"}
                    6.1 The Customer undertakes to pay Abay the Charges, as consideration for the Services provided by Abay in accordance with separate agreement agreed between the Parties. If no express payment terms have been agreed between the Parties (either in a FLSA or otherwise), the default payment terms in Condition 6.2 shall apply.
                    {"\n"}{"\n"}
                    6.2 Abay shall issue an invoice prior to shipment which the Customer must pay prior to shipment. Abay reserves the right to cancel any Order where payment has not been made in accordance with this Condition.
                    {"\n"}{"\n"}
                    6.3 Abay shall have no liability to pay any tax, duty, levy or charge of any kind imposed by any state or state authority by reason of the provision of the Services (other than tax on its overall net income imposed in a state in which Abay is based for tax purposes). Where Abay incurs expenses or is subject to any claims in relation to such payments, the Customer shall at all times fully indemnify Abay and hold it harmless in respect of all penalties, claims, damages, losses, costs and expenses (including but not limited to legal expenses) whatsoever arising incurred in connection with such taxes, duties, levies, charges or similar items of expenditure.
                    {"\n"}{"\n"}
                    6.4 Without prejudice to any rights that Abay may have pursuant to the Bill of Lading (if applicable), Abay shall have a general right of lien in respect of any Goods or any documents relating to Goods in its possession or control at any time, for all sums which are due from the Customer at any time.
                    {"\n"}{"\n"}
                    6.5 The Customer shall pay to Abay all sums immediately when due without any deduction or withholding other than as required by mandatory law (and where any deduction or withholding is required by mandatory law the Customer shall increase the amount payable to Abay to reflect the amount that Abay would have received if no deduction or withholding had been made) and the Customer shall not be entitled to assert any credit, set-off or counterclaim against Abay in order to justify withholding payment of any such amount in whole or in part.
                    {"\n"}{"\n"}
                    6.6 In the event of default of any payment due, or in the event of the levying of any distress or execution against the Customer or the making by it of any composition or arrangement with creditors or, being Abay, the Customer’s liquidation or any analogous insolvency procedure in any jurisdiction, then all contracts between the Customer and Abay shall be terminated immediately and all sums owed (whether invoiced or not) by the Customer to Abay shall become due and payable immediately provided that, in Abay’s absolute discretion, Abay may complete any Orders that have already been placed by the Customer at the date of termination and the Customer shall pay all Charges in relation to such Orders. Such termination is without prejudice to the accrued rights and liabilities of the Parties prior to termination.
                    {"\n"}{"\n"}
                    6.7 Customers who are allowed to pay in definite time are expected to pay on the agreed date. If they fail to pay on the agreed date; they will be charged additional bank interest rate on the total or remaining balance
                    {"\n"}{"\n"}
                    6.8 Abay will charge customers disbursement commission for the payment effected on behalf of Customers for third parties amount equal to 5 % on the total amount
                    {"\n"}{"\n"}
                    7 LIMITATION OF LIABILITY
                    {"\n"}{"\n"}
                    7.1 Nothing in this Services Agreement or these STCs shall operate to limit or exclude either Party’s liability to the other for any liability which cannot be limited or excluded by mandatory law.
                    {"\n"}{"\n"}
                    7.2 Under no circumstances shall Abay be liable to the Customer for any of the following types of loss or damage arising under or in relation to this Services Agreement (whether arising from breach of contract, misrepresentation (whether tortious or statutory), tort (including but not limited to negligence), breach of statutory duty, or otherwise):
                    {"\n"}{"\n"}
                    I. any loss of profits, business, contracts, anticipated savings, goodwill, or revenue, any wasted expenditure, any loss of market, or any loss or corruption of data (regardless of whether any of these types of loss or damage are direct, indirect or consequential); or
                    {"\n"}{"\n"}
                    II. Any indirect or consequential loss or damage whatsoever even if the Parties were aware of the possibility that such loss or damage might be incurred by the Customer.
                    {"\n"}{"\n"}
                    7.3 On express instructions in writing declaring the Goods and their value, received from the Customer and accepted by Abay, Abay may accept liability in excess of the limits set out in Condition
                    {"\n"}{"\n"}
                    7.4 Abay will put counter claim to customers who sub contracted some activities on behalf of Abay for any loss
                    {"\n"}{"\n"}
                    8 THIRD PARTY LIABILITIES
                    {"\n"}{"\n"}
                    8.1 The Customer shall be responsible for and shall at all times fully indemnify Abay and hold it harmless in respect of all claims by any Third Party (including but not limited to damages, losses, costs, expenses and legal expenses) whatsoever arising out of or in connection with the Services and/or alleging Abay’s liability for death or personal injury or property damage which Abay may incur or suffer as a result of the negligence, default or breach of statutory duty by the Customer, its employees or agents.
                    {"\n"}{"\n"}
                    9 INDEMNITIES
                    {"\n"}{"\n"}
                    9.1 The Customer shall at all times fully indemnify Abay and hold it harmless against all claims, losses, damages, costs and expenses (including but not limited to legal expenses) whatsoever arising which Abay may incur in connection with the performance of the Services under this Services Agreement, unless any such matter arises solely and directly by reason of the wilful misconduct or negligence of Abay.
                    {"\n"}{"\n"}
                    9.2 If Abay at any time provides any bond, guarantee or other form of security to any customs or other local authority in connection with the Services provided, the Customer shall at all times fully indemnify Abay and hold it harmless from any claims, damages, losses, costs and expenses (including but not limited to legal expenses) whatsoever arising and made thereunder and otherwise reimburse Abay immediately upon any such claims being made, unless any such claim arises solely and directly by reason of the wilful misconduct or negligence of Abay.
                    {"\n"}{"\n"}
                    9.3 Without limiting the foregoing terms, if Abay finds itself, whether by mandatory law or otherwise , jointly or severally liable for any liabilities of the Customer or any other party seeks to hold Abay liable for any liabilities of the Customer, then the Customer shall fully indemnify Abay and hold it harmless for any claims, damages, losses, costs and expenses (including but not limited to legal expenses) whatsoever arising and made in respect thereof and shall not in any way assert any claim for a contribution from Abay.
                    {"\n"}{"\n"}
                    10 INSURANCES
                    {"\n"}{"\n"}
                    10.1 The Customer shall take out cargo insurance, at its own expense, for the full replacement value of the Goods, and shall keep such insurance valid and in force for the term of this Services Agreement.
                    {"\n"}{"\n"}
                    10.2 Abay shall not be required to take out insurance in relation to the Goods but, in the event of any claim for loss of or damage to Goods, Abay may, in its absolute discretion claim against any cargo insurance policies it may have in place, and then send a liability letter to all service providers related to the shipment under dispute on behalf of Customers
                    {"\n"}{"\n"}
                    10.3. Contracted truck owners will provide Comprehensive insurance for their vehicle, third party and separate cargo insurance for full amount of cargo they transport. Abay will not be liable for the accident and damage caused by them
                    {"\n"}{"\n"}
                    11. CONFIDENTIALITY
                    {"\n"}{"\n"}
                    11.1 Subject to Condition 11.2, Abay and the Customer agree to keep all Confidential Information confidential, not to use it for any purpose (other than in the context of the Services) and not to disclose it without the prior written consent of the other Party to any Third Party, unless:
                    {"\n"}{"\n"}
                    I. the information was public knowledge at the time of the disclosure;
                    {"\n"}{"\n"}
                    II. the information becomes public knowledge other than by breach of the confidentiality requirements set out in these STCs;
                    {"\n"}{"\n"}
                    III. the information subsequently comes lawfully into its possession from a Third Party; or
                    {"\n"}{"\n"}
                    IV. Such disclosure is required pursuant to any mandatory laws or regulations to which the disclosing Party is subject.
                    {"\n"}{"\n"}
                    11.2 Each Party shall be entitled to disclose Confidential Information to its directors, shareholders, officers, employees, advisers and consultants having a need to know the same. Abay may disclose the Confidential Information to potential assignees or transferees.
                    {"\n"}{"\n"}
                    11.3 Neither Party shall make any announcement, statement or press release concerning this Services Agreement without the prior written consent of the other Party.
                    {"\n"}{"\n"}
                    12. ASSIGNMENT
                    {"\n"}{"\n"}
                    12.1 The Customer may not assign or transfer all or any part of this Services Agreement or any part of its rights or obligations under it without the prior written consent of Abay, such consent not to be unreasonably withheld or delayed.
                    {"\n"}{"\n"}
                    12.2. Abay will outsource transport, clearance and other related services to third parties as the nature of the work required without the consent of the customer
                    {"\n"}{"\n"}
                    13. FORCE MAJEURE
                    {"\n"}{"\n"}
                    13.1 In relation to the provision of the Services, the obligations of Abay and/or the Customer shall be suspended during any period and to the extent that such Party is prevented or hindered from complying with such obligations by any cause beyond its reasonable control including, but not limited to, strikes, lock-outs, labour disputes, acts of God, war, riot, civil commotion, malicious damage, compliance with any mandatory law or government order, rule, regulation or direction, port security, Port Authorities and security restrictions in ports, accident, breakdown of plant or machinery, fire, flood, storm or other adverse weather conditions, difficulty or increased expense in obtaining workmen, materials, supplies or raw materials in connection with the provision of the Services.
                    {"\n"}{"\n"}
                    13.2 In the event of either Party being so hindered or prevented in accordance with Condition 13.1, the Party concerned shall give notice of suspension as soon as reasonably possible to the other Party, stating the date and extent of the suspension and its cause and the omission to give such notice shall forfeit the right of such Party to claim suspension. Any Party whose obligations have been suspended as aforesaid shall resume the performance of those obligations as soon as reasonably possible after the removal of the cause of suspension and shall so notify the other Party. 13.3 Conditions 13.1 and 13.2 do not apply in relation to the payment obligations of the Parties contained in Condition 6.
                    {"\n"}{"\n"}
                    14 NOTICES
                    {"\n"}{"\n"}
                    14.1 Any notice or other communication given or made by Abay or the Customer under this Services Agreement or otherwise in connection with the provision of the Services shall be in writing and may be delivered to the relevant Party or sent by courier (either domestic or international as applicable), facsimile transmission or email to the address or communication number of that Party as may be notified by that Party from time to time for this purpose and shall be effective notwithstanding any change of address not so notified.
                    {"\n"}{"\n"}
                    14.2 Unless the contrary is proved, each such notice or communication shall be deemed to have been given or made and delivered, if by courier delivery (either domestic or international as applicable) during Working Hours when left at the relevant address and otherwise on the next working day after delivery and if by facsimile or email during Working Hours when transmitted and otherwise on the next working day after transmission. For the purposes of this Condition 15.2, “Working Hours” shall mean between the hours of 8.30am and 5.00pm Monday to Friday and Saturday from 8; 30 am to 6; 30 pmin the local time of the territory where the notice is delivered.
                    {"\n"}{"\n"}
                    15 ETHICAL STANDARDS
                    {"\n"}{"\n"}
                    15.1 Abay and Customers staffs will treat each other and their customers ethically
                    {"\n"}{"\n"}
                    15.2 Abay and Customer will deliver the service in an Ethical manner
                    {"\n"}{"\n"}
                    15.3 Both parties will demonstrate corporate social responsibility
                    {"\n"}{"\n"}
                    15.4 Both parties will not request any additional cost other than stipulated under the tariff article
                    {"\n"}{"\n"}
                    16. ENTIRE INTO FORCE
                    {"\n"}{"\n"}
                    16.1. This standard terms and conditions apply to both parties
                    {"\n"}{"\n"}
                    16.2 This standard terms and conditions will constitute part of the contract between parties
                    {"\n"}{"\n"}
                    16.3 It constitutes part of the contract without written consent as far as both parties do business as it is publicly posted in the Abay website and sent to the customer before starting the business
                    {"\n"}{"\n"}
                    17 LAW AND JURISDICTION
                    {"\n"}{"\n"}
                    17.1 This Services Agreement and any disputes or claims arising out of or in connection with its subject matter or formation (including but not limited to non-contractual disputes or claims) shall be governed by and construed in accordance with Ethiopian law.
                    {"\n"}{"\n"}
                    17.2 Any dispute arising out of or in connection with this Services Agreement (including but not limited to non-contractual disputes or claims) shall be referred to arbitration in Ethiopia in accordance with the Arbitration Act or any statutory modification or re-enactment thereof.
                    {"\n"}{"\n"}
                    17.3 The reference to arbitration shall be to three arbitrators. A Party wishing to refer a dispute to arbitration shall appoint its arbitrator and send notice of such appointment in writing to the other Party requiring the other Party to appoint its own arbitrator within 14 calendar days of such notice and stating that it will appoint its arbitrator as sole arbitrator unless the other Party appoints its own arbitrator and gives notice that it has done so within the 14 calendar days specified. If the other Party does not appoint its own arbitrator and does not give notice that it has done so within the 14 calendar days specified, the Party referring a dispute to arbitration may, without the requirement of any further prior notice to the other Party, appoint its arbitrator as sole arbitrator and shall advise the other Party accordingly. The award of a sole arbitrator shall be binding on both Parties as if such sole arbitrator had been appointed by agreement except in the case of manifest error. If both Parties appoint an arbitrator, then the two arbitrators shall appoint the third arbitrator who will act as chairman and the award of such three arbitrators shall be binding on both Parties except in the case of manifest error.
                    {"\n"}{"\n"}
                    17.4 Nothing herein shall prevent the Parties agreeing in writing to vary these provisions to provide for the appointment of a sole arbitrator.
                    {"\n"}{"\n"}
                    17.5 Nothing in this Services Agreement shall preclude Abay from the right to seek in any jurisdiction security or interim orders (by means of an appropriate remedy of relief including, but not limited to, in rem arrests, injunctions, attachments, seizures, sales, detention, exercise of any lien or otherwise howsoever) in each case in accordance with any mandatory law or regulation in respect of claims arising in any jurisdiction.
                </Text>                
            </View>

        </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  image: {
    marginBottom: 0,
    height: 100,
    width: 100,
    objectFit: "contain",
  },
  logoArea:{
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    backgroundColor: "rgba(25, 120, 142, 0.3)",
    borderRadius: 8,
    width: '90%',
    height: 45,
    marginBottom: 20,
    marginTop: 30,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "90%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    backgroundColor: "#19788e",
    color: '#fff',
    marginBottom: 10
  },
  loginText: {
    color: '#fff',
  },
  cardText: {
    fontSize: 13,
    textAlign: 'center',
    marginTop: 10,
    color: '#111',
    fontWeight: "600",
  },
  boxShadow:{
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 1,
  },
  welcomeCard:{
    minHeight: 200,
    minWidth: '94%',
    padding: 15,
    alignContent: 'flex-start',
    textAlign: "left",
    alignItems: "flex-start",
    top: 0,
  },
  cardImage:{
    opacity: 0.9,
    height: 50,
    width: 50,
    borderRadius: 100,
    borderColor: '#fff',
    borderWidth: 1
  },
  listCard:{
    flex: 1, 
    backgroundColor: '#fafafa', 
    height: 100, 
    width: 100, 
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  iconArea:{
    height: 40,
    width: 40,
    backgroundColor: 'green',
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  offers:{
    width: '94%',
    // height: 70,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  badge:{
    height: 20, 
    width:20, 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: 100,
  },
    HeaderText:{
        flex:1,
        color: '#4F4F4F',
        fontWeight:"bold",
        fontSize: 18,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    TextInput: {
        height: 50,
        padding: 10,
    },
});