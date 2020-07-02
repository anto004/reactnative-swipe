import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";

class Card extends Component {
	render() {
		const { data } = this.props;
		return (
			<View>
				<Image
					style={styles.deck}
					source={{
						uri: data.uri,
					}}
				/>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>{data.text}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	deck: {
		width: 200,
		height: 150,
		borderRadius: 10,
		margin: 10,
		marginTop: 20,
	},
	titleContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 18,
	},
});

export default Card;
