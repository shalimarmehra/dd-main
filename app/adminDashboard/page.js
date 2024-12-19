// app/adminDashboard/ClientAdminDashboard.js
'use client';

import ClientAdminDashboard from '../adminDashboard/ClientAdminDashboard';
import withAdminAuth from '../auth/withAdminAuth';


const AdminDashboard = () => {
  return <ClientAdminDashboard />;
};

export default withAdminAuth(AdminDashboard);