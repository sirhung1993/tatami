import {
    START_SEARCH,
    FINISH_SEARCH,
    START_SEARCH_ID,
    FINISH_SEARCH_ID,
    START_GET_CONTACT_DETAIL,
    FINISH_GET_CONTACT_DETAIL,
    START_GET_STUDENT_DETAIL,
    FINISH_GET_STUDENT_DETAIL,
    START_GET_HISTORY_DETAIL,
    FINISH_GET_HISTORY_DETAIL,
    START_GET_FEE_DETAIL,
    FINISH_GET_FEE_DETAIL,
    START_GET_DIEM_DETAIL,
    FINISH_GET_DIEM_DETAIL,
    IS_SHOW_DETAIL,
    START_LIST_STATUS_INFO,
    FINISH_LIST_STATUS_INFO,
    START_LIST_SCM_INFO,
    FINISH_LIST_SCM_INFO,
    FINISH_GET_AMOUNT,
    LIMIT_OFFSET_RESULT
} from '../action/ActionTypes'

const initState = {}

export function searchKeyword (state = initState, action) {
    switch(action.type) {
        case START_SEARCH :
            return {...state.search, action}
        case FINISH_SEARCH :
            return {...state.search, action}
        default:
            return state
    }
} 

export function getAmount (state = {}, action) {
    switch(action.type) {
        case FINISH_GET_AMOUNT :
            return {...state, action}
        default:
            return state
    }
} 

export function searchId (state = {}, action) {
    switch(action.type) {
        case START_SEARCH_ID :
            return {...state.search, action}
        case FINISH_SEARCH_ID :
            return {...state.search, action}
        default:
            return state
    }
} 
const detailState = {}
export function getContactDetail (state = detailState, action) {
    switch(action.type) {
        case START_GET_CONTACT_DETAIL :
            return {...state, action}
        case FINISH_GET_CONTACT_DETAIL :
            return {...state, action}
        default:
            return state
    }
} 
export function getStudentDetail (state = detailState, action) {
    switch(action.type) {
        case START_GET_STUDENT_DETAIL:
            return {...state, action}
        case FINISH_GET_STUDENT_DETAIL:
            return {...state, action}
        default:
            return state
    }
} 
export function getStatusDetail (state = detailState, action) {
    switch(action.type) {
        case START_GET_HISTORY_DETAIL:
            return {...state, action}
        case FINISH_GET_HISTORY_DETAIL:
            return {...state, action}
        default:
            return state
    }
}

export function getFee (state = detailState, action) {
    switch(action.type) {
        case START_GET_FEE_DETAIL:
            return {...state, action}
        case FINISH_GET_FEE_DETAIL:
            return {...state, action}
        default:
            return state
    }
}

export function getDiem (state = detailState, action) {
    switch(action.type) {
        case START_GET_DIEM_DETAIL:
            return {...state, action}
        case FINISH_GET_DIEM_DETAIL:
            return {...state, action}
        default:
            return state
    }
}

export function getListStatus (state = {}, action) {
    switch(action.type) {
        case START_LIST_STATUS_INFO:
            return {...state, action}
        case FINISH_LIST_STATUS_INFO:
            return {...state, action}
        default:
            return state
    }
}
export function getListSCM (state = {}, action) {
    switch(action.type) {
        case START_LIST_SCM_INFO:
            return {...state, action}
        case FINISH_LIST_SCM_INFO:
            return {...state, action}
        default:
            return state
    }
}

export function setLimitPage(state = {}, action) {
    switch (action.type) {
        case LIMIT_OFFSET_RESULT: {
            return {...state, action}
        }
        default: {
            return state
        }
    }
}

export function isShowDetail (state = {}, action) {
    switch(action.type) {
        case IS_SHOW_DETAIL : 
            return {...state, action}
        default:
            return state
    }
}