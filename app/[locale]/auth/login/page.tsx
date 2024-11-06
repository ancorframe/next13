
import { useTranslations } from "next-intl";
import styles from "../page.module.scss";
import LoginForm from "./LoginForm";

// export const revalidate = 0;

export default function Login() {
  const t = useTranslations("LoginPage");
  const translate = {
    email: t("email"),
    password: t("password")
  };
  return (
    <main className={styles.main}>
      <LoginForm translate={translate} />
    </main>
  );
}
