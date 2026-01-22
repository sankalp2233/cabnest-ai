import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "CabNest - Premium Cab Booking",
    description: "Experience the future of urban transport with CabNest.",
    icons: {
        icon: '/favicon.jpg',
    },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    );
}
