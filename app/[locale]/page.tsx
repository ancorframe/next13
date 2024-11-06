import { useTranslations } from "next-intl";
import styles from "./page.module.scss";

export const revalidate = 900; // 15m

export default function Home() {
  const t = useTranslations("Index");

  return <main className={styles.main}></main>;
}
