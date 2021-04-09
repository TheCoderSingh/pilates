import React, { useEffect, useState } from "react";
import {
	AsyncStorage,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import { Link, Redirect } from "react-router-native";
import logo from "../../assets/logo.png";
import Footer from "../Footer/Footer";
import axios from "axios";
import { conf } from "../../config/config";

const deviceWidth = Dimensions.get("window").width;

const SignIn = () => {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [loggedIn, setLoggedIn] = useState(false);
	const [userId, setUserId] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState();

	useEffect(() => {
		let isCancelled = false;

		let x = getLoggedIn();

		x.then((res) => {
			if (res) {
				let uid = getUserId();
				uid.then((response) => {
					if (!isCancelled) setUserId(response);
				}).catch((error) => {
					console.log(error);
				});
				setLoggedIn(true);
			} else {
				setLoggedIn(false);
			}
		});

		return () => {
			isCancelled = true;
		};
	}, []);

	const login = () => {
		if (
			!username ||
			username.trim() === "" ||
			username === undefined ||
			typeof username === undefined
		) {
			setError(true);
			setErrorText("Please enter a valid username.");
		} else if (
			!password ||
			password.trim() === "" ||
			password === undefined ||
			typeof password === undefined
		) {
			setError(true);
			setErrorText("Please enter a valid password.");
		} else {
			setIsLoading(true);
			axios({
				method: "post",
				url: conf.backendUrl + "/validate_user",
				headers: {
					"Content-Type": "application/json",
					Authorization:
						"8P~8HtbJ[azS5tUQc.j@^)c|f>]XzUf6=3?JYYq!5`)Hc33_",
				},
				data: {
					username: username,
					user_password: password,
				},
			})
				.then((response) => {
					setUserId(response.data.id);
					setLoggedIn(true);
					storeLoggedIn();
					storeUserId(response.data.id);
					setIsLoading(false);
				})
				.catch((error) => {
					console.log(error);
					setIsLoading(false);
				});
		}
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
		<Redirect to={"/home/1/" + userId} />
	) : (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				<Image source={logo} style={styles.logo} />
				{error ? (
					<Text style={{ color: "red" }}>{errorText}</Text>
				) : null}
				<TextInput
					placeholder="Username"
					style={styles.input}
					onChangeText={setUsername}
				/>
				<TextInput
					placeholder="Password"
					style={styles.input}
					onChangeText={setPassword}
					secureTextEntry={true}
				/>

				{isLoading ? (
					<View>
						<ActivityIndicator size="large" color="#EFA7A1" />
						<Text style={{ marginTop: 20 }}></Text>
					</View>
				) : null}

				<TouchableOpacity style={styles.btn} onPress={login}>
					<Text style={styles.btnTxt}>Sign In</Text>
				</TouchableOpacity>

				<Text style={styles.memberTxt}>Not a member yet?</Text>
				<Link to="/register" style={styles.btn}>
					<Text style={styles.btnTxt}>Register</Text>
				</Link>
			</ScrollView>
			{/* <Footer /> */}
		</View>
	);
};

export default SignIn;

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
		width: deviceWidth,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 20,
		marginTop: 30,
	},
	memberTxt: {
		color: "#EFA7A1",
	},
	btnTxt: {
		color: "#fff",
	},
});
