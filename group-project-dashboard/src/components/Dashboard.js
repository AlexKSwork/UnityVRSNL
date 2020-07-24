import React from "react";

export default class Dashboard extends React.Component {
    render() {
        return (
            <div className = "container-fluid main">
                <div className = "row">
                    <div className = "col-lg-3">
                        <div className = "feature">
                            <div className = "feature__title">
                                <h3 className = "heading-secondary">Active Games</h3>
                            </div>
                            <div className = "feature__content use-heading-color">
                                2
                            </div>
                        </div>
                    </div>
                    <div className = "col-lg-3">
                        <div className = "feature">
                            <div className = "feature__title">
                                <h3 className = "heading-secondary">Active Students Playing</h3>
                            </div>
                            <div className = "feature__content use-heading-color">
                                11
                            </div>
                        </div>
                    </div>
                    <div className = "col-lg-3">
                        <div className = "feature">
                            <div className = "feature__title">
                                <h3 className = "heading-secondary">Total Games</h3>
                            </div>
                            <div className = "feature__content use-heading-color">
                                20
                            </div>
                        </div>
                    </div>
                    <div className = "col-lg-3">
                        <div className = "feature">
                            <div className = "feature__title">
                                <h3 className = "heading-secondary">Amount of Questions</h3>
                            </div>
                            <div className = "feature__content use-heading-color">
                                10
                            </div>
                        </div>
                    </div>
                </div>
                <div className = "feature">
                    <div className = "feature__title">
                        <h3 className = "heading-secondary">Game Ratings</h3>
                    </div>
                    <div className = "feature_content">
                        <table>
                            <tr>
                                <th>1 star</th>
                                <th>2 star</th>
                                <th>3 star</th>
                                <th>4 star</th>
                                <th>5 star</th>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>3</td>
                                <td>3</td>
                                <td>9</td>
                                <td>11</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className = "row">
                    <div className = "col-lg-12 u-center-text">
                        <h1 className = " use-heading-color" >Additional Features Here</h1>
                    </div>
                </div>
            </div>
        )
    }
}