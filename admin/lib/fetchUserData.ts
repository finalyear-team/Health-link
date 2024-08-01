import client from "@/graphql/apollo-client";
import { GET_USER } from "../graphql/queries/userQueries";

export const fetchUserData = async (userID: string) => {
  try {
    const { data } = await client.query({
      query: GET_USER,
      variables: { id: userID },
    });
    return data.GetUser;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
