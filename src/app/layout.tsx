import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ASD International — Innovation for Your Health',
    template: '%s | ASD International',
  },
  description:
    'ASD International is a premier pharmaceutical company delivering science-backed nutritional supplements including ASD Iron, Magnesium, Zinco Q10, Carniplex, and more.',
  keywords: ['pharmaceutical', 'supplements', 'healthcare', 'ASD International', 'nutrition', 'vitamins', 'minerals'],
  authors: [{ name: 'ASD International' }],
  creator: 'ASD International',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://asd-intl.com',
    siteName: 'ASD International',
    title: 'ASD International — Innovation for Your Health',
    description: 'Science-backed nutritional supplements for a healthier life.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
