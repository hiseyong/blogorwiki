import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../style/comment.css'

export function Comment(props) {
    const navigate = useNavigate();
    const client = axios.create();
    const id = props.id
    const [docls, setDocls] = useState([]);
    const [commentInfo, setCommentInfo] = useState({
        author: '',
        time: '',
        content: '',
        document: ''
    })
    const [rerender, setRerender] = useState(true)

    useEffect(()=>{
        client.post('/api/comments/get' , {id})
    .then(res => {
        setDocls(res.data)
    })
    },[rerender])

    const uploadComment = async() => {
        if(props.author == 'please log in' || props.author == undefined) {
            alert('please log in')
            navigate('/signin')
        } else {
            if (commentInfo.content == '') {
                alert('comment is empty')
            } else {
                const now = new Date();
                const month = now.getMonth() +1;
                await setCommentInfo({
                    ...commentInfo,
                    author: props.author,
                    time: now.getFullYear() + "." + month+ "." + now.getDate() + " " + now.getHours() + ":" + now.getMinutes(),
                    document: id
                })
                console.log(commentInfo)
                client.post('/api/comments/upload', {commentInfo})
                setRerender(!rerender)
                console.log(rerender)
                setCommentInfo({
                    ...commentInfo,
                    content : ''
                })
            }
        }
    }

    const commentOnChange = (e) => {
        const now = new Date();
        const month = now.getMonth() +1;
        setCommentInfo({
            ...commentInfo,
            author: props.author,
            time: now.getFullYear() + "." + month+ "." + now.getDate() + " " + now.getHours() + ":" + now.getMinutes(),
            document: id,
            content: e.target.value
        })
    }


    let appenddocls = docls.map((doc) => (
        <span>
            <hr/>
            <div>
                <ul>
                    <li>author: {doc.author}</li>
                    <li>{doc.time}</li>
                </ul>
            </div>
            <h3 className="comment_content">{doc.content}</h3>
        </span>
    ));

    
    return(
        <span>
            <div>
                <input placeholder="comment" onChange={commentOnChange} value={commentInfo.content}/>
                <button onClick={uploadComment}>comment upload</button>
            </div>
            {appenddocls}
        </span>
    )
}