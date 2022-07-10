import { Link, useLocation } from "react-router-dom";
import '../style/Nav.css';
import { useState, useEffect } from 'react';

export function Nav() {
    const loc = useLocation();
    const [active, setActive] = useState(loc.pathname.split('/')[1]);
    useEffect(()=>{
        setActive(loc.pathname.split('/')[1]);
    },[loc.pathname])
    return(
        <div>
            <nav>
                <ul>
                <li>
                    <Link to="/">
                        <h1 className={`btn ${active === '' ? 'active' : ''}`} onClick={() => setActive('')}>MYPAGE</h1>
                    </Link>
                </li>
                <li>
                <Link to="signin">
                    <h1 className={`btn ${active === 'signin' ? 'active' : ''}`} onClick={() => setActive('signin')}>LOGIN</h1>
                </Link>
            </li>
            <li>
                <Link to="signup">
                    <h1 className={`btn ${active === 'signup' ? 'active' : ''}`} onClick={() => setActive('signup')}>RESISTER</h1>
                </Link>
            </li>
                <li>
                    <Link to="document/read/main">
                        <h1 className={`btn ${active === 'document' ? 'active' : ''}`} onClick={() => setActive('document')}>DOCUMENT</h1>
                    </Link>
                </li>
            </ul>
            </nav>

        </div>
    )
}