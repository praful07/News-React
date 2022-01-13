import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {
    
    constructor(){
        super();
        // console.log("News constructor");
        this.state = {
            articles : [],
            loading : false,
            page : 0,
            totalPages : 0,
        };
    }

    handlePreviousClick = async()=>{
        console.log("Previous");
        this.setState({
            loading : true,
        })
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b40c4fe877b844649b3704eba04391a4&pagesize=12&page=${this.state.page - 1}`;
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles : parseData.articles,
            loading : false,
            page : this.state.page - 1,
        })
    }

    handleNextClick = async ()=>{
        console.log("Next");
        this.setState({
            loading : true
        })
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b40c4fe877b844649b3704eba04391a4&pagesize=12&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles : parseData.articles,
            loading : false,
            page : this.state.page + 1,
        })
    }

    async componentDidMount(){
        console.log("componenetDidMount");
        this.setState({
            loading : true
        })
        let url = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=b40c4fe877b844649b3704eba04391a4&pagesize=12&page=1";
        let data = await fetch(url);
        let parseData = await data.json();
        console.log(parseData);
        this.setState({
            articles : parseData.articles,
            loading : false,
            page : 1,
            totalPages : Math.ceil(parseData.totalResults/12),
        })
    }

    render() {
        console.log("render");
        return (
            <div className='container my-4'>
                <h1 className='text-center'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element)=>{
                        return <div className="col-md-4 my-4" key={element.url}>
                            <NewsItem title={element.title== null ? "Title" : element.title} 
                            description={element.description==null ? "Description" : element.description} 
                            imgUrl={element.urlToImage==null ? "http://dreamstop.com/wp-content/uploads/2013/06/news-dreams.jpg":element.urlToImage} 
                            newsUrl={element.url}/>
                        </div>
                    })} 
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" onClick={this.handlePreviousClick} className="btn btn-dark"
                    disabled={this.state.page <= 1 ? true:false}><strong>&larr; Previous</strong></button>
                    
                    <button type="button" onClick={this.handleNextClick} className="btn btn-dark"
                    disabled={this.state.page===this.state.totalPages ? true:false}><strong>Next &rarr;</strong></button>
                </div>
            </div>
        )
    }
}

export default News
