import React, {Component} from 'react'
import {
    Button,
    Input
} from 'reactstrap'
import {
    BASE_API_URL,
    HTTP_END_POINT,
    EOS
} from '../action/ActionTypes'
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs'
import Eos from 'eosjs'
import {connect} from 'react-redux'

export class Claim extends Component {
    constructor(props) {
        super(props)
        if(this.props.match) {
            this.params = {...this.props.match.params}
        }
        this.state = {

        }
        this.userAccount = ''
        this.network = EOS
        this.handleClick = this.handleClick.bind(this)
        this.handleChange= this.handleChange.bind(this)
        this.loadAccount()
    }

    handleClick(even) {
        console.log(even.target)
    }

    handleChange(even) {
        console.log(even)
    }
    loadAccount() {
        ScatterJS.plugins(new ScatterEOS())
        ScatterJS.scatter.connect('demo-app').then(connected => {
                if (!connected) {
                    // User does not have Scatter installed/unlocked.
                    console.log("not connect");
                }
                if (ScatterJS.scatter.identity != null) {
                }
                this.toggleScatter();
            })
    }

    toggleScatter() {
            const requiredFields = { accounts: [this.network] };
            ScatterJS.scatter.getIdentity(requiredFields).then(identity => {
                console.log(identity)
            }).catch(error => {
                console.error(error);
            });
    }

    addclaim(sig, data) {
            if (ScatterJS.scatter.identity == null) {
                alert("Attach Identity first");
                return;
            }
            this.userAccount = ScatterJS.scatter.identity.accounts[0].name;
            const eos = ScatterJS.scatter.eos(this.network, Eos, { expireInSeconds: 60 });
            const account = ScatterJS.scatter.identity.accounts.find(x => x.blockchain === 'eos');
            var options = {
                authorization: `${this.userAccount}@active`,
                broadcast: true,
                sign: true
            }
            eos.contract('tatamitest15').then(contract => {
                contract.addclaim(this.userAccount, sig, data, options).then(res => {
                    console.log("success");
                }).catch(err => {
                    console.log(err);
                });
            });
    }
    verify() {
            var student = ScatterJS.scatter ?
            ScatterJS.scatter.identity.accounts[0].name : '';
            fetch(`${BASE_API_URL}/action/hash?${student}`,{
                        crossDomain: true,
                        method: 'GET',
                        headers: {'Content-Type':'application/json'}
                    })
                    .then(res => res.json())
                    .then(function (response) {
                        var data = response.data.data;
                        var options = {
                            httpEndpoint: `${HTTP_END_POINT}`,
                        }
                    this.userAccount = ScatterJS.scatter.identity.accounts[0].name;
                    const eos = Eos(options) // // 127.0.0.1:8888
                    eos.getTableRows({
                        scope: "tatamitest15",
                        code: "tatamitest15",
                        table: "students",
                        json: true,
                        limit: 100,
                    }).then(async result => {
                        var sig = "";
                        for (var i = 0; i < result.rows.length; i++) {
                            if (result.rows[i].student_name === this.userAccount) {
                                for (var j = 0; j < result.rows[i].raw_type.length; j++) {
                                    if (result.rows[i].raw_type[j] === data) {
                                        sig = result.rows[i].signature[j]
                                        //console.log(sig)
                                    };
                                };
                            };
                        }
                        var student = this.state.student;
                        console.log(student)
                        fetch(`${BASE_API_URL}/action/verify/${student}/${sig}`)
                        .then(res => res.json())
                        .then(response => (
                            console.log(response.data.result)
                        ))
                    }).catch(err =>
                        console.log(err)
                    );
            })
    }
    sign() {
        var student = ScatterJS.scatter.identity ? 
            ScatterJS.scatter.identity.accounts[0].name : '';
        fetch(`${BASE_API_URL}/action/sign/${student}`)
        .then(res => res.json())
        .then(response => (
            this.addclaim(response.data.sig, response.data.data)
        ))
    }
    render() {
        return (
            <div>
                <Button color="primary" 
                    name="set_student_name"
                    onClick={this.sign}
                    >
                    addClaim
                </Button>
                <Input type="text"
                        name="student"
                        onChange={this.handleChange}>
                </Input>
                <Button color="primary" 
                    name="verify_degree"
                    onClick={this.verify}
                    >
                    Verify
                </Button>
            </div>
        )
    }
}
function select(store) {
    return {
    }
}
export default connect(select)(Claim)