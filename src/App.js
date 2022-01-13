import './App.css';
import React, { Component } from 'react'
import Navbar from "./components/Navbar";
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
export default class App extends Component {

    render() {
        return (
            <>
                <Router>
                    <Navbar setCategory={this.setCategory} />
                    <Switch>
                    <Route exact path="/">
                        <News key="general" country="in" category="general" pageSize={12} />
                    </Route>
                    <Route exact path="/business">
                        <News key="business" country="in" category="business" pageSize={12} />
                    </Route>
                    <Route exact path="/sports">
                        <News key="sports" country="in" category="sports" pageSize={12} />
                    </Route>
                    <Route exact path="/health">
                        <News key="health" country="in" category="health" pageSize={12} />
                    </Route>
                    <Route exact path="/technology">
                        <News key="technology" country="in" category="technology" pageSize={12} />
                    </Route>
                    <Route exact path="/science">
                        <News key="science" country="in" category="science" pageSize={12} />
                    </Route>
                    <Route exact path="/about">
                        <News key="general" country="in" category="general" pageSize={12} />
                    </Route>
                    </Switch>
                </Router>
            </>
        )
    }
}

// API KEY :- b40c4fe877b844649b3704eba04391a4