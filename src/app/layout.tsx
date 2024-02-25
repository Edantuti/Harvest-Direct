import "~/styles/globals.css";

import { Inter } from "next/font/google";
import SusProvider from "~/provider/SusProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Harvest Direct",
  description: "Harvest Direct",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <SusProvider>
        {children}
        </SusProvider>
      </body>
    </html>
  );
}
