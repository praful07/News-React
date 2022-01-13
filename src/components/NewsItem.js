import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {
        let {title, description, imgUrl, newsUrl} = this.props;
        return (
            <div>
                <div className="card" style={{width: "23rem"}}>
                    <img src={imgUrl} className="card-img-top" alt="..." style={{width:"100%", height:"220px"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <a target="_blank" href={newsUrl} className="btn btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
