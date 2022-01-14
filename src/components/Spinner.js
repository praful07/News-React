import React, { Component } from 'react'
import loading from './loading2.gif'

export class Spinner extends Component {
    render() {
        return (
            <div className='container text-center my-4'>
                <img src={loading} alt="loading" />                
            </div>
        )
    }
}

export default Spinner
