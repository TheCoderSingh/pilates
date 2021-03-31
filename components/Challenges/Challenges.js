import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import Footer from "../Footer/Footer";
import featured from "../../assets/featured.png";
import day from "../../assets/15day.png";
import day2 from "../../assets/15day2.png";
import day3 from "../../assets/30day.png";
import axios from "axios";
import { conf } from "../../config/config";

const deviceWidth = Dimensions.get("window").width;

const Challenges = () => {
	// const [challenges, setChallenges] = useState([]);

	// useEffect(() => {
	// 	axios({
	// 		method: "get",
	// 		url: conf.apiUrl + "/video" + "/507780761",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization:
	// 				"8P~8HtbJ[azS5tUQc.j@^)c|f>]XzUf6=3?JYYq!5`)Hc33_",
	// 		},
	// 		// data: {
	// 		// 	challenge_id: 507780761,
	// 		// },
	// 	})
	// 		.then((response) => {
	// 			console.log(response.data);
	// 			// setChallenges(response.data);
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }, []);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				<Text style={styles.headText}>Challenges</Text>
				{/* <Text style={styles.featuredText}>Featured Challenge</Text>
				<Image source={featured} style={styles.featuredImage} />
				<Text style={styles.popularText}>Popular Challenges</Text>
				<View style={styles.challenges}>
					{challenges.map((challenge) => {
						console.log(challenge);
						return (
							<View style={styles.challenge}>
								<Image
									source={day}
									style={styles.challengeImage}
								/>
								<View style={styles.challengeContent}>
									<Text style={styles.challengeText}>
										The Mix and Match Challenge
									</Text>
									<TouchableOpacity style={styles.readButton}>
										<Text style={styles.readText}>
											Read More
										</Text>
									</TouchableOpacity>
								</View>
							</View>
						);
					})}
					<View style={styles.challenge}>
						<Image source={day} style={styles.challengeImage} />
						<View style={styles.challengeContent}>
							<Text style={styles.challengeText}>
								The Mix and Match Challenge
							</Text>
							<TouchableOpacity style={styles.readButton}>
								<Text style={styles.readText}>Read More</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.challenge}>
						<Image source={day2} style={styles.challengeImage} />
						<View style={styles.challengeContent}>
							<Text style={styles.challengeText}>
								Short or Long Class Challenge
							</Text>
							<TouchableOpacity style={styles.readButton}>
								<Text style={styles.readText}>Read More</Text>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.challenge}>
						<Image source={day3} style={styles.challengeImage} />
						<View style={styles.challengeContent}>
							<Text style={styles.challengeText}>
								Reflect and Renew Challenge
							</Text>
							<TouchableOpacity style={styles.readButton}>
								<Text style={styles.readText}>Read More</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View> */}
			</ScrollView>
			<Footer />
		</View>
	);
};

export default Challenges;

const styles = StyleSheet.create({
	headText: {
		marginTop: 50,
		marginBottom: 20,
		fontSize: 24,
		color: "#EFA7A1",
	},
	featuredText: {
		alignSelf: "flex-start",
		marginLeft: 50,
		marginBottom: 10,
		color: "#EFA7A1",
	},
	popularText: {
		marginVertical: 20,
		color: "#EFA7A1",
		fontSize: 18,
	},
	challenge: {
		flexDirection: "row",
		marginVertical: 10,
		width: deviceWidth - 40,
	},
	challengeContent: {
		alignItems: "center",
		marginLeft: 15,
		width: 100,
		justifyContent: "center",
	},
	challengeText: {
		textAlign: "center",
		color: "#EFA7A1",
		fontSize: 18,
	},
	readButton: {
		marginTop: 40,
		borderWidth: 1,
		borderColor: "#EFA7A1",
		padding: 10,
	},
});