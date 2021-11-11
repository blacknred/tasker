import React from "react";
import withAuth from "../../components/Auth/withAuth";
import Layout from "../../components/Layout";
import useWorkspaces from "../../hooks/useWorkspaces";

function Workspaces() {
  const { items } = useWorkspaces(1);

  return (
    <Layout>
      {/* <TaskToolbar>
        <TaskList />
      </TaskToolbar> */}
    </Layout>
  );
}

export default withAuth(Workspaces);

