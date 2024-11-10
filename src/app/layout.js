import Navbar from '@/components/NavBar';
import { MobileProvider } from "@/context/MobileContext";
import { NavbarProvider } from "@/context/NavbarContext";
import { Roboto } from 'next/font/google';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme/theme';
import './globals.css';

export const metadata = {
  title: 'MyApp',
  description: 'A simple Next.js app with a navbar',
};

const roboto = Roboto({
  weight: "300",
  subsets: ["latin"],
  variable: "--font-roboto"
})

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <NavbarProvider>
            <MobileProvider>
              <main style={{ fontFamily: roboto.style.fontFamily }}>
                <Navbar />
                {children}
              </main>
            </MobileProvider>
          </NavbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
