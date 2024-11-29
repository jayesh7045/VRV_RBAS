import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

class DemoCarousel extends Component {
    render() {
        return (
            <Carousel transitionTime={2000} autoPlay = {true} infiniteLoop = {true} interval = {5000} showStatus = {false} showThumbs = {false} showIndicators = {false}>
                <div className=' pl-[10rem] pt-[5rem] pb-[20rem] pr-[10rem] h-[40rem] object-contain'>
                    <img src={this.props.images_urls[0]} className=' shadow-[10px_10px_60px_-15px_rgba(0,0,0,0.6)] w-[20rem]'/>
                </div>
                <div  className='pl-[10rem] pt-[5rem] pb-[20rem] object-contain pr-[10rem] h-[40rem] '>
                    <img src={this.props.images_urls[1]} className='shadow-[10px_10px_60px_-15px_rgba(0,0,0,0.6)] w-[20rem]'/>
                </div>
            </Carousel>
        );
    }
};
export default DemoCarousel
// ReactDOM.render(<DemoCarousel />, document.querySelector('.demo-carousel'));