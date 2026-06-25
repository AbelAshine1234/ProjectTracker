import StoreProvider from '@/store/provider';
import { Inter } from 'next/font/google';
import './globals.scss';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'BM Ecosystem — Project Documentation',
  description: 'Unified full-stack project documentation for the BM delivery and e-commerce ecosystem',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
