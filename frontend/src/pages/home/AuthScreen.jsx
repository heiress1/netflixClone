import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight} from "lucide-react";

const AuthScreen = () => {
    const [email, setEmail] = React.useState('');
return (
    <div className="hero-bg relative">
        {/* Navbar */}
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-4">
            <img src="/netflix-logo.png" alt="Netflix Logo" className="w-52 md:w-52" />
            <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
                    Sign In
            </Link>
        </header>

        {/* hero section */}

        <div className="flex flex-col items-center justify-center text-center py-32 text-white max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Unlimited movies, TV shows, and more</h1>
                <h2 className="text-2xl font-semibold mb-4">Watch anywhere. Cancel anytime.</h2>
                <h3 className="text-xl">Ready to watch? Enter your email to create or restart your membership.</h3>
                <div className="flex items-center justify-center mt-4">
                
                <form className="flex flex-col md:flex-row gap-4 w-1/2">
                    <input
                    type="email"
                    placeholder="Email Address"
                    className="p-2 rounded flex-1 bg-black/80 border border-gray-700"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
                    Get Started
                    <ChevronRight className="size-8 md:size-10"/>
                    </button>
                </form>
                </div>
        </div>
    </div>
)
}

export default AuthScreen
