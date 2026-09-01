import type { Metadata } from "next";

import { PlusDeck } from "./PlusDeck";

export const metadata: Metadata = {
  title: "How to sell subscription well — Veniamin Vekk",
  description:
    "A product design case study about rebuilding the Yandex Plus subscription experience.",
  openGraph: {
    title: "How to sell subscription well",
    description:
      "A product design case study about rebuilding the Yandex Plus subscription experience.",
    images: ["/assets/HAsPpFHrY8gd9dIWSIoqAh7o.png"],
  },
};

export default function PlusCaseStudy() {
  return <PlusDeck />;
}
