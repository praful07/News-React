import './App.css';
import React, { Component } from 'react'
import Navbar from "./components/Navbar";
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
    state = {
        progress : 0
    }
    apiKey = process.env.REACT_APP_NEWS_API;
    setProgress = (progress)=>{
        // console.log(progress)
        this.setState({
            progress : progress
        })
        console.log(this.state.progress)
    }

    render() {
        return (
            <>
                <Router>
                    <Navbar setCategory={this.setCategory} />
                    <LoadingBar
                        color='green'
                        progress={this.state.progress}
                    />
                    <Switch>
                    <Route exact path="/">
                        <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country="in" category="general" pageSize={12} />
                    </Route>
                    <Route exact path="/business">
                        <News setProgress={this.setProgress} apiKey={this.apiKey} key="business" country="in" category="business" pageSize={12} />
                    </Route>
                    <Route exact path="/sports">
                        <News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" country="in" category="sports" pageSize={12} />
                    </Route>
                    <Route exact path="/health">
                        <News setProgress={this.setProgress} apiKey={this.apiKey} key="health" country="in" category="health" pageSize={12} />
                    </Route>
                    <Route exact path="/technology">
                        <News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" country="in" category="technology" pageSize={12} />
                    </Route>
                    <Route exact path="/science">
                        <News setProgress={this.setProgress} apiKey={this.apiKey} key="science" country="in" category="science" pageSize={12} />
                    </Route>
                    <Route exact path="/about">
                        <News setProgress={this.setProgress} apiKey={this.apiKey} key="general" country="in" category="general" pageSize={12} />
                    </Route>
                    </Switch>
                </Router>
            </>
        )
    }
}
