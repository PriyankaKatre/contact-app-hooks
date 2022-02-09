import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar= () => {
    return (
        <React.Fragment>
            <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
                <div className="container">
                    <Link to={'/'} className='navbar-brand'>
                        <i className='fa fa-phone text-warning'/> Contact <span className='text-warning'>Manager App</span>
                    </Link>
                </div>
            </nav>
        </React.Fragment>
    )
}
