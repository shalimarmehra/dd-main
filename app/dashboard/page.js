// app/dashboard/ClientDashboard.js
'use client';

import ClientDashboard from './ClientDashboard';
import withAuth from '../auth/withAuth';

const Dashboard = () => {
  return <ClientDashboard />;
};

export default withAuth(Dashboard);



  