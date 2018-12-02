'use strict'
const whConfig = require('../config/Configuration.js')
const WH = require('./WareHouse.js')
const wh = new WH(whConfig.WareHouse)

module.exports = class Student {
    constructor() {
        this.Contacts = whConfig.ContactDetailInWH.TableName
        this.ContactsColumns = whConfig.ContactDetailInWH.Columns.split(/,/)
        this.ContactsColumnsAlias=['Index', 'LienHeId', 'SinhVienId', 'TruongDaiHoc',
        'Ten', 'SDT', 'Email', 'NgaySinh', "Tinh", 'DiaChiThuongTru', 'DiaChiLienHe', 'MaSinhVien'] 
        this.ContactsId= this.ContactsColumns[0]
        this.ContactsName = this.ContactsColumns[4]
        this.ContactPhone = this.ContactsColumns[5]
        this.ContactEmail = this.ContactsColumns[6]
        this.ContactCode = this.ContactsColumns[11]

        this.FactsCrm = whConfig.FactsCRM.TableName
        this.FactsCrmColumns = whConfig.FactsCRM.Columns.split(/,/)
        this.FactsCrmColumnsAlias = ['LienHeId','NoiDaoTao','Nganh','Gop','NguonLienHe'
        ,'NguoiTuyen', 'TrinhDo', 'GioiTinh']
        this.IdFactCrm = this.FactsCrmColumns[0]
        this.DiaDiemFactCrm= this.FactsCrmColumns[1]
        this.NganhCrm= this.FactsCrmColumns[2]
        this.GopFactCrm= this.FactsCrmColumns[3]
        this.NguonFactCrm= this.FactsCrmColumns[4]
        this.TVTSFactCrm= this.FactsCrmColumns[5]
        this.TrinhFactCrm= this.FactsCrmColumns[6]
        this.GenderFactCrm= this.FactsCrmColumns[7]

        this.FactTrangThai = whConfig.FactTrangThai.TableName
        this.FactTrangThaiColumns = whConfig.FactTrangThai.Columns.split(/,/)
        this.FactTrangThaiColumnsAlias = ['IdSuKien', 'LienHeId', 'NgayCapNhatTrangThai'
        , 'TrangThaiGoc', 'MaTrangThaiGoc', 'TrangThaiDich', 'MaTrangThaiDich']
        this.IdFactTrangThai = this.FactTrangThaiColumns[0]
        this.ContactIdFactTrangThai = this.FactTrangThaiColumns[1]
        this.TGDoiFactTrangThai = this.FactTrangThaiColumns[2]
        this.TTCuFactTrangThai = this.FactTrangThaiColumns[3]
        this.TTMoiFactTrangThai = this.FactTrangThaiColumns[4]
        this.TTCuAlias = this.FactTrangThaiColumnsAlias[5]
        this.TTMoiAlias = this.FactTrangThaiColumnsAlias[6]

        this.FactSinhVien = whConfig.FactSinhVien.TableName
        this.FactSinhVienColumns = whConfig.FactSinhVien.Columns.split(/,/)
        this.FactSinhVienColumnsAlias = ['SinhVienId', 'Truong', 'NoiDaoTao', 'KhoaHoc'
        , 'ChuyenNganh', 'LopQuanLy', 'Gop', 'TinhTrangHoSo', 'TrinhDoDauVao', 'GioiTinh']
        this.IdFactSinhVien = this.FactSinhVienColumns[0]
        this.SchoolFactSinhVien = this.FactSinhVienColumns[1]
        this.LocationFactSinhVien = this.FactSinhVienColumns[2]
        this.CourseFactSinhVien = this.FactSinhVienColumns[3]
        this.MajorFactSinhVien = this.FactSinhVienColumns[4]
        this.ClassFactSinhVien = this.FactSinhVienColumns[5]
        this.GopFactSinhVien = this.FactSinhVienColumns[6]
        this.TrangThaiHSFactSinhVien = this.FactSinhVienColumns[7]
        this.EduFactSinhVien = this.FactSinhVienColumns[8]
        this.GenderFactSinhVien = this.FactSinhVienColumns[9]
        
        this.GioiTinh = whConfig.GioiTinh.TableName 
        this.GioiTinhColumns = whConfig.GioiTinh.Columns.split(/,/)
        this.IdGioiTinh = this.GioiTinhColumns[0]
        this.MoTaGioiTinh = this.GioiTinhColumns[1]

        this.KhoaDaoTao = whConfig.KhoaDaoTao.TableName
        this.KhoaDaoTaoColumns = whConfig.KhoaDaoTao.Columns.split(/,/)
        this.IdKhoaDaoTao = this.KhoaDaoTaoColumns[0]
        this.MaKhoaHocKhoaDaoTao = this.KhoaDaoTaoColumns[1]

        this.NganhDaoTao = whConfig.NganhDaoTao.TableName
        this.NganhDaoTaoColumns = whConfig.NganhDaoTao.Columns.split(/,/)
        this.IdNganhDaoTao = this.NganhDaoTaoColumns[0]
        this.TenNganhDaoTao = this.NganhDaoTaoColumns[1]

        this.LopQuanLy = whConfig.LopQuanLy.TableName
        this.LopQuanLyColumns = whConfig.LopQuanLy.Columns.split(/,/)
        this.IdLopQuanLy = this.LopQuanLyColumns[0]
        this.MaLopQuanLy = this.LopQuanLyColumns[1]

        this.TrangThaiHS = whConfig.TrangThaiHS.TableName
        this.TrangThaiHSColumns = whConfig.TrangThaiHS.Columns.split(/,/)
        this.IdTrangThaiHS = this.TrangThaiHSColumns[0]
        this.TenTrangThaiHS = this.TrangThaiHSColumns[2]

        this.NguonContact = whConfig.NguonContact.TableName
        this.NguonContactColumns = whConfig.NguonContact.Columns.split(/,/)
        this.IdNguonContact = this.NguonContactColumns[0]
        this.TenNguonContact = this.NguonContactColumns[1]

        this.TrangThai = whConfig.TrangThai.TableName
        this.TrangThaiColumns = whConfig.TrangThai.Columns.split(/,/)
        this.IdTrangThai = this.TrangThaiColumns[0]
        this.TenTrangThai = this.TrangThaiColumns[1]

        this.DoanhThu = whConfig.DoanhThu.TableName
        this.DoanhThuColumns = whConfig.DoanhThu.Columns.split(/,/)
        this.SinhVienIdDoanhThu = this.DoanhThuColumns[9]
        this.TienDoanhThu = this.DoanhThuColumns[14]
        this.DonViDoanhThu = this.DoanhThuColumns[12]
        this.HocKyDoanhThu = this.DoanhThuColumns[8]
        this.LoaiThuDoanhThu = this.DoanhThuColumns[6]
        this.MucDichThuDoanhThu = this.DoanhThuColumns[5]
        this.FactDoanhThuAlias = ['SinhVienId', 'DonVi', 'Tien', 'Loai', 'HocKy', 'MucDichThu']

        this.LoaiThu = whConfig.LoaiThu.TableName
        this.LoaiThuColumns = whConfig.LoaiThu.Columns.split(/,/)
        this.IdLoaiThu = this.LoaiThuColumns[0]
        this.TenLoaiThu = this.LoaiThuColumns[1]

        this.HocKy = whConfig.HocKy.TableName
        this.HocKyColumns = whConfig.HocKy.Columns.split(/,/)
        this.IdHocKy = this.HocKyColumns[0]
        this.TenHocKy = this.HocKyColumns[1]
        
        this.MucDichThu = whConfig.MucDichThu.TableName
        this.MucDichThuColumns = whConfig.MucDichThu.Columns.split(/,/)
        this.IdMucDichThu = this.MucDichThuColumns[0]
        this.TenMucDichThu = this.MucDichThuColumns[2]

        this.Diem = whConfig.Diem.TableName
        this.DiemColumns = whConfig.Diem.Columns.split(/,/)
        this.SinhVienIdDiem = this.DiemColumns[1]
        this.MonHocDiem = this.DiemColumns[2]
        this.DiemAlias = ['Id', 'SinhVienId', 'CodeMonHoc', 
        'MonHoc', 'GiuaKy', 'ChuyenCan', 'CuoiKy', 'TongKet', 'Note']

        this.MonHoc = whConfig.MonHoc.TableName
        this.MonHocColumns = whConfig.MonHoc.Columns.split(/,/)
        this.IdMonHoc = this.MonHocColumns[0]
        this.MaMonHoc = this.MonHocColumns[1]
        this.TenMonHoc = this.MonHocColumns[2]

        this.searchType = ['name', 'phone', 'email', 'student_code']
        this.nameRowAmountQuery = ''
        this.phoneRowAmountQuery = ''
        this.emailRowAmountQuery = ''
        this.studentCodeRowAmountQuery = ''

        this.getDetailByName('init')
        this.getDetailByPhone('init')
        this.getDetailByEmail('init')
        this.getDetailByStudentCode('init')
    }

    getQualifiedName(name) {
        return '%' + ((name.split(/ +/).length > 1) ? name : ` ${name}`)
    }

    getDetailByName(name, limit = 50, offset = 0) {
        const goodName = this.getQualifiedName(name)
        const query = `SELECT ${this.ContactsColumns} FROM ${this.Contacts} WHERE 
        ${this.ContactsName} LIKE ? LIMIT ? OFFSET ?`
        this.nameRowAmountQuery = 
        `SELECT COUNT(1) FROM ${this.Contacts} WHERE ${this.ContactsName} LIKE ?`
        return wh.pool.query(query, [goodName , limit, offset])
            .then(rows => {
                return this.aliasColumn(rows, this.ContactsColumnsAlias)
            }).catch(err => {
                console.error(err)
                return err
            })
    }

    getQualifiedStudentCode(code) {
        return `${code}%`
    }

    getDetailByStudentCode(code, limit = 50, offset = 0) {
        const goodCode = this.getQualifiedStudentCode(code)
        const query = `SELECT ${this.ContactsColumns} FROM ${this.Contacts} WHERE 
        ${this.ContactCode} LIKE ? LIMIT ? OFFSET ?`
        this.studentCodeRowAmountQuery = 
        `SELECT COUNT(1) FROM ${this.Contacts} WHERE ${this.ContactCode} LIKE ?`

        return wh.pool.query(query, [goodCode, limit, offset])
            .then(rows => {
                return this.aliasColumn(rows, this.ContactsColumnsAlias)
            }).catch(err => {
                console.error(err)
                return err
            })
    }

    getQualifiedPhone(phone) {
        const goodPhone = phone.replace(/(^\+[0-9]{3}|^0)/, '')
        return `%${goodPhone}`
    }

    getDetailByPhone(phone, limit = 50, offset = 0) {
        const goodPhone = this.getQualifiedPhone(phone)
        const query = `SELECT ${this.ContactsColumns} FROM ${this.Contacts} WHERE 
        ${this.ContactPhone} LIKE ? LIMIT ? OFFSET ?`

        this.phoneRowAmountQuery = 
        `SELECT COUNT(1) FROM ${this.Contacts} WHERE ${this.ContactPhone} LIKE ?`

        return wh.pool.query(query, [goodPhone, limit, offset])
        .then(rows => {
            return this.aliasColumn(rows, this.ContactsColumnsAlias)
        }).catch(err => {
            console.error(err)
            return err
        })    
    }

    getQualifiedEmail(email) {
        const goodEmail = email.replace(/@.*/, '')
        return `${goodEmail}%`
    }

    getDetailByEmail(email, limit = 50, offset = 0) {
        const goodEmail = this.getQualifiedEmail(email)
        const query = `SELECT ${this.ContactsColumns} FROM ${this.Contacts} WHERE 
        ${this.ContactEmail} LIKE ? LIMIT ? OFFSET ?`

        this.emailRowAmountQuery = 
        `SELECT COUNT(1) FROM ${this.Contacts} WHERE ${this.ContactEmail} LIKE ?`

        return wh.pool.query(query, [goodEmail, limit, offset])
        .then(rows => {
            return this.aliasColumn(rows, this.ContactsColumnsAlias)
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    getAmount(type, key) {
        const query = (() => {
            switch(type) {
                case this.searchType[0]: {
                    const searchKey = this.getQualifiedName(key)
                    return {
                        query: this.nameRowAmountQuery,
                        searchKey
                    }
                }
                case this.searchType[1]: {
                    const searchKey = this.getQualifiedPhone(key)
                    return {
                        query: this.phoneRowAmountQuery,
                        searchKey
                    }
                }
                case this.searchType[2]: {
                    const searchKey = this.getQualifiedEmail(key)
                    return {
                        query: this.emailRowAmountQuery,
                        searchKey
                    }
                }
                case this.searchType[3]: {
                    const searchKey = this.getQualifiedStudentCode(key)
                    return {
                        query: this.studentCodeRowAmountQuery,
                        searchKey
                    }
                }
                default: {
                    const searchKey = this.getQualifiedStudentCode(key)
                    return {
                        query: this.nameRowAmountQuery,
                        searchKey
                    }
                }
            }
        })() // END OF QUERY
        return wh.pool.query(query.query, query.searchKey)
        .then(rows => {
            return rows[0][0]
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    getDetailById(id) {
        const query = `SELECT ${this.ContactsColumns} FROM ${this.Contacts} WHERE 
        ${this.ContactsId} = ?`

        return wh.pool.query(query, id)
        .then(rows => {
            return this.aliasColumn(rows, this.ContactsColumnsAlias)
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    getCrmInfo(id) {
        const query = 
        `
        SELECT ${this.FactsCrmColumns.map(col => {
            switch(col) {
                case this.NguonFactCrm : {
                    return `${this.NguonContact}.${this.TenNguonContact}`
                    break
                }
                case this.GenderFactCrm : {
                    return `${this.GioiTinh}.${this.MoTaGioiTinh}`
                    break
                }
                case this.NganhCrm : {
                    return `${this.NganhDaoTao}.${this.TenNganhDaoTao}`
                    break
                }
                default : {
                    return `${this.FactsCrm}.${col}`
                }
            }
        })} 
        FROM (SELECT * FROM ${this.FactsCrm} WHERE ${this.IdFactCrm} = ?) 
        AS ${this.FactsCrm}
        INNER JOIN ${this.GioiTinh} 
        ON ${this.FactsCrm}.${this.GenderFactCrm} = ${this.GioiTinh}.${this.IdGioiTinh}
        INNER JOIN ${this.NguonContact} 
        ON ${this.FactsCrm}.${this.NguonFactCrm} = ${this.NguonContact}.${this.IdNguonContact}
        INNER JOIN ${this.NganhDaoTao}
        ON ${this.FactsCrm}.${this.NganhCrm} = ${this.NganhDaoTao}.${this.IdNganhDaoTao}
        `
        return wh.pool.query(query, id)
        .then(rows => {
            return this.aliasColumn(rows, this.FactsCrmColumnsAlias)
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    getStudentInfo(id) {
        const query = 
        `
        SELECT ${this.FactSinhVienColumns.map(col => {
            switch(col) {
                case this.CourseFactSinhVien: {
                    return `${this.KhoaDaoTao}.${this.MaKhoaHocKhoaDaoTao}`
                    break
                }
                case this.ClassFactSinhVien : {
                    return `${this.LopQuanLy}.${this.MaLopQuanLy}`
                    break
                }
                case this.GenderFactSinhVien : {
                    return `${this.GioiTinh}.${this.MoTaGioiTinh}`
                    break
                }
                case this.TrangThaiHSFactSinhVien : {
                    return `${this.TrangThaiHS}.${this.TenTrangThaiHS}`
                    break
                }
                default: {
                    return `${this.FactSinhVien}.${col}`
                }
            }
        })}
        FROM (SELECT * FROM ${this.FactSinhVien} WHERE ${this.IdFactSinhVien} = ?) 
        AS ${this.FactSinhVien}
        INNER JOIN ${this.GioiTinh} 
        ON ${this.FactSinhVien}.${this.GenderFactSinhVien} 
        = ${this.GioiTinh}.${this.IdGioiTinh}
        INNER JOIN ${this.KhoaDaoTao} 
        ON ${this.FactSinhVien}.${this.CourseFactSinhVien} 
        = ${this.KhoaDaoTao}.${this.IdKhoaDaoTao}
        INNER JOIN ${this.LopQuanLy} 
        ON ${this.FactSinhVien}.${this.ClassFactSinhVien} 
        = ${this.LopQuanLy}.${this.IdLopQuanLy}
        INNER JOIN ${this.TrangThaiHS}
        ON ${this.FactSinhVien}.${this.TrangThaiHSFactSinhVien} 
        = ${this.TrangThaiHS}.${this.IdTrangThaiHS}
        `
        return wh.pool.query(query, id)
        .then(rows => {
            return this.aliasColumn(rows, this.FactSinhVienColumnsAlias)
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    getTrangThaiHistory(id) {
        const colOldSelected = this.FactTrangThaiColumns.map(col => {
            switch(col) {
                case this.TTMoiFactTrangThai : {
                    return `${this.TTMoiFactTrangThai}.${this.TTMoiFactTrangThai},` +
                            `${this.TTMoiFactTrangThai}.${this.TTMoiAlias}`
                }
                case this.TTCuFactTrangThai : {
                    return `${this.TTCuFactTrangThai}.${this.TTCuFactTrangThai},` +
                            `${this.TTCuFactTrangThai}.${this.TTCuAlias}`
                }
                default : {
                    return `${this.TTCuFactTrangThai}.${col}`
                }
            }
        })
        const colFact = (colName) => {
                const MA_TRANG_THAI = (colName === this.TTCuFactTrangThai) ? this.TTCuAlias : this.TTMoiAlias 
                return this.FactTrangThaiColumns.map(col => {
                switch(col) {
                    case (colName) : {
                        return `${this.TrangThai}.${this.TenTrangThai} AS ${colName}, ` +
                                `${this.FactTrangThai}.${col} AS ${MA_TRANG_THAI}`
                    }
                    default: {
                        return `${this.FactTrangThai}.${col} AS ${col}`
                    }
                }
            })
        }
        const query = `
        SELECT ${colOldSelected} FROM 
        (
            (
                SELECT ${colFact(this.TTCuFactTrangThai)} FROM
                (SELECT * FROM ${this.FactTrangThai} WHERE ${this.ContactIdFactTrangThai} = ?)
                AS ${this.FactTrangThai}
                LEFT JOIN ${this.TrangThai} ON ${this.FactTrangThai}.${this.TTCuFactTrangThai} = 
                ${this.TrangThai}.${this.IdTrangThai}
            ) 
            AS ${this.TTCuFactTrangThai}
            INNER JOIN
            (
                SELECT ${colFact(this.TTMoiFactTrangThai)} FROM
                (SELECT * FROM ${this.FactTrangThai} WHERE ${this.ContactIdFactTrangThai} = ?)
                AS ${this.FactTrangThai}
                LEFT JOIN ${this.TrangThai} ON ${this.FactTrangThai}.${this.TTMoiFactTrangThai} 
                = ${this.TrangThai}.${this.IdTrangThai}
            )
            AS ${this.TTMoiFactTrangThai}
            ON ${this.TTCuFactTrangThai}.${this.IdFactTrangThai} = 
            ${this.TTMoiFactTrangThai}.${this.IdFactTrangThai}
        ) 
        ORDER BY ${this.TGDoiFactTrangThai} DESC
        `
        return wh.pool.query(query, [id, id])
        .then(rows => {
            return this.aliasColumn(rows, this.FactTrangThaiColumnsAlias)
        }).catch(err => {
            console.error(err)
            return err
        })
    }
    
    getFee(id) {
        const factCol = this.DoanhThuColumns.map(col => {
            switch(col) {
                case this.SinhVienIdDoanhThu:
                    return `${this.DoanhThu}.${this.SinhVienIdDoanhThu} AS ${this.FactDoanhThuAlias[0]}`
                case this.TienDoanhThu:
                    return `${this.DoanhThu}.${this.TienDoanhThu} AS ${this.FactDoanhThuAlias[2]}`
                case this.DonViDoanhThu:
                    return `${this.DoanhThu}.${this.DonViDoanhThu} AS ${this.FactDoanhThuAlias[1]}`
                default:
                    return '_'
            }
        }).toString().replace(/(_,|_)+/g, '').replace(/,$/, '')

        const loaiThuCol = this.LoaiThuColumns.map(col => {
            switch(col) {
                case this.TenLoaiThu:
                    return `${this.LoaiThu}.${this.TenLoaiThu} AS ${this.FactDoanhThuAlias[3]}`
                default:
                    return '_'
            }
        }).toString().replace(/(_,|_)+/g, '').replace(/,$/, '')


        const hocKyCol = this.HocKyColumns.map(col => {
            switch(col) {
                case this.IdHocKy:
                    return `${this.HocKy}.${this.TenHocKy} AS ${this.FactDoanhThuAlias[4]}`
                default:
                    return '_'
            }
        }).toString().replace(/(_,|_)+/g, '').replace(/,$/, '')

        const mucDichThuCol = this.MucDichThuColumns.map(col => {
            switch(col) {
                case this.TenMucDichThu:
                    return `${this.MucDichThu}.${this.TenMucDichThu} AS ${this.FactDoanhThuAlias[5]}`
                default:
                    return '_'
            }
        }).toString().replace(/(_,|_)+/g, '').replace(/,$/, '')

        const query = `
        SELECT ${factCol},${loaiThuCol},${hocKyCol},${mucDichThuCol}
        FROM 
            (SELECT * FROM ${this.DoanhThu} WHERE ${this.SinhVienIdDoanhThu} = ?)
            AS ${this.DoanhThu}
            INNER JOIN ${this.HocKy} ON ${this.DoanhThu}.${this.HocKyDoanhThu} = ${this.HocKy}.${this.IdHocKy}
            INNER JOIN (SELECT * FROM ${this.LoaiThu} 
                WHERE ${this.IdLoaiThu} = ${whConfig.LoaiThu.ThucThuId}
                OR ${this.IdLoaiThu} = ${whConfig.LoaiThu.PhaiThuId}
            ) AS ${this.LoaiThu}
            ON ${this.DoanhThu}.${this.LoaiThuDoanhThu} = ${this.LoaiThu}.${this.IdLoaiThu}
            INNER JOIN ${this.MucDichThu} 
            ON ${this.DoanhThu}.${this.MucDichThuDoanhThu} = ${this.MucDichThu}.${this.IdMucDichThu}
        `
        return wh.pool.query(query, id)
        .then(rows => {
            return this.aliasColumn(rows, this.FactDoanhThuAlias)
        }).catch(err => {
            console.error(err)
            return err
        })
    }

    getDiem(id) {
        const diemCol = this.DiemColumns.map(col => {
            switch(col) {
                case this.MonHocDiem:
                    return `${this.MonHoc}.${this.MaMonHoc},${this.MonHoc}.${this.TenMonHoc}`
                default:
                    return `${this.Diem}.${col}` 
            }
        })

        const query = `
            SELECT ${diemCol} FROM
                (SELECT * FROM ${this.Diem} WHERE ${this.SinhVienIdDiem} = ?)
            AS ${this.Diem}
            INNER JOIN ${this.MonHoc} ON ${this.Diem}.${this.MonHocDiem} = ${this.MonHoc}.${this.IdMonHoc}
        `
        return wh.pool.query(query, id)
        .then(rows => {
            // console.log(query)
            return this.aliasColumn(rows, this.DiemAlias)
        }).catch(err => {
            console.error(err)
            return err
        })
    }
    /*
    *@input: array of arrays return from query and arrays of aliases
    * @arrOfArray: e.g: [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    * @arrOfAliases: e.g: ['col1', 'col2', 'col3']
    * @return: array of objects e.g.: 
    * [{'col1': 1, 'col2': 2, 'col3': 3};
    * {'col1': 4, 'col2': 5, 'col3': 6},
    * {'col1': 7, 'col2': 8, 'col3': 9}]
    */
    aliasColumn(arrOfArray, arrOfAliases) {
        return arrOfArray.map(arr => {
            return arr.reduce((obj, val, index) => {
                var temp = obj
                if(Object.keys(temp).length > 0) {
                    temp[arrOfAliases[index]] = val
                } else {
                    temp = {}
                    temp[arrOfAliases[0]] = obj
                    temp[arrOfAliases[1]] = val
                }
                return temp
            })
        })
    }

    checkDbCon() {
        return wh.conn.then((conn) => {
            return conn.query('SHOW TABLES').then((rows) => {
                return rows
            }).catch((err) => {
                return err
            }) 
        }).catch((err) => {
            return err
        })
    }

}