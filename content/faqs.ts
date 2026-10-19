/**
 * Frequently asked questions.
 *
 * Question wording follows the design (docs/design/FAQs.dc.html). Answers were
 * carried over from the live site (highgrove.co.nz/frequently-asked-questions)
 * with light copy-editing only. Several answers still carry details from the
 * original sell-down period (weekly fee amount, bank name, facility timing) and
 * should be reviewed by the client before launch.
 *
 * An answer is a list of blocks: a plain paragraph, a bullet list, or a
 * paragraph containing a single link.
 */

export type FaqLinkParagraph = { before?: string; link: { label: string; href: string }; after?: string };
export type FaqBlock = string | { list: string[] } | FaqLinkParagraph;
export type Faq = { q: string; a: FaqBlock[] };

export const faqs: Faq[] = [
  {
    q: "Who owns the village?",
    a: [
      "The village is owned and operated by Highgrove Holdings Limited, with Geraldine Ferry, Khim Ferry and Linda McFadyen as Directors. Geraldine, Khim and Linda are committed to providing a village environment that is supportive, happy and caring.",
    ],
  },
  {
    q: "Why move in to a village? What are the benefits?",
    a: [
      "Village life offers the best of both worlds: you can enjoy the benefits of privacy and security whilst not having to worry about maintaining your home. Choosing a village which suits you can enrich your lifestyle and give you the time you deserve to pursue your interests in a friendly and safe environment. Some reasons to move to a village are:",
      {
        list: [
          "Enjoy the privacy of your own home",
          "Maintain independence in a supportive environment",
          "Peace of mind from 24 hour ‘on call’ assistance",
          "Gain access to a variety of services and recreation facilities",
          "Remove the major worry of maintaining a home",
          "Eliminate the need to worry about security",
        ],
      },
      "The most common phrase we hear from existing residents is “I wish I had made the decision to move sooner.” Villages provide a haven for people who seek an improved quality of life and peace of mind, financial and physical security, whilst retaining their independence within an open environment.",
      "Village life is designed to afford you a lifestyle with abundant advantages not found in conventional suburban living: a place to relax and set a pace for yourself, with the opportunity to share skills and talents with other village residents, if you so desire.",
    ],
  },
  {
    q: "Who are Geraldine and Khim Ferry?",
    a: [
      "Gerrie and Khim are a mother and daughter team. Gerrie is a Registered Nurse and well qualified as a people person. Khim holds a Bachelor of Commerce and Arts from Auckland University and has been involved in the family business for many years.",
      "The family continue to own and operate Greenview Park Village, established in 1997, which they designed and built. Visit Greenview online at www.greenview.co.nz.",
    ],
  },
  {
    q: "Is the Village financially viable? What are the chances of it going into receivership?",
    a: [
      "The Village is funded in part by private equity from the Ferry family, and by funds advanced by ANZ National Bank. Audited Financial Statements are available each year.",
      "The Statutory Supervisor receives a Quarterly Directors Report on Highgrove Village, which incorporates financial covenants set by them. A Financial Quarterly Report on the Ferry Group is checked by the Bank’s credit team; covenants and ratios are key indicators which are met each quarter.",
    ],
  },
  {
    q: "How do I purchase a home at Highgrove Lifestyle Village?",
    a: [
      "Firstly, an Application Form needs to be completed. You will then be supplied with the following documents:",
      {
        list: [
          "The Disclosure Statement",
          "The Occupation Right Agreement",
          "Dept. of Building and Housing Code of Practice",
          "The Code of Residents’ Rights",
        ],
      },
      "On completing an Application Form, you will be asked to pay a deposit of $2,000, with no further payment necessary until final settlement. The deposit will be held by the Statutory Supervisor and is fully refundable on request (with any interest accrued) if you choose not to proceed.",
    ],
  },
  {
    q: "What type of title do I get, how do I own my Apartment?",
    a: [
      "You occupy your home with an “Occupation Right Agreement” (ORA). This form of agreement is provided for under the Retirement Villages Act 2003 and is considered best practice in the retirement village industry.",
    ],
  },
  {
    q: "How does the Occupation Right Agreement (ORA) protect my financial interest?",
    a: [
      "Your interests are protected by means of a Memorandum of Encumbrance, which is registered over the title of the village property and held in the name of the Statutory Supervisor. The Memorandum of Encumbrance is like a first mortgage over the land, which acts as security to ensure performance of the Village’s responsibilities, as stated in the Occupation Right Agreement.",
    ],
  },
  {
    q: "What is a Statutory Supervisor?",
    a: [
      "Effectively they act as a “watchdog” over the operations of the Village on behalf of Residents. This includes ensuring Highgrove Village fulfils its obligations as stated in the Occupation Right Agreement under the Retirement Villages Act 2003.",
      "We have appointed Covenant Trustee Services Limited as our independent Statutory Supervisor, whose role is to protect the rights of our Residents. Covenant Trustee is New Zealand’s leading provider of statutory supervision services to the retirement village sector. More information is available at www.covenant.co.nz.",
    ],
  },
  {
    q: "Do Residents have a “voice” in the Village?",
    a: [
      "A Resident Committee will be elected by the Residents. This Committee will liaise with Village Management. The Committee plays an important role in providing a communicative and happy village.",
    ],
  },
  {
    q: "What is the Village Weekly Fee and what does this cover?",
    a: [
      "The Village ‘Weekly Fee’ is $162.69 ($705 per month). It is actual cost, with no profit margin. Your Weekly Fee covers the village operating costs, which include:",
      {
        list: [
          "Maintenance of grounds and communal areas",
          "External building maintenance",
          "Administration costs, including staff costs",
          "Statutory Supervisor’s fee",
          "Rubbish disposal",
          "Rates (land and water)",
          "Building insurance",
          "Village vehicle and transport",
          "Emergency calls",
          "Security",
          "Long-term maintenance provision fund",
        ],
      },
    ],
  },
  {
    q: "Can the weekly fee change?",
    a: [
      "Yes. The weekly fee covers the day-to-day costs of running Highgrove. During the sell-down phase we subsidise the overall running of the village. Once the village is fully occupied, we expect it to become self-sufficient in covering its costs.",
      "The Weekly Fee is an actual cost; it does not include a profit margin, and we would not envisage it increasing by more than CPI. Council rates are the largest component of the weekly fee, and have been the largest influence on weekly fee increases at our Waitakere village.",
      "A full financial report is prepared annually; it includes prior year operating accounts and the coming year’s forecast budgets. The Company’s Auditors and Statutory Supervisor review these accounts before they are distributed to residents.",
    ],
  },
  {
    q: "Are there any other costs involved?",
    a: [
      "Yes. You will be responsible for all private usage within your home, such as power, telephone, contents insurance and the interior upkeep of your home.",
    ],
  },
  {
    q: "Are there any other costs involved when I leave the village?",
    a: [
      "No. We will refurbish your apartment to an ‘as new’ condition, facilitating the sale of your apartment. We will also manage the entire sale process, which may include marketing, staging furniture and open homes.",
    ],
  },
  {
    q: "When will the Village Facilities be available?",
    a: [
      "Community facilities are available and ready for your enjoyment. Facilities include a dining room, bar and club lounge, indoor heated pool and spa, indoor bowls, gymnasium, library with internet access and hair salon.",
    ],
  },
  {
    q: "What is the 24hr Emergency Callout?",
    a: [
      "Each apartment is equipped with emergency call buttons and a pendant you can wear. These are linked directly to our on-site Hospital Nurse Care System. Once activated, care staff at the Hospital are alerted, and a trained member of staff will respond immediately to any emergency.",
    ],
  },
  {
    q: "What additional services will be provided?",
    a: [
      "Additional Service Packages are available to meet Residents’ needs. Service packages can cater for a wide variety of needs; these can incorporate anything from meals, laundry and cleaning services to the delivery of care in your home.",
    ],
  },
  {
    q: "Are there provisions for on-going care?",
    a: [
      "Yes. Patrick Ferry House, our on-site Hospital, is adjacent to the Village. Patrick Ferry House will provide Emergency Assistance and the requested Additional Services. As a Highgrove Resident, you will have a right of priority admission over any waiting list.",
    ],
  },
  {
    q: "Can I have my own garden?",
    a: [
      "Yes. If you wish, you may maintain the garden adjoining your apartment and/or other areas as arranged with the Village Manager.",
    ],
  },
  {
    q: "Will I be able to have a pet?",
    a: [
      "We recognise the value of pets and the companionship they provide. However, we must also protect other residents’ right to quiet enjoyment of their home and village amenities. Subject to the Village Manager’s approval, you may be able to bring your current pet to Highgrove Village.",
    ],
  },
  {
    q: "What happens when I go on holiday?",
    a: [
      "While you are away you can relax with the knowledge that your home is secure, your mail collected, and exterior maintenance taken care of. It is your home and you may come and go as you please.",
    ],
  },
  {
    q: "Can I have my friends, family or relatives stay?",
    a: [
      "Yes. It is your home and your visitors are most welcome in the Village at any time. Friends, family or relatives can stay on a short-term basis.",
    ],
  },
  {
    q: "What is the Retirement Village Association (RVA)? Does this benefit me?",
    a: [
      "The Retirement Villages Association of New Zealand Inc (RVA) is a voluntary membership association for retirement villages in New Zealand. The RVA is a national body that works to represent, protect and promote the interests of its members and their associated services.",
      "The principal aim of the RVA is to represent villages with a shared vision for providing quality services. To achieve this, the association has a member Code of Practice requiring RVA members to operate their villages in a professional manner and with the highest level of integrity. The Code of Practice is externally audited and provides assurance to residents and members that village management is meeting the required standards.",
      "For more information visit www.retirementvillages.org.nz.",
    ],
  },
  {
    q: "What is your complaints procedure?",
    a: [
      {
        before: "Please ",
        link: {
          label: "download our complaints policy (PDF)",
          href: "https://highgrove.co.nz/wp-content/uploads/2018/02/Highgrove-Complaints-Policy-1-April-2017.pdf",
        },
        after: ".",
      },
    ],
  },
];

/** Plain-text version of an answer, for structured data. */
export function faqAnswerText(a: FaqBlock[]): string {
  return a
    .map((b) =>
      typeof b === "string"
        ? b
        : "list" in b
          ? b.list.map((li) => `• ${li}`).join("\n")
          : `${b.before ?? ""}${b.link.label}${b.after ?? ""} ${b.link.href}`,
    )
    .join("\n\n");
}
