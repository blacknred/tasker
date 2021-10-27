import React from "react";
import withAuth from "../components/Auth/withAuth";
import Layout from "../components/Layout";
import Meta from '../components/Meta';
import TaskList from '../components/Tasks/List';
import TaskToolbar from "../components/Tasks/Toolbar";

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

