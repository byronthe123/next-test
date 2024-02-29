import type { Metadata } from "next";
import { UserProvider } from '@auth0/nextjs-auth0/client';

import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const metadata: Metadata = {
	title: "CHOICE Kiosk"
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<script async src="https://kit.fontawesome.com/041bbdbfb3.js"></script>
			<body>
				<UserProvider>
					{children}
				</UserProvider>
			</body>
		</html>
	);
}
