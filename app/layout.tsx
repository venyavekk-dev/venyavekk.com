import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://venyavekk.com"),
  title: "Veniamin Vekk",
  description: "Designer, musician, and filmmaker",
  openGraph: {
    title: "Veniamin Vekk",
    description: "Designer, musician, and filmmaker",
    images: ["/assets/zhoGyz3txRaZFjgEq7BreUwhbQ.jpeg"]
  },
  icons: {
    icon: "/assets/zhoGyz3txRaZFjgEq7BreUwhbQ.jpeg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
