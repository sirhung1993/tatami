import {START_SEARCH
    , FINISH_SEARCH
    , START_SEARCH_ID
    , FINISH_SEARCH_ID
    , BASE_API_URL
    , GET_INFO_SUB
    , GET_TYPE_SUB,
    GET_AMOUNT_SUB,
    FINISH_GET_AMOUNT,
    LIMIT_OFFSET_RESULT
} from './ActionTypes'

export function searchKeywords(searchKey, searchType) {
    return {
        type: START_SEARCH,
        meta: {
            searchKey,
            searchType,
            isLoading: true
        },
        error: false
    }
}

export async function getResult(searchKey, searchType, limit, page) {
    const apiUrl = `${BASE_API_URL}/${GET_INFO_SUB}/${GET_TYPE_SUB(searchType)}/${searchKey}/${limit}/${page}`
    return fetch(apiUrl, {
                        crossDomain: true,
                        method: 'GET',
                        headers: {'Content-Type':'application/json'}
                    })
                    .then(res => res.json())
                    .then(data => {
                        return {
                            type: FINISH_SEARCH,
                            meta: {
                                searchKey,
                                searchType,
                                isLoading: false
                            },
                            payload: (data.OK !== undefined) ? data.OK.msg : null,
                            error: (data.err !== undefined) ? data.err.msg : false
                        }
                })
} 

export async function getAmount(searchType, searchKey) {
    const apiUrl = `${BASE_API_URL}/${GET_AMOUNT_SUB}/${GET_TYPE_SUB(searchType)}/${searchKey}`
    return fetch(apiUrl, {
                        crossDomain: true,
                        method: 'GET',
                        headers: {'Content-Type':'application/json'}
                    })
                    .then(res => res.json())
                    .then(data => {
                        return {
                            type: FINISH_GET_AMOUNT,
                            meta: {
                                searchKey,
                                searchType,
                                isLoading: false
                            },
                            payload: (data.OK !== undefined) ? data.OK.msg : null,
                            error: (data.err !== undefined) ? data.err.msg : false
                        }
                })
} 

export function searchId(searchKey) {
    return {
        type: START_SEARCH_ID,
        meta: {
            searchKey,
            searchType: 'id',
            isLoading: true
        },
        error: false
    }
}

export async function getResultById(searchKey) {
    const apiUrl = `${BASE_API_URL}/${GET_INFO_SUB}/${GET_TYPE_SUB('id')}/${searchKey}`
    return fetch(apiUrl, {
                        crossDomain: true,
                        method: 'GET',
                        headers: {'Content-Type':'application/json'}
                    })
                    .then(res => res.json())
                    .then(data => {
                        return {
                            type: FINISH_SEARCH_ID,
                            meta: {
                                searchKey,
                                searchType: 'id',
                                isLoading: false
                            },
                            payload: (data.OK !== undefined) ? data.OK.msg : null,
                            error: (data.err !== undefined) ? data.err.msg : false
                        }
                })
} 

export function setLimitOffset(limit = 50, page = 0) {
    return {
        type: LIMIT_OFFSET_RESULT,
        meta: {
            limit,
            page
        }
    }
} 