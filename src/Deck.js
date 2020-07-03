import React, { Component } from "react";
import { View, Text, Animated, Image, StyleSheet } from "react-native";
import MyCard from "./Card";

class Deck extends Component {
	constructor(props) {
		super(props);
		this.deck = this.props.data;
	}

	renderCard() {
		return this.deck.map((data) => {
			return <MyCard data={data} key={data.id} />;
		});
	}

	render() {
		return <View>{this.renderCard()}</View>;
	}
}

export default Deck;
