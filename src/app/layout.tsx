import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/components/Header'; // 💥 Import the Header
import Footer from '@/components/Footer'; // 💥 Import the Header

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Million Dollar Homepage',
  description: 'Buy a pixel and own a piece of internet history.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* 🚀 Added Header here */}
        <main>{children}</main> {/* Keep your page content here */}
        <Footer /> 
      </body>
    </html>
  );
}
