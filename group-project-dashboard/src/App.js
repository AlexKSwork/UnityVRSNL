import React from 'react';
import './App.css';

import {login, loginSuccess, loggedIn, newPlayers, playerDisconnect} from "./api/socket";

import Dashboard from './components/Dashboard';
import Question from './components/Question';
import Answer from './components/Answer';
import Student from './components/Student';
import DisplayQuestions from './components/DisplayQuestions';
import GameTracking from "./components/GameTracking";
import Login from "./components/Login";
import Lecturer from "./components/Lecturer";

import nav_bottom from "./images/navigation/bottom.png";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      loggedIn: false,
      fail: false,

      current_games: [],

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
      pages: {
        1: {
          title: "dashboard",
          comp: <Dashboard></Dashboard>
        },
        2: {
          title: "Add Questions",
          comp: <Question
          setQuestions={this.setQuestions}></Question>
        },
        3: {
          title: "Display Questions",
          comp: <DisplayQuestions></DisplayQuestions>
        }
        ,
        4: {
          title: "Game Answers",
          comp: <Answer></Answer>
        },
        5: {
          title: "Students",
          comp: <Student></Student>
        },

        6: {
          title: "Track Games"
        },
        7: {
          title: "Lecturer Page"
        }
      },
      current_page: 1


    }

    this.getPageTitle = this.getPageTitle.bind(this);
    this.changePage = this.changePage.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);

    newPlayers((err, data) => {
      this.setState({current_games: this.state.current_games.concat(data)});
      var currentPage = this.state.current_page;
      this.setState({current_page: currentPage});
    })


    // playerDisconnect((err, data) => {
    //   var a = this.state.current_games; // make a separate copy of the array
    //   var i = a.indexOf(data)
    //   if (i !== -1) {
    //     a.splice(i, 1);
    //     this.setState({current_games: a});
    //   }
    // })

    loginSuccess((err, data) => {
      if (data === true) {
        this.setState({loggedIn: !this.state.loggedIn});
        this.setState({fail: false});
        loggedIn()
      } else {
        this.setState({fail: !this.state.fail});
      }

    })
  }

  getPageTitle() {
    var pos = this.state.current_page;
    return this.state.pages[pos].title;
  }

  getPageContent() {
    var pos = this.state.current_page;
    if (pos !== 6 && pos !== 7)
      return this.state.pages[pos].comp;
    else if (pos === 6)
      return <GameTracking game = {this.state.current_games}></GameTracking>
    else if (pos === 7)
      return <Lecturer></Lecturer>
  }

  changePage(new_page) {
    this.setState({current_page: new_page});
  }

  setQuestions =(q1, q2, q3, q4, q5, q6, q7, q8, q9, q10) => {
    let data = {q1, q2, q3, q4, q5, q6, q7, q8, q9, q10};
    this.setState(data);
    console.log('q1 is: ' , q1);
  }

  attemptLogin(username, password) {
    login(username, password)
  }

  render() {
    if (this.state.loggedIn === true) {
      return (
        <div class = "body">
          <nav className = "navigation">
            <h1 className = "navigation__title">PhysioFeed</h1>
            <ul className = "navigation__nav">
              <li><button className = "navigation__link" onClick= {() => this.changePage(1)}>Dashboard</button></li>
              <li><button className = "navigation__link" onClick= {() => this.changePage(2)}>Add Questions</button></li>
              <li><button className = "navigation__link" onClick= {() => this.changePage(3)}>View Questions</button></li>
              <li><button className = "navigation__link" onClick= {() => this.changePage(4)}>Answer</button></li>
              <li><button className = "navigation__link" onClick= {() => this.changePage(5)}>Students</button></li>
              <li><button className = "navigation__link" onClick= {() => this.changePage(6)}>Track Games</button></li>
              <li><button className = "navigation__link" onClick= {() => this.changePage(7)}>Lecturer Accounts</button></li>
              <li><button className = "navigation__link" onClick= {() => this.setState({loggedIn: false})}>Log Out</button></li>
            </ul>
            <img className = "navigation__img--bottom" src = {nav_bottom} alt = "nav_bottom_img"></img>
          </nav>
          <div className = "content">
            <div className = "title">
              <h1 className = "title__text heading-primary">{ this.getPageTitle() }</h1>
            </div>
            { this.getPageContent() }
          </div>
        </div>
      )
    } else {
      return (
        <Login getDetails = {this.attemptLogin} failedLogIn = {this.state.fail}></Login>
      )
    }
  }
}

export default App;
