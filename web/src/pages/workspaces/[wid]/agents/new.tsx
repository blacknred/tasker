import React from "react";
import withAuth from "../../../../components/Auth/withAuth";
import Layout from "../../../../components/Layout";
import Meta from '../../../../components/Meta';

function NewAgent() {
  return (
    <Layout>
      <Meta title="new agent" />
    </Layout>
  );
}

export default withAuth(NewAgent);
