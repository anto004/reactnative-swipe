import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { ThemeProvider, Text, Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class MyCard extends Component {
	smileyIcon = (
		<Icon name="emoticon-cool-outline" size={30} color="#edeceb" />
	);
	render() {
		const { data } = this.props;

		return (
			<View>
				<Card image={{ uri: data.uri }} imageStyle={styles.image}>
					<Text style={styles.title}>{data.text}</Text>
					<Button
						icon={this.smileyIcon}
						backgroundColor="#78324"
						title="View"
					/>
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	image: {
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
		marginBottom: 5,
		fontSize: 18,
	},
});

export default MyCard;
