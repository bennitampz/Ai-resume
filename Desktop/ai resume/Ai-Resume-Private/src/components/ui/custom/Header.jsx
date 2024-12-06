import React from 'react'
import {Button} from '../button'
import {Link} from 'react-router-dom'
import {UserButton} from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';

const Header = () => {
    const {user, isSignedIn} = useUser();
    return (
        <div className='p-3 px-5 flex shadow-md justify-between'>
            <img src='/logo_landingpage.svg' width={100} height={100}></img>
            {
                isSignedIn
                    ? <div className='flex gap-2 items-center'>
                            <Link to="/dashboard">
                                <Button variant="outline">Dashboard</Button>
                            </Link>
                            <UserButton />
                        </div>
                    : <Link to='/auth/sign-in'>
                            <Button>Get Started</Button>
                        </Link>
            }
        </div>
    )
}

export default Header
