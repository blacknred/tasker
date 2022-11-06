import React from "react";
import withAuth from "../../../../components/Auth/withAuth";
import Layout from "../../../../components/Layout";

function Saga() {
  return (
    <Layout>About Saga + tasks</Layout>
  );
}

export default withAuth(Saga);
