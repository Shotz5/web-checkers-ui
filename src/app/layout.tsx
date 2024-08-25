'use client'

import "./globals.css";
import { Providers } from "./providers";
import NavBar from "./components/NavBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" style={{ colorScheme: "dark" }} data-theme="dark">
            <body>
                <Providers>
                    <NavBar>
                        {children}
                    </NavBar>
                </Providers>
            </body>
        </html>
    );
}
