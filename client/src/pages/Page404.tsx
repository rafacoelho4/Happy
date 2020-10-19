import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/page404.css';
import notFound from '../images/404.svg';

const Registered = () => {
    return(
        <div id="not-found-page">
            <main>
                <h2>Ops!</h2>
                <p>Não conseguimos encontrar o que você procurava {':('}</p>
                <button>
                    <Link to="/app" className="button-link-map">
                        Voltar para o mapa
                    </Link>
                </button>
            </main>

            <img src={notFound} alt="Page not found!"/>
        </div>
    );
}

export default Registered;