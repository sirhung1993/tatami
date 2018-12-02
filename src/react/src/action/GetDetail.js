import {
        GET_DETAIL_SUB
        , GET_DETAIL_TYPE
        ,GET_DETAIL_ACTION
        ,GET_DETAIL_ACTION_FINISH
        , BASE_API_URL
        , IS_SHOW_DETAIL
        , FINISH_LIST_STATUS_INFO,
        DETAIL_TYPE,
        TRANG_THAI_COLUMNS,
        CONTACT_COLUMNS,
        SCM_COLUMNS,
        FINISH_LIST_SCM_INFO,
        GET_LIST_TYPE
} from './ActionTypes'

export function getDetail (id, detailType) {
    return {
        type: GET_DETAIL_ACTION(detailType),
        meta: {
            detailType: GET_DETAIL_TYPE(detailType),
            id,
            isLoading: true
        },
        error: false
    }
}

export function showDetail () {
    return {
        type: IS_SHOW_DETAIL,
        payload: true
    }
}
export function notShowDetail() {
    return {
        type: IS_SHOW_DETAIL,
        payload: false
    }
}

export async function getDetailResult(id, detailType) {
    const apiUrl = `${BASE_API_URL}/${GET_DETAIL_SUB}/${GET_DETAIL_TYPE(detailType)}/${id}`
    return fetch(apiUrl, {
                        crossDomain: true,
                        method: 'GET',
                        headers: {'Content-Type':'application/json'}
                    })
                    .then(res => res.json())
                    .then(data => {
                        return {
                            type: GET_DETAIL_ACTION_FINISH(detailType),
                            meta: {
                                id,
                                detailType,
                                isLoading: false
                            },
                            payload: (data.OK !== undefined) ? data.OK.msg : null,
                            error: (data.err !== undefined) ? data.err.msg : false
                        }
                })
}

export function getList(type = DETAIL_TYPE[2]) {
    return {
       type: GET_LIST_TYPE(type),
       meta: {
           detailType: type 
       }
    }
}

/*
*@params: arrContact is array of contact info to get latest status
*@return: array of student status e.g.: ['L1', 'L2', ..., 'S1']
*/
export async function getListLatestStatus(arrContact) {
    const TYPE = DETAIL_TYPE[2] 
    const arrId = arrContact.map(obj => {
        return obj[CONTACT_COLUMNS[0]]
    })
    const ListStatus = arrId.map(id => {
                const apiUrl = `${BASE_API_URL}/${GET_DETAIL_SUB}/${TYPE}/${id}`
                const result = fetch(apiUrl, {
                    crossDomain: true,
                    method: 'GET',
                    headers: {'Content-Type':'application/json'}
                })
                .then(res => res.json())
                .then(data => {
                    if(data.OK) {
                        if(data.OK.msg[0]) {
                            const latestData = data.OK.msg[0]
                            return [latestData[TRANG_THAI_COLUMNS[6]]]
                        } else {
                            return 'Chưa xác định'
                        }
                    } else {
                        return data
                    }
                })
                return result
        })
        const status = await Promise.all(ListStatus)
   return {
       type: FINISH_LIST_STATUS_INFO,
       meta: {
           detailType: TYPE 
       },
       payload: status,
    //    error:  (status[0].err) ? true : false
   }
}

/*
*@params: arrContact is array of contact info to get latest status
*@return: array of student status e.g.: ['L1', 'L2', ..., 'S1']
*/
export async function getListScm(arrContact) {
    const TYPE = DETAIL_TYPE[1] 
    const arrId = arrContact.map(obj => {
        return obj[CONTACT_COLUMNS[0]]
    })
    const ListStatus = arrId.map(id => {
                const apiUrl = `${BASE_API_URL}/${GET_DETAIL_SUB}/${TYPE}/${id}`
                const result = fetch(apiUrl, {
                    crossDomain: true,
                    method: 'GET',
                    headers: {'Content-Type':'application/json'}
                })
                .then(res => res.json())
                .then(data => {
                    if(data.OK) {
                        if(data.OK.msg[0]) {
                            const latestData = data.OK.msg[0]
                            return [latestData[SCM_COLUMNS[1]]]
                        } else {
                            return 'Chưa xác định'
                        }
                    } else {
                        return data
                    }
                })
                return result
        })
        const status = await Promise.all(ListStatus)
   return {
       type: FINISH_LIST_SCM_INFO,
       meta: {
           detailType: TYPE 
       },
       payload: status,
       error:  (status[0].err) ? true : false
   }
}