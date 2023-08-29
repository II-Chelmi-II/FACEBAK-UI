import { FaEdit } from "react-icons/fa";
import React, { useState } from 'react';
import axios from 'axios';

function Profil() {
  const userIn = JSON.parse(localStorage.getItem('user'))

  const [editedBio, setEditedBio] = useState('');
  const [bioUser, setbioUser] = useState(userIn.bio);
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const handleEditBio = () => {
    setIsPromptOpen(true);
  };

  const handleBioInputChange = (event) => {
    setEditedBio(event.target.value);
  };

  return (
    <div className="profil">
      <h1>{userIn.username}</h1>
      <h2>{userIn.email}</h2>
      <div>
        bio :
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
            onClick={()=>{
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
