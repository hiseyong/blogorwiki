import { DocumentRead } from "./DocumentRead";
import { DocumentUpload } from "./DocumentUpload";
import { DocumentNav } from "./DocumentNav";
import { Routes, Route } from "react-router-dom";
import '../style/Document.css'
import { DocumentShowAll } from "./DocumentShowAll";
import { DocumentEdit } from "./DocumentEdit";

export function Document(props) {
      return(
          <div className="container">
              <DocumentNav/>
              <Routes>
                  <Route path='read/:id' element={<DocumentRead author={props.author} class={props.class}/>}/>
                  <Route path='showall' element={<DocumentShowAll/>}/>
                  <Route path='edit/:id' element={<DocumentEdit author={props.author} class={props.class}/>}/>
                  <Route path='upload' element ={<DocumentUpload author={props.author}/>}/>
              </Routes>
          </div>
      );
}