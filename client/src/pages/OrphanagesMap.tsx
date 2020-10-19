import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiLogIn } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarker from '../images/mapMarker.svg';
import '../styles/pages/orphanagesMap.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  id: number,
  name: string,
  latitude: number,
  longitude: number,
}

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  const carregarOrfanatos = async () => {
    try {
      const response = await api.get('/orphanages').then(response => {
        setOrphanages(response.data);
      });
      console.log(response);
      console.log(orphanages)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    carregarOrfanatos();
  }, []);

  return (
    <div id="page-map">
    	<aside>
          <header>
              <img src={mapMarker} alt="Map Marker"/>
              <h2>Escolha um orfanato no mapa</h2>
              <p>Muitas crianças estão esperando sua visita :{')'}</p>
          </header>
          <footer>
              <strong>Ouro Preto</strong>
              <span>Minas Gerais</span>
              <Link to="/login" className="login-link" >
                Entrar
                <FiLogIn size={32} color="#fff" className="login-icon" />
              </Link>
          </footer>
        </aside>

        <Map
          center={[-20.3845353,-43.510699]}
          zoom={20}
          style={{
            width: '100%',
            height: '100%'
          }}
        >
          <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {
            orphanages.map((orphanage, index) => {
              return(
                <Marker
                  position={[orphanage.latitude,orphanage.longitude]}
                  icon={mapIcon}
                  alt={`Orfanato: ${orphanage.name}`}
                  key={orphanage.id}
                >
                  <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                    {orphanage.name}
                    <Link to={`/orphanages/${orphanage.id}`} >
                      <FiArrowRight size={20} color="#fff" />
                    </Link>
                  </Popup>
              </Marker>
              );
            })
          }
        </Map>

        <Link to="/orphanages/create" className="create-orph">
          <FiPlus size={32} color="#fff" />
        </Link>
    </div>
  );
}

export default OrphanagesMap;
