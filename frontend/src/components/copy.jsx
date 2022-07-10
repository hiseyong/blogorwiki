import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../style/TextEditor.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export function DocumentEdit(props) {
        const id = useParams().id;
    const client = axios.create();
    const [value, setValue] = useState({
        'title': null,
        'author': null,
        'time': null,
        'type': null,
        'content': null
    })

    const [titleValue, setTitleValue] = useState('')

    const enter = async() => {
        const res = await client.post('/api/getdocuments' , {id})
        const docinfo = await res.data[0];
        console.log("docinfo: ",docinfo)
        if (docinfo === undefined) {
            alert('unexist document')
            navigate('/')
        } else {
            await setValue({
                ...value,
                'title' : docinfo.title,
                'author' : docinfo.author,
                'time' : docinfo.time,
                'content' : docinfo.content,
                'type' :docinfo.type
            });
            setTitleValue(docinfo.title);
            console.log(titleValue)
            console.log('info:',value)
            if (value.author === props.author) {
                console.log('edit');
            } else {
                if(props.author === 'please log in') {
                    alert('login please')
                    navigate('/signin')
                } else {
                    if (props.class === 'manager') {
                        alert('edit for manager class')
                        console.log('edit');
                        
                    } else {
                        alert('you are not a owner of this document')
                        navigate('/')
                    }
                }
            }
        }
    }

    

      useEffect(()=>{
          enter();
      },[]);

    
    const navigate = useNavigate();
    

    const onClick = async (event, editor) => {
        console.log(value.title)
        client.post('/api/documents/edit', {value})
    }

    
    const titleOnChange = (e) => {
        setValue({
            ...value,
            'title' : e.target.value
        })
        console.log(value)
    }


    return(
        <div className='form-wrapper'>
            <input placeholder={`last title is ${titleValue}`} className='title-input' onChange={titleOnChange} name='title'/>
            <CKEditor
                editor={ClassicEditor}
                data={value.content}
                onReady={editor => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {

                    const now = new Date();
                    const month = now.getMonth() +1;
        
                  const data = editor.getData();
                  setValue({
                      ...value,
                      'content': data,
                      'time': now.getFullYear() + "." + month+ "." + now.getDate() + " " + now.getHours() + ":" + now.getMinutes(),
                      'type': 'public',
                      'author': props.author,
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
            <button className='submit-button' onClick={onClick}>EDIT</button>
        </div>
    )
}