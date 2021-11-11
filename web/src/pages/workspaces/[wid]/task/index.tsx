import React from "react";
import withAuth from "../../../../components/Auth/withAuth";
import Layout from "../../../../components/Layout";

function NewTask() {
  return (
    <Layout>New Task Form</Layout>
  );
}

export default withAuth(NewTask);
