"use client";

import { usePathname } from "next-intl/client";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

const locales = ["en", "uk"];

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const t = useTranslations("Locale");

  const localize = (l: any) => {
    return t(l);
  };

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={pathName} locale={locale}>
                {localize(locale)}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
