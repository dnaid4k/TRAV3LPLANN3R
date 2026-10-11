import './globals.css';

export const metadata = {
  title: 'TRAV3LPLANN3R',
  description: 'Plan less. Travel more.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}