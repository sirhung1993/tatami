//For searching keywords
export const START_SEARCH = 'START_SEARCH'
export const FINISH_SEARCH = 'FINISH_SEARCH'
export const START_SEARCH_ID = 'START_SEARCH_ID'
export const FINISH_SEARCH_ID = 'FINISH_SEARCH_ID'
//For getting student detail
export const START_GET_STUDENT_DETAIL = 'START_GET_STUDENT_DETAIL'
export const FINISH_GET_STUDENT_DETAIL = 'FINISH_GET_STUDENT_DETAIL'
//For getting student detail
export const START_GET_CONTACT_DETAIL = 'START_GET_CONTACT_DETAIL'
export const FINISH_GET_CONTACT_DETAIL = 'FINISH_GET_CONTACT_DETAIL'
//For getting history detail
export const START_GET_HISTORY_DETAIL = 'START_GET_HISTORY_DETAIL'
export const FINISH_GET_HISTORY_DETAIL = 'FINISH_GET_HISTORY_DETAIL'
//For getting fee
export const START_GET_FEE_DETAIL = 'START_GET_FEE_DETAIL'
export const FINISH_GET_FEE_DETAIL = 'FINISH_GET_FEE_DETAIL'
//For getting diem
export const START_GET_DIEM_DETAIL = 'START_GET_DIEM_DETAIL'
export const FINISH_GET_DIEM_DETAIL = 'FINISH_GET_DIEM_DETAIL'
// GET STATUS LIST INFO for result list
export const START_LIST_STATUS_INFO = 'START_LIST_STATUS_INFO'
export const FINISH_LIST_STATUS_INFO = 'FINISH_LIST_STATUS_INFO'
// GET STATUS LIST INFO for result list
export const START_LIST_SCM_INFO = 'START_LIST_SCM_INFO'
export const FINISH_LIST_SCM_INFO = 'FINISH_LIST_SCM_INFO'
//show detail
export const IS_SHOW_DETAIL = 'IS_SHOW_DETAIL'
//GET AMOUNT OF RESUT
export const FINISH_GET_AMOUNT = 'FINISH_GET_AMOUNT'
export const LIMIT_OFFSET_RESULT = 'LIMIT_OFFSET_RESULT' 
// IS LOGIN
export const LOGIN_STATUS = 'LOGIN_STATUS'

//API HOST
export const PROTOCOL = (process.env.REACT_APP_API_PROTOCOL !== undefined) ?
process.env.REACT_APP_API_PROTOCOL : 'http'
export const HOST = (process.env.REACT_APP_API_HOST !== undefined) ?
process.env.REACT_APP_API_HOST : 'localhost:5000'
export const BASE_API_URL = `${PROTOCOL}://${HOST}`
export const HTTP_END_POINT = 'https://api.kylin.alohaeos.com'
export const GET_INFO_SUB = 'student/getInfo'
export const GET_DETAIL_SUB = 'student/getDetail'
export const GET_AMOUNT_SUB = 'student/getAmount'
export const LOGIN_URL = 'login'
export const GOOGLE_OAUTH_CLIENT_ID = (process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID !== undefined) ?
process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID : '589695881853-e51u419mthaia0gmolkkf8qlkklqljpn.apps.googleusercontent.com'
export const LOGIN_STATUS_URL = 'status'
export const CONTACT_COLUMNS = ['Index', 'LienHeId', 'SinhVienId', 'TruongDaiHoc',
                'Ten', 'SDT', 'Email', 'NgaySinh', "Tinh", 'DiaChiThuongTru','DiaChiLienHe', 'MaSinhVien']
export const CRM_COLUMNS = ['LienHeId','NoiDaoTao','Nganh','Gop','NguonLienHe'
        ,'NguoiTuyen', 'TrinhDo', 'GioiTinh']
export const SCM_COLUMNS = ['SinhVienId', 'Truong', 'NoiDaoTao', 'KhoaHoc'
        , 'ChuyenNganh', 'LopQuanLy', 'Gop', 'TinhTrangHoSo', 'TrinhDoDauVao', 'GioiTinh']
export const TRANG_THAI_COLUMNS = ['IdSuKien', 'LienHeId', 'NgayCapNhatTrangThai'
        , 'TrangThaiGoc', 'MaTrangThaiGoc', 'TrangThaiDich', 'MaTrangThaiDich']
export const DETAIL_TYPE = ['contact', 'student', 'status_history', 'fee', 'diem']
export const FEE_COLUMNS = ['SinhVienId', 'DonVi', 'Tien', 'Loai', 'HocKy', 'MucDichThu']
export const FEE_PHAI_THU = 'Phải thu' 
export const FEE_THUC_THU= 'Thực thu' 
export const DIEM_COLUMNS = ['Id', 'SinhVienId', 'CodeMonHoc', 
        'MonHoc', 'GiuaKy', 'ChuyenCan', 'CuoiKy', 'TongKet', 'Note']
export const DIEM_COLUMNS_DISPLAY = ['CodeMonHoc', 
        'MonHoc', 'GiuaKy', 'ChuyenCan', 'CuoiKy', 'TongKet'    ]
export const GET_TYPE_SUB = (type) => {
    switch(type) {
        case 'name' : 
            return 'name'
        case 'phone': 
            return 'phone'
        case 'email':
            return 'email'
        case 'id':
            return 'id'
        case 'student_code':
            return 'student_code'
        default: 
            return 'name' 
    }
}
export const GET_DETAIL_TYPE = (type) => {
    switch(type) {
        case 'contact':
            return 'contact'
        case 'status_history':
            return 'status_history'
        case 'fee':
            return 'fee'
        case 'diem':
            return 'diem'
        default:
            return 'student'
    }
}
export const GET_DETAIL_ACTION_FINISH = (type) => {
    switch(type) {
        case 'contact':
            return FINISH_GET_CONTACT_DETAIL
        case 'status_history':
            return FINISH_GET_HISTORY_DETAIL
        case 'fee':
            return FINISH_GET_FEE_DETAIL
        case 'diem':
            return FINISH_GET_DIEM_DETAIL
        default:
            return FINISH_GET_STUDENT_DETAIL
    }
}
export const GET_DETAIL_ACTION = (type) => {
    switch(type) {
        case 'contact':
            return START_GET_CONTACT_DETAIL
        case 'status_history':
            return START_GET_HISTORY_DETAIL
        case 'fee':
            return START_GET_FEE_DETAIL
        case 'diem':
            return START_GET_DIEM_DETAIL
        default:
            return START_GET_STUDENT_DETAIL
    }
}

/*
* @params: type of Get list in DETAIL_TYPE
* @return: default is LIST STATUS INFO
*/
export const GET_LIST_TYPE = (type) => {
    switch(type) {
        case DETAIL_TYPE[1]:
            return START_LIST_SCM_INFO
        case DETAIL_TYPE[2]:
            return START_LIST_STATUS_INFO
        default:
            return START_LIST_STATUS_INFO
    }
}

export const EOS = {
    blockchain: 'eos',
    host: 'kylin-testnet.jeda.one',
    port: 8888,
    protocol: 'http',
    chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
}

