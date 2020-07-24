import React from "react";

export default class LogInError extends React.Component {
    render() {
        return (
            <div className = "error">
                <p className = "error__heading">Log In Error</p>
                <p className = "error__text">You have entered incorrect login and password details</p>
            </div>
        )
    }
}