import React from "react";
import withAuth from "../../../../components/Auth/withAuth";
import Layout from "../../../../components/Layout";

function Sagas() {
  return (
    <Layout>Saga list</Layout>
  );
}

export default withAuth(Sagas);
