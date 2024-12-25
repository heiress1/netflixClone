// controller functons that takes in a request and response

export async function signup(req, res) {
    res.send("signup route"); 
    //res is an object from express that receives the HTTP request express sends
    //send is a method of the object res that sends responses back to client 
}

export async function login(req, res) {
    res.send("login route");
}

export async function logout(req, res) {
    res.send("logout route");
}

