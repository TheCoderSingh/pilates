import React, { useEffect, useState } from "react";
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	ScrollView,
	Image,
	TouchableOpacity,
	Button,
	AsyncStorage,
	ActivityIndicator,
} from "react-native";
import axios from "axios";
import Footer from "../Footer/Footer";
import logo from "../../assets/logo.png";
import group from "../../assets/group.jpg";
import pilates from "../../assets/pilates.png";
import yoga from "../../assets/yoga.png";
import barre from "../../assets/barre.png";
import meditation from "../../assets/meditation.png";
import modified from "../../assets/modified.png";
import prenatal from "../../assets/prenatal.png";
import postnatal from "../../assets/postnatal.png";
import pelvic from "../../assets/pelvic.png";
import { Link } from "react-router-native";
import { conf } from "../../config/config";

const deviceWidth = Dimensions.get("window").width;

const Home = (props) => {
	const [user, setUser] = useState([]);
	const [loggedin, setLoggedin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		// console.log("loogeduserid",getUserId());
		// console.log("redirected user",props.match.params.loggedin);
		// console.log("userinfo",getUserInfo());
		// console.log("getLoggedIn",getLoggedIn());
		let loggedInId = "";
		async function retrieveData() {
			const uid = await AsyncStorage.getItem("@userid");

			loggedInId = uid;

			if (
				props.match.params.loggedin ||
				(loggedInId != "" && loggedInId != null)
			) {
				const id =
					loggedInId != "" ? loggedInId : props.match.params.loggedin;

				setIsLoading(true);
				axios({
					method: "post",
					url: conf.backendUrl + "/user",
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"8P~8HtbJ[azS5tUQc.j@^)c|f>]XzUf6=3?JYYq!5`)Hc33_",
					},
					data: {
						user_id: id,
					},
				})
					.then((response) => {
						setUser(response.data);
						setIsLoading(false);
					})
					.then(() => {
						setLoggedin(true);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		retrieveData();
	}, []);

	const storeLoggedIn = async () => {
		try {
			await AsyncStorage.setItem("@loggedin", "no");
			await AsyncStorage.removeItem("@userid");
			setLoggedin(false);
		} catch (error) {
			console.log(error);
		}
	};

	const storeUserId = async (uid) => {
		try {
			await AsyncStorage.setItem("@userid", uid.toString());
		} catch (error) {
			console.log(error);
		}
	};

	const getLoggedIn = async () => {
		try {
			const loggedin = await AsyncStorage.getItem("@loggedin");
			if (loggedin === "yes") return true;
			else return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	const getUserId = async () => {
		try {
			const uid = await AsyncStorage.getItem("@userid");
			return uid;
		} catch (error) {
			console.log(error);
		}
	};

	const getUserInfo = async () => {
		try {
			const userinfo = await AsyncStorage.getItem("@userinfo");
			return userinfo;
		} catch (error) {
			console.log("error");
			return false;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={styles.contentCont}>
				{/* {loggedin ? (
					<TouchableOpacity
						onPress={() => {
							try {
								storeLoggedIn();
								return true;
							} catch (error) {
								return false;
							}
						}}
						style={{
							alignSelf: "flex-end",
							marginRight: 10,
							fontSize: 16,
						}}
					>
						<Text>Logout</Text>
					</TouchableOpacity>
				) : null} */}
				<Image source={logo} style={styles.logo} />
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginLeft: 20,
						marginBottom: 20,
					}}
				>
					{loggedin ? (
						<View style={{ flexDirection: "row" }}>
							<Text style={{ fontSize: 22 }}>Welcome </Text>
							<Text style={{ fontSize: 22, color: "#EFA7A1" }}>
								{user.first_name}
							</Text>
						</View>
					) : null}
					{isLoading ? (
						<View>
							<ActivityIndicator size="large" color="#EFA7A1" />
						</View>
					) : null}
				</View>

				<Image source={group} style={styles.image} />
				<View style={styles.text}>
					<Text>MOVEMENT THAT WORKS BEST FOR YOU</Text>
					<Text>Online classes for Every BODY</Text>
				</View>

				{loggedin ? null : (
					<View style={styles.buttons}>
						{/* <Link to="/register" style={styles.button}>
							<Text style={styles.buttonText}>
								Try 14 days for free
							</Text>
						</Link> */}
						<Link to="/sign-in" style={styles.button}>
							<Text style={styles.buttonText}>Sign In</Text>
						</Link>
					</View>
				)}
				<View style={styles.text}>
					<Text>CLASSES THAT FIT YOU</Text>
					<Text>ANYWHERE. ANYTIME. ANY SKILL LEVEL.</Text>
				</View>

				{loggedin ? (
					<View style={styles.categories}>
						<Link to="/category/pilates" style={styles.category}>
							<Image
								source={pilates}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/category/yoga" style={styles.category}>
							<Image source={yoga} style={styles.categoryImage} />
						</Link>
						<Link to="/category/barre" style={styles.category}>
							<Image
								source={barre}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/category/meditation" style={styles.category}>
							<Image
								source={meditation}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/category/modif" style={styles.category}>
							<Image
								source={modified}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/category/prenatal" style={styles.category}>
							<Image
								source={prenatal}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/category/postnatal" style={styles.category}>
							<Image
								source={postnatal}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/category/pelvic" style={styles.category}>
							<Image
								source={pelvic}
								style={styles.categoryImage}
							/>
						</Link>
					</View>
				) : (
					<View style={styles.categories}>
						<Link to="/sign-in" style={styles.category}>
							<Image
								source={pilates}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/sign-in" style={styles.category}>
							<Image source={yoga} style={styles.categoryImage} />
						</Link>
						<Link to="/sign-in" style={styles.category}>
							<Image
								source={barre}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/sign-in" style={styles.category}>
							<Image
								source={meditation}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/sign-in" style={styles.category}>
							<Image
								source={modified}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/sign-in" style={styles.category}>
							<Image
								source={prenatal}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/sign-in" style={styles.category}>
							<Image
								source={postnatal}
								style={styles.categoryImage}
							/>
						</Link>
						<Link to="/signin" style={styles.category}>
							<Image
								source={pelvic}
								style={styles.categoryImage}
							/>
						</Link>
					</View>
				)}
			</ScrollView>
			<Footer />
		</View>
	);
};

const styles = StyleSheet.create({
	contentCont: {
		marginTop: 50,
	},
	logo: {
		width: 300,
		resizeMode: "contain",
		alignSelf: "center",
	},
	image: {
		height: 250,
		resizeMode: "contain",
		alignSelf: "center",
	},
	text: {
		alignItems: "center",
		marginTop: 20,
	},
	buttons: {
		alignSelf: "center",
		marginTop: 10,
	},
	button: {
		borderColor: "#EFA7A1",
		borderWidth: 1,
		padding: 20,
		borderRadius: 50,
		width: 250,
		alignItems: "center",
		marginTop: 30,
	},
	buttonText: {
		color: "#EFA7A1",
	},
	categories: {
		justifyContent: "center",
		marginTop: 30,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	category: {
		margin: 15,
	},
});

export default Home;
