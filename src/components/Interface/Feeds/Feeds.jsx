import axios from "axios";
import { useEffect, useState } from "react";
import { FaHeart, FaComment } from "react-icons/fa";
import Comment from "../../Comments/Comment";

function Feeds({ posts, setposts }) {
    const [postClicked, setpostClick] = useState({})  // État pour gérer le post cliqué

    const handleReaction = (e) => {
        e.preventDefault();
        const id = e.target.id;

        const postsClone = [...posts];  // Cloner les posts pour éviter les modifications directes
        for (let index = 0; index < postsClone.length; index++) {
            const post = postsClone[index];
            if (id === post.id) {
                post._count.reactions++;  // Incrémenter le compteur de réactions du post
                setpostClick(post);
                break;
            } else {
                continue;
            }
        }
        setposts(postsClone);
    };

    const handleComment  = ()=>{
        return null
    }

    useEffect(() => {
        axios.get('http://[::1]:8080/posts')
            .then(response => {
                const Posts = response.data;
                localStorage.setItem('posts', JSON.stringify(posts));
                setposts(Posts);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <div className="Posts">
            {posts.map(post => (
                <div className="PostBox" key={post.id}>
                    <img src="{post.user.photo}" alt="" className=""/>
                    <h2>{post.user.username}</h2>
                    <h2>{post.title}</h2>
                    <div className="postContent">
                        {post.content}
                    </div>
                    <div>
                        <button className="reactions" id={post.id} onClick={(e) => handleReaction(e)}>Like</button>
                        <FaHeart />{post._count.reactions}
                    </div>
                    <div>
                        <Comment postId={post.id}/>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Feeds;

/*useEffect(()=>{
    const id = postClicked.id;
    const createdAt = postClicked.createdAt;
    const updatedAt = new Date();
    const content = postClicked.content;
    const userId = postClicked.userId;

    const postToPut = {
        id,
        createdAt,
        updatedAt,
        content,
        id,
        userId
    }
    axios.put('http://[::1]:8080/posts', postToPut)
    .then(response => {
        const Posts = response.data;
    })
    .catch(error => {
        console.error(error);
    }); 
},[posts])*/