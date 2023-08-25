import React, { useState } from 'react';
import "./Interface.css";
import { FaThumbsUp, FaHeart, FaSurprise } from 'react-icons/fa';


//axios, fetch, promize

const Interface = () => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');

    const handlePostSubmit = () => {
        if (newPost.trim() !== '') {
            const newPostObject = {
                content: newPost,
                reactions: {
                    like: 0,
                    love: 0,
                    wow: 0,
                },
                comments: [],
            };
            setPosts([newPostObject, ...posts]);
            setNewPost('');
        }
    };

    const handleReaction = (index, reactionType) => {
        const updatedPosts = [...posts];
        updatedPosts[index].reactions[reactionType]++;
        setPosts(updatedPosts);
    };

    const handleComment = (index, commentText) => {
        const updatedPosts = [...posts];
        updatedPosts[index].comments.push(commentText);
        setPosts(updatedPosts);
    };

    return (
        <div className="App">
            <h1>Facebak</h1>
            <div>
                <textarea
                    placeholder="What's on your mind?"
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button onClick={handlePostSubmit}>Post</button>
            </div>
            <div className="posts">
                {posts.map((post, index) => (
                    <div className="post" key={index}>
                        <p>{post.content}</p>
                        <div className="reactions">
                            <button onClick={() => handleReaction(index, 'like')}>
                                <FaThumbsUp /> ({post.reactions.like})
                            </button>
                            <button onClick={() => handleReaction(index, 'love')}>
                                <FaHeart /> ({post.reactions.love})
                            </button>
                            <button onClick={() => handleReaction(index, 'wow')}>
                                <FaSurprise /> ({post.reactions.wow})
                            </button>
                        </div>
                        <div className="comments">
                            {post.comments.map((comment, commentIndex) => (
                                <p key={commentIndex}>{comment}</p>
                            ))}
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleComment(index, e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Interface;
