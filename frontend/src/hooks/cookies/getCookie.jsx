// Import the Cookie class
import Cookie from 'js-cookie';

// Create a function that accepts a cookie name as a parameter
const GetCookie = (cookieName) => {
    // Retrieve the cookie value by passing the cookie name to the get() method
    return Cookie.get(cookieName);
}

// Export the function
export default GetCookie;