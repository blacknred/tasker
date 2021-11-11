import React from "react";
import withAuth from "../../../components/Auth/withAuth";
import Layout from "../../../components/Layout";
import Meta from '../../../components/Meta';

function Workspace() {
  return (
    <Layout>
      <Meta title="workspace" />
      {/* <TaskToolbar>
        <TaskList />
      </TaskToolbar> */}
    </Layout>
  );
}

export default withAuth(Workspace);

