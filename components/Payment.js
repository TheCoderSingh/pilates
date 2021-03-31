import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import PaymentView from "./PaymentView";
import axios from "axios";
import logo from "../assets/logo.png";
import { Image } from "react-native";
import { Redirect } from "react-router";
import { ScrollView } from "react-native";

const Payment = () => {
	const [response, setResponse] = useState();
	const [makePayment, setMakePayment] = useState(false);
	const [paymentStatus, setPaymentStatus] = useState("");
	const [payableAmount, setPayableAmount] = useState(0);

	const cartInfo = {
		id: "$5eruyt35eggr76476236523t3",
		description: "Pilates on Demand Premium",
		amount: payableAmount,
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
				<ScrollView
					style={{
						flexDirection: "column",
						// justifyContent: "center",
						// alignItems: "center",
						height: 300,
						marginTop: 50,
					}}
					contentContainerStyle={{
						justifyContent: "center",
						alignItems: "center",
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
					<Text style={styles.plansHead}>Plans</Text>
					<View style={styles.plans}>
						<TouchableOpacity
							style={styles.plan}
							onPress={() => {
								setPayableAmount(4.99);
							}}
						>
							<Text style={styles.planDuration}>1 Month</Text>
							<Text style={styles.monthlyCost}>
								$4.99 per month
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.plan}
							onPress={() => {
								setPayableAmount(23.94);
							}}
						>
							<Text style={styles.planDuration}>6 Months</Text>
							<Text style={styles.planPrice}>$23.94</Text>
							<Text style={styles.monthlyCost}>
								$3.99 per month
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.plan}
							style={styles.plan}
							onPress={() => {
								setPayableAmount(35.88);
							}}
						>
							<Text style={styles.planDuration}>1 Year</Text>
							<Text style={styles.planPrice}>$35.88</Text>
							<Text style={styles.monthlyCost}>
								$2.99 per month
							</Text>
						</TouchableOpacity>
					</View>
					<Text style={{ fontSize: 25, margin: 10 }}>
						Make Payment
					</Text>
					{/* <Text style={{ fontSize: 16, margin: 10 }}>
						{cartInfo.description}
					</Text> */}
					<Text style={{ fontSize: 16, margin: 10 }}>
						Payable Amount: ${payableAmount}
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
							if (payableAmount !== 0) setMakePayment(true);
						}}
					>
						<Text style={{ fontSize: 20, color: "#FFF" }}>
							Proceed to Pay
						</Text>
					</TouchableOpacity>
				</ScrollView>
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
						amount={payableAmount}
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
		// marginTop: 50,
	},
	navigation: { flex: 2 },
	body: {
		flex: 10,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "yellow",
	},
	footer: { flex: 1 },
	plans: {
		marginTop: 30,
	},
	plansHead: {
		fontSize: 28,
	},
	plan: {
		alignItems: "center",
		backgroundColor: "#EFA7A1",
		padding: 10,
		width: 250,
		marginBottom: 20,
		minHeight: 95,
		borderRadius: 3,
	},
	planDuration: {
		fontSize: 20,
		marginBottom: 10,
	},
	planPrice: {
		fontSize: 20,
		color: "#fff",
	},
	monthlyCost: {
		marginTop: 10,
	},
});
