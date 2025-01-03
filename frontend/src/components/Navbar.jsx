import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {useAuthStore} from "../store/authUser.js"
import {Search, LogOut, Menu} from 'lucide-react'
import {useContentStore} from "../store/content.js"

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();

	const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }


	const {contentType, setContentType } = useContentStore();
	console.log("content type", contentType);	
	return (
		<header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
			<div className='flex items-center gap-10 z-50'>
				<Link to='/'>
					<img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
				</Link>

				{/* desktop navbar items */}
                {/* this bcomes dynamic by having sm:flex where the navbar design for a big screen like desktop is only visable for screen small and above */}
				<div className='hidden sm:flex gap-2 items-center'>
					{/* the onclick uses a callback function becuase in react,
					 if you pass in a function reference with "()" it will call it immedailtey when the component renders 
					 instead of when the user clicks on something
					 by passing a function ference to the event handler, it ensures the setContentType is only called when click occures*/}
					<Link to='/' className='hover:underline' onClick={() => setContentType("movie")}>
						Movies
					</Link>
					<Link to='/' className='hover:underline' onClick={() => setContentType("tv")}>
						Tv Shows
					</Link>
					<Link to='/history' className='hover:underline'>
						Search History
					</Link>
				</div>
			</div>

            {/* this creates the side peices of the navbar */}
			<div className='flex gap-2 items-center z-50'>
				<Link to={"/search"}>
                    {/* lucide components */}
					<Search className='size-6 cursor-pointer' />
				</Link>
				<img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
                {/* lucide components */}
				<LogOut className='size-6 cursor-pointer' onClick={logout} />
				<div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
				</div>
			</div>

			{/* mobile navbar items */}
            {/* this bcomes dynamic by having sm:hidden where the navbar design for a small screen like mobile is only visable for screens below sm size */}
            {/* you essentially take the sm value and negate it */}
			{isMobileMenuOpen && (
				<div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Movies
					</Link>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Tv Shows
					</Link>
					<Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Search History
					</Link>
				</div>
			)}
		</header>
    );
};

export default Navbar
