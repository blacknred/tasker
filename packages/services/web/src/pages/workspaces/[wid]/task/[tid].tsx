import React from "react";
import withAuth from "../../../../components/Auth/withAuth";
import Layout from "../../../../components/Layout";

function Task() {
  return (
    <Layout>About task</Layout>
  );
}

export default withAuth(Task);
