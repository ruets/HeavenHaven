import Cookie from 'js-cookie';

const SetCookie = (cookieName, cookieData) => {
    console.log("zioenzeog");
    Cookie.set(cookieName, cookieData, {
        expires: 1, // 1 day
        secure: true,
        sameSite: 'strict',
        path: '/'
    });
}

export default SetCookie;