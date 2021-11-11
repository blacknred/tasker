import React from "react";
import withAuth from "../../../../components/Auth/withAuth";
import Layout from "../../../../components/Layout";
import Meta from '../../../../components/Meta';

function NewSaga() {
  return (
    <Layout>New Saga from</Layout>
  );
}

export default withAuth(NewSaga);
