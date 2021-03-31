import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import PaymentView from "./PaymentView";
import axios from "axios";
import logo from "../assets/logo.png";
import { Image } from "react-native";
import { Redirect } from "react-router";

const Payment = () => {
	const [response, setResponse] = useState();
	const [makePayment, setMakePayment] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState("");

	const cartInfo = {
		id: "$5eruyt35eggr76476236523t3",
		description: "Pilates on Demand Premium",
		amount: 5,
	};

	const onCheckStatus = async (paymentResponse) => {
		setPaymentStatus("Please wait...");
		setResponse(paymentResponse);
		let jsonResponse = JSON.parse(paymentResponse);

		try {
			const stripeResponse = await axios.post(
				"http://54.226.157.211:3000/payment/",
				{
					email: "abhinandanjain13@gmail.com",
					product: cartInfo,
					authToken: jsonResponse,
				}
			);

			if (stripeResponse) {
				const { paid } = stripeResponse.data;
				if (paid === true) {
					setPaymentStatus("Payment successfull!");
				} else {
					setPaymentStatus("Payment failed!");
				}
			}
		} catch (error) {
			console.log(error);
			setPaymentStatus("Payment failed!");
		}
	};

	const paymentUI = () => {
		if (!makePayment) {
			return (
				<View
					style={{
						flexDirection: "column",
						justifyContent: "center",
						alignItems: "center",
						height: 300,
						marginTop: 50,
					}}
				>
					<Image
						source={logo}
						style={{
							width: 350,
							resizeMode: "contain",
							alignSelf: "center",
						}}
					/>
					<Text style={{ fontSize: 25, margin: 10 }}>
						Make Payment
					</Text>
					<Text style={{ fontSize: 16, margin: 10 }}>
						{cartInfo.description}
					</Text>
					<Text style={{ fontSize: 16, margin: 10 }}>
						Payable Amount: ${cartInfo.amount}
					</Text>

					<TouchableOpacity
						style={{
							height: 60,
							width: 300,
							backgroundColor: "#EFA7A1",
							borderRadius: 30,
							justifyContent: "center",
							alignItems: "center",
						}}
						onPress={() => {
							setMakePayment(true);
						}}
					>
						<Text style={{ fontSize: 20, color: "#FFF" }}>
							Proceed to Pay
						</Text>
					</TouchableOpacity>
				</View>
			);
		} else {
			console.log(response);
			if (response !== undefined) {
				return (
					<View
						style={{
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
							height: 300,
							marginTop: 50,
						}}
					>
						<Text style={{ fontSize: 25, margin: 10 }}>
							{paymentStatus}
						</Text>
						<Text style={{ fontSize: 16, margin: 10 }}>
							{response}
						</Text>
					</View>
				);
			} else {
				return (
					<PaymentView
						onCheckStatus={onCheckStatus}
						product={cartInfo.description}
						amount={cartInfo.amount}
					/>
				);
			}
		}
	};

	return <View style={styles.container}>{paymentUI()}</View>;
	// paymentStatus === "Payment failed!" ? (
	// 	<Redirect to="/h/0" />
	// ) : (
	// <View style={styles.container}>{paymentUI()}</View>
	// );
};

export default Payment;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 100,
	},
	navigation: { flex: 2, backgroundColor: "red" },
	body: {
		flex: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "yellow",
	},
	footer: { flex: 1, backgroundColor: "cyan" },
});
