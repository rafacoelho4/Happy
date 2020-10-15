import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import mapMarker from '../images/mapMarker.svg';
import '../styles/pages/orphanagesMap.css';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function OrphanagesMap() {
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
        </Map>

        <Link to="" className="create-orph">
          <FiPlus size={32} color="#fff" />
        </Link>
    </div>
  );
}

export default OrphanagesMap;
