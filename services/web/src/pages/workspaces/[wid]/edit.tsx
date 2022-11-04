import React from "react";
import withAuth from "../../../components/Auth/withAuth";
import Layout from "../../../components/Layout";

function EditWorkspace() {

  return (
    <Layout>
      {/* <TaskToolbar>
        <TaskList />
      </TaskToolbar> */}
    </Layout>
  );
}

export default withAuth(EditWorkspace);
