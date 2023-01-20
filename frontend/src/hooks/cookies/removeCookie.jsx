import Cookie from 'js-cookie'; //Import cookie library

const RemoveCookie = (cookieName) => { //Create a function that takes a cookie name as a parameter
    Cookie.remove(cookieName); //Remove the cookie with the given name
}

export default RemoveCookie; //Export the function