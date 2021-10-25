import { Button } from '@chakra-ui/react';
import React from "react";
import withAuth from '../components/Auth/withAuth';
import Layout from '../components/Layout';
import Meta from '../components/Meta';
import TaskList from '../components/TaskList';
import useTasks from "../hooks/useTasks";

function Dashboard() {
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

export default withAuth(Dashboard);

