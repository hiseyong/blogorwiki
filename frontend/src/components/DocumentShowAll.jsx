import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function DocumentShowAll() {
    const client = axios.create();
    const [docls, setDocls] = useState([]);
    useEffect(()=>{
        client.get('/api/documents/showall')
    .then(res => {
        console.log(res.data)
        setDocls(res.data)
    })
    },[])
    let AllDocTitlels = [];
    let AllDocAuthorls = [];
    let AllDocls = [];
    let AllDocTimels = [];
    for (let i = 0; i < docls.length; i++) {
        AllDocTimels.push(docls[i].time)
    }
    for (let i = 0; i < docls.length; i++) {
        AllDocTitlels.push(docls[i].title)
    }
    for (let i = 0; i < docls.length; i++) {
        AllDocAuthorls.push(docls[i].author)
    }
    for (let i = 0; i < docls.length; i++) {
        AllDocls.push({
            'title': AllDocTitlels[i],
            'author' : AllDocAuthorls[i],
            'time' : AllDocTimels[i]
        })
    }
    console.log(AllDocls[1])
    const AppendDoc = AllDocls.map((doc) => (<div><hr/><Link to={`/document/read/${doc.title}`}><h2>{doc.title}</h2></Link><h4>{`author:${doc.author}`}</h4><h5>{doc.time}</h5></div>));
    return(
        <span>
            <h1>All Document's Links</h1>
            {AppendDoc}
        </span>
    );
}