// import the Cookie class from the 'js-cookie' package
import Cookie from 'js-cookie';

// create a function that will set a cookie
const SetCookie = (cookieName, cookieData) => {
    // call the Cookie.set() method to set a cookie
    // pass the cookie name and data to the Cookie.set() method
    Cookie.set(cookieName, cookieData, {
        // set the cookie to expire in 1 day
        expires: 1,
        // set the cookie to be secure
        secure: true,
        // set the cookie to be sent with the sameSite policy of 'strict'
        sameSite: 'strict',
        // set the cookie path to '/'
        path: '/'
    });
}

// export the SetCookie function
export default SetCookie;