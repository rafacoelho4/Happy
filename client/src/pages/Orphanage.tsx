import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import { useParams } from 'react-router-dom';

import '../styles/pages/orphanage.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';
import Page404 from '../pages/Page404';

interface Orphanage {
  name: string,
  latitude: number,
  longitude: number,
  about: number,
  instructions: string,
  opening_hours: string,
  open_on_weekends: boolean,
  images: Array<{
    url: string,
    id: number
  }>
}

interface OrphanageParams {
  id: string
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  // const { goBack } = useHistory()

  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImage, setActiveImage] = useState(0);

  const carregarOrfanato = async () => {
    try {
      const response = await api.get(`/orphanages/${params.id}`).then(response => {
        // console.log(response.data);
        if(response.data.images.length == 0) {
          const orph = {
            name: response.data.name,
            latitude: response.data.latitude,
            longitude: response.data.longitude,
            about: response.data.about,
            instructions: response.data.instructions,
            opening_hours: response.data.opening_hours,
            open_on_weekends: response.data.open_on_weekends,
            images: [{
              id: 1,
              url: 'localhost:3000'
            }]
          }
          setOrphanage(orph);
        } else {
          setOrphanage(response.data);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    carregarOrfanato();
  }, []);

  if(!orphanage) {
    return <Page404 />
  }

  return (
    <div id="page-orphanage">
      <Sidebar />
      <main>
        <div className="orphanage-details">
          {
            orphanage.images[0].url === "localhost:3000" ? '' : (
              <>
                <img src={orphanage.images[activeImage].url} alt={orphanage.name} />
                <div className="images">
                  {
                    orphanage.images.map((image, index) => {
                      return(
                        <button 
                          className={activeImage === index ? "active" : ""}  
                          type="button" 
                          key={image.id}
                          onClick={() => setActiveImage(index)}
                          >
                          <img src={image.url} alt={orphanage.name} />
                        </button>
                      );
                    })
                  }
                </div>
              </>
            )
          }
          
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                {/* <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                /> */}
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker interactive={false} icon={mapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.opening_hours}
              </div>
              <div className={orphanage.open_on_weekends === true ? "open-on-weekends" : "not-open-on-weekends"} >
                <FiInfo size={32} color={orphanage.open_on_weekends === true ? "#39CC83" : "#fa6a72"} />
                {orphanage.open_on_weekends === true ? "Atendemos fim de semana" : "Não atendemos fim de semana"}
              </div>
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}