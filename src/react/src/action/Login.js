import { 
    LOGIN_STATUS
    , LOGIN_URL
    , BASE_API_URL,
    LOGIN_STATUS_URL
} from './ActionTypes'

export function login(email, tokenId) {
    const loginUrl = `${BASE_API_URL}/${LOGIN_URL}`
    return fetch(loginUrl, {
        method: 'POST',
        crossDomain: true,
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            email,
            tokenId
        })
    })
    .then(res => res.json())
    .then(data => {
        return {
            type: LOGIN_STATUS,
            meta: {
                email,
                tokenId,
                msg: (data.err) ? data.err.msg : 'Login suscessfully!'
            },
            payload: data.OK ? data.OK.msg : false
        }
    }).catch(err => {
        return {
            type: LOGIN_STATUS,
            meta: {
                msg: 'Cannot get DATA'
            },
            payload: false,
            error: true
        }
    })
}

export function loginStatus() {
    const loginUrl = `${BASE_API_URL}/${LOGIN_URL}/${LOGIN_STATUS_URL}`
    return fetch(loginUrl, {
        method: 'GET',
        crossDomain: true,
        headers: {'Content-Type':'application/json'},
    })
    .then(res => res.json())
    .then(data => {
        return {
            type: LOGIN_STATUS,
            payload: data.OK ? data.OK.msg : false
        }
    }).catch(err => {
        return {
            type: LOGIN_STATUS,
            meta: {
                msg: 'Cannot get DATA'
            },
            payload: false,
            error: true
        }
    })
}