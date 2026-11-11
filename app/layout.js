import { Plus_Jakarta_Sans } from "next/font/google";
import { Shell } from "@/components/Shell";
import { ShopProvider } from "@/components/ShopProvider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
});

export const metadata = {
  title: {
    default: "Haat — Men's & Women's Clothing",
    template: "%s — Haat",
  },
  description:
    "T-shirts, shirts, two-piece and three-piece suits for men and women, from ₹200 to ₹9,500, delivered across India.",
};

const themeScript = `try{if(localStorage.getItem("theme")==="dark")document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-edition="haat"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${jakarta.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <ShopProvider>
          <Shell>{children}</Shell>
        </ShopProvider>
      </body>
    </html>
  );
}
