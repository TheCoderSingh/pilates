import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview";
import axios from "axios";
import Footer from "../Footer/Footer";
import { conf } from "../../config/config";

const deviceWidth = Dimensions.get("window");

const Class = (props) => {
	const [cls, setClass] = useState([]);
	const [video, setVideo] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	let vid;

	useEffect(() => {
		axios({
			method: "post",
			url: conf.backendUrl+"/class",
			headers: {
				"Content-Type": "application/json",
				Authorization:
					"8P~8HtbJ[azS5tUQc.j@^)c|f>]XzUf6=3?JYYq!5`)Hc33_",
			},
			data: {
				class_id: props.match.params.id,
			},
		})
			.then((response) => {
				setClass(response.data);
				response.data.forEach((element) => {
					vid = element.vimeo_id;
				});
			})
			.then(() => {
				setIsLoading(false);
				if (vid) {
					axios
						.get(conf.apiUrl+"/video/"+vid)
						.then((response) => {
							setVideo(response.data);
						})
						.catch((error) => {
							console.log(error);
						});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{ alignItems: "center", marginTop: 50 }}
			>
				{isLoading ? (
					<View>
					<ActivityIndicator size="large" color="#EFA7A1" />
					<Text style={{ marginTop: 20 }}>
						Loading Class...
					</Text>
				</View>
				) : (
					<>
				<View style={{ maxHeight: 300 }}>
					{typeof video.embed !== "undefined" ? (
						<WebView
							source={{
								html: video.embed.html
									.replace("1920", "1024")
									.replace("1080", "786"),
							}}
							scrollEnabled={false}
							style={{
								marginTop: 20,
								width: 320,
								height: 230,
							}}
						/>
					) : null}
				</View>
				<View
					style={{
						alignItems: "center",
						width: 500,
						height: 300,
					}}
				>
					{cls.map((element) => {
						return (
							<View style={{ width: 380 }} key={element.title}>
								<Text style={{ fontSize: 20 }}>
									{element.title}
								</Text>
								<Text>By: {element.instructor}</Text>
								<Text>Duration: {element.duration}</Text>
								<Text>{element.content}</Text>
								<Text style={{ fontSize: 16 }}>
									{element.excerpt}
								</Text>
								<Text>{element.style}</Text>
								<Text>Levels:</Text>
								{element.difficulty.map((diff) => {
									return (
										<Text key={diff}>
											{diff.replace(/^\w/, (c) =>
												c.toUpperCase()
											)}
										</Text>
									);
								})}
								<Text>{element.series}</Text>
								<Text>Equipment Required:</Text>
								{element.equipment.map((equip) => {
									return <Text key={equip}>{equip}</Text>;
								})}
								<Text style={{ marginTop: 10 }}>Focus:</Text>
								{element.focus.map((foc) => {
									return <Text key={foc}>{foc}</Text>;
								})}
							</View>
						);
					})}
				</View>
				</>
				)}
			</ScrollView>
			<Footer />
		</View>
	);
};

export default Class;

const styles = StyleSheet.create({});
