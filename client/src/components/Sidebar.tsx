import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/mapMarker.svg';
import '../styles/components/Sidebar.css';

export default function Sidebar() {
    const { goBack } = useHistory();

    return(
        <aside id="sidebar">
            <Link to="/app">
                <img src={mapMarkerImg} alt="Happy" />
            </Link>
            
            <footer>
            <button type="button" onClick={goBack}>
                <FiArrowLeft size={24} color="#FFF" />
            </button>
            </footer>
      </aside>
    );
}