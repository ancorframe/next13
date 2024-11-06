import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

const baseURL = process.env.BACKEND_URL;

// interface OriginalRequestResponse {
//   response: Response;
//   data: any;
// }

const originalRequest = async (
  url: string,
  config: object
)=> {
  url = `${baseURL}${url}`;
  const response = await fetch(url, config);
  const data = await response.json();
  return { response, data };
};

export const customFetcher = async (url: string, config: any = {}) => {
  // const session = await getServerSession(authOptions);
  
  //   console.log("prev session", session);

  // config["headers"] = {
  //   Authorization: `Bearer ${session?.user.accessToken}`
  // }
    const { data } = await originalRequest(url, config);
    return data;
  
};

 
