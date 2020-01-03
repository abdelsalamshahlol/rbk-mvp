import React from 'react';
import axios from "axios";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailField: null,
            _passwordField: null,
            alert: {
                message: null,
                type: 'warning'
            },
        }
    }

    updateInput(e) {
        let {id, value} = e.target;
        this.setState({
            [id + 'Field']: value
        })
        ;
    }

    processRegister(event) {
        event.preventDefault();

        axios.post(`users/sign-up`, {email: this.state.emailField, password: this.state._passwordField})
            .then(({data}) => {
                this.setState({
                    alert: {message: 'Account Created', type: 'success'}
                });
                console.log({data});
            }).catch(err => {
            console.error(err);
        });
    }

    render() {
        let {type, message} = this.state.alert;
        let alert = (
            <div className={"alert alert-dismissible fade show alert-" + type} role="alert">
                {message}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        );

        return (
            <div className="container">
                {(message !== null ? alert : '')}
                <div className="row">
                    <div className="container">
                        <h1 className="display-4 text-center">Sign Up</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <form action="#" method={"POST"} onSubmit={(e) => {
                            this.processRegister(e)
                        }}>
                            <div className="form-group">
                                <label htmlFor="email">Email address</label>
                                <input type="text" className="form-control" id="email"
                                       aria-describedby="emailHelp" onInput={(e) => this.updateInput(e)}/>
                                <small id="emailHelp" className="form-text text-muted">We'll never share your email
                                    with anyone else.</small>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="_password"
                                       onInput={(e) => this.updateInput(e)}/>
                            </div>
                            <div className="form-group form-check">
                                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                            </div>
                            <button type="submit" className="btn btn-success">Join</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

}

export default Register;