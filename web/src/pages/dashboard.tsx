import router from "next/router";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useSWR from 'swr';
import Meta from '../components/Meta'
import Layout from '../components/Layout'
import TaskList from '../components/TaskList'

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user]);
  
  const { data, error } = useSWR("api/tasks/getAll");

  if (error) return <>An error has occurred.</>;
  if (!data) return <>Loading...</>;
  return (
    <Layout>
      <Meta title="dashboard" />
      <TaskOptions />
      <TaskList items={data} />
    </Layout>
  );
}