import React, {Component} from 'react'
import {Container, Table, Row, PaginationItem, PaginationLink, Col, Pagination} from 'reactstrap'
import {getDetail, getDetailResult, showDetail} from '../action/GetDetail'
import {START_SEARCH, FINISH_SEARCH, CONTACT_COLUMNS, DETAIL_TYPE, FINISH_LIST_STATUS_INFO, FINISH_LIST_SCM_INFO} from '../action/ActionTypes'
import {connect} from 'react-redux'

class ResultList extends Component {
    constructor(props) {
        super(props)
        //[ "", "info", "name", "Truong Thi Soan", "50", "0" ]
        this.path = this.props.history.location.pathname.split('/')
        this.state = {
            contactColumn : CONTACT_COLUMNS,
            limit: this.props.setLimitPage.action 
            ? this.props.setLimitPage.action.meta.limit : this.path[4],
            page: this.props.setLimitPage.action
            ? this.props.setLimitPage.action.meta.page : this.path[5]
        }
        // 2 nghia la 2 page truoc page hien tai va 2 page sau page hien tai 
        this.displayPagination = 2
        this.typeDetail = DETAIL_TYPE
        this.profileURL = '/profile'
        this.getDetail = this.getDetail.bind(this)
        this.showProfile = this.showProfile.bind(this)
    }
    componentDidUpdate() {
        this.path = this.props.history.location.pathname.split('/')
    } 
    getDetail(id) {
        if(id !== undefined) {
            this.typeDetail.forEach(async type => {
                this.props.dispatch(getDetail(id, type))
                const res = await getDetailResult(id, type)
                this.props.dispatch(res)
            })

            return this.props.dispatch(showDetail())
        }
        return 1
    }
    /*
    * @params: @1 index giong voi index cua searchKeyword,
    * @return: gia tri info trong getListStatus
    */
    getStatus(index) {
        if(this.props.getListStatus.action) {
            const action = this.props.getListStatus.action
            if(action.type === FINISH_LIST_STATUS_INFO) {
                return action.payload[index]
            } else {
                return 'LOADING...'
            }
        }
        return 'LOADING...'
    }
/*
* @params: @1 index giong voi index cua searchKeyword,
* @return: gia tri info trong getListStatus
*/
    getScm(index) {
        if(this.props.getListSCM.action) {
            const action = this.props.getListSCM.action
            if(action.type === FINISH_LIST_SCM_INFO) {
                return action.payload[index]
            } else {
                return 'LOADING...'
            }
        }
        return 'LOADING...'
    }

    showProfile(id) {
        if(id !== undefined) {
            this.props.history.push(`${this.profileURL}/${id}`)
        }
    }

    amountResult() {
        if(this.props.getAmount.action) {
            const amount = this.props.getAmount.action.payload
            this.amount = amount
            return (
                <h5>Found results: {amount}</h5>
            )
        } 
        return (
            <h5>Found results: loading...</h5>
        )
    }

    activePagination(max, current, numberPagin) {
        if(current <= numberPagin) {
            return current
        } else {
            return numberPagin
        }
    }

    paginationPage() {
        if(this.props.setLimitPage.action) {
            const action = this.props.setLimitPage.action 
            this.path[4] = action.meta.limit
            this.path[5] = action.meta.page
        }
        if(this.amount) {
            const limit = this.state.limit ? this.state.limit : 50
            const numberPage = Math.ceil(this.amount / limit)
            const numberPagin = parseInt(this.displayPagination, 10)
            const currentPagin = parseInt(this.state.page, 10) ? parseInt(this.state.page, 10) : 0 
            const arr = []
            for (var i = currentPagin - numberPagin; i <= currentPagin + numberPagin; i++) {
                arr.push(i)
            }
            const displayPage = arr.filter(val => {
                return val >= 0 && val <= numberPage
            })
            return displayPage.map((val, index) => {
                const path = this.path
                path[path.length - 1] = val
                const newPage = path.join('/')
                return (
                    <PaginationItem key={index} 
                    active={this.activePagination(numberPage, currentPagin, numberPagin) === index}>
                        <PaginationLink value={index} href={newPage} >
                            {val}
                        </PaginationLink>
                    </PaginationItem>
                )
            })
        }
    }

    render() {
        const result = (this.props.searchKeyword) ? {...this.props.searchKeyword.action} : {}
        const columns = this.state.contactColumn.slice()
        const rows = () => {
            if (result.type === START_SEARCH) {
                return (
                    <div>LOADING...</div>
                )
            }
            else if (result.type === FINISH_SEARCH){
                if(result.payload !== null && result.payload.length > 0) {
                    return (
                        <div>
                            <Row>
                                <Col>
                                    {this.amountResult()}
                                </Col>
                                <Col>
                                    <Pagination>
                                        {this.paginationPage()}
                                    </Pagination>
                                </Col>
                            </Row>
                        <Table striped hover responsive>
                            <thead>
                                <tr>
                                    <th>Ten</th>
                                    <th>SoDienThoai</th>
                                    <th>Email</th>
                                    <th>MaSinhVien</th>
                                    <th>TrangThaiHienTai</th>
                                    <th>NoiDaoTao</th>
                                    <th>LinkHoSo</th>
                                </tr>
                            </thead>
                            <tbody>
                        {
                            result.payload.map((obj, index) => {
                                return (
                                    <tr key={index} idcontact={obj[columns[0]]} onClick={() => this.getDetail(obj[columns[0]])}>
                                        <td >
                                            {obj[columns[4]]}
                                        </td>
                                        <td >
                                            {obj[columns[5]]}
                                        </td>
                                        <td>
                                            {obj[columns[6]]}
                                        </td>
                                        <td >
                                            {obj[columns[11]]}
                                        </td>
                                        <td>
                                            {this.getStatus(index)}
                                        </td>
                                        <td>
                                            {this.getScm(index)}
                                        </td>
                                        <td >
                                            {/* <a href={`${this.profileURL}/${obj[columns[0]]}`}> */}
                                                <i className="fas fa-user-circle fa-2x" 
                                                onClick={() => this.showProfile(obj[columns[0]])}></i>
                                            {/* </a> */}
                                        </td>
                                    </tr>
                                )
                            })
                        }
                            </tbody>
                        </Table>
                        </div>
                    )
                } else if (result.error){
                    return (
                        <h2>{result.error}</h2>
                    )
                } else {
                    return (
                        <div>No result is found.Please try again another keyword or type.</div>
                    )
                }
            }
        }
        return (
            <Container>
                {rows()}
            </Container>
        )
    }
}

function select(store) {
    return {
        googleLogin: store.googleLogin,
        searchKeyword: store.searchKeyword,
        getListStatus: store.getListStatus,
        getListSCM: store.getListSCM,
        setLimitPage: store.setLimitPage,
        getAmount: store.getAmount
    }
}
export default connect(select)(ResultList)