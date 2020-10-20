import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';

import '../styles/pages/delete.css';
import excluir from '../images/excluir.svg';
import api from '../services/api';
import Page404 from '../pages/Page404';

interface Orphanage {
    id: number,
    name: string,
}

interface OrphanageParams {
    id: string
}

const Delete = () => {
    const history = useHistory();

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

    async function handleDelete() {
        try {
            await api.delete(`/orphanages/${params.id}`).then(response => {
                console.log(response);
            });
            alert('Orfanato deletado');
            if(!orphanage) {
                return <Page404 />
            }
            history.goBack()
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

                    <button className="delete-container" onClick={handleDelete}>
                        Sim, quero excluir!
                    </button>
                </div>
            </main>
            <img src={excluir} alt="Our character poppy!"/>
        </div>
    );
}

export default Delete;