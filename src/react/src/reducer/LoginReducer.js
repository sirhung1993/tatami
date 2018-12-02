import {
    LOGIN_STATUS
} from '../action/ActionTypes'

export function googleLogin (state = {}, action) {
    switch(action.type) {
        case LOGIN_STATUS :
            return {...state.search, action}
        default:
            return state
    }
} 