import React, { Component } from "react";
import { View, Text, Animated, Image, StyleSheet } from "react-native";
import Card from "./Card";

class Deck extends Component {
	constructor(props) {
		super(props);
		this.deck = this.props.data;
	}

	render() {
		return (
			<View>
				<Card data={this.deck} />
			</View>
		);
	}
}

export default Deck;
