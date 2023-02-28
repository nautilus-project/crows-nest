import Link from "next/link";
import "./globals.css";
import Header from "@/src/components/header";
import { WalletContext } from "@/src/context/WalletContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Crow's Nest</title>
      </head>

      <body>
        <main>
          <WalletContext>
            <div>
              <Header />

              <div>{children}</div>
            </div>
          </WalletContext>
        </main>
      </body>
    </html>
  );
}
