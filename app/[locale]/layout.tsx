import "../globals.scss";
import "../variables.scss";
import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getTranslator } from "next-intl/server";
import Header from "./_header/Header";
import NextSessionProvider from "@/utils/sessionProvider";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata({ params: { locale } }: any) {
  const t = await getTranslator(locale, "Metadata");

  return {
    metadataBase: new URL("https://karmolog4u-fate-matrix.vercel.app"),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/",
      languages: {
        "ru-RU": `/ru/`,
        "uk-UA": `/uk/`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "/",
      siteName: "Karmolog4u",
      images: [
        {
          url: `/opengraph-image.jpg`,
          width: 624,
          height: 630,
        },
        {
          url: "/opengraph-image.jpg",
          width: 1800,
          height: 1200,
          alt: "Custom alt",
        },
      ],
      locale: locale,
      type: "website",
    },
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "light" },
      { media: "(prefers-color-scheme: dark)", color: "dark" },
    ],
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      siteId: "1467726470533754880",
      creator: "@Karmolog4u",
      creatorId: "1467726470533754880",
      images: ["/twitter-image.jpg"],
    },
    manifest: "/manifest.json",
    icons: {
      icon: "/icon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
      other: [
        {
          rel: "apple-touch-icon-precomposed",
          url: "/apple-touch-icon-precomposed.png",
        },
      ],
    },
    other: {
      "color-scheme": "dark light",
    },
  };
}

interface Props {
  children: React.ReactNode;
  params: any;
}

export default async function RootLayout({ children, params }: Props) {
  const locale = useLocale();

  if (params.locale !== locale) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NextSessionProvider>
            <Header />
            {children}
          </NextSessionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
