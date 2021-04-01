import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScrollView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import Footer from "../Footer/Footer";
import { conf } from "../../config/config";
import { Image } from "react-native";
import { Dimensions } from "react-native";
import { Link } from "react-router-native";

const deviceWidth = Dimensions.get("window").width;

const Challenge = (props) => {
	const [challenge, setChallenge] = useState([]);

	useEffect(() => {
		axios({
			method: "post",
			url: conf.backendUrl + "/challenge",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"8P~8HtbJ[azS5tUQc.j@^)c|f>]XzUf6=3?JYYq!5`)Hc33_",
			},
			data: {
				challenge_id: props.match.params.id,
			},
		})
			.then((response) => {
				setChallenge(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				{challenge.map((item) => {
					return (
						<View style={styles.challenge}>
							<Image
								source={{ uri: item.image }}
								style={{
									width: deviceWidth - 60,
									height: 300,
									resizeMode: "contain",
								}}
							/>
							<Text
								style={{
									textAlign: "center",
									fontSize: 20,
									fontWeight: "bold",
								}}
							>
								{item.title}
							</Text>
							<View style={styles.classes}>
								{item.classes.map((video, index) => {
									return (
										<Link
											to={"/video/" + video.video_id}
											style={{ marginBottom: 20 }}
										>
											<View>
												<Text
													style={{
														textAlign: "center",
														marginTop: 15,
														backgroundColor:
															"#EFA7A1",
														height: 30,
														paddingTop: 8,
														color: "#FFF",
														fontWeight: "bold",
													}}
												>
													Day {index + 1}
												</Text>
												<View>
													<Image
														source={{
															uri:
																video.class
																	.image,
														}}
														style={{
															width:
																deviceWidth -
																60,
															height: 200,
															resizeMode:
																"contain",
														}}
													/>
													<Text
														style={{
															textAlign: "center",
															fontSize: 18,
															marginTop: 10,
														}}
													>
														{video.title}
													</Text>
												</View>
											</View>
										</Link>
									);
								})}
							</View>
						</View>
					);
				})}
			</ScrollView>
			<Footer />
		</View>
	);
};

export default Challenge;

const styles = StyleSheet.create({
	challenge: {
		marginTop: 50,
	},
	classes: {
		marginTop: 30,
	},
});