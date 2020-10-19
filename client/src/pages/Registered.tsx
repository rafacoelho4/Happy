import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/pages/registered.css';
import success from '../images/successImg.svg';
// import success from '../images/404.svg';

const Registered = () => {
    return(
        <div id="registered-page">
            <main>
                <h2>Ebaaa!</h2>
                <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar {':)'}</p>
                <button>
                    <Link to="/app" className="button-link-map">
                        Voltar para o mapa
                    </Link>
                </button>
            </main>

            <img src={success} alt="Congrats!"/>
        </div>
    );
}

export default Registered;