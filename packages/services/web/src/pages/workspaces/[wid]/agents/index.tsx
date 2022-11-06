import React from "react";
import withAuth from "../../../../components/Auth/withAuth";
import Layout from "../../../../components/Layout";
import Meta from '../../../../components/Meta';

function Agents() {
  return (
    <Layout>
      <Meta title="agents" />
      {/* <AgentToolbar>
        <AgentList />
      </AgentToolbar> */}
    </Layout>
  );
}

export default withAuth(Agents);
