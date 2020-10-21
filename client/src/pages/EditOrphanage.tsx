import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { useHistory, useParams } from "react-router-dom";
import { FiPlus, FiX } from "react-icons/fi";

import '../styles/pages/create-orphanage.css';
import '../styles/pages/edit-orphanage.css';
import Sidebar from '../components/Sidebar';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

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
  }>,
  user_id: string
}

interface UserParams {
  id: string
}

export default function EditOrphanage() {
  const history = useHistory();
  const params = useParams<UserParams>();

  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ instructions, setInstructions ] = useState('');
  const [ opening_hours, setOpeningHours ] = useState('');
  const [ open_on_weekends, setOpenOnWeekends ] = useState<boolean>();
  const [ position, setPosition ] = useState({ lat: 0, lng: 0});
  const [ images, setImages ] = useState<File[]>([]);
  const [ previewImages, setPreviewImages ] = useState<string[]>([]);

  const [ authToken, setAuthToken ] = useState('');

  let token = '';

  function handleMapClick(event: LeafletMouseEvent) {
    setPosition(event.latlng);
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);
    setImages([...images, ...selectedImages]);

    const selectedImagesPreview = selectedImages.map(image => {
      return URL.createObjectURL(image);
    });

    setPreviewImages([...previewImages, ...selectedImagesPreview]);
  }

  function handleDeleteImage(event: any, index: number) {
    event.preventDefault();
    console.log(index);

    const editedImages = previewImages.splice(index, 1);

    const selectedImagesPreview = [...previewImages];

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const { lat, lng } = position;

    try {
      const data = new FormData();
      data.append('name', name);
      data.append('about', about);
      data.append('instructions', instructions);
      data.append('latitude', String(lat));
      data.append('longitude', String(lng));
      data.append('opening_hours', opening_hours);
      data.append('open_on_weekends', String(open_on_weekends));
      data.append('user_id', params.id);

      if(images) {
        images.forEach(image => {
          data.append('images', image)
        })
      }
      await api.put(`/orphanages/${params.id}`, data, { 
        headers: { 
            'Content-Type': 'application/json',
            'authorization': `Bearer ${authToken}`
      }});
      // alert('Orfanato editado com sucesso');
      history.goBack();
    } catch (error) {
        console.log(error);
    }
  }

  const carregarOrfanato = async () => {
    try {
      await api.get(`/orphanages/${params.id}`).then(response => {
        // console.log(response.data);
        setName(response.data.name);
        setPosition({lat: response.data.latitude, lng: response.data.longitude})
        setAbout(response.data.about);
        setInstructions(response.data.instructions);
        setOpeningHours(response.data.opening_hours);
        setOpenOnWeekends(response.data.opening_on_weekends);
        const imagesPreview = response.data.images.map((image: any) => {
          return image.url;
        });
        setPreviewImages(imagesPreview);
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    carregarOrfanato();
    token = localStorage.getItem('@token') as string;
    setAuthToken(token);
    token = '';
  }, [token]);

  return (
    <div id="page-create-orphanage">
      <Sidebar />
      <main>
        <form className="create-orphanage-form">
          <fieldset>
            <legend>Editar Dados</legend>

            <Map 
              center={[-20.386439,-43.5117524]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {
                position.lat !== 0 && <Marker interactive={false} icon={mapIcon} position={[position.lat,position.lng]} />
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                value={name}
                onChange={e => setName(e.target.value)}
                />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300}
                value={about}
                onChange={e => setAbout(e.target.value)}
                />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  previewImages.map((image, index) => {
                    return (
                      <div className="preview" key={index}>
                        <button onClick={e => handleDeleteImage(e, index)} ><FiX size={20} /></button>
                        <img key={image} src={image} alt="Imagem do orfanato" />
                      </div>
                    );
                  })
                }
                <label className="new-image" htmlFor="image[]" >
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input 
                type="file" 
                multiple 
                name="image" 
                id="image[]"
                onChange={handleSelectImages}
                />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours}
                onChange={e => setOpeningHours(e.target.value)}
                />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active': ''}
                  onClick={() => setOpenOnWeekends(true)}
                  >Sim</button>
                <button 
                  type="button"
                  className={open_on_weekends ? '': 'active'}
                  onClick={() => setOpenOnWeekends(false)}
                  >Não</button>
              </div>
            </div>
          </fieldset>

          <div className="edit-btn-group">
            <button className="cancel-button" onClick={() => history.goBack()} >
              Cancelar
            </button>

            <button className="confirm-button" type="submit" onClick={handleSubmit} >
              Confirmar
            </button>
          </div>

        </form>
      </main>
    </div>
  );
}