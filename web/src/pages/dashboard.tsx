import { Button } from '@chakra-ui/react';
import router from "next/router";
import { useEffect } from "react";
import Layout from '../components/Layout';
import Meta from '../components/Meta';
import TaskList from '../components/TaskList';
import useAuth from "../hooks/useAuth";
import useTasks from "../hooks/useTasks";

export default function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) router.replace("/");
  }, [user]);

  const { data, error, loadMore, isLoadingMore, isReachingEnd } = useTasks();

  if (error) return <>An error has occurred.</>;
  if (!data) return <>Loading...</>;
  return (
    <Layout>
      <Meta title="dashboard" />
      <TaskList items={data} />
      <Button
        isDisabled={isLoadingMore || isReachingEnd}
        isLoading={isLoadingMore}
        colorScheme="teal"
        onClick={loadMore}
        variant="solid">
        {isReachingEnd ? 'No more posts' : 'Load More'}
      </Button>
    </Layout>
  );
}