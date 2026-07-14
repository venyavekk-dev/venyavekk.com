export const links = [
  {
    label: "CV",
    href: "https://drive.google.com/file/d/17Zl3kA6sJNceSh-B2MzVVKJ7wT_WrKFD/view?usp=sharing"
  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vekk/" },
  {
    label: "Notion Resume",
    href: "https://dvor.notion.site/Benjamin-Vekk-a19e7f9a624842af9d7433825cf8e557?pvs=4"
  }
] as const;

export type Project = {
  title: string;
  description: string;
  image: string;
  video?: string;
  aspectRatio?: string;
  maxWidth?: number;
  fit?: "cover" | "contain";
  href?: string;
};

export type CompanySection = {
  company: string;
  role: string;
  years: string;
  audience?: string[];
  logo: string;
  yandexPlusShowcase?: {
    productDesignerImages: string[];
    designLeadImages: string[];
  };
  hideProjects?: boolean;
  projects: Project[];
};

export const companySections: CompanySection[] = [
  {
    company: "Yandex Plus",
    role: "Product Design Lead",
    years: "2025 → now",
    audience: ["50M users"],
    logo: "/assets/vQHpJgJHYRgAuEdoDFsVl7pP8g.png",
    yandexPlusShowcase: {
      productDesignerImages: [
        "/assets/projects/dis06.webp",
        "/assets/projects/dis08.webp",
        "/assets/projects/dis05.webp",
        "/assets/projects/dis01.webp",
        "/assets/projects/dis04.webp",
        "/assets/projects/dis02.webp",
        "/assets/projects/dis07.webp"
      ],
      designLeadImages: [
        "/assets/projects/Artdir01.webp",
        "/assets/projects/Artdir06.webp",
        "/assets/projects/Artdir05.webp",
        "/assets/projects/Artdir08.webp",
        "/assets/projects/Artdir10.webp",
        "/assets/projects/Artdir14.webp",
        "/assets/projects/Artdir02.webp",
        "/assets/projects/Artdir03.webp",
        "/assets/projects/Artdir04.webp",
        "/assets/projects/Artdir13.webp",
        "/assets/projects/Artdir09.webp",
        "/assets/projects/Artdir12.webp",
        "/assets/projects/Artdir07.webp",
        "/assets/projects/Artdir11.webp"
      ]
    },
    hideProjects: true,
    projects: [
      {
        title: "Completely new paywall",
        description: "A focused redesign that nails business goals and user clarity - simpler offers, cleaner UI, better conversion",
        image: "/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png",
        aspectRatio: "249 / 495",
        maxWidth: 249,
        href: "https://plus.yandex.com/en"
      },
      {
        title: "New add-on purchase screen",
        description: "Perfectly guides users through multiple upsell options - simple, clear, and built to convert",
        image: "/assets/GPtO07NsC3qlkt6A0mFXsXyCiI.png",
        aspectRatio: "249 / 495",
        maxWidth: 249,
        href: "https://plus.yandex.com/en"
      }
    ]
  },
  {
    company: "Yango Play App",
    role: "Senior Product Designer",
    years: "2023 → 2024",
    audience: ["7 MENA countries"],
    logo: "/assets/4mez3we6UkZVeT8MouJG9oskg.png",
    projects: [
      {
        title: "Payment Methods Widget",
        description: "Product design for paywall displays to support various payment methods and improve conversion rates",
        image: "/assets/QbBMf95gIlv4zetKNfnQmwMTRmE.png",
        href: "https://play.yango.com/?lang=en"
      },
      {
        title: "Unique Paywalls",
        description: "Product design for paywalls with missed revenue opportunities to boost purchase conversion.",
        image: "/assets/HUlMhczfbsLPFZCTONVaVClv6Pg.png",
        href: "https://play.yango.com/?lang=en"
      }
    ]
  },
  {
    company: "T-Bank",
    role: "Senior Product Designer",
    years: "2022 → 2023",
    audience: ["50M clients"],
    logo: "/assets/wfrCiecwLEk1ITXL4tMndL5wo.png",
    projects: [
      {
        title: "Hotel Search Scenario",
        description: "Designed a seamless hotel search flow with engaging interactions to boost user retention",
        image: "/assets/HxcfkXkHcS7zCaKKRw1aB2vs6Xs.png",
        video: "/assets/video/compressed/Fk75mwmSV7IGsVPBjwNGfV8UfDE.webm",
        aspectRatio: "244 / 510",
        maxWidth: 244,
        href: "https://www.figma.com/"
      },
      {
        title: "Hotel Card Design",
        description: "User-centric design that makes hotel evaluation effortless - all essential info is structured for quick and confident decision-making",
        image: "/assets/HxcfkXkHcS7zCaKKRw1aB2vs6Xs.png",
        video: "/assets/video/compressed/S8AcnpY1M3JZMLLJ3npSNFa9HR8.webm",
        aspectRatio: "244 / 510",
        maxWidth: 244
      },
      {
        title: "Flight Ticket Purchase",
        description: "Product design to simplify flight search and promote the most relevant ticket options",
        image: "/assets/HxcfkXkHcS7zCaKKRw1aB2vs6Xs.png",
        video: "/assets/video/compressed/4DUrGTPE0gsOmDuADEuEZe4roY.webm",
        aspectRatio: "244 / 510",
        maxWidth: 244
      },
      {
        title: "Room & Hotel Cards",
        description: "Product design for an engaging hotel room selection that helps users find the best option",
        image: "/assets/HxcfkXkHcS7zCaKKRw1aB2vs6Xs.png",
        video: "/assets/video/compressed/sFFdMTDsFKJiV2RYFEO3mRtdq4.webm",
        aspectRatio: "244 / 510",
        maxWidth: 244
      }
    ]
  },
  {
    company: "NDA & Retail",
    role: "Product Designer",
    years: "2023 → 2019",
    audience: ["7M", "4.46B yearly visits"],
    logo: "/assets/NBHQhrukUXUKAPKMrDfo5oTDj1k.png",
    projects: [
      {
        title: "Alternative App Marketplace",
        description: "Product design across all platforms for a large app marketplace • 2022 • 7M MAU",
        image: "/assets/projects/rustore.webp",
        aspectRatio: "1288 / 1084"
      },
      {
        title: "Main App for Pyatеrochka",
        description: "Redesign of the user's personal account. Impact on retention by creating a loyalty program • 2021 • 4.46B yearly visits",
        image: "/assets/projects/pya.webp",
        aspectRatio: "1288 / 1084"
      }
    ]
  }
];

export const testimonials = [
  {
    name: "Ivan Zviahin",
    role: "Design Manager Tinkoff",
    avatar: "/assets/qp8etQTvtwxFUSjYtEIOCAj7w.jpeg",
    quote:
      "As a Product Designer Veniamin did a great job in contribution to vision of the product, was leading all design activities. Great design and collaborations skills, strong understanding of technical aspects and software discovery and development processes. I would definitely recommend Veniamin for IC and MGMT design position and strongly believe in his expertise."
  },
  {
    name: "Oleg Alexandrov",
    role: "ex Design-director MAX, Founder @hiry_agency",
    avatar: "/assets/0JFdIJBaijXPTj6hqjahtwzBxD8.jpeg",
    quote:
      "Veniamin is a great designer who is a pleasure to work with. He came to a retail project with an audience of over 1 million to help create a new loyalty program. After a successful MVP Veniamin delegated the work to another designer and focused on the product teams to help them with processes and product design."
  },
  {
    name: "Kate Tuhai",
    role: "Design Lead @Sizze.io, Red Dot Winner",
    avatar: "/assets/wQzHvzJqUNWtweDZoLEfxtpg2Y.jpeg",
    quote:
      "Veniamin is an excellent product designer. We worked with Ben on an application for hotels, where he developed the application UX/UI from the very beginning. Veniamin works closely with product teams and product owners to better understand goals and deliver the best results."
  },
  {
    name: "Pavel Babiy",
    role: "ex-CPO Pyatorochka",
    avatar: "/assets/R2V6lR6HuM84kwIqmSXj8PasPyA.jpeg",
    quote:
      "Veniamin is a true professional. From the first meeting it was clear that we would work together. He structured the process of working on layouts, putting them into work and checking the final result, and helped teams think about how the product should develop further."
  }
];

export const talks = [
  {
    videoId: "YXNp_F6XmYc",
    title: "Design Prosmotr · Oct 11, 2019",
    description: "Lecture of Design Thinking · 6k views · over 100 listeners"
  },
  {
    videoId: "3c3H1zQISww",
    title: "Design Prosmotr · Apr 24, 2020",
    description: "Lecture “How to keep clients and jobs” · 8k views"
  }
];
