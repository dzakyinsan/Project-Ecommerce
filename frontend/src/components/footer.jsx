import React, { Component } from 'react';

class footer extends Component {
    state = {  }
    render() { 
        return (
            <div className='row mt-5'> 
                <div className='col-md-3' style={{border:'2px solid red'}}>
                        <h5>Contact</h5>
                </div>
                <div className='col-md-3'>
                    <h5>FAQ</h5>
                </div>
                <div className='col-md-3'>
                    <h5>Discover</h5>
                </div>
                <div className='col-md-3'>
                    <h5>Subscribe</h5>
                </div>
            </div>
          );
    }
}
 
export default footer;