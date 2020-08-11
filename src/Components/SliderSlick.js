import React, { Component } from "react";
import Slider from "react-slick";

export default class SliderSlick extends Component {
  render() {
    const settings = {
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      // prevArrow: <button type="button" className="slick-prev"></button>,
      // nextArrow: <button type="button" className="slick-next"></button>,
      // accessibility: false,

      responsive: [
        {
          //less than
          breakpoint: 1065,
          settings: {
            arrows: false,
          },
        },
      ],
    };
    return <Slider {...settings}>{this.props.children}</Slider>;
  }
}
