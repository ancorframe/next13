// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
// import { getServerSession } from "next-auth";

import styles from "../../page.module.css";
import ListUsers from "./list-users";

// export const revalidate = 0;

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return users;
}

export default async function Admin() {
  // const session = await getServerSession(authOptions);
  // console.log(session);
  
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(["hydrate-users"], getUsers);
    const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <main className={styles.main}>
     <ListUsers/>
      </main>
    </Hydrate>
  );
}
