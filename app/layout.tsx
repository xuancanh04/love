import type { Metadata, Viewport } from "next";
import { Dancing_Script, Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Thiệp Chúc Mừng 20-10 | Ngày Phụ Nữ Việt Nam",
  description: "Thiệp chúc mừng ngày Phụ Nữ Việt Nam 20/10 với hiệu ứng hoa rơi, âm nhạc và lời chúc ý nghĩa tràn đầy yêu thương.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#050209",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={`${montserrat.variable} ${dancingScript.variable} h-full antialiased`}>
      <body className="h-full w-full m-0 p-0 font-sans bg-[#050209] text-slate-800 select-none overflow-hidden">
        {children}
      </body>
    </html>
  );
}
