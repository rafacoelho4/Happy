import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import '../styles/pages/delete.css';
import excluir from '../images/excluir.svg';
import api from '../services/api';

interface Orphanage {
  name: string,
}

interface OrphanageParams {
  id: string
}

const Delete = () => {
    const params = useParams<OrphanageParams>();
    const [orphanage, setOrphanage] = useState<Orphanage>();

    const carregarOrfanato = async () => {
        try {
        const response = await api.get(`/orphanages/${params.id}`).then(response => {
            setOrphanage(response.data);
        });
        console.log(response);
        console.log(orphanage);
        } catch (error) {
        console.log(error);
        }
    }

    useEffect(() => {
        carregarOrfanato();
    }, []);

    if(!orphanage) {
        return <h2>Carregando orfanato</h2>
    }
    return(
        <div id="delete-page">
            <main>
                <h2>Excluir!</h2>
                <p>Você tem certeza que quer excluir {`${orphanage.name}`}?</p>
                <div className="buttons">
                    <button className="map-container">
                        <Link to="/app" className="button-link-map">
                            Voltar para o mapa
                        </Link>
                    </button>

                    <button className="delete-container">
                        <Link to="/app" className="button-link-delete">
                            Sim, quero excluir!
                        </Link>
                    </button>
                </div>
            </main>
            <img src={excluir} alt="Our character poppy!"/>
        </div>
    );
}

export default Delete;