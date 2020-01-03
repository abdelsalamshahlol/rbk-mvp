import React from 'react';
import {Route, Link, BrowserRouter as Router} from 'react-router-dom'
import {AnimatedSwitch} from 'react-router-transition';

// Components
import Home from './home';
import Login from './Login';
import Register from './Register';

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        <img src="http://cdn.onlinewebfonts.com/svg/img_454002.png" alt="logo" width="30"/>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <AnimatedSwitch
                    atEnter={{opacity: 0}}
                    atLeave={{opacity: 0}}
                    atActive={{opacity: 1}}
                    className="switch-wrapper">
                    <Route path="/" exact component={Home}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/register" component={Register}/>
                </AnimatedSwitch>
            </Router>
        );
    }
}

export default App;