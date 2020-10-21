import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight, FiLogIn, FiLogOut } from 'react-icons/fi';
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
  const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]);

  const [ loggedIn, setLoggedIn ] = useState(false);
  const [ id, setId ] = useState('');
  
  let token = '';
  let user_id = '';

  const carregarOrfanatos = async () => {
    try {
      const response = await api.get('/orphanages').then(response => {
        setOrphanages(response.data);
      });
      // console.log(response);
      // console.log(orphanages)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    token = localStorage.getItem('@token') as string;
    user_id = localStorage.getItem('@user_id') as string;
    // console.log(`Token: ${token}`);
    // console.log(`Id: ${user_id}`);
    setId(user_id);
    if(token) setLoggedIn(true);
    else setLoggedIn(false);
    carregarOrfanatos();
  }, [token, user_id]);

  return (
    <div id="page-map">
    	<aside>
          <header>
              {
                loggedIn === true ? (
                  <Link to={`/user/${id}`} >
                    <img src={mapMarker} alt="Map Marker"/>
                  </Link>
                ) : (
                  <Link to="/" >
                    <img src={mapMarker} alt="Map Marker"/>
                  </Link>
                )
                // <img src={mapMarker} alt="Map Marker"/>
              }
              <h2>Escolha um orfanato no mapa</h2>
              <p>Muitas crianças estão esperando sua visita :{')'}</p>
          </header>
          <footer>
              <strong>Ouro Preto</strong>
              <span>Minas Gerais</span>
              {
                loggedIn === true ? '' : (
                  <div className="login-group">
                    <Link to="/register" className="login-link register-link">
                      Criar conta
                    </Link>
                    <Link to="/login" className="login-link" >
                      Entrar
                      {/* <FiLogIn size={32} color="#fff" className="login-icon" /> */}
                    </Link>
                  </div>
                )
              }
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

        {
          loggedIn == true ? (
            <Link to={`/orphanages/create/${id}`} className="floating-btn create-orph">
              <FiPlus size={32} color="#fff" />
            </Link>
          ) : (
            <Link to="/login" className="floating-btn create-orph">
              <FiPlus size={32} color="#fff" />
            </Link>
          )
        }
        

        {
          loggedIn === true ? (
            <Link to="/logout" className="floating-btn logout">
              <FiLogOut size={32} color="#fff" />
            </Link>
          ) : ''
        }
    </div>
  );
}

export default OrphanagesMap;
