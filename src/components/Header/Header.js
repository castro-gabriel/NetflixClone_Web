import React from 'react'
import './Header.css'

import logo from '../../images/logo.png'

const header = ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src={logo} alt="Netflix" />
                </a>
            </div>

            <div className="header--user">
                <a href="/">
                    <img src="http://pbs.twimg.com/profile_images/1240119990411550720/hBEe3tdn_400x400.png" alt="User" />
                </a>
            </div>
        </header>
    )
}

export default header