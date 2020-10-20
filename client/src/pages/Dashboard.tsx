import React, { useEffect } from 'react';
import { Link, Switch, Route, BrowserRouter, useParams } from 'react-router-dom';
import { FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';

// import DashboardSidebar from '../components/DashboardSidebar';
import '../styles/pages/dashboard.css'
import MyOrphanages from './MyOrphanages';
import Pending from './Pending';
import mapMarkerImg from '../images/mapMarker.svg';
import '../styles/components/DashboardSidebar.css';

interface UserParams {
    id: string
}

const Dashboard = () => {
    const params = useParams<UserParams>();
    useEffect(() => {
        console.log(`Params: ${params}`);
        console.log(params);
      }, []);
    return(
        <div id="dashboard-page">
            <aside id="dashboard-sidebar">
                <Link to="/app">
                    <img src={mapMarkerImg} alt="Happy" />
                </Link>

                <main id="dashboard-sidebar-main">
                    <button type="button">
                        <Link to={`/user/${params.id}`} className="dashboard-link">
                            <FiMapPin size={24} color="#FFF" />
                        </Link>
                    </button>

                    <button type="button">
                        <Link to={`/user/${params.id}/pending`} className="dashboard-link">
                            <FiAlertCircle size={24} color="#FFF" />
                        </Link>
                    </button>
                </main>
                
                <footer>
                    <button type="button">
                        <Link to="/app" onClick={() => localStorage.removeItem('@token')} >
                            <FiPower size={24} color="#FFF" />
                        </Link>
                    </button>
                </footer>
            </aside>
                
            <main id="dashboard-content">
                {/* <BrowserRouter> */}
                    <Switch>
                        <Route path="/user/:id/pending" exact={true} component={Pending}/>
                        <Route path="/user/:id" exact={true} component={MyOrphanages}/>
                    </Switch>
                {/* </BrowserRouter> */}
            </main>
        </div>
    );
}

export default Dashboard; 