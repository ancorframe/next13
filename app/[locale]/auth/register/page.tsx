import { useTranslations } from "next-intl";
import styles from "../page.module.scss";
import RegisterForm from "./RegisterForm";

export const revalidate = 0;
export default function Register() {
  const t = useTranslations("RegisterPage");
  const translate = {
      name: t("name"),
      email: t("email"),
      password: t("password"),
    };
  return (
    <main className={styles.main}>
      <RegisterForm translate={translate} />
    </main>
  );
}
