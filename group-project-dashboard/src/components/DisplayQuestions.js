import React from "react";
import axios from 'axios';

export default class DisplayQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: 0,
            message: null,
            q1: '',
            q2: '',
            q3: '',
            q4: '',
            q5: '',
            q6: '',
            q7: '',
            q8: '',
            q9: '',
            q10: '',
            }
        }
    
    componentDidMount() {
        if(!this.state.intervalIsSet){
          let interval = setInterval(this.getDataFromDb, 1000);
          this.setState({ intervalIsSet: interval});
        }
      }
    
      componentWillUnmount(){
        if(this.state.intervalIsSet) {
          clearInterval(this.state.intervalIsSet);
          this.setState({ intervalIsSet: null});
        }
      }
      getDataFromDb = () => {
        fetch('http://localhost:3001/api/getData')
          .then((data) => data.json())
          .then((res) => this.setState({ data: res.data }));
      };

      onChangeQuestion1(e) {
        this.setState({ q1: e.target.value })
      }
    render() {
        const {data} = this.state;

        return (
            <div className = "gameq">
            {data.length <= 0
              ? 'NO Questions Currently Added'
              : data.map((dat) => (
                <ul className = "gameq__list"> 
                    {dat.question1 != "" ? <li className = "gameq__text">{dat.question1} <br/></li> : ""}
                    {dat.question2 != "" ? <li className = "gameq__text">{dat.question2} <br/></li> : ""}
                    {dat.question3 != "" ? <li className = "gameq__text">{dat.question3} <br/></li> : ""}
                    {dat.question4 != "" ? <li className = "gameq__text">{dat.question4} <br/></li> : ""}
                    {dat.question5 != "" ? <li className = "gameq__text">{dat.question5} <br/></li> : ""}
                    {dat.question6 != "" ? <li className = "gameq__text">{dat.question6} <br/></li> : ""}
                    {dat.question7 != "" ? <li className = "gameq__text">{dat.question7} <br/></li> : ""}
                    {dat.question8 != "" ? <li className = "gameq__text">{dat.question8} <br/></li> : ""}
                    {dat.question9 != "" ? <li className = "gameq__text">{dat.question9} <br/></li> : ""}
                    {dat.question10 != "" ? <li className = "gameq__text">{dat.question10} <br/></li> : ""}
                    
                </ul>
                ))}

            </div>
            )
          }
        }