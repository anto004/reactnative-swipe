import React, { Component } from "react";
import { View, PanResponder, Animated } from "react-native";
import MyCard from "./Card";

class Deck extends Component {
	constructor(props) {
		super(props);
		this.deck = this.props.data;

		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				position.setValue({ x: gesture.dx, y: gesture.dy });
			},
			onPanResponderRelease: () => {},
		});

		this.state = { panResponder, position };
	}

	renderCard() {
		return this.deck.map((data) => {
			return <MyCard data={data} key={data.id} />;
		});
	}

	render() {
		return (
			<Animated.View
				{...this.state.panResponder.panHandlers}
				style={this.state.position.getLayout()}
			>
				{this.renderCard()}
			</Animated.View>
		);
	}
}

export default Deck;
