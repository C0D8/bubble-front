import type { Metadata } from "next";
import { Dosis, Inter} from "next/font/google";
import "./globals.css";
import localfont from "next/font/local";


const inter = Inter({ subsets: ["latin"] });

const dosis = Dosis({ subsets: ["latin"], weight: ['400', '700'], variable:'--font-dosis'
});

const billabong = localfont({
  src:[
    {path:'../../public/fonts/abeatbyKaiRegular.otf'}
  ],
  variable:'--font-billabong'

});




export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dosis.className} ${billabong.className}`}  >{children}</body>
    </html>
  );
}
