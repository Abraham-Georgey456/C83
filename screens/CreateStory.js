import React, { Component } from "react";
import { Text, View, Image, StyleSheet, SafeAreaView, Platform, StatusBar, Dimensions, TextInput, ScrollView} from "react-native";

import * as Font from "expo-font";
import { RFValue } from "react-native-responsive-fontsize";
import * as SplashScreen from 'expo-splash-screen';
import DropDownPicker from "react-native-dropdown-picker";

SplashScreen.preventAutoHideAsync();

let customFonts = {
	"Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf")
};

export default class CreateStory extends Component {
	constructor(props) {
		super(props);
		this.state = {
			fontsLoaded: false,
			previewImage:"image_1",
			dropdownheight:40
		};
	}

	async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	}

	render() {
		if (!this.state.fontsLoaded) {
			SplashScreen.hideAsync();
			let preview_images={
				image_1: require("../assets/story_image_1.png"),
				image_2: require("../assets/story_image_2.png"),
				image_3: require("../assets/story_image_3.png"),
				image_4: require("../assets/story_image_4.png"),
				image_5: require("../assets/story_image_5.png"),
			}
			console.log(this.state.previewImage)
			return(
			<View style={styles.container}>
				<SafeAreaView style={styles.droidSafeArea} />
				<View style={styles.appTitle}>
					<View style={styles.appIcon}>
						<Image
							source={require("../assets/logo.png")}
							style={styles.iconImage}
						></Image>
					</View>
					<View style={styles.appTitleTextContainer}>
						<Text style={styles.appTitleText}>New Story</Text>
					</View>
					<View style = {styles.fieldContainer}>
						<Image source={preview_images[this.state.previewImage]} style={styles.previewImage}></Image>
						<View style = {{height: RFvalue(this.state.dropdownheight)}}>
							<DropDownPicker 
							items={[
								{lable: "Image 1", value: "image_1"},
								{lable: "Image 2", value: "image_2"},
								{lable: "Image 3", value: "image_3"},
								{lable: "Image 4", value: "image_4"},
								{lable: "Image 5", value: "image_5"},
							]}
							defaultValue = {this.state.previewImage}
							open = {this.state.dropdownheight == 170 ? true: false}
							onOpen={()=>{
								this.setState({dropdownheight:170})
							}}
							onClose={()=>{
								this.setState({dropdownheight:40})
							}}
							style={{
								backgroundColor: "transparent",
								borderWidth: 1,
								borderColor: "white",
							}}
							textStyle={{
								color: this.state.dropdownheight == 170 ?'black' : 'white',
								fontFamily: "Bubblegum-Sans",
							}}
							onSelectItem={(item)=>{
								this.setState({previewImage: item.value})
							}}
							/>
						</View>
						<View>
							<ScrollView>
								<TextInput 
								style={styles.inputFont}
								onChange={(title)=>this.setState({title})}
								placeholder={"Title"}
                				placeholderTextColor="white"
								/>
								<TextInput 
								style={[
									styles.inputFont,
									styles.inputFontExtra,
									styles.inputTextBig,
								]}
								onChange={(description)=>this.setState({description})}
								placeholder={"Description"}
								multiline={true}
								numberOfLines={4}
                				placeholderTextColor="white"
								/>
								<TextInput 
								style={[
									styles.inputFont,
									styles.inputFontExtra,
									styles.inputTextBig,
								]}
								onChange={(story)=>this.setState({story})}
								placeholder={"Story"}
								multiline={true}
								numberOfLines={20}
                				placeholderTextColor="white"
								/>
								<TextInput 
								style={[
									styles.inputFont,
									styles.inputFontExtra,
									styles.inputTextBig,
								]}
								onChange={(moral)=>this.setState({moral})}
								placeholder={"Moral"}
								multiline={true}
								numberOfLines={4}
                				placeholderTextColor="white"
								/>
							</ScrollView>
						</View>
					</View>
					
				</View>
			</View>)
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#15193c"
	},
	droidSafeArea: {
		marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
	},
	appTitle: {
		flex: 0.07,
		flexDirection: "row"
	},
	appIcon: {
		flex: 0.3,
		justifyContent: "center",
		alignItems: "center"
	},
	iconImage: {
		width: "100%",
		height: "100%",
		resizeMode: "contain"
	},
	appTitleTextContainer: {
		flex: 0.7,
		justifyContent: "center"
	},
	appTitleText: {
		color: "white",
		fontSize: RFValue(28),
		fontFamily: "Bubblegum-Sans"
	},
	fieldContainer: {
		flex: 0.85,
	},
	previewImage: {
		width: "93%",
		height: RFValue(250),
		alignSelf: "center",
		borderRadius: RFValue(10),
		marginVertical: RFValue(10),
		resizeMode: "contain",
	  },
	  inputFont: {
		height: RFValue(40),
		borderColor: 'white',
		borderWidth: RFvalue(1),
		borderRadius: RFValue(10),
		paddingLeft: RFValue(10),
		color: "white",
		marginTop: RFValue(10),
		fontFamily: "Bubblegum-Sans",
	  },
	  inputFontExtra: {
		marginTop: RFValue(15),
	  },
	  inputTextBig: {
		textAlignVertical: "top",
		padding: RFValue(5),
	  },
})