import React, { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { Link } from 'react-router-dom';

import '../styles/pages/myOrph.css';
import mapIcon from '../utils/mapIcon';
import emptyState from '../images/emptyState.svg';

const MyOrphanages = () => {
    const [ myOrphanages, setMyOrphanages ] = useState([]);

    return(
        <div id="my-orph-page">
            <header>
                <h2>Orfanatos cadastrados</h2>
                <p>2 orfanatos</p>
            </header>

            <div className={myOrphanages.length == 0 ? "empty-container" : "orphanages-container"}>
                {
                    myOrphanages.length == 0 ? 
                    (
                        <div className="empty-array">
                            <img src={emptyState} alt="Logo"/>
                            <p>Nenhum no momento</p>
                        </div>
                    ) :
                    (
                        myOrphanages.map(orphanage => {
                            return(
                                <div className="orphanage-group">
                                    <Map 
                                        center={[-20.386439,-43.5117524]} 
                                        style={{ width: '100%', height: 280 }}
                                        zoom={15}
                                        >
                                        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                        <Marker interactive={false} icon={mapIcon} position={[-20.386439,-43.5117524]} />
                                    </Map>
                                    <div className="details-group">
                                        <p>Orfanato Esperança</p>
                                        <div className="btn-group">
                                            <button>
                                                <Link to="/edit/1" className="button-link">
                                                    <FiEdit3 size={24} />
                                                </Link>
                                            </button>
                                            <button>
                                                <Link to="/delete/1" className="button-link">
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