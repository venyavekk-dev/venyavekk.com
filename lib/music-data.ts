import type { CollectionSectionData } from "@/components/sections/CollectionSection";

const yandexMusic = "https://music.yandex.ru";
const music = "/assets/music";

export const musicArtistDescription =
  "I build my songs from scratch: music, lyrics, arrangements, guitars, bass, synths, vocals, and concepts.\n\nFor me, every release is a small world made of sound, words, visuals, and videos. This year, I am preparing a new album.";

export const musicPlatformLinks = [
  { label: "Spotify", href: "https://open.spotify.com/artist/5mg1WRefzOYqFkWKFxFhD6?si=X1uftFFhQuKKxsUjW_dv3Q" },
  { label: "Yandex Music", href: "https://music.yandex.ru/artist/16974538" },
  { label: "Apple Music", href: "https://music.apple.com/us/artist/venya-vekk/1631904055" },
  { label: "YouTube Music", href: "https://music.youtube.com/channel/UCK-gvRtAq_zaY2BEJT_MIZA?si=wU0djgGqJCusxY92" },
  { label: "VK Music", href: "https://vk.com/artist/venyavekk" },
  { label: "SoundCloud", href: "https://soundcloud.com/venyavekk/" }
];

export const musicSections: CollectionSectionData[] = [
  {
    title: "Выйти из Айти",
    role: "Album",
    years: "2026",
    audience: ["2 of 12 tracks released", "album countdown"],
    cover: `${music}/leave-it.webp`,
    items: [
      {
        title: "Выйти из Айти",
        description: "Веня Векк",
        href: `${yandexMusic}/album/41903132/track/150988999`,
        image: `${music}/leave-it.webp`,
        duration: "03:04",
        videoUrl: "https://www.youtube.com/watch?v=H2IGh6k-XHA"
      },
      {
        title: "Голод",
        description: "Веня Векк",
        href: `${yandexMusic}/album/41903132`,
        image: `${music}/hunger.webp`,
        duration: "02:52",
        videoUrl: "https://www.youtube.com/watch?v=A82-uVFX3RM"
      },
      { title: "Командировка", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "03:18", status: "locked", videoPlanned: true },
      { title: "Ценник для своих", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "02:47", status: "locked", videoPlanned: true },
      { title: "Айтишник", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "03:29", status: "locked", videoPlanned: true },
      { title: "Падает листва", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "02:39", status: "locked", videoPlanned: true },
      { title: "Минус вайб", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "03:11", status: "locked", videoPlanned: true },
      { title: "Мой стыд", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "02:56", status: "locked", videoPlanned: true },
      { title: "Пепел", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "03:33", status: "locked", videoPlanned: true },
      { title: "Большой вопрос", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "02:44", status: "locked", videoPlanned: true },
      { title: "Маленький ты", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "03:07", status: "locked", videoPlanned: true },
      { title: "Золотая рыбка", description: "Веня Векк", image: `${music}/leave-it.webp`, duration: "02:31", status: "locked", videoPlanned: true }
    ]
  },
  {
    title: "Singles",
    role: "Single releases",
    years: "2025",
    audience: ["7 singles"],
    collageImages: [`${music}/dance.webp`, `${music}/dont-save.webp`, `${music}/to-je-ljubav.webp`, `${music}/prichina.webp`],
    items: [
      { title: "Танцуй", description: "Веня Векк, aivanilov", href: `${yandexMusic}/album/37357690`, image: `${music}/dance.webp`, duration: "single" },
      { title: "Не спасай", description: "Веня Векк", href: `${yandexMusic}/album/39814075`, image: `${music}/dont-save.webp`, duration: "single" },
      { title: "To je ljubav", description: "Веня Векк", href: `${yandexMusic}/album/37807722`, image: `${music}/to-je-ljubav.webp`, duration: "single" },
      { title: "Причина", description: "Веня Векк", href: `${yandexMusic}/album/36695263`, image: `${music}/prichina.webp`, duration: "single" },
      { title: "Травма", description: "Веня Векк", href: `${yandexMusic}/album/36326341`, image: `${music}/trawma.webp`, duration: "single" },
      { title: "Я буду окей", description: "Веня Векк", href: `${yandexMusic}/album/36221091`, image: `${music}/ill-be-ok.webp`, duration: "single" },
      { title: "Дисс на блогеров", description: "Веня Векк", href: `${yandexMusic}/album/36025584`, image: `${music}/diss.webp`, duration: "single" }
    ]
  },
  {
    title: "БРЭД",
    role: "Album",
    years: "2024",
    audience: ["10 tracks"],
    cover: `${music}/brad.webp`,
    items: [
      {
        title: "ДИС НА ВЕНЮ",
        description: "Веня Векк",
        href: `${yandexMusic}/album/33745183`,
        image: `${music}/brad.webp`,
        duration: "03:15",
        videoUrl: "https://www.youtube.com/watch?v=YknxhWV-I-U"
      },
      {
        title: "УБЕГАЙ",
        description: "Веня Векк",
        href: `${yandexMusic}/album/33745183`,
        image: `${music}/runaway.webp`,
        duration: "02:50",
        videoUrl: "https://www.youtube.com/watch?v=XQ3zFkdXtOM"
      },
      { title: "ОТПИСКА", description: "Веня Векк", href: `${yandexMusic}/album/33745183`, image: `${music}/brad.webp`, duration: "02:50" },
      { title: "КОПИЯ", description: "Веня Векк", href: `${yandexMusic}/album/33745183`, image: `${music}/copy.webp`, duration: "03:18" },
      { title: "ИСПОЛЬЗУЙ", description: "Веня Векк", href: `${yandexMusic}/album/33745183`, image: `${music}/brad.webp`, duration: "03:06" },
      { title: "ПЛЕВАТЬ", description: "Веня Векк", href: `${yandexMusic}/album/33745183`, image: `${music}/brad.webp`, duration: "02:32" },
      { title: "ДЕТКА", description: "Веня Векк", href: `${yandexMusic}/album/33745183`, image: `${music}/brad.webp`, duration: "03:27" },
      { title: "ДИЗАЙНЕР 52", description: "Веня Векк", href: `${yandexMusic}/album/33745183`, image: `${music}/brad.webp`, duration: "06:31" },
      { title: "ДРУЖБА В КАВЫЧКАХ", description: "Веня Векк", href: `${yandexMusic}/album/33745183`, image: `${music}/friendship-in-quotes.webp`, duration: "02:40" },
      { title: "МИР", description: "Веня Векк", href: `${yandexMusic}/album/33745183`, image: `${music}/brad.webp`, duration: "02:25" }
    ]
  },
  {
    title: "Singles",
    role: "Single releases",
    years: "2023",
    audience: ["6 singles"],
    collageImages: [`${music}/glubina.webp`, `${music}/na-dne.webp`, `${music}/hit.webp`, `${music}/price-too-high.webp`],
    items: [
      { title: "Глубина", description: "Веня Векк", href: `${yandexMusic}/album/28403656`, image: `${music}/glubina.webp`, duration: "single" },
      {
        title: "На дне",
        description: "Веня Векк",
        href: `${yandexMusic}/album/26724231`,
        image: `${music}/na-dne.webp`,
        duration: "single",
        videoUrl: "https://www.youtube.com/watch?v=EmEQtsa-nAM"
      },
      { title: "Хит!", description: "Веня Векк", href: `${yandexMusic}/album/26583902`, image: `${music}/hit.webp`, duration: "single" },
      {
        title: "Price Is Too High Slowed Versions",
        description: "Веня Векк",
        href: `${yandexMusic}/album/24281558`,
        image: `${music}/price-too-high.webp`,
        duration: "single"
      },
      { title: "Skeleton Boy", description: "Веня Векк", href: `${yandexMusic}/album/23993303`, image: `${music}/skeleton-boy.webp`, duration: "single" },
      { title: "Price Is Too High", description: "Веня Векк", href: `${yandexMusic}/album/23846512`, image: `${music}/price-too-high.webp`, duration: "single" }
    ]
  },
  {
    title: "Обычность",
    role: "Album",
    years: "2022",
    audience: ["10 tracks"],
    cover: `${music}/obychnost.webp`,
    items: [
      { title: "Go On", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "02:27" },
      { title: "Try", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "02:50" },
      { title: "Candy", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "02:36" },
      { title: "Dancing in the Car", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "02:54" },
      { title: "Bio", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "02:51" },
      { title: "Like U", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "02:32" },
      { title: "From Ma", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "01:13" },
      { title: "Uspet", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "02:50" },
      { title: "From Dad", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "01:41" },
      { title: "Waves Outro", description: "Веня Векк", href: `${yandexMusic}/album/22949854`, image: `${music}/obychnost.webp`, duration: "01:33" },
      {
        title: "Обычность (slowed)",
        description: "Веня Векк",
        href: `${yandexMusic}/album/22949854`,
        image: `${music}/obychnost-slowed.webp`,
        duration: "bonus"
      },
      {
        title: "Обычность (speed up)",
        description: "Веня Векк",
        href: `${yandexMusic}/album/22949854`,
        image: `${music}/obychnost-speedup.webp`,
        duration: "bonus"
      }
    ]
  }
];
