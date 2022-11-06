import React from "react";
import withAuth from "../../../../components/Auth/withAuth";
import Layout from "../../../../components/Layout";
import Meta from '../../../../components/Meta';

function Agent() {
  return (
    <Layout>
      <Meta title="agent" />
      {/* <AgentInfo/> */}
      {/* <TaskToolbar>
        <TaskList />
      </TaskToolbar> */}
    </Layout>
  );
}

export default withAuth(Agent);
