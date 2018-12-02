import React, {Component} from 'react'
import {searchKeywords, getResult, setLimitOffset} from '../action/Searching'
import {Button, Container, Row, Col, Input, Label, FormGroup, Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import ResultList from './ResultList'
import DetailInfo from './DetailInfo'
import {connect} from 'react-redux'
import { DETAIL_TYPE } from '../action/ActionTypes';
import { getList, getListLatestStatus, getListScm } from '../action/GetDetail';
import { loginStatus } from '../action/Login';
import { getAmount } from '../action/Searching';

class SearchBar extends Component {
    constructor(props) {
        super(props)
        if(this.props.match !== undefined) {
            this.params = {...this.props.match.params}
        }
        this.state = {
            searchKey: (this.params.searchKey !== undefined) ? this.params.searchKey : '',
            searchType: (this.params.searchType !== undefined) ? this.params.searchType : 'name',
            preUrl: 'info',
            limitOpen: false,
            limit : (this.params.limit !== undefined) ? this.params.limit : 50,
            page : (this.params.page !== undefined) ? this.params.page : 0,
        }
        this.handleChange = this.handleChange.bind(this)
        this.searchKey = this.searchKey.bind(this)
        this.dropdownToggle = this.dropdownToggle.bind(this)
        this.changeLimit = this.changeLimit.bind(this)
        this.keyword = ''
        if (this.searchKey !== '' && this.props.searchKeyword 
        && !this.props.searchKeyword.action) {
            this.searchKey()
        }
    }

    handleChange(even) {
        const target = even.target
        if(target.name === 'keyword') {
            this.keyword = (target.value !== '') ? (target.value) : this.keyword
            if(even.key === 'Enter' || target.id === "search_button") {
                this.setState({searchKey: this.keyword}, () => {
                    this.props.history.push(`/${this.state.preUrl}` + 
                                            `/${this.state.searchType}`+
                                            `/${this.keyword}` + 
                                            `/${this.state.limit}` + 
                                            `/${this.state.page}` 
                                        )
                    this.searchKey()
                    this.props.dispatch(getList())
                    this.props.dispatch(getList(DETAIL_TYPE[1]))
                })
            }
        } else {
            this.setState({searchType: target.value})
        }
    }

    async searchKey() {
        const key = (this.state.searchKey !== '') ? this.state.searchKey : ''
        const type = this.state.searchType
        const limit= this.state.limit
        const page = this.state.page
        if (key !== '') {
            this.props.dispatch(searchKeywords(key, type))
            const res = await getResult(key, type, limit, page)
            this.props.dispatch(res)
            if(res.payload) {
                const ListStatus = await getListLatestStatus(res.payload)
                this.props.dispatch(ListStatus)
                const ResultAmount = await getAmount(type, key)
                this.props.dispatch(ResultAmount)
                const ScmInfo = await getListScm(res.payload)
                this.props.dispatch(ScmInfo)
            }
        } else {
            return ''
        }
    }

    dropdownToggle() {
        this.setState(state => ({
            limitOpen : !state.limitOpen
        }))
    }

    changeLimit(even) {
        const limit = even.target.value
        this.props.dispatch(setLimitOffset(limit))
        this.setState({
            limit: limit
        })
    }

    async componentDidMount() {
        const isLogin = await loginStatus()
        this.props.dispatch(isLogin)
    }
    render() {
        if (this.props.googleLogin.action 
            && this.props.googleLogin.action.payload) {
            return (
                <Container>
                    <Row>
                        <Col></Col>
                        <Col align="center">
                            <label>PROFILE STUDENT</label>
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row >
                        <Col xs="1"></Col>
                        <Col xs="7">
                            <Input  type="text" 
                                    name="keyword"
                                    onKeyUp={this.handleChange}
                                    >
                            </Input>
                        </Col>
                        <Col xs="2">
                            <Button name='keyword' id="search_button" block onClick={this.handleChange}>
                                <i className="fas fa-search"></i>
                            </Button>{' '}
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="1"></Col>
                        <Col xs="6">
                        <Form inline>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input  type="radio" 
                                            value="student_code"
                                            name="searchType" 
                                            onChange={this.handleChange}
                                            checked = {this.state.searchType==="student_code"}
                                    /> {' '}
                                    By Student Code
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input
                                            type="radio" 
                                            value="name"
                                            name="searchType" 
                                            onChange={this.handleChange}
                                            checked = {this.state.searchType==="name"}
                                    /> {' '}
                                    By Name
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup>
                                <Label>
                                    <Input  
                                            type="radio" 
                                            value="phone"
                                            name="searchType" 
                                            onChange={this.handleChange}
                                            checked = {this.state.searchType==="phone"}
                                    /> {' '}
                                    By Phone 
                                </Label>
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup check>
                                <Label check>
                                    <Input  type="radio" 
                                            value="email"
                                            name="searchType" 
                                            onChange={this.handleChange}
                                            checked = {this.state.searchType==="email"}
                                    /> {' '}
                                    By Email
                                </Label>
                            </FormGroup>
                        </Col>
                        </Form>
                        </Col>
                        <Col xs="3">
                        </Col>
                        <Col>
                            <Dropdown isOpen={this.state.limitOpen} toggle={this.dropdownToggle} size='sm'>
                                <DropdownToggle>
                                    50 row default
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={this.changeLimit} value={25}>25</DropdownItem>
                                    <DropdownItem onClick={this.changeLimit} value={50}>50</DropdownItem>
                                    <DropdownItem onClick={this.changeLimit} value={100}>100</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Col>
                    </Row>
                    <ResultList history={{...this.props.history}}/>
                    <DetailInfo history={{...this.props.history}} />
                </Container>
            ) // END OF DISPLAY WHEN LOGIN SUSCESSFULLY
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
    }
}
export default connect(select)(SearchBar)