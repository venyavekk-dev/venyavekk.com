import type { CollectionSectionData } from "@/components/sections/CollectionSection";

const youtube = "https://www.youtube.com/watch?v=";
const thumbnail = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const filmArtistDescription =
  "I make vertical videos, short films, and visual stories about my life, thoughts, and everyday experience.\n\nFor me, films are a way to freeze time. I do everything myself: idea, script, camera, music, voice, editing, and production.";

export const filmLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@venya-vekk/videos" },
  { label: "Instagram", href: "https://www.instagram.com/venyavekk" },
  { label: "TikTok", href: "https://www.tiktok.com/@venyavekk" }
];

export const filmSections: CollectionSectionData[] = [
  {
    title: "Short films",
    role: "Selected videos",
    years: "2024",
    audience: ["short films", "visual stories"],
    collageImages: [thumbnail("mpnuerFGGtA"), thumbnail("xydVeKYYv4k"), thumbnail("xQhZD6HVtSs"), thumbnail("8kdZXUcSOJU")],
    items: [
      {
        title: "Short film I",
        description: "Visual story",
        href: `${youtube}mpnuerFGGtA`,
        videoUrl: `${youtube}mpnuerFGGtA`,
        videoMode: "external",
        image: thumbnail("mpnuerFGGtA"),
        duration: "YouTube"
      },
      {
        title: "Short film II",
        description: "Visual story",
        href: `${youtube}xydVeKYYv4k`,
        videoUrl: `${youtube}xydVeKYYv4k`,
        videoMode: "external",
        image: thumbnail("xydVeKYYv4k"),
        duration: "YouTube"
      },
      {
        title: "Short film III",
        description: "Visual story",
        href: `${youtube}xQhZD6HVtSs`,
        videoUrl: `${youtube}xQhZD6HVtSs`,
        videoMode: "external",
        image: thumbnail("xQhZD6HVtSs"),
        duration: "YouTube"
      },
      {
        title: "Short film IV",
        description: "Visual story",
        href: `${youtube}8kdZXUcSOJU`,
        videoUrl: `${youtube}8kdZXUcSOJU`,
        videoMode: "external",
        image: thumbnail("8kdZXUcSOJU"),
        duration: "YouTube"
      }
    ]
  },
  {
    title: "Short-form",
    role: "Experiments",
    years: "2023",
    audience: ["compact stories", "creative sketches"],
    collageImages: [thumbnail("3Vtout49avI"), thumbnail("M3lFKnbfhWQ"), thumbnail("j89YduxCBZ0"), thumbnail("Z2RWTLjoW_8")],
    items: [
      {
        title: "Short-form I",
        description: "Creative sketch",
        href: `${youtube}3Vtout49avI`,
        videoUrl: `${youtube}3Vtout49avI`,
        videoMode: "external",
        image: thumbnail("3Vtout49avI"),
        duration: "YouTube"
      },
      {
        title: "Short-form II",
        description: "Creative sketch",
        href: `${youtube}M3lFKnbfhWQ`,
        videoUrl: `${youtube}M3lFKnbfhWQ`,
        videoMode: "external",
        image: thumbnail("M3lFKnbfhWQ"),
        duration: "YouTube"
      },
      {
        title: "Short-form III",
        description: "Creative sketch",
        href: `${youtube}j89YduxCBZ0`,
        videoUrl: `${youtube}j89YduxCBZ0`,
        videoMode: "external",
        image: thumbnail("j89YduxCBZ0"),
        duration: "YouTube"
      },
      {
        title: "Short-form IV",
        description: "Creative sketch",
        href: `${youtube}Z2RWTLjoW_8`,
        videoUrl: `${youtube}Z2RWTLjoW_8`,
        videoMode: "external",
        image: thumbnail("Z2RWTLjoW_8"),
        duration: "YouTube"
      }
    ]
  },
  {
    title: "Early short",
    role: "Archive",
    years: "2022",
    audience: ["short film"],
    cover: thumbnail("wiRmZRclac4"),
    items: [
      {
        title: "Early short film",
        description: "Archive visual story",
        href: `${youtube}wiRmZRclac4`,
        videoUrl: `${youtube}wiRmZRclac4`,
        videoMode: "external",
        image: thumbnail("wiRmZRclac4"),
        duration: "YouTube"
      }
    ]
  }
];
