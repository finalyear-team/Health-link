import { gql, useQuery } from "@apollo/client";
import { GET_USERS } from "@/graphql/queries/userQueries";

const useFetchUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  return {
    loading,
    error,
    users: data ? data.GetUsers : [],
  };
};

export default useFetchUsers;
