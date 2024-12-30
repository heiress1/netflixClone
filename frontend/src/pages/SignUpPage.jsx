import React from "react";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignUp = (event)=> {
    //prevents page from refreshing once submit form
    event.preventDefault();
    console.log(email, username, password);
  }
  return (
    //sets the background image for the page
    <div className="h-screen w-full hero-bg">
      {/* //sets the netflix logo header*/}
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        {/* link allows you to navigate between routes without a full-page reload */}
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="Netflix Logo" className="w-52" />
        </Link>
      </header>

      {/* sets up the sign up block */}
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/80 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Sign Up
          </h1>

          {/* create the form for user to enter credentials*/}
          <form className="space-y-4" onSubmit={handleSignUp} >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300 block"
              >
                Email
              </label>

              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="Enter your email"
                id="email"
                value={email}
                //onChange is a event handler that listens change events on the input element
                //event represents the change in the input field
                //event.target represents the DOM element that triggered, in this case the input field
                //event.target.value represents current value of input field 
                //setEmail is a function that updates the email state with the new value
                //the event can also represent the previous state of the event and be updated by the new event state
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            {/* creates textbox for username */}
            <div>
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-300 block"
              >
                User Name
              </label>

              <input
                type="text"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="Enter your username"
                id="username"
                value={username}
                onChange={(event)=> setUsername(event.target.value)}
              />
            </div>

            {/* creates textbox for password*/}
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300 block"
              >
                Password
              </label>

              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="Enter your password"
                id="password"
                value={password}
                onChange={(event)=> setPassword(event.target.value)}
              />
            </div>

            <button className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Sign Up
            </button>

            <div className="text-center text-gray-400">
              Already a member?{" "}
              <Link to={"/login"} className="text-red-500 hover:underline">
                {" "}
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
