// src/app/layout.js
import Navbar from '@/components/NavBar';
import './globals.css';

export const metadata = {
  title: 'MyApp',
  description: 'A simple Next.js app with a navbar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
