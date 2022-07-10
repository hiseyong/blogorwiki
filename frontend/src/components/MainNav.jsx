import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../style/Nav.css"

export function MainNav() {
    const [active, setActive] = useState(useLocation().pathname.split('/')[1]);
    return(
        <div>
            <ul>
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
            </ul>
             
        </div>
    )
}