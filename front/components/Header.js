import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import authContext from '../context/auth/authContext';

const Header = () => {

    const AuthContext = useContext(authContext);
    const { authenticatedUser, userLogged, closeSession } = AuthContext;    
  
    useEffect(() => {
      authenticatedUser();
    }, []);

    return (
        <header className="py-8 flex flex-col md:flex-row items-center justify-between">
            <img 
                // onClick={() => redireccionar() }
                className="w-64 mb-8 md:mb-0 cursor-pointer" src="/logo.svg" 
            />

            <div>
                {
                    userLogged ? (
                        <div className="flex items-center">
                            <p className="mr-2">Hi! {userLogged.user.name}</p>
                            <button 
                                type="button"
                                className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                                onClick={ () => closeSession() }
                            >Close Session</button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login">
                                <a className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2">Login</a>
                            </Link>
                            <Link href="/createAccount">
                                <a className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase">Create Account</a>
                            </Link>
                        </>
                    )
                }

            </div>
        </header>
    )
}

export default Header
