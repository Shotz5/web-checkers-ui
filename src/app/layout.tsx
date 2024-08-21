import "./globals.css";
import { Providers } from "./providers";
import Simple from "./simple";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" style={{ colorScheme: "dark" }} data-theme="dark">
            <body>
                <Providers>
                    <Simple>
                        {children}
                    </Simple>
                </Providers>
            </body>
        </html>
    );
}
