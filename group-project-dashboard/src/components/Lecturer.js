import React from "react";
import {saveDetails, requestDetails, recieveDetails} from "../api/socket";
export default class Lecturer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            details: [1],
            username: "",
            password: ""
        }

        requestDetails();

        recieveDetails((err, account_details) => {
            this.setState({details: account_details})
        })

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.save = this.save.bind(this);
    }

    onUsernameChange(e) {
        this.setState({username: e.target.value})
    }

    onPasswordChange(e) {
        this.setState({password: e.target.value})
    }

    save() {
        saveDetails({
            username: this.state.username,
            password: this.state.password
        })
    }

    render() {
        return (
            <div className = "container-fluid main">
                <div className = "accounts">
                    <h3 className = "accounts__title">Lecturer Accounts</h3>
                    {this.state.details.map(detail => (
                        <p className = "accounts_detail">
                            <span className = "accounts_detail--user">Username: {detail.username}</span>
                            <span className = "accounts_detail--pass">Password: {detail.password}</span>
                        </p>
                    ))}
                </div>
                <div className = "add">
                    <h3 className = "add__title">Add Lecturer Account</h3>
                    <div>
                        <p className = "add__text">Username</p>
                        <p><input className = "add__input"
                            type = "text"
                            value = {this.state.username}
                            onChange = {this.onUsernameChange}></input></p>
                    </div>
                    <div>
                        <p className = "add__text">Password</p>
                        <p className = "add_text"><input className = "add__input"
                        type = "text"
                        value = {this.state.password}
                        onChange = {this.onPasswordChange}></input></p>
                    </div>
                    <button className = "add__btn" onClick = {this.save}>Save Account</button>
                </div>
            </div>
        )
    }
}