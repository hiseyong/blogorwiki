import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../style/TextEditor.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export function DocumentUpload(props) {
    const client = axios.create();
    const [value, setValue] = useState({
        title: null,
        author: null,
        time: null,
        type: null,
        content: null
    })
    const onChange = (e) => {
        const now = new Date();
        const month = now.getMonth() +1;
        setValue({
          ...value,
          [e.target.name]: e.target.value,
          time: now.getFullYear() + "." + month+ "." + now.getDate() + " " + now.getHours() + ":" + now.getMinutes(),
          type: 'public',
          author: props.author,
        });
        console.log(value)
      };

    
    const navigate = useNavigate();
    

    const onClick = async (event, editor) => {
        if (props.author === 'please log in' || props.author == undefined) {
            alert("log in please");
            navigate('/signin');
        } else {
            console.log(value);
        if (value.title.indexOf('?') == -1 && value.title != '' && value.title != null) {
            client.post('/api/documents/upload' , {value} )
        .then(res => {
            console.log(res.data);
            if (res.data === true) {
                alert("upload complete");
                navigate(`/document/read/${value.title}`)
            } else {
                alert(res.data);
            }
        })
        } else {
            alert("title can't contain question mark");
        }
        }
    }


    const [youtubeLink, setYoutubeLink] = useState('')
    const youtubeOnchange = (e) => {
        setYoutubeLink(e.target.value);
    }
    let lastlink;

    const addYoutube = () => {
        const parsedYoutubeLink = youtubeLink.split('=')[1]
        if (youtubeLink != lastlink) {
            setValue({
                ...value,
                content: value.content + `<iframe width="560" height="315" src="https://www.youtube.com/embed/${parsedYoutubeLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
            })
            lastlink = youtubeLink
        }
        console.log(value.content)
    }


    return(
        <div className='form-wrapper'>
            <span>
                <input placeholder='Title' className='title-input' onChange={onChange} name='title'/>
                <div>
                    <input placeholder='youtube video link' className='youtubelink' onChange={youtubeOnchange}/>
                    <button onClick={addYoutube}>Add Youtube Video</button>
                </div>
            </span>
            <CKEditor
                config={{         
                    toolbar: ['bold', 'italic', 'blockQuote', 'link']
                  }} 
                editor={ClassicEditor}
                data=""
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setValue({
                      ...value,
                      content: data
                  });
                  console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor);
                }}
            />
            <button className='submit-button' onClick={onClick}>UPLOAD</button>
        </div>
    )
}