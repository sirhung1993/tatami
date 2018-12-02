import {combineReducers} from 'redux'
import {searchKeyword
    , getContactDetail
    , getStudentDetail
    , getStatusDetail
    , isShowDetail
    , getFee
    , getDiem
    , searchId
    , getListStatus
    , getListSCM
    , setLimitPage
    , getAmount
} from './ProfileReducers'
import {
    googleLogin
} from './LoginReducer'

const ProfileReducer = combineReducers({
    googleLogin,
    searchKeyword,
    searchId,
    getContactDetail,
    getStudentDetail,
    getStatusDetail,
    getFee,
    getDiem,
    getListStatus,
    getListSCM,
    getAmount,
    setLimitPage,
    isShowDetail
})

export default ProfileReducer
