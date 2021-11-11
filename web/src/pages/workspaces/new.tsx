import React from "react";
import withAuth from "../../components/Auth/withAuth";
import Layout from "../../components/Layout";

function NewWorkspace() {
  return (
    <Layout>New Workspace Form</Layout>
  );
}

export default withAuth(NewWorkspace);

