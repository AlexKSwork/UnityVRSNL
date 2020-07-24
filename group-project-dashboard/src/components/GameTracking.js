import React from "react";

export default class GameTracking extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            games: this.props.game
        }

    }

    UNSAFE_componentWillReceiveProps(props) {
        this.setState({games: props.game});
    }

    render() {
        return (
            <div className = "container-fluid main">
                {
                    this.state.games.map( game => (
                        <div className = "game">
                            <table className = "game__table">
                                <tr>
                                    <th className = "game__heading game__row--heading">Positions</th>
                                    <th className = "game__heading game__position">Start</th>
                                    <th className = "game__heading game__position">Q1</th>
                                    <th className = "game__heading game__position">Q2</th>
                                    <th className = "game__heading game__position">Q3</th>
                                    <th className = "game__heading game__position">Q4</th>
                                    <th className = "game__heading game__position">Q5</th>
                                    <th className = "game__heading game__position">Q6</th>
                                    <th className = "game__heading game__position">Q7</th>
                                    <th className = "game__heading game__position">Q8</th>
                                    <th className = "game__heading game__position">Q9</th>
                                    <th className = "game__heading game__position">Q10</th>
                                    <th className = "game__heading game__position">Finish</th>
                                </tr>
                                <tr>
                                    <td className = "game__player game__row--heading">{game}</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                    <td className = "game__player">X</td>
                                </tr>
                            </table>
                        </div>
                    ))
                }
            
                {/* <div className = "game">
                    <table className = "game__table">
                        <tr>
                            <th className = "game__heading game__row--heading">Positions</th>
                            <th className = "game__heading game__position">Start</th>
                            <th className = "game__heading game__position">Q1</th>
                            <th className = "game__heading game__position">Q2</th>
                            <th className = "game__heading game__position">Q3</th>
                            <th className = "game__heading game__position">Q4</th>
                            <th className = "game__heading game__position">Q5</th>
                            <th className = "game__heading game__position">Q6</th>
                            <th className = "game__heading game__position">Q7</th>
                            <th className = "game__heading game__position">Q8</th>
                            <th className = "game__heading game__position">Q9</th>
                            <th className = "game__heading game__position">Q10</th>
                            <th className = "game__heading game__position">Finish</th>
                        </tr>
                        <tr>
                            <td className = "game__player game__row--heading">Player</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                            <td className = "game__player">X</td>
                        </tr>
                    </table>
                </div> */}
            </div>
        )
    }
}