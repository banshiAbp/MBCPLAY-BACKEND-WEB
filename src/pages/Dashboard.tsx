import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">User Management</h2>
                    <p>Manage users, roles, and permissions.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Analytics</h2>
                    <p>View site analytics and performance metrics.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Settings</h2>
                    <p>Configure application settings and preferences.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Reports</h2>
                    <p>Generate and view reports.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Notifications</h2>
                    <p>Manage notifications and alerts.</p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h2 className="font-semibold">Support</h2>
                    <p>Access support resources and contact information.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;