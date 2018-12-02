import React, {Component} from 'react'
// import {searchKeywords, getResult} from '../action/Searching'
import {Container, ListGroup, ListGroupItem, Table, Nav
    , NavLink, NavItem, TabContent, TabPane, Button, Fade} from 'reactstrap'
import {CONTACT_COLUMNS
    , FINISH_GET_CONTACT_DETAIL
    , FINISH_SEARCH
    , FINISH_SEARCH_ID
    , CRM_COLUMNS
    , SCM_COLUMNS
    , TRANG_THAI_COLUMNS
    , DETAIL_TYPE,
    FINISH_GET_STUDENT_DETAIL,
    FINISH_GET_HISTORY_DETAIL
} from '../action/ActionTypes'
import {searchId, getResultById} from '../action/Searching'
import {connect} from 'react-redux'
import {getDetail, getDetailResult} from '../action/GetDetail'
import {FeeInProfile} from './FeeInProfile'
import {DiemInProfile} from './DiemInProfile'
import classnames from 'classnames'
import ReactToPrint from "react-to-print";
import { loginStatus } from '../action/Login';

export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            activeTab: '0',
            copyPart: false
        }
        this.contactColumns = CONTACT_COLUMNS 
        this.crmColumn = CRM_COLUMNS
        this.scmColumn = SCM_COLUMNS
        this.trangThaiColumn = TRANG_THAI_COLUMNS

        this.typeDetail = DETAIL_TYPE

        this.getDetail = this.getDetail.bind(this)
        this.displayDetail = this.displayDetail.bind(this)
        this.displayInfo = this.displayInfo.bind(this)
        this.getResultById = this.getResultById.bind(this)
        this.isDataLoaded= this.isDataLoaded.bind(this)
        this.tableInfo = this.tableInfo.bind(this)
        this.crmTemplate = this.crmTemplate.bind(this)
        this.PrintContent = this.PrintContent.bind(this)
        this.toggleCopyPart = this.toggleCopyPart.bind(this)
        this.getDetail(this.state.id)

    }

    async getResultById(id) {
        if(id !== undefined) {
            this.props.dispatch(searchId(id))
            const result = await getResultById(id)
            return this.props.dispatch(result) 
        } else {
            return 1
        }
    }

    isDataLoaded(id) {
        if(this.props.searchKeyword.action 
            && this.props.searchKeyword.action.type === FINISH_SEARCH) {
            const Id = this.contactColumns[0]
            const info = this.props.searchKeyword.action.payload.filter(val => {
                return parseInt(id, 10) === parseInt(val[Id], 10) 
            })
            if(info.length > 0){
                return info[0]
            } else {
                return false
            }
        } else {
            return false
        }
    }

    normalize(data) {
        if(data) {
            return data
        }
        return 'Chưa rõ'
    }

    tableInfo(result) {
        return (
            <div>
                <h2>{result[this.contactColumns[4]]}</h2>
                <Table>
                    <tbody> 
                        <tr>
                            <th>Sinh viên trường: </th>
                            <td>{this.normalize(result[this.contactColumns[3]])}</td>
                        </tr>
                        <tr>
                            <th> Số điện thoại liên lạc:</th>
                            <td>{this.normalize(result[this.contactColumns[5]])}</td>
                        </tr>
                        <tr>
                            <th> Ngày sinh:</th>
                            <td>{this.normalize(result[this.contactColumns[7]])}</td>
                        </tr>
                        <tr>
                            <th> Email :</th>
                            <td>{this.normalize(result[this.contactColumns[6]])}</td>
                        </tr>
                        <tr>
                            <th> Tỉnh/Thành phố :</th>
                            <td>{this.normalize(result[this.contactColumns[8]])}</td>
                        </tr>
                        <tr>
                            <th> Địa chỉ liên hệ:</th>
                            <td>{this.normalize(result[this.contactColumns[10]])}</td>
                        </tr>
                        <tr>
                            <th> Địa chỉ thường trú:</th>
                            <td>{this.normalize(result[this.contactColumns[9]])}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

    displayInfo() {
        const info = this.isDataLoaded(this.state.id)
        if(info) {
            return this.tableInfo(info)
        } else if (this.props.searchId.action) {
            const res = (this.props.searchId.action.type === FINISH_SEARCH_ID) 
            ? this.props.searchId.action.payload : {}
            if(res.length > 0) {
                const result = res[0]
                return this.tableInfo(result)
            } else {
                return (
                    <div>
                        <h2>There is no profile. Please try again</h2>
                    </div>
                )
            }
        } else {
            this.getResultById(this.state.id)
            return (
                <div>
                    LOADING...
                </div>
            )
        }
    }

    crmTemplate() {
        const info = this.props.getContactDetail
        if(info.action && info.action.type === FINISH_GET_CONTACT_DETAIL
            && info.action.payload) {
            if(info.action.payload.length > 0) {
            const res = info.action.payload[0]
                return (
                    <div>
                        <Table>
                            <tbody>
                                <tr>
                                    <th> Gộp tuyển sinh: </th>
                                    <td>{this.normalize(res[this.crmColumn[3]])}</td>
                                </tr>
                                <tr>
                                    <th> Nguồn tuyển sinh: </th>
                                    <td>{this.normalize(res[this.crmColumn[4]])}</td>
                                </tr>
                                <tr>
                                    <th> Tư vấn tuyển sinh: </th>
                                    <td>{this.normalize(res[this.crmColumn[5]])}</td>
                                </tr>
                                <tr>
                                    <th> Địa điểm: </th>
                                    <td>{this.normalize(res[this.crmColumn[1]])}</td>
                                </tr>
                                <tr>
                                    <th>Ngành đăng ký: </th>
                                    <td>{this.normalize(res[this.crmColumn[2]])}</td>
                                </tr>
                                <tr>
                                    <th> Trình độ học vấn: </th>
                                    <td>{this.normalize(res[this.crmColumn[6]])}</td>
                                </tr>
                                <tr>
                                    <th> Giới tính: </th>
                                    <td>{this.normalize(res[this.crmColumn[7]])}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                )
            } else {
                return (
                    <h3> Chưa cập nhật. </h3>
                )
            }
        } else {
            return (
                <h2>Chưa có thông tin</h2>
            )
        }
    } // END OF crmTemplate

    scmTemplate() {
        const info = this.props.getStudentDetail
        if(info.action && info.action.type === FINISH_GET_STUDENT_DETAIL
            && info.action.payload) {
            if(info.action.payload.length > 0) {
            const res = info.action.payload[0]
                return (
                    <div>
                        <Table>
                            <tbody>
                                <tr>
                                    <th> Đơn vị đào tạo: </th>
                                    <td>{this.normalize(res[this.scmColumn[1]])}</td>
                                </tr>
                                <tr>
                                    <th> Ngành đào tạo: </th>
                                    <td>{this.normalize(res[this.scmColumn[4]])}</td>
                                </tr>
                                <tr>
                                    <th> Lớp quản lý: </th>
                                    <td>{this.normalize(res[this.scmColumn[5]])}</td>
                                </tr>
                                <tr>
                                    <th> Trạng thái hồ sơ: </th>
                                    <td>{this.normalize(res[this.scmColumn[7]])}</td>
                                </tr>
                                <tr>
                                    <th> Gộp tuyển sinh: </th>
                                    <td>{this.normalize(res[this.scmColumn[5]])}</td>
                                </tr>
                                <tr>
                                    <th> Địa điểm đào tạo: </th>
                                    <td>{this.normalize(res[this.scmColumn[2]])}</td>
                                </tr>
                                <tr>
                                    <th>Khóa đào tạo: </th>
                                    <td>{this.normalize(res[this.scmColumn[3]])}</td>
                                </tr>
                                <tr>
                                    <th> Trình độ đầu vào: </th>
                                    <td>{this.normalize(res[this.scmColumn[8]])}</td>
                                </tr>
                                <tr>
                                    <th> Giới tính: </th>
                                    <td>{this.normalize(res[this.scmColumn[9]])}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                )
            } else {
                return (
                    <h3> Chưa cập nhật. </h3>
                )
            }
        } else {
            return (
                <h2>Chưa có thông tin</h2>
            )
        }
    } // END OF scmTemplate

    string2Date(dateStr) {
        const year = dateStr.slice(0, 4)
        const month = dateStr.slice(4, 6)
        const day = dateStr.slice(6)
        return `Ngày ${day} tháng ${month} năm ${year}`
    }

    statusTemplate() {
        const info = this.props.getStatusDetail
        if(info.action && info.action.type === FINISH_GET_HISTORY_DETAIL
            && info.action.payload) {
            if(info.action.payload.length > 0) {
            const res = info.action.payload
                return (
                    <div>
                        <ListGroup>
                            {res
                                .map((col, index) => {
                                return (
                                    <ListGroupItem key={index}>
                                        <b>{`${this.string2Date(col[this.trangThaiColumn[2]])}:`}</b>
                                        {` chuyển từ  trạng thái `} 
                                        <b>{`${this.normalize(col[this.trangThaiColumn[4]])}`}</b>
                                        {` sang `}
                                        <b>{`${this.normalize(col[this.trangThaiColumn[6]])}`}</b>
                                    </ListGroupItem>
                                )
                            })}
                        </ListGroup>
                    </div>
                )
            } else {
                return (
                    <h3> Chưa cập nhật. </h3>
                )
            }
        } else {
            return (
                <h2>Chưa có thông tin</h2>
            )
        }
    } // END OF statusTemplate

    displayDetail() {
        return (
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '0'})}
                        onClick={() => this.setState({activeTab: '0'})}>
                            CRM
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '1'})}
                        onClick={() => this.setState({activeTab: '1'})}>
                            SCM
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '2'})}
                        onClick={() => this.setState({activeTab: '2'})}>
                            Lịch sử chuyển trạng thái
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '3'})}
                        onClick={() => this.setState({activeTab: '3'})}>
                            Học phí
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({active: this.state.activeTab === '4'})}
                        onClick={() => this.setState({activeTab: '4'})}>
                            Điểm
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="0">
                        {this.crmTemplate()}
                    </TabPane>
                    <TabPane tabId="1">
                        {this.scmTemplate()}
                    </TabPane>
                    <TabPane tabId="2">
                        {this.statusTemplate()}
                    </TabPane>
                    <TabPane tabId="3">
                        <FeeInProfile {...this.props.getFee}></FeeInProfile>
                    </TabPane>
                    <TabPane tabId="4">
                        <DiemInProfile {...this.props.getDiem}></DiemInProfile>
                    </TabPane>
                </TabContent>
            </div>
        )
    }

    async getDetail(id) {
        if(id !== undefined) {
            this.typeDetail.forEach(async type => {
                this.props.dispatch(getDetail(id, type))
                const res = await getDetailResult(id, type)
                this.props.dispatch(res)
            })
            return 0            
        }
        return 1
    }

    toggleCopyPart() {
        this.setState({
            copyPart: !this.state.copyPart
        })
    }

    PrintContent = () => {
        return (
            <Container>
                <p>BASIC INFO: </p>
                {this.displayInfo()}
                <p>CRM: </p>
                {this.crmTemplate()}
                <p>SCM: </p>
                {this.scmTemplate()}
                <p>HISTORY: </p>
                {this.statusTemplate()}
                <p>FEE: </p>
                <FeeInProfile {...this.props.getFee}></FeeInProfile>
                <p>RANK: </p>
                <DiemInProfile {...this.props.getDiem}></DiemInProfile>
            </Container>
        )
    }

    async componentDidMount() {
        const isLogin = await loginStatus()
        this.props.dispatch(isLogin)
    }

    render() {
        const printStyle = {
            display: this.state.copyPart ? 'none' : 'block'
        }
        if (this.props.googleLogin.action 
            && this.props.googleLogin.action.payload) {
            return (
                <div>
                    <Container style={printStyle}>
                        {this.displayInfo()}
                        {this.displayDetail()}
                    </Container>
                    <div>
                        <Button color="secondary" onClick={this.toggleCopyPart} className="d-print-none">
                            {this.state.copyPart ? 'Close copy part' : 'Show copy part'}
                        </Button>
                        <ReactToPrint
                        trigger={() => <Button color="primary">Print</Button>}
                        content={() => this.componentRef}
                        />
                        <Fade in={this.state.copyPart} className="mt-3">
                            <div>
                                <div ref={el => (this.componentRef = el)}>
                                    {this.PrintContent()}
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            )
        } else {
            return (
                <a href="/login">
                    <h2>You have to login first.</h2>
                </a>
            )
        }
    }
}

function select(store) {
    return {
        googleLogin: store.googleLogin,
        searchKeyword: store.searchKeyword,
        searchId: store.searchId,
        getFee: store.getFee,
        getDiem: store.getDiem,
        getContactDetail: store.getContactDetail,
        getStudentDetail: store.getStudentDetail,
        getStatusDetail: store.getStatusDetail
    }
}
export default connect(select)(Profile)