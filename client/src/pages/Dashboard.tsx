import React from 'react';
import { Link, HashRouter, Switch, Route } from 'react-router-dom';

import DashboardSidebar from '../components/DashboardSidebar';
import '../styles/pages/dashboard.css'
import MyOrphanages from './MyOrphanages';

const Dashboard = () => {
    return(
        <div id="dashboard-page">
            <DashboardSidebar />
                
            <main id="dashboard-content">
                <Route path="/user/:id" component={MyOrphanages}/>
            </main>
        </div>
    );
}

export default Dashboard; 