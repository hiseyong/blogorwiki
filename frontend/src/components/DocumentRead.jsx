import { DocumentSearch } from "./DocumentSearch";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Parser from 'html-react-parser';
import { useNavigate } from "react-router-dom";
import '../style/DocumentRead.css';
import { Comment } from "./DocumentComment";

export function DocumentRead(props) {
    const navigate = useNavigate();
    const [info, setInfo] = useState({'title': null, 'author': null, 'time': null, 'content': null, 'type': null})
    const id = useParams().id;
    console.log(id)
    const GetDocument = async() =>{
        const client = axios.create();
        const res = await client.post('/api/getdocuments' , {id})
        const docinfo = await res.data[0];
        console.log(docinfo)
        await setInfo({'title': null, 'author': null, 'time': null, 'content': null, 'type': null});
        if (docinfo === undefined) {
            console.log("no")
        } else {
            await setInfo({'title' : docinfo.title,
                'author' : docinfo.author,
                'time' : docinfo.time,
                'content' : docinfo.content,
                'type' :docinfo.type
            });
            console.log(info)
        }
    }

    const EditOnClick = () => {
        if (info.author === props.author) {
            navigate(`/document/edit/${id}`)
        } else {
            if(props.author === 'please log in') {
                alert('login please')
                navigate('/signin')
            } else {
                if (props.class === 'manager') {
                    alert('edit for manager class')
                    navigate(`/document/edit/${id}`)
                } else {
                    alert('you are not a owner of this document')
                }
            }
        }
    }

    useEffect(() => {
        GetDocument();
        console.log('out:',info);
    }, [id])
    
    return(
        <span>
            <DocumentSearch/>
            <h2>{info.title = null ? `there is no document which is named ${id}` : `${info.title}`}</h2>
            <div>
                <ul>
                    <li>author: {info.author}</li>
                    <li>{info.time}</li>
                    <li>document type: {info.type}</li>
                </ul>
                <button onClick={EditOnClick}>EDIT</button>
            </div>
            <hr/>
            <div>{Parser(`${info.content}`)}</div>
            <hr/>
            <h3>Comments</h3>
            <Comment id={id} author={props.author}/>
        </span>
    );
}