import React from 'react';
import { FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/mapMarker.svg';
import '../styles/components/DashboardSidebar.css';

export default function DashboardSidebar() {
    const { goBack } = useHistory();

    return(
        <aside id="dashboard-sidebar">
            <Link to="/app">
                <img src={mapMarkerImg} alt="Happy" />
            </Link>

            <main id="dashboard-sidebar-main">
                <button type="button">
                    <Link to="/user/1" className="dashboard-link">
                        <FiMapPin size={24} color="#FFF" />
                    </Link>
                </button>

                <button type="button">
                    <Link to="/user/1" className="dashboard-link">
                        <FiAlertCircle size={24} color="#FFF" />
                    </Link>
                </button>
            </main>
            
            <footer>
                <button type="button">
                    <Link to="/">
                        <FiPower size={24} color="#FFF" />
                    </Link>
                </button>
            </footer>
      </aside>
    );
}