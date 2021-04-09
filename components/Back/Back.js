import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Link } from "react-router-native";

const Back = (props) => {
	return (
		<View style={styles.head}>
			{props.code2 === "yes" ? (
				<View style={styles.backArea}>
					<Icon name="chevron-back-outline" size={30} />
					<Text style={styles.backTxt}>{props.text}</Text>
				</View>
			) : (
				<Link to={"/" + props.code}>
					<View style={styles.backArea}>
						<Icon name="chevron-back-outline" size={30} />
						<Text style={styles.backTxt}>{props.text}</Text>
					</View>
				</Link>
			)}
		</View>
	);
};

export default Back;

const styles = StyleSheet.create({
	head: {
		paddingTop: 60,
		backgroundColor: "#eee",
		paddingBottom: 10,
		paddingLeft: 10,
	},
	backArea: {
		flexDirection: "row",
	},
	backTxt: {
		fontSize: 20,
		alignSelf: "center",
	},
});
