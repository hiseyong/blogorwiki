import { Link } from "react-router-dom";
import { useState } from "react";

export function DocumentSearch() {
    const [value,setValue] = useState('');
    const onChange = (e) => {
        setValue(e.target.value)
    };
    return(
        <div>
            <input placeholder="search" onChange={onChange}/>
            <Link to={'/document/read/' + value}>
                <button>SEARCH</button>
            </Link>
        </div>
    )
}