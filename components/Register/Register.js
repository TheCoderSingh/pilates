import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	AsyncStorage,
	ActivityIndicator,
} from "react-native";
import { Link, Redirect } from "react-router-native";
import logo from "../../assets/logo.png";
import Footer from "../Footer/Footer";
import axios from "axios";
import { conf } from "../../config/config";

const deviceWidth = Dimensions.get("window").width;

const Register = () => {
	const [firstName, setFirstName] = useState();
	const [lastName, setLastName] = useState();
	const [email, setEmail] = useState();
	const [addressone, setAddressOne] = useState();
	const [addresstwo, setAddressTwo] = useState();
	const [city, setCity] = useState();
	const [userState, setUserState] = useState();
	const [country, setCountry] = useState();
	const [zip, setZip] = useState();
	const [password, setPassword] = useState();
	const [username, setUsername] = useState();
	const [loggedIn, setLoggedIn] = useState(false);
	const [userId, setUserId] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [state, setState] = useState({});

	useEffect(() => {
		// let isCancelled = false;
		// let x = getLoggedIn();
		// x.then((res) => {
		// 	if (res) {
		// 		let uid = getUserId();
		// 		uid.then((response) => {
		// 			if (!isCancelled) setUserId(response);
		// 		}).catch((error) => {
		// 			console.log(error);
		// 		});
		// 		setLoggedIn(true);
		// 	} else {
		// 		setLoggedIn(false);
		// 	}
		// });
		// return () => {
		// 	setState({}); // This worked for me
		// };
	}, []);

	const register = () => {
		setIsLoading(true);
		axios({
			method: "post",
			url: conf.backendUrl + "/register",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"8P~8HtbJ[azS5tUQc.j@^)c|f>]XzUf6=3?JYYq!5`)Hc33_",
			},
			data: {
				username: username,
				password: password,
				email: email,
				first_name: firstName,
				last_name: lastName,
				addressone: addressone,
				addresstwo: addresstwo,
				city: city,
				state: userState,
				zip: zip,
				country: country,
			},
		})
			.then((response) => {
				console.log(response.data);
				setUserId(response.data.id);
				setLoggedIn(true);
				storeLoggedIn();
				storeUserId(response.data.id);
				setIsLoading(false);
				console.log("newuser id", userId);
			})
			.catch((error) => {
				console.log(error);
				setIsLoading(false);
			});
	};

	const storeLoggedIn = async () => {
		try {
			await AsyncStorage.setItem("@loggedin", "yes");
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

	return loggedIn ? (
		// <Redirect to={"/home/1/" + userId} />
		<Redirect to={"/pay/" + userId} />
	) : (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				<Image source={logo} style={styles.logo} />
				<TextInput
					placeholder="First Name"
					style={styles.input}
					onChangeText={setFirstName}
				/>
				<TextInput
					placeholder="Last Name"
					style={styles.input}
					onChangeText={setLastName}
				/>
				<TextInput
					placeholder="Address Line 1"
					style={styles.input}
					onChangeText={setAddressOne}
				/>
				<TextInput
					placeholder="Address Line 2"
					style={styles.input}
					onChangeText={setAddressTwo}
				/>
				<TextInput
					placeholder="City"
					style={styles.input}
					onChangeText={setCity}
				/>
				<TextInput
					placeholder="State/Province"
					style={styles.input}
					onChangeText={setUserState}
				/>
				<TextInput
					placeholder="Country"
					style={styles.input}
					onChangeText={setCountry}
				/>
				<TextInput
					placeholder="ZIP/Postal Code"
					style={styles.input}
					onChangeText={setZip}
				/>
				<TextInput
					placeholder="Username"
					style={styles.input}
					onChangeText={setUsername}
				/>
				<TextInput
					placeholder="Email"
					style={styles.input}
					onChangeText={setEmail}
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					onChangeText={setPassword}
					secureTextEntry={true}
				/>
				<TextInput
					placeholder="Confirm Password"
					style={styles.input}
					secureTextEntry={true}
				/>

				{isLoading ? (
					<View>
						<ActivityIndicator size="large" color="#EFA7A1" />
						<Text style={{ marginTop: 20 }}>
							Loading Classes...
						</Text>
					</View>
				) : null}
				<TouchableOpacity style={styles.btn} onPress={register}>
					<Text style={styles.btnTxt}>Register</Text>
				</TouchableOpacity>
				<Text>Already a member?</Text>
				<Link to="/sign-in" style={styles.btn}>
					<Text style={styles.btnTxt}>Sign In</Text>
				</Link>
			</ScrollView>
			<Footer />
		</View>
	);
};

export default Register;

const styles = StyleSheet.create({
	logo: {
		marginTop: 50,
		width: deviceWidth - 100,
		resizeMode: "contain",
	},
	input: {
		width: deviceWidth - 50,
		borderWidth: 1,
		marginVertical: 10,
		borderColor: "#EFA7A1",
		padding: 20,
	},
	btn: {
		backgroundColor: "#EFA7A1",
		width: 100,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 30,
		marginTop: 20,
	},
	btnTxt: {
		color: "#fff",
	},
});
