
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

function Header() {
    return (
        <header>
            
            <Link to={`/`}><img src={require('../asset/netflix2.png')} alt="louvre" className='logoHeader' /></Link>

        <div className='blokHomeUser'>
            <Link to={`/favorite`}><img src={require('../asset/favorie2.png')} alt="louvre" className='imgProfil' /></Link>
            <Link to={`/favorite`}><img src={require('../asset/lib.png')} alt="louvre" className='imgProfil' /></Link>
            <Link to={`/profil`}><img src={require('../asset/user.png')} alt="louvre" className='imgProfil' /></Link>
        </div>
        </header>

    );
}

export default Header;