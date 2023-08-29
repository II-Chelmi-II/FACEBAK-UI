import { useState } from "react";

function Post({posts, setposts, userSession, setUserSession}) {
    const [textarea, settextarea] = useState("");
    const [title, settitle] = useState("");
    const userIn = JSON.parse(localStorage.getItem('user'));

    const post = {
        "id": new Date(),
        "createdAt": new Date(),
        "updatedAt": new Date(),
        "title": title,
        "content": textarea,
        "userId": userIn.id,
        "user": userIn,
        "_count": {
            "reactions": 0,
            "comments": 0
        }
    }

    const handleInsertPost = (e)=> {
        e.preventDefault()

        const postsClone = [...posts];
        postsClone.push(post)
        setposts(postsClone)
    }

    return (
        <form action="createpost" className="createPost">
            <input type="text" placeholder="Title..." value={title} onChange={(e) => settitle(e.target.value)}/>
            <textarea name="" id="" cols="30" rows="10" placeholder="What's on your mind...?" value={textarea} onChange={(e) => settextarea(e.target.value)}></textarea>
            <input type="submit" value={'Post'} className="btn-createpost" onClick={handleInsertPost} />
        </form>
    )
}

export default Post;