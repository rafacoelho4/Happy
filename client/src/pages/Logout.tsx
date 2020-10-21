import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import '../styles/pages/logout.css';
import logout from '../images/logout.svg';
import api from '../services/api';
import Page404 from '../pages/Page404';

interface Orphanage {
    id: number,
    name: string,
}

interface OrphanageParams {
    id: string
}

const Logout = () => {
    const history = useHistory();

    async function handleLogout() {
        localStorage.removeItem('@token');
        localStorage.removeItem('@user_id');
        history.push('/app');
    }

    return(
        <div id="logout-page">
            <main>
                <h2>Sair?</h2>
                <p>Você quer mesmo sair da sua conta?</p>
                <div className="buttons">
                    <button className="map-container" onClick={handleLogout}>
                        Sim, quero sair!
                    </button>

                    <button className="delete-container">
                        <Link to="/app" className="button-link-map">
                            Voltar para o mapa
                        </Link>
                    </button>
                </div>
            </main>
            <img src={logout} alt="Our character poppy!"/>
        </div>
    );
}

export default Logout;