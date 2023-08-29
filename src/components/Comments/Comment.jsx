import axios from "axios";
import { useEffect, useState } from "react";

function Comment({postId}) {
    const [comment, setComment] = useState('');
    const [commentsList, setCommentsList] = useState({
        content: 'fihsdklbg gdfjsgdsfn g gfgd fgd f'
    })

    useEffect(() => {
        axios.get('http://[::1]:8080/posts/postId/comments')
            .then(response => {
                const Comments = response.data;
                setCommentsList(Comments);
            })
            .catch(error => {
                console.error(error);
            });
    }, [])

    return (
        <div>
            <input type="text"placeholder="Comment here..." value={comment} onChange={(e)=>setComment(e.target.value)}/>
            <input type="submit" value={'comment'}/>
            <>{commentsList.content}</>
        </div>
    )
}

export default Comment;