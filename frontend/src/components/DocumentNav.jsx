import { Link,useLocation } from "react-router-dom";
import "../style/Nav.css";
import { useState,useEffect } from "react";

export function DocumentNav() {
  const loc = useLocation();
  const [active, setActive] = useState(loc.pathname.split('/')[2]);
  useEffect(()=>{
      setActive(loc.pathname.split('/')[2]);
  },[loc.pathname])
    return(
        <div>
        <ul>
          <li>
              <Link to='read/main'>
                <h1 className={`btn ${active === 'read' ? 'active' : ''}`} onClick={() => setActive('read')}>READ</h1>
              </Link>
          </li>
          <li>
              <Link to='upload'>
                <h1 className={`btn ${active === 'upload' ? 'active' : ''}`} onClick={() => setActive('upload')}>UPLOAD</h1>
              </Link>
          </li>
          <li>
              <Link to='showall'>
                <h1 className={`btn ${active === 'showall' ? 'active' : ''}`} onClick={() => setActive('showall')}>ALL DOCUMENTS</h1>
              </Link>
          </li>
      </ul>
      </div>
    )
}