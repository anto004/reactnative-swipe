import React, { Component } from "react";
import { View, Image, StyleSheet } from "react-native";
import { ThemeProvider, Text, Card, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class MyCard extends Component {
	smileyIcon = (
		<Icon name="emoticon-cool-outline" size={20} color="#edeceb" />
	);
	render() {
		const { data } = this.props;

		return (
			<View style={{ alignItems: "center" }}>
				<Card>
					<Image source={{ uri: data.uri }} style={styles.image} />
					<View style={styles.titleContainer}>
						<Text style={styles.title}>{data.text}</Text>
						<Button
							title="view"
							icon={this.smileyIcon}
							buttonStyle={styles.button}
							type="solid"
							raised={true}
						/>
					</View>
				</Card>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	image: {
		width: 200,
		height: 100,
		borderRadius: 10,
		margin: 0,
		marginBottom: 10,
	},
	titleContainer: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		alignSelf: "flex-start",
		marginBottom: 5,
		fontSize: 18,
	},
	button: {
		width: 100,
		backgroundColor: "#783244",
	},
});

export default MyCard;
