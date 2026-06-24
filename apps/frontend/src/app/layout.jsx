import StoreProvider from '@/store/provider';
import './globals.scss';

export const metadata = {
  title: 'BM Ecosystem — Project Documentation',
  description: 'Unified full-stack project documentation for the BM delivery and e-commerce ecosystem',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
