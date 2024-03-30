import React from "react";

const Nav = () => {
    const signOut = () => {
        localStorage.removeItem("_id");
        navigate("/");
    }
    return (
        <nav className='navbar'>
            <h2>Threadify</h2>
                <div className="navbarRight">
                    <button onClick={signOut}>Sign Out</button>
                </div>
        </nav>
    )
}

export default Nav;