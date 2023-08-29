import React, { useState } from 'react';
import "./Interface.css";
import Profil from './Profil/Profil';
import Feeds from './Feeds/Feeds';
import Post from './CreatePost/Post';

const Interface = ({ userSession, setUserSession, posts, setposts }) => {
    return (
        <div className='interface'>
            <Profil userSession={userSession} setUserSession={setUserSession} />
            <div className='actu'>
                <Post posts={posts} setposts={setposts} userSession={userSession} setUserSession={setUserSession} />
                <Feeds posts={posts} setposts={setposts} />
            </div>
        </div>
    )

}

export default Interface;
