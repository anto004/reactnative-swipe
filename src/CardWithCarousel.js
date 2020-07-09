import React, { Component } from "react";
import { View, Text } from "react-native";
import Carousel from "react-native-snap-carousel";
import Card from "./Card";

class CardCarousel extends Component {
	constructor(props) {
		super(props);

		this.deck = props.data;

		this.state = { activeIndex: 0 };
	}
	renderItem({ item, index }) {
		return <Card data={item} />;
	}
	render() {
		return (
			<Carousel
				layout={"stack"}
				layoutCardOffset={10}
				ref={(ref) => (this.carousel = ref)}
				data={this.deck}
				renderItem={this.renderItem}
				sliderWidth={400}
				itemWidth={400}
				onSnapToItem={(index) => this.setState({ activeIndex: index })}
			/>
		);
	}
}

export default CardCarousel;
