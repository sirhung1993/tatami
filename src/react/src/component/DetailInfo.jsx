import React, {Component} from 'react'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Jumbotron} from 'reactstrap'
import {Table} from 'reactstrap'
import {
         FINISH_GET_CONTACT_DETAIL
        , FINISH_GET_STUDENT_DETAIL
        , FINISH_GET_HISTORY_DETAIL,
        FINISH_SEARCH,
        CRM_COLUMNS,
        SCM_COLUMNS,
        TRANG_THAI_COLUMNS,
        CONTACT_COLUMNS
    } from '../action/ActionTypes'
import { showDetail, notShowDetail } from '../action/GetDetail';
import {connect} from 'react-redux'

class DetailInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
        // Do not display DetailInfo at the beginning
        this.finish = [FINISH_GET_CONTACT_DETAIL, FINISH_GET_STUDENT_DETAIL, FINISH_GET_HISTORY_DETAIL]
        this.toggle = this.toggle.bind(this);
        this.contactColumn = CRM_COLUMNS
        this.studentColumn = SCM_COLUMNS
        this.statusColumn = TRANG_THAI_COLUMNS
        this.infoColumn = CONTACT_COLUMNS
        this.css = {
            width: '100%',
            diplay: this.id !== undefined 
        }
        this.displayContactDetail = this.displayContactDetail.bind(this)
        this.displayStudentDetail = this.displayStudentDetail.bind(this)
        this.displayStatusDetail = this.displayStatusDetail.bind(this)
        this.profileURL = '/profile'
        this.displayInfo= this.displayInfo.bind(this)
        this.checkUpdate= this.checkUpdate.bind(this)
        this.showProfile= this.showProfile.bind(this)
    }
    toggle() {
        this.modal = !this.modal 
        if(this.modal) {
            this.props.dispatch(showDetail())
        } else {
            this.props.dispatch(notShowDetail())
        }
    }

    displayContactDetail = ()=> {
        var detail = this.props.getContactDetail.action ? this.props.getContactDetail.action :{}
        if(detail.type === FINISH_GET_CONTACT_DETAIL && detail.payload) {
            if(this.props.getContactDetail.action.payload.length > 0){
                const data = this.props.getContactDetail.action.payload[0] 
                const columns = this.contactColumn.map((col, index) => {
                    return (
                        <th key={index}>{col}</th>
                    )
                })
                const detail = this.contactColumn.map((col, index) => {
                    return (
                        <td key={index}>{data[col]}</td>
                    )
                })
                return (
                    <div>
                        <h2>CRM</h2>
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    {columns} 
                            </tr>
                            </thead>      
                            <tbody>
                                <tr>
                                    {detail}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ) 
            } else {
                return(
                    <Jumbotron>
                        <h2>CRM: </h2>
                        <h3>No information about this</h3>
                    </Jumbotron>
                )
            }
        } else {
            return (
                <div>LOADING...</div>
            )
        }
    }

    displayStudentDetail = ()=> {
        var detail = this.props.getStudentDetail.action ? this.props.getStudentDetail.action : {}
        if(detail.type === FINISH_GET_STUDENT_DETAIL && detail.payload) {
            if(this.props.getStudentDetail.action.payload.length > 0){
                const data = this.props.getStudentDetail.action.payload[0] 
                const columns = this.studentColumn.map((col, index) => {
                    return (
                        <th key={index}>{col}</th>
                    )
                })
                const detail = this.studentColumn.map((col, index) => {
                    return (
                        <td key={index}>{data[col]}</td>
                    )
                })
                return (
                    <div>
                        <h2>SCM</h2>
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    {columns} 
                            </tr>
                            </thead>      
                            <tbody>
                                <tr>
                                    {detail}
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                ) 
            } else {
                return(
                    <Jumbotron>
                        <h2>SCM: </h2>
                        <h3>No information about this contact.</h3>
                    </Jumbotron>
                )
            }
        } else {
            return (
                <div>LOADING...</div>
            )
        }
    }


    displayStatusDetail = ()=> {
        var detail = this.props.getStatusDetail.action ? this.props.getStatusDetail.action : {}
        if(detail.type === FINISH_GET_HISTORY_DETAIL && detail.payload) {
            if(this.props.getStatusDetail.action.payload.length > 0){
                const data = this.props.getStatusDetail.action.payload
                const columns = this.statusColumn.map((col, index) => {
                    return (
                        <th key={index}>{col}</th>
                    )
                })
                const detail = data.map((row, i) => {
                    return (
                        <tr key={i}>
                            {(() => (this.statusColumn.map((col, index) => {
                                return (
                                    <td key={`col${index}`}> {row[col]} </td>
                                )
                            }))
                            )()}    
                        </tr>
                    )
                })
                return (
                    <div>
                        <h2>Lich Su Trang Thai Sinh Vien</h2>
                        <Table bordered responsive>
                            <thead>
                                <tr>
                                    {columns} 
                            </tr>
                            </thead>      
                            <tbody>
                                    {detail}
                            </tbody>
                        </Table>
                    </div>
                ) 
            } else {
                return(
                    <Jumbotron>
                        <h2>History: </h2>
                        <h3>No information about this</h3>
                    </Jumbotron>
                )
            }
        } else {
            return (
                <div>LOADING...</div>
            )
        }
    }

    displayInfo() {
        if( this.props.searchKeyword.action && this.props.searchKeyword.action.payload 
            && this.props.searchKeyword.action.type === FINISH_SEARCH) {
            const info = ((this.props.searchKeyword.action) ?
            this.props.searchKeyword.action.payload : [])
                .filter((obj) => {
                    return obj[this.infoColumn[0]] === this.id
                })[0]
            if(info) {
                const colName = this.infoColumn.map((col, index) => {
                    return (
                        <th key={index}>{col}</th>
                    )
                })
                const displayInfo = this.infoColumn.map((col, index) => {
                    return (
                        <td key={index}>{info[col]}</td>
                    )
                }) 
                return (
                        <div>
                            <h2>Thong tin co ban</h2>
                            <Table bordered responsive>
                                <thead>
                                    <tr>
                                        {colName}
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        {displayInfo}
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    )
            }
        } else {
            return (
                <div>
                    <h2>Loading...</h2>
                </div>
            )
        }
    }

    showProfile() {
        if(this.id !== undefined) {
            this.props.history.push(`${this.profileURL}/${this.id}`)
        }
    }

    checkUpdate() {
        this.id = (this.props.getContactDetail.action) ? 
        this.props.getContactDetail.action.meta.id : undefined
        this.modal = (this.props.isShowDetail.action) ? this.props.isShowDetail.action.payload : false
    }

    render() {
        this.checkUpdate()
        return (
            // <div style={this.css}>
                <Modal isOpen={this.modal} toggle={this.toggle} size="lg" style={this.css}>
                    <ModalHeader> Detail Information</ModalHeader>
                    <ModalBody>
                        {this.displayInfo()}
                        {this.displayContactDetail()}
                        {this.displayStudentDetail()}
                        {this.displayStatusDetail()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.showProfile}>Profile</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                    </ModalFooter>
                </Modal>
            // </div>
        )
    }
}
function select(store) {
    return {
        isShowDetail: store.isShowDetail,
        searchKeyword: store.searchKeyword,
        getContactDetail: store.getContactDetail,
        getStudentDetail: store.getStudentDetail,
        getStatusDetail: store.getStatusDetail
    }
}
export default connect(select)(DetailInfo)