import { FaEdit } from "react-icons/fa";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profil() {
  // Récupération des informations utilisateur depuis le stockage local
  const userIn = JSON.parse(localStorage.getItem('user'))

  const [editedBio, setEditedBio] = useState('');
  const [bioUser, setbioUser] = useState(userIn.bio);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  // Fonction pour gérer le déclenchement de la modification de la biographie
  const handleEditBio = () => {
    setIsPromptOpen(true);
  };

  // Fonction pour gérer le changement de texte dans l'input de modification
  const handleBioInputChange = (event) => {
    setEditedBio(event.target.value);
  };

  return (
    <div className="profil">
      
      <button onClick={
            ()=> window.location.href='/'
          }>log out</button>

      <h1>{userIn.username}</h1>
      <h2>{userIn.email}</h2>
      <div>
        bio : <br />
        <span>
          {(bioUser === null || bioUser === '') ? ' Empty ' : bioUser}
        </span>
        <FaEdit onClick={handleEditBio} />
      </div>
      {isPromptOpen && (
        <div className="prompt">
          <input
            type="text"
            value={editedBio}
            onChange={handleBioInputChange}
          />
          <button
            onClick={() => {
              setbioUser(editedBio);
              userIn.bio = editedBio;
              localStorage.setItem('user', JSON.stringify(userIn));
              setIsPromptOpen(false);
            }}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}

export default Profil;
