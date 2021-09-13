import router from "next/router";
import { useEffect } from "react";
import useUser from "../hooks/useAuth";
import useSWR from 'swr'
import { Square, Flex } from "@chakra-ui/layout";
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import TaskList from '../components/TaskList'

export default function Dashboard() {
  const { user, loggedOut } = useUser();

  useEffect(() => {
    if (user && !loggedOut) router.replace("/");
  }, [user, loggedOut]);
  const { data, error } = useSWR("api/tasks/getAll");

  if (error) return <>An error has occurred.</>;
  if (!data) return <>Loading...</>;
  return (
    <Layout>
      <Meta />
      <Flex>
        <Square>

        </Square>
      </Flex>
      <TaskList items={data} />
    </Layout>
  );
}