import Cookies from 'js-cookies';

export const getSession = () => {
    const jwt = Cookies.getItem('token')
    let session = false
    try {
        if ( jwt ) {
            session = true
        }
    } catch ( error ) {
        console.log(error)
    }
    return session
}

export const logOut = () => {
    Cookies.removeItem('token');
}