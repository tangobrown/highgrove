export type TeamMember = {
  name: string;
  role: string;
  /** Headshot in /public/images (very low resolution — replace with originals). */
  image: string;
  alt: string;
  bio: string[];
};

export const team: TeamMember[] = [
  {
    name: "Geraldine Ferry",
    role: "Director",
    image: "/images/team-geraldine.png",
    alt: "Geraldine Ferry",
    bio: [
      "Co-founder, owner and matriarch. Born in Singapore and a former UK registered nurse, Gerrie came to New Zealand with her Scottish husband Patrick and family in 1994.",
      "Six years running a 60-bed hotel in London gave her a deep understanding of consistent, quality service — something that inspired her vision for Greenview Park and Highgrove.",
    ],
  },
  {
    name: "Khim Fletcher (nee Ferry)",
    role: "Managing Director",
    image: "/images/team-khim.png",
    alt: "Khim Fletcher (nee Ferry)",
    bio: [
      "Born in London and raised in France, Khim was groomed for her role from high school, working every holiday from receptionist to cleaning, cooking and onsite management.",
      "A University of Auckland graduate (BCom Finance and BA French), she joined the management team in 2004 and became Managing Director in 2007. Married to Andrew with three young children, Khim knows what close family ties mean.",
    ],
  },
  {
    name: "Patrick Ferry",
    role: "Operations Manager",
    image: "/images/team-patrick.png",
    alt: "Patrick Ferry",
    bio: [
      "Patrick was introduced to the family business early — from “assisting” the builders on site as a teenager to working as a labourer through university. He’s still known to cover for the maintenance team.",
      "With a bachelor’s degree in property and four years as a site and project manager in the UK, Patrick returned to New Zealand and the family business in 2012.",
    ],
  },
  {
    name: "Linda McFadyen",
    role: "General Manager",
    image: "/images/team-linda.png",
    alt: "Linda McFadyen",
    bio: [
      "A long-serving member of the team, Linda started as a part-time office assistant in 2006 and worked her way up to General Manager and Director. A former software developer, she keeps everything ticking along smoothly.",
      "Originally from Scotland, Linda loves that no two days are the same — and most of all the people, who together create the warm, welcoming family atmosphere.",
    ],
  },
  {
    name: "Andrew Fletcher",
    role: "Legal Counsel / Contracts & Compliance",
    image: "/images/team-andrew.png",
    alt: "Andrew Fletcher",
    bio: [
      "Andrew holds degrees in Law and Science (Ecology) from the University of Otago, and was a solicitor with Auckland firms Simpson Grierson and Sanderson Weir before joining the family business in 2011.",
      "He looks after all aspects of contracting and compliance, and together with his wife Khim is raising their three young children.",
    ],
  },
];
