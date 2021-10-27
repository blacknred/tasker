import React from "react";
import withAuth from "../components/Auth/withAuth";
import Layout from "../components/Layout";
import Meta from '../components/Meta';
import TaskList from '../components/TaskList';
import TaskToolbar from "../components/TaskToolbar";

function Dashboard() {
  return (
    <Layout>
      <Meta title="dashboard" />
      <TaskToolbar>
        <TaskList />
      </TaskToolbar>
    </Layout>
  );
}

export default withAuth(Dashboard);

