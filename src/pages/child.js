import { useParams } from "react-router-dom";

import { DashboardLayout } from '../components/Layout';

  const Child = () => {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();

  return (
    <DashboardLayout>
      <h2>Home Page</h2>
    <div>
      <h3>ID: {id}</h3>
    </div>

    </DashboardLayout>
  );
}


export default Child;