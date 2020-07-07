import React, { Component } from "react";
import {
	View,
	PanResponder,
	Animated,
	Dimensions,
	StyleSheet,
} from "react-native";
import { Card, Text, Button } from "react-native-elements";
import MyCard from "./Card";

const SCREEN_WIDTH = Dimensions.get("window").width;
// Quarter of the screen width
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH;
const SWIPEOUT_DURATION = 250;

class Deck extends Component {
	constructor(props) {
		super(props);

		this.deck = this.props.data;
		const position = new Animated.ValueXY();
		const panResponder = PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onPanResponderMove: (event, gesture) => {
				// Move in only x direction not y direction
				position.setValue({ x: gesture.dx, y: 0 });
			},
			onPanResponderRelease: (event, gesture) => {
				if (gesture.dx >= SWIPE_THRESHOLD) {
					this.exitCard(gesture.dx);
				} else if (gesture.dx <= -SWIPE_THRESHOLD) {
					this.exitCard(gesture.dx);
				} else {
					this.resetCardPosition();
				}
			},
		});

		this.state = {
			panResponder,
			position,
			cardIndex: this.deck.length - 1,
		};
	}

	resetCardPosition() {
		Animated.spring(this.state.position, {
			toValue: { x: 0, y: 0 },
		}).start();
	}

	// If direction is left decrement index
	// If direction is right increment index
	exitCardComplete(direction) {
		if (direction < 0) {
			this.setState(({ cardIndex }) => ({
				cardIndex: cardIndex - 1,
			}));
		} else {
			this.setState(({ cardIndex }) => ({
				cardIndex: cardIndex + 1,
			}));
		}

		// Swiped right
		// Animate next card from left to right
		if (direction > 0) {
			this.state.position.setValue({ x: -1 * SCREEN_WIDTH, y: 0 });
		}

		// Swiped left
		// Animate next card from right to left
		if (direction < 0) {
			this.state.position.setValue({ x: SCREEN_WIDTH, y: 0 });
		}

		// Animate next card from left or right to center
		this.resetCardPosition();
	}

	exitCard(direction) {
		// If direction is left, move card in -ve direction
		// If direction is right, move card in +ve direction
		const x = direction < 0 ? -1 * SCREEN_WIDTH : SCREEN_WIDTH;
		Animated.timing(this.state.position, {
			toValue: { x, y: 0 },
			duration: SWIPEOUT_DURATION,
		}).start(() => this.exitCardComplete(direction));
	}

	renderOutOfCards() {
		return (
			<Card title="All done!">
				<Text style={{ marginBottom: 5 }}>No more cards</Text>
				<Button
					icon={this.smileyIcon}
					backgroundColor="#78324"
					title="Get more"
				/>
			</Card>
		);
	}

	renderNoCardsAvailable() {
		return (
			<Card title="Sorry">
				<Text style={{ marginBottom: 5 }}>
					There are no cards right now
				</Text>
				<Button
					icon={this.smileyIcon}
					backgroundColor="#78324"
					title="Get some cards"
				/>
			</Card>
		);
	}

	getCardStyle() {
		const { position } = this.state;
		// Add more distance of 1.5 for less rotation
		const rotate = position.x.interpolate({
			inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
			outputRange: ["-120deg", "0deg", "120deg"],
		});

		return {
			...position.getLayout(),
			transform: [{ rotate }],
		};
	}

	renderCard() {
		const { cardIndex } = this.state;
		const { deck } = this;

		/**
		 * Stack the cards
		 * Animate the first card
		 * Input: Reverse the list
		 * The last card will be at the bottom at i = 0
		 * The first card will be at the top at i = 7
		 * Animate i = 7
		 * */

		return this.deck.map((data, i) => {
			// Pop the cards that has been swiped by returning null for that index
			if (i > cardIndex) {
				return null;
			}

			if (i === cardIndex) {
				return (
					<Animated.View
						{...this.state.panResponder.panHandlers}
						style={[this.getCardStyle(), styles.cardStack]}
						key={data.id}
					>
						<MyCard data={data} />
					</Animated.View>
				);
			}
			return (
				<View style={styles.cardStack} key={data.id}>
					<MyCard data={data} key={data.id} />
				</View>
			);
		});
	}

	render() {
		const { deck } = this;
		const { cardIndex } = this.state;

		// If the deck is empty
		if (deck.length === 0) {
			return this.renderNoCardsAvailable();
		}

		// After swiping left, if there are no more cards to show
		if (cardIndex < 0 || cardIndex === deck.length) {
			return this.renderOutOfCards();
		}

		return <View style={styles.deckContainer}>{this.renderCard()}</View>;
	}
}

// zIndex controls which components display on top of others
const styles = StyleSheet.create({
	deckContainer: {
		flex: 1,
	},
	cardStack: {
		position: "absolute",
		zIndex: 1,
	},
});

export default Deck;
