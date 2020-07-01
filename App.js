import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import Ball from "./src/Ball";

export default function App() {
	return (
		<View style={styles.container}>
			<StatusBar
				barStyle="dark-content"
				hidden={false}
				backgroundColor="grey"
				translucent={false}
				networkActivityIndicatorVisible={true}
			/>
			<Ball />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		flexDirection: "column",
		alignItems: "flex-start",
		justifyContent: "flex-start",
	},
});
