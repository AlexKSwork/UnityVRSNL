import React from "react";

import LogInError from "./LogInError";

export default class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            failed_login: this.props.failedLogIn
        }

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({failed_login: props.failedLogIn})
    }

    onUsernameChange(e) {
        this.setState({username: e.target.value})
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value})
    }

    render() {
        return (
            <div className = "container-fluid login__screen">
                <div className = "login">
                    <h1 className = "login__title login__title--main">PhysioFeed</h1>
                    <h2 className = "login__title login__title--sub">Lecturer Dashboard</h2>
                    <div className = "login__inputs">
                        <div>
                            <p className = "login__text">Username</p>
                            <p><input className = "login__input" 
                                type = "text"
                                value = {this.state.username}
                                onChange = {this.onUsernameChange}></input></p>
                        </div>

                        <div>
                            <p className = "login__text">Password</p>
                            <p><input className = "login__input" 
                                type = "password"
                                value = {this.state.password}
                                onChange = {this.onPasswordChange}></input></p>
                        </div>
                    </div>
                                    
                    <button className = "login__btn" onClick = {() => {this.props.getDetails(
                        this.state.username,
                        this.state.password
                    )}}>Log In</button>

                    {this.state.failed_login ? <LogInError></LogInError> : ""}
                </div>
            </div>
        )
    }
}