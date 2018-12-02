import React, {Component} from 'react'
import { GoogleLogin } from 'react-google-login'
import {connect} from 'react-redux'
import {login} from '../action/Login'
import { Alert } from 'reactstrap';
import { GOOGLE_OAUTH_CLIENT_ID } from '../action/ActionTypes';
const Cryptr = require('cryptr')

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginFail: false
        }
        this.loginStyle = {
            position: 'absolute',
            marginTop: '-50px',
            marginLeft: '-100px',
            left:'50%',
            top:'50%',
        }
        this.loginFail = false
        this.responseGoogle = this.responseGoogle.bind(this)
    }

    async responseGoogle (res) {
        if (res.profileObj) {
            const profile = res.profileObj
            const email = profile.email
            const crypt = new Cryptr(profile.email.replace(/@.*/, ''))
            const isLogin = await login(email, crypt.encrypt(res.tokenId)) 
            this.props.dispatch(isLogin)
            if(isLogin.payload) {
                this.readPermission = true
                this.props.history.push('/')
            } else {
                console.log(isLogin)
                this.LoginMessage = isLogin.meta.msg
                this.readPermission = false 
                this.setState({
                    loginFail: true
                })
            }
        }
    }
    render() {
        return (
            <div >
                <div style={this.loginStyle}>
                    <Alert isOpen={this.state.loginFail} color='danger'>
                        {this.LoginMessage}
                    </Alert>
                    <GoogleLogin
                        clientId={GOOGLE_OAUTH_CLIENT_ID}
                        buttonText='Login'
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                    /> 
                </div>
            </div>
        )
    }
} 

function select(store) {
    return {
        googleLogin: store.googleLogin
    }
}
export default connect(select)(Login)