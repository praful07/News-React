import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from  './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    
    static defaultProps = {
        country : "in",
        category : "general",
        pageSize : 12
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
    }
    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading : true,
            page : 0,
            totalPages : 0,
            totalResults : 0,
        };
        this.props.setProgress(0);
        document.title = "NewsMonkey - " + this.capitalizeFirstLetter(this.props.category);
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    async updateNews(t){        
        this.setState({
            loading : true,
        })
        this.props.setProgress(30);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b40c4fe877b844649b3704eba04391a4&pagesize=${this.props.pageSize}&page=${this.state.page+t}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.props.setProgress(30);
        this.setState({
            articles : parseData.articles,
            loading : false,
            page : this.state.page+t,
            totalPages : Math.ceil(parseData.totalResults/this.page),
            totalResults : parseData.totalResults
        })
        this.props.setProgress(70);
        this.props.setProgress(100);
    }

    handlePreviousClick = async()=>{
        console.log("Previous");
        this.updateNews(-1);
    }

    handleNextClick = async ()=>{
        console.log("Next");
        this.updateNews(1);
    }

    async componentDidMount(){
        this.props.setProgress(10);
        this.updateNews(+1);
        this.props.setProgress(100);
    }

    fetchMoreData = async() => {
        this.setState({
            loading : false,
        })
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=b40c4fe877b844649b3704eba04391a4&pagesize=${this.props.pageSize}&page=${this.state.page+1}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles : this.state.articles.concat(parseData.articles),
            page : this.state.page+1,
            totalPages : Math.ceil(parseData.totalResults/this.page),
            totalResults : parseData.totalResults
        })
    };
    
    render() {
        console.log("render");
        return (
            <>
                <h1 className='text-center my-5'>NewsMonkey - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {this.state.articles.map((element)=>{
                                return <div className="col-md-4 my-4" key={element.url}>
                                    <NewsItem title={element.title== null ? "Title" : element.title} 
                                    description={element.description==null ? "Description" : element.description} 
                                    imgUrl={element.urlToImage==null ? "http://dreamstop.com/wp-content/uploads/2013/06/news-dreams.jpg":element.urlToImage} 
                                    newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                                </div>
                            })} 
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
    }
}

export default News
