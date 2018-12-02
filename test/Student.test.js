'use strict'
const chai = require('chai')
const expect = chai.expect
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const Student = require('../src/common/Student.js')
const db = require('../src/common/WareHouse.js')
const config = require('../src/config/Configuration.js')

describe('Check Student properties and methods', function() {
    describe('Check for Dim and Temp table', function(){

        describe('Check config DimContact', function() {
            it('Check config for contact exist', function() {
                expect(config.ContactDetailInWH.TableName).to.be.a('string')
                expect(config.ContactDetailInWH.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.ContactDetailInWH.TableName).to.equal
                    (process.env.DB_ContactDetailInWH)
                    expect(config.ContactDetailInWH.Columns).to.equal
                    (process.env.DB_ContactDetailColumnsInWH)
                })
            }
        })

        describe('Check config GioiTinh', function() {
            it('Check config for contact exist', function() {
                expect(config.GioiTinh.TableName).to.be.a('string')
                expect(config.GioiTinh.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.GioiTinh.TableName).to.equal
                    (process.env.DB_GioiTinhInWH)
                    expect(config.GioiTinh.Columns).to.equal
                    (process.env.DB_GioiTinhColumnsInWH)
                })
            }
        })

        describe('Check config KhoaDaoTao', function() {
            it('Check config for contact exist', function() {
                expect(config.KhoaDaoTao.TableName).to.be.a('string')
                expect(config.KhoaDaoTao.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.KhoaDaoTao.TableName).to.equal
                    (process.env.DB_KhoaDaoTaoInWH)
                    expect(config.KhoaDaoTao.Columns).to.equal
                    (process.env.DB_KhoaDaoTaoColumnsInWH)
                })
            }
        })

        describe('Check config LopQuanLy', function() {
            it('Check config for contact exist', function() {
                expect(config.LopQuanLy.TableName).to.be.a('string')
                expect(config.LopQuanLy.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.LopQuanLy.TableName).to.equal
                    (process.env.DB_LopQuanLyInWH)
                    expect(config.LopQuanLy.Columns).to.equal
                    (process.env.DB_LopQuanLyColumnsInWH)
                })
            }
        })

        describe('Check config TrangThaiHS', function() {
            it('Check config for contact exist', function() {
                expect(config.TrangThaiHS.TableName).to.be.a('string')
                expect(config.TrangThaiHS.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.TrangThaiHS.TableName).to.equal
                    (process.env.DB_TrangThaiHSInWH)
                    expect(config.TrangThaiHS.Columns).to.equal
                    (process.env.DB_TrangThaiHSColumnsInWH)
                })
            }
        })

        describe('Check config NguonContact', function() {
            it('Check config for contact exist', function() {
                expect(config.NguonContact.TableName).to.be.a('string')
                expect(config.NguonContact.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.NguonContact.TableName).to.equal
                    (process.env.DB_NguonContactInWH)
                    expect(config.NguonContact.Columns).to.equal
                    (process.env.DB_NguonContactColumnsInWH)
                })
            }
        })

        describe('Check config TrangThai', function() {
            it('Check config for contact exist', function() {
                expect(config.TrangThai.TableName).to.be.a('string')
                expect(config.TrangThai.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.TrangThai.TableName).to.equal
                    (process.env.DB_TrangThaiInWH)
                    expect(config.TrangThai.Columns).to.equal
                    (process.env.DB_TrangThaiColumnsInWH)
                })
            }
        })

        describe('Check config Nganh Dao Tao', function() {
            it('Check config for contact exist', function() {
                expect(config.NganhDaoTao.TableName).to.be.a('string')
                expect(config.NganhDaoTao.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.NganhDaoTao.TableName).to.equal
                    (process.env.DB_NganhDaoTaoInWH)
                    expect(config.NganhDaoTao.Columns).to.equal
                    (process.env.DB_NganhDaoTaoColumnsInWH)
                })
            }
        })

        describe('Check config Doanh Thu', function() {
            it('Check config for doanh thu exist', function() {
                expect(config.DoanhThu.TableName).to.be.a('string')
                expect(config.DoanhThu.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.DoanhThu.TableName).to.equal
                    (process.env.DB_FactDoanhThuInWH)
                    expect(config.DoanhThu.Columns).to.equal
                    (process.env.DB_FactDoanhThuColumnsInWH)
                })
            }
        })

        describe('Check config loai thu', function() {
            it('Check config for loai thu exist', function() {
                expect(config.LoaiThu.TableName).to.be.a('string')
                expect(config.LoaiThu.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.LoaiThu.TableName).to.equal
                    (process.env.DB_DimLoaiThuInWH)
                    expect(config.LoaiThu.Columns).to.equal
                    (process.env.DB_DimLoaiThuColumnsInWH)
                })
            }
        })

        describe('Check config hoc ky', function() {
            it('Check config for hoc ky exist', function() {
                expect(config.HocKy.TableName).to.be.a('string')
                expect(config.HocKy.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.HocKy.TableName).to.equal
                    (process.env.DB_DimPeriodInWH)
                    expect(config.HocKy.Columns).to.equal
                    (process.env.DB_DimPeriodColumnsInWH)
                })
            }
        })

        describe('Check config muc dich thu', function() {
            it('Check config for muc dich thu exist', function() {
                expect(config.MucDichThu.TableName).to.be.a('string')
                expect(config.MucDichThu.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.MucDichThu.TableName).to.equal
                    (process.env.DB_DimMucDichThuInWH)
                    expect(config.MucDichThu.Columns).to.equal
                    (process.env.DB_DimMucDichThuColumnsInWH)
                })
            }
        })

        describe('Check config diem', function() {
            it('Check config for diem exist', function() {
                expect(config.Diem.TableName).to.be.a('string')
                expect(config.Diem.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.Diem.TableName).to.equal
                    (process.env.DB_DiemInWH)
                    expect(config.Diem.Columns).to.equal
                    (process.env.DB_DiemColumnsInWH)
                })
            }
        })

        describe('Check config mon hoc', function() {
            it('Check config for diem exist', function() {
                expect(config.MonHoc.TableName).to.be.a('string')
                expect(config.MonHoc.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare config with Environment variable', function() {
                    expect(config.MonHoc.TableName).to.equal
                    (process.env.DB_MonHocInWH)
                    expect(config.MonHoc.Columns).to.equal
                    (process.env.DB_MonHocColumnsInWH)
                })
            }
        })
    }) // END OF CHECK CONFIG FOR TEMP AND DIM

    describe('Check Student class to return correct information', function() {
        const student = new Student()
        const ContactsColumnsAlias = student.ContactsColumnsAlias
        const FactsColumnsAlias = student.FactsCrmColumnsAlias
        const FactsSinhVienAlias = student.FactSinhVienColumnsAlias
        const FactTrangThaiColumnsAlias = student.FactTrangThaiColumnsAlias
        const FactDoanhThuAlias = student.FactDoanhThuAlias
        const DiemAlias = student.DiemAlias
        it('Check columns of table', function() {   
          expect(student.Contacts).to.be.a('string')
          expect(student.ContactsColumns[0]).to.equal
          (process.env.DB_ContactDetailColumnsInWH.split(/,/)[0])  
        })
        describe('Check columnAlias functionality', function(){
            const arrOfArr = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
            const keys = ['col1', 'col2', 'col3']
            const result = student.aliasColumn(arrOfArr, keys)
            it('Make sure columnAlias return an array of Object with given keys', function(){
               expect(result).to.have.lengthOf(3)
               return result.map(obj => {
                    expect(obj).to.have.property('col1')
                    expect(obj).to.have.property('col2')
                    expect(obj).to.have.property('col3')
                    Object.keys(obj).map(key => {
                        expect(obj[key]).to.be.a('number')
                    })
               }) 
            })
        })
        describe('Get Detail By Name', function() {
            const Ten = 4            
            it('Check getDetailByName return array of array', async function() {
                const info = await student.getDetailByName('Phạm Đăng An') 
                expect(info.length).to.be.above(0)
                info.forEach(element => {
                    expect(element[ContactsColumnsAlias[Ten]]).to.equal('Phạm Đăng An')
                });
            })
        })
        describe('Get Detail By Phone', function() {
            const ColIndexPhone = 5
            it('Check getDetailByPhone return array of array', async function() {
                const info = await student.getDetailByPhone('987945268')
                expect(info[0][ContactsColumnsAlias[ColIndexPhone]]).to.equal('987945268')
            })
        })
        describe('Get Detail By Email', function() {
            const ColIndexMail = 6
            it('Check getDetailByEmail return an array of array', async function() {
                const info = await student.getDetailByEmail('phamdangan@gmail.com')
                expect(info[0][ContactsColumnsAlias[ColIndexMail]]).to.equal('phamdangan@gmail.com')
            })
        })
        describe('Get Detail By Id', function() {
            const Id = 0            
            it('Check getDetailId return array of array', async function() {
                const info = await student.getDetailById(1) 
                expect(info.length).to.equal(1)
                expect(info[0][ContactsColumnsAlias[Id]]).to.equal(1)
            })
        })
        describe('Get Detail By ma sinh vien', function() {
            const MaSinhVien = 'huehtm9419'            
            const CodeIndex = 11
            it('Check get ma sinh vien return array of array', async function() {
                const info = await student.getDetailByStudentCode(MaSinhVien)
                expect(info.length).to.be.above(0)
                expect(info[0][ContactsColumnsAlias[CodeIndex]]).to.include(MaSinhVien)
            })
        })
        describe('Check properties of CRM Facts and Student class', function(){
            it('Check CRM Facts properties with environment var', function() {
                    expect(config.FactsCRM.TableName).to.be.a('string')
                    expect(config.FactsCRM.Columns).to.be.a('string')
                if(config.IsProduction) {
                    expect(config.FactsCRM.TableName).to.equal(process.env.DB_CRMFactsInWH)
                    expect(config.FactsCRM.Columns).to.equal(process.env.DB_CRMFactsColumnsInWH)
                }
            })
            describe('Check Student class return correct data with specified input', function(){
                const IdIndexCol = 0
                const DiaDiemIndexCol = 1
                const NganhIndexCol = 2
                const GopIndexCol = 3
                const NguonIndexCol = 4
                const TVTSIndexCol = 5
                const TrinhDoIndexCol = 6
                const GenderIndexCol = 7

                it('Check columns of table', function() {   
                    expect(student.FactsCrm).to.be.a('string')
                    expect(student.FactsCrmColumns[0]).to.equal
                    (process.env.DB_CRMFactsColumnsInWH.split(/,/)[0])  
                })
                it('With specified student id, return all information in 1 row', async function(){
                    const crmInfo = await student.getCrmInfo(1)
                    expect(crmInfo.length).to.be.above(0)
                    expect(crmInfo[0][FactsColumnsAlias[IdIndexCol]]).to.deep.equal(1)
                    expect(crmInfo[0][FactsColumnsAlias[DiaDiemIndexCol]]).to.match(/[A-Z]+/)
                    expect(crmInfo[0][FactsColumnsAlias[NganhIndexCol]]).to.match(/[A-Z]+/)
                    expect(crmInfo[0][FactsColumnsAlias[GopIndexCol]]).to.match(/([0-9]+|null)/)
                    expect(crmInfo[0][FactsColumnsAlias[NguonIndexCol]]).to.match(/[A-Z]+/)
                    expect(crmInfo[0][FactsColumnsAlias[TVTSIndexCol]]).to.match(/[a-z0-9]+/)
                    expect(crmInfo[0][FactsColumnsAlias[TrinhDoIndexCol]]).to.match(/[A-Z]+/)
                    expect(crmInfo[0][FactsColumnsAlias[GenderIndexCol]]).to.match(/(Nam|Nữ|Chưa rõ)/)
                })
            })
        })

        describe('Check properties of FactTrangThai and Student class', function(){
            it('Check config for contact exist', function() {
                expect(config.FactTrangThai.TableName).to.be.a('string')
                expect(config.FactTrangThai.Columns).to.be.a('string')
            })
            if(config.IsProduction) {
                it('Compare FactTrangThaiconfig with Environment variable', function() {
                    expect(config.FactTrangThai.TableName).to.equal
                    (process.env.DB_FactTrangThaiInWH)
                    expect(config.FactTrangThai.Columns).to.equal
                    (process.env.DB_FactTrangThaiColumnsInWH)
                })
            }

            describe('Student return correct infor about TrangThai with given id', function(){
                const IdIndex = 0
                const ContactIdIndex = 1
                const ThoiGianDoi = 2
                const TTCu = 3
                const TTMoi = 5
                const TTCuCode = 4
                const TTMoiCode = 6
                it('Check getTrangThaiHistory return all info about contacts', async function(){
                    const status = await student.getTrangThaiHistory(1)
                    expect(status.length).to.be.above(0)
                    expect(status[0][FactTrangThaiColumnsAlias[IdIndex]]).to.match(/[0-9]+/)
                    expect(status[0][FactTrangThaiColumnsAlias[ContactIdIndex]]).to.match(/[0-9]+/)
                    expect(status[0][FactTrangThaiColumnsAlias[ThoiGianDoi]]).to.match(/[0-9]+/)
                    expect(status[0][FactTrangThaiColumnsAlias[TTCu]]).to.match(/\w/)
                    expect(status[0][FactTrangThaiColumnsAlias[TTMoi]]).to.match(/\w/)
                    expect(status[0][FactTrangThaiColumnsAlias[TTCuCode]]).to.match(/([A-Z][0-9]+|null)/)
                    expect(status[0][FactTrangThaiColumnsAlias[TTMoiCode]]).to.match(/[A-Z][0-9]+/)
                })
            })
        })

        describe('Check properties of FactSinhVien and Student class', function(){
            it('Check Authorization account and email', function(){
                it('Check config for contact exist', function() {
                    expect(config.LoginUser.AuthorizedAccount).to.be.a('array')
                    expect(config.LoginUser.AuthorizedEmail).to.be.a('string')
                })
                if(config.IsProduction) {
                    it('Compare Authorization with Environment variable', function() {
                        expect(config.LoginUser.AuthorizedAccount).to.be.an
                        ('array')
                        expect(config.LoginUser.AuthorizedEmail).to.equal
                        (process.env.AuthorizedEmail)
                    })
                }
            })
            it('Check properties of FactSinhVien compare to environment var', function(){
                it('Check config for contact exist', function() {
                    expect(config.FactSinhVien.TableName).to.be.a('string')
                    expect(config.FactSinhVien.Columns).to.be.a('string')
                })
                if(config.IsProduction) {
                    it('Compare FactTrangThaiconfig with Environment variable', function() {
                        expect(config.FactSinhVien.TableName).to.equal
                        (process.env.DB_FactSinhVienInWH)
                        expect(config.FactSinhVien.Columns).to.equal
                        (process.env.DB_FactSinhVienColumnsInWH)
                    })
                }
            })
            describe('Check getStudentInfo return all info with given Student Id', function(){
                const IdIndex = 0
                const SchoolIndex = 1
                const LocationIndex = 2
                const CourseIndex = 3
                const MajorIndex = 4
                const ClassIndex = 5
                const GopIndex = 6
                const TrangThaiHSIndex = 7
                const EduIndex = 8
                const GenderIndex = 9

                it('Check getStudentInfo return all info with given id', async function() {
                    const info = await student.getStudentInfo('1')
                    expect(info).to.have.lengthOf(1)
                    expect(info[0][FactsSinhVienAlias[IdIndex]]).to.match(/[0-9]+/)
                    expect(info[0][FactsSinhVienAlias[SchoolIndex]]).to.match(/[A-Z]+/)
                    expect(info[0][FactsSinhVienAlias[LocationIndex]]).to.match(/[A-Z]+/)
                    expect(info[0][FactsSinhVienAlias[CourseIndex]]).to.match(/[A-Z0-9]+/)
                    expect(info[0][FactsSinhVienAlias[MajorIndex]]).to.match(/[A-Z_]+/)
                    expect(info[0][FactsSinhVienAlias[ClassIndex]]).to.match(/[A-Z\.0-9]+/)
                    expect(info[0][FactsSinhVienAlias[GopIndex]]).to.match(/([0-9]+|null)/)
                    expect(info[0][FactsSinhVienAlias[TrangThaiHSIndex]]).to.match(/\w+/)
                    expect(info[0][FactsSinhVienAlias[EduIndex]]).to.match(/[A-Z_]+/)
                    expect(info[0][FactsSinhVienAlias[GenderIndex]]).to.match(/[\w]+/)
                })
            }) // END OF getStudentInfo
            describe('Check getFee return all info with given Student Id', function(){
                const StudentId = 0
                const Money = 2
                const Unit = 1
                const Category = 3
                const Period = 4
                const Name = 5

                it('Check getFee return all info with given id', async function() {
                    const info = await student.getFee('460')
                    expect(info.length).to.be.above(0)
                    expect(info[0][FactDoanhThuAlias[StudentId]]).to.match(/[0-9]+/)
                    expect(info[0][FactDoanhThuAlias[Money]]).to.match(/[0-9]+/)
                    expect(info[0][FactDoanhThuAlias[Unit]]).to.match(/[A-Z]+/)
                    expect(info[0][FactDoanhThuAlias[Category]]).to.match(/\w+/)
                    expect(info[0][FactDoanhThuAlias[Period]]).to.match(/[0-9]+/)
                    expect(info[0][FactDoanhThuAlias[Name]]).to.match(/\w+/)
                })
            }) // END OF getFee 
            describe('Check getDiem return all info with given Student Id', function(){
                const Id = 0
                const SinhVienId = 1
                const MaMon = 2
                const TenMon = 3
                const GiuaKy = 4
                const ChuyenCan = 5
                const CuoiKy= 6
                const Note = 7

                it('Check getDiem, return all info with given id', async function() {
                    const info = await student.getDiem(460)
                    expect(info.length).to.be.above(0)
                    expect(info[0][DiemAlias[Id]]).to.match(/[0-9]+/)
                    expect(info[0][DiemAlias[SinhVienId]]).to.match(/[0-9]+/)
                    expect(info[0][DiemAlias[MaMon]]).to.match(/[A-Z]+/)
                    expect(info[0][DiemAlias[TenMon]]).to.match(/\w+/)
                    expect(info[0][DiemAlias[GiuaKy]]).to.match(/([0-9\.]+|null)/)
                    expect(info[0][DiemAlias[ChuyenCan]]).to.match(/([0-9\.]+|null)/)
                    expect(info[0][DiemAlias[CuoiKy]]).to.match(/([0-9\.]+|null)/)
                    expect(info[0][DiemAlias[Note]]).to.match(/\w+/)
                })
            }) // END OF getFee 
            describe('Check get detail return correct number of row basing on givin limit and offset'
            , function () {
                const BOT = 0
                const TOP = 51
                it('Check detailByName return default quantity of row', async function() {
                    const byName = await student.getDetailByName('Hung')
                    expect(byName.length).is.above(BOT)
                    expect(byName.length).is.lessThan(TOP)
                })
                it('Check detailByPhone return default quantity of row', async function() {
                    const byPhone = await student.getDetailByPhone('45678')
                    expect(byPhone.length).is.above(BOT)
                    expect(byPhone.length).is.lessThan(TOP)
                })
                it('Check detailByEmail return default quantity of row', async function() {
                    const byEmail = await student.getDetailByEmail('hung')
                    expect(byEmail.length).is.above(BOT)
                    expect(byEmail.length).is.lessThan(TOP)
                })
                it('Check detailByCode return default quantity of row', async function() {
                    const byCode = await student.getDetailByStudentCode('hung')
                    expect(byCode.length).is.above(BOT)
                    expect(byCode.length).is.lessThan(TOP)
                })
            })
            describe('getAmount return total quantity of row for a certain keyword and search type'
            , function() {
                it('getAmount for getDetailByName', async function(){
                    expect(await student.getAmount('name', 'Hung')).to.be.a('number')
                })
                it('getAmount for getDetailByPhone', async function(){
                    expect(await student.getAmount('phone', '56789')).to.be.a('number')
                })
                it('getAmount for getDetailByStudentCode', async function(){
                    expect(await student.getAmount('student_code', 'hung')).to.be.a('number')
                })
                it('getAmount for getDetailByEmail', async function(){
                    expect(await student.getAmount('email', 'hung')).to.be.a('number')
                })
            })
        })
    })
})