import React, { useEffect, useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	ScrollView,
	View,
	Image,
	TouchableOpacity,
	TouchableHighlight,
	ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import Footer from "../Footer/Footer";
import SectionHead from "../SectionHead";
import pelvic from "../../assets/pelvic2.png";
import hip from "../../assets/hip.png";
import morning from "../../assets/morning.png";
import { Link, Redirect } from "react-router-native";
import axios from "axios";
import { conf } from "../../config/config";

const deviceWidth = Dimensions.get("window").width;

const Classes = () => {
	const [classes, setClasses] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios({
			method: "post",
			url: conf.backendUrl + "/classes",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"8P~8HtbJ[azS5tUQc.j@^)c|f>]XzUf6=3?JYYq!5`)Hc33_",
			},
		})
			.then((response) => {
				setClasses(response.data);
			})
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{ alignItems: "center" }}
				style={styles.container}
			>
				<View style={styles.header}>
					<Text style={styles.headerText}>Classes</Text>
					{/* <View style={styles.textInput}>
						<TextInput style={styles.headerInput}>Filter</TextInput>
						<Icon
							name="arrow-alt-circle-down"
							style={styles.arrowIcon}
							size={20}
						/>
					</View> */}
				</View>
				<View style={styles.featured}>
					{/* <SectionHead text="Get Started" /> */}

					{isLoading ? (
						<View>
							<ActivityIndicator size="large" color="#EFA7A1" />
							<Text style={{ marginTop: 20 }}>
								Loading Classes...
							</Text>
						</View>
					) : (
						classes.map((cls) => {
							return cls.vimeo_id ? (
								<Link
									key={cls.class_id}
									to={"/class/" + cls.class_id}
									underlayColor="#efefef"
									style={{
										marginBottom: 30,
										width: 350,
										// padding: 10,
										// borderBottomWidth: 1,
									}}
								>
									<View>
										<Image
											source={{ uri: cls.image }}
											style={{
												width: deviceWidth - 60,
												height: 200,
												resizeMode: "contain",
											}}
										/>
										<Text
											style={{
												fontSize: 18,
												marginTop: 8,
											}}
										>
											{cls.title}
										</Text>
										<View
											style={{
												flexDirection: "row",
												justifyContent: "space-between",
											}}
										>
											<Text>By: {cls.instructor}</Text>
											<Text>
												Duration: {cls.duration}
											</Text>
										</View>
										<Text>{cls.content}</Text>
										<Text>{cls.excerpt}</Text>
									</View>
								</Link>
							) : null;
						})
					)}

					{/* <Link to="/category/pelvic">
						<View style={{ alignItems: "center" }}>
							<Image source={pelvic} style={styles.featImage} />
							<Text>Pelvic Floor and Arms</Text>
						</View>
					</Link> */}
				</View>
				{/* <View style={styles.trending}>
					<SectionHead text="Trending Classes" />
					<TouchableOpacity style={styles.seeMore}>
						<Text>See More &gt;&gt;</Text>
					</TouchableOpacity>
					<Image source={hip} style={styles.imageTrending} />
					<Image source={morning} style={styles.imageTrending} />
				</View>
				<View style={styles.classes}>
					<SectionHead text="Classes By Level" />
					<TouchableOpacity style={styles.button}>
						<Text style={styles.classesText}>Beginners</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.classesText}>Intermediate</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.classesText}>Advanced</Text>
					</TouchableOpacity>
				</View> */}
			</ScrollView>
			<Footer />
		</View>
	);
};

export default Classes;

const styles = StyleSheet.create({
	header: {
		marginTop: 50,
		marginBottom: 5,
	},
	headerText: {
		fontSize: 24,
		color: "#EFA7A1",
		textAlign: "center",
		marginBottom: 5,
	},
	headerInput: {
		borderRadius: 50,
		borderWidth: 1,
		width: deviceWidth - 60,
		height: 35,
		paddingLeft: 20,
		fontSize: 18,
		color: "#EFA7A1",
	},
	textInput: {
		position: "relative",
	},
	arrowIcon: {
		position: "absolute",
		right: 10,
		top: 7,
		color: "#EFA7A1",
	},
	featured: {
		alignItems: "center",
		marginTop: 20,
	},
	featImage: {
		marginTop: 20,
		marginBottom: 10,
	},
	trending: {
		alignItems: "center",
	},
	seeMore: {
		alignSelf: "flex-end",
		marginTop: 10,
		marginRight: 15,
		marginBottom: 20,
	},
	imageTrending: {
		marginVertical: 10,
	},
	classes: {
		alignItems: "center",
	},
	button: {
		marginTop: 20,
		borderWidth: 1,
		width: deviceWidth - 160,
		height: 50,
		borderRadius: 50,
		justifyContent: "center",
		borderColor: "#EFA7A1",
	},
	classesText: {
		textAlign: "center",
		color: "#EFA7A1",
	},
});
