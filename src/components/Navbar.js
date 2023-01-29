import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
    return (
        <div>
            <nav class="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
                <div class="container-fluid">
                    <Link class="navbar-brand" to="/">Navbar</Link>
                   
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <Link class="nav-link " aria-current="page" to="/">Home</Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link " aria-current="page" to="/about">About</Link>
                            </li>

                        </ul>
                       
                        
                    </div>
                </div>
            </nav>
        </div>
    )
}
