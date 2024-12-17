import React from "react";
import styles from "../page.module.scss";
import { useLocale } from "next-intl";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export const revalidate = 80;
async function getUsers(locale: string) {
  const response = await fetch(`http://localhost:4499/api/message?locale=${locale}`);
  const data = await response.json();

  return data;
}
async function Cabinet() {
  const locale = useLocale();
  const session = await getServerSession(authOptions);
  const message = await getUsers(locale);
  console.log("ses", session);

  return (
    <main className={styles.main}>
      {session && JSON.stringify(session.user.user.userData)}
      <p>locale:{locale}</p>
    </main>
  );
}

export default Cabinet;
