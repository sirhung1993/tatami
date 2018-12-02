import React, {Component} from 'react'
// import {connect} from 'react-redux'
import Claim from './Claim'
// import Profile from './Profile'
// import Login from './Login'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import '../css/bootstrap4.min.css'
import '../css/fontawesome.css'
class App extends Component {

    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" 
                        render={(att) => {return <Claim {...att}/>}} />
                        <Route path="*" 
                        render={(att) => {return <Claim {...att}/>}} />
                    </Switch>
                </Router>
            </div>
        )
    }
}

export default App