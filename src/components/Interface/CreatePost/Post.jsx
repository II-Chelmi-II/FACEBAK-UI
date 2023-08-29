import { useState } from "react";

function Post({ posts, setposts, userSession, setUserSession }) {
    const [textarea, settextarea] = useState("");  // Gérer le contenu du texte
    const [title, settitle] = useState("");  // Gérer le titre

    const userIn = JSON.parse(localStorage.getItem('user'));  // Récupérer l'utilisateur depuis le stockage local

    // Créer un nouvel objet "post" avec les détails du nouveau post
    const post = {
        "id": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "title": title,
        "content": textarea,
        "userId": userIn.id,
        "user": userIn,
        "_count": {
            "reactions": 1,
            "comments": 1        }
    }

    // Gérer l'ajout du post à la liste des posts
    const handleInsertPost = (e) => {
        e.preventDefault();  // Empêcher le comportement par défaut du formulaire

        const postsClone = [...posts];
        postsClone.unshift(post);
        setposts(postsClone);
        localStorage.setItem('posts', JSON.stringify(postsClone));
    }

    // Formulaire pour créer un nouveau post
    return (
        <form action="createpost" className="createPost">
            <input type="text" placeholder="Title..." value={title} onChange={(e) => settitle(e.target.value)} />
            <textarea name="" id="" cols="30" rows="10" placeholder="What's on your mind...?" value={textarea} onChange={(e) => settextarea(e.target.value)}></textarea>
            <input type="submit" value={'Post'} className="btn-createpost" onClick={handleInsertPost} />
        </form>
    )
}

export default Post;  
