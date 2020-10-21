import React, { useEffect, useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link, useParams } from 'react-router-dom';

import '../styles/pages/myOrph.css';
import mapIcon from '../utils/mapIcon';
import emptyState from '../images/emptyState.svg';
import api from '../services/api';
import Page404 from '../pages/Page404';

interface User {
    id: string,
    orphanages: Array<{
        name: string,
        id: number,
        latitude: number,
        longitude: number
    }>
}

interface OrphanageParams {
    id: string
}

const MyOrphanages = () => {
    const [ user, setUser ] = useState<User>();
    const params = useParams<OrphanageParams>();
    
    let token;

    const carregarOrfanatos = async () => {
        try {
            token = localStorage.getItem('@token');
            // console.log(`Bearer ${token}`)
            const response = await api.get(`/users/${params.id}`, { 
                headers: { 
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${token}`,
            }}).then(response => {
                setUser(response.data);
                // console.log(`/users/${params.id}`);
                // console.log("Response:")
                // console.log(response);
                // console.log(response.data);
            });
            // console.log(params.id);
        } catch (error) {
            // console.log(error);
        }
    }
    
    useEffect(() => {
        token = localStorage.getItem('@token');
        carregarOrfanatos();
    }, []);

    if(!user?.orphanages) {
        return <Page404 />
    }

    return(
        <div id="my-orph-page">
            <header>
                <h2>Orfanatos cadastrados</h2>
                <p>{`${user.orphanages.length}`} orfanatos</p>
            </header>

            <div className={user.orphanages.length == 0 ? "empty-container" : "orphanages-container"}>
                {
                    user.orphanages.length == 0 ? 
                    (
                        <div className="empty-array">
                            <img src={emptyState} alt="Logo"/>
                            <p>Nenhum no momento</p>
                        </div>
                    ) :
                    (
                        user.orphanages.map((orphanage) => {
                            return(
                                <div className="orphanage-group" key={orphanage.id} >
                                    <Map 
                                        center={[-20.386439,-43.5117524]} 
                                        style={{ width: '100%', height: 280 }}
                                        zoom={15}
                                        >
                                        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <Marker interactive={false} icon={mapIcon} position={[-20.386439,-43.5117524]} />
                                    </Map>
                                    <div className="details-group">
                                        <p>{`${orphanage.name}`}</p>
                                        <div className="btn-group">
                                            <button>
                                                <Link to={`/edit/${user.id}/${orphanage.id}`} className="button-link">
                                                    <FiEdit3 size={24} />
                                                </Link>
                                            </button>
                                            <button>
                                                <Link to={`/delete/${user.id}/${orphanage.id}`} className="button-link">
                                                    <FiTrash size={24} />
                                                </Link>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )
                }
            </div>
        </div>
    );
}

export default MyOrphanages;