import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const SectionHead = (props) => {
	return (
		<View style={styles.head}>
			<View style={styles.border}></View>
			<Text style={styles.text}>{props.text}</Text>
			<View style={styles.border} />
		</View>
	);
};

export default SectionHead;

const styles = StyleSheet.create({
	head: {
		flexDirection: "row",
		alignItems: "flex-end",
	},
	border: {
		borderBottomWidth: 1,
		borderColor: "red",
		marginTop: 50,
		width: deviceWidth - 300,
		marginHorizontal: 10,
	},
	text: {
		position: "relative",
		top: 9,
		fontSize: 18,
	},
});
