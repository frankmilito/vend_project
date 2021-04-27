import React from 'react'


function NavBar() {
    return (
        <div className='navbar'>
            <div className="logo">
                Electrik<small>.ng</small>
            </div>
            <ul>
                <li><a href='/'>Home</a></li>
                <li><a href='/'>buy electricity</a></li>
                <li><a href='/'>transaction history</a></li>
                <li><a href='/'>contact us</a></li>
                <li><a href='/'>FAQ</a></li>
            </ul>
        </div>
    )
}

export default NavBar
