import React from "react";
import axios from 'axios';

export default class Question extends React.Component {
    constructor(props) {
        super(props);
        this.questionsOnSubmit = this.questionsOnSubmit.bind(this);
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


    questionsOnSubmit = (e) => {
        e.preventDefault()
        this.props.setQuestions(e.target.q1.value,
             e.target.q2.value, 
             e.target.q3.value, 
             e.target.q4.value, 
             e.target.q5.value, 
             e.target.q6.value, 
             e.target.q7.value,
             e.target.q8.value,
             e.target.q9.value,
             e.target.q10.value)
        
        axios.post('http://localhost:3001/api/putData', {
          question1: e.target.q1.value,
          question2: e.target.q2.value,
          question3: e.target.q3.value,
          question4: e.target.q4.value,
          question5: e.target.q5.value,
          question6: e.target.q6.value,
          question7: e.target.q7.value,
          question8: e.target.q8.value,
          question9: e.target.q9.value,
          question10: e.target.q10.value
        });
        e.target.q1.value = "";
        e.target.q2.value = "";
        e.target.q3.value = "";
        e.target.q4.value = "";
        e.target.q5.value = "";
        e.target.q6.value = "";
        e.target.q7.value = "";
        e.target.q8.value = "";
        e.target.q9.value = "";
        e.target.q10.value = "";

    }
    render() {
        const {data} = this.state;
        return (
            <div className = "main">

                <div className = "question">
                    <form onSubmit={this.questionsOnSubmit}>
                    <ul className = "question__list">
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 1" id="q1"></input>
                        </li>
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 2" id="q2"></input>
                        </li>
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 3" id="q3"></input>
                        </li>
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 4" id="q4"></input>
                        </li>
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 5" id="q5"></input>
                        </li>
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 6" id="q6"></input>
                        </li>
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 7" id="q7"></input>
                        </li>
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 8" id="q8"></input>
                        </li>
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 9" id="q9"></input>
                        </li>
                        <li className = "question__item">
                            <input className = "question__input" type = "text" placeholder="Question 10" id="q10"></input>
                        </li>
                    </ul>
                    <button type="submit" className = "question__btn">Save Questions</button>
                    </form>
                </div>
            </div>
        )
    }
}