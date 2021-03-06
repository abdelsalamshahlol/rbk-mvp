import React from 'react';
import axios from 'axios';
import Home from './Home';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailField: null,
            _passwordField: null,
            alert: {
                message: null,
                type: 'warning'
            },
            isLoggedIn: false,
            email: null
        }
    }

    updateInput(e) {
        let {id, value} = e.target;
        this.setState({
            [id + 'Field']: value
        });
    }

    processLogin(event) {
        event.preventDefault();
        let token = localStorage.getItem('jwt-token');
        axios.post(`users/login`
            , {email: this.state.emailField, password: this.state._passwordField}
            , {
                headers: {
                    'authorization': token,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(({data}) => {
                let {user: {email}} = data;
                console.log(data);
                this.setState({
                    alert: {message: 'Login Successful', type: 'success'},
                    isLoggedIn: true,
                    email
                });

                // Redirect after successful account log
                // setTimeout(() => {
                //     // this.props.history.push('/login')
                // }, 1500);

            }).catch(err => {
            this.setState({
                alert: {message: err.message, type: 'danger'}
            });
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
                {!this.state.isLoggedIn && (
                    <div className="container">
                        <div className="row">
                            <div className="col"><h1 className="display-4 text-center">Login</h1></div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <form action="#" method={"POST"} onSubmit={(e) => {
                                    this.processLogin(e)
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="email">Email address</label>
                                        <input type="text" className="form-control" id="email"
                                               aria-describedby="emailHelp" onInput={(e) => this.updateInput(e)}/>
                                        <small id="emailHelp" className="form-text text-muted">We'll never share your
                                            email
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
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>)}
                {this.state.isLoggedIn && <Home email={this.state.email}/>}
            </div>
        );
    };
}

export default Login;