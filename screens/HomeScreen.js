import {
  View,
  Text,
  Button,
  SafeAreaView,
  Dimensions,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicon from "react-native-vector-icons/Ionicons";
import tw from "twrnc";
import { TouchableOpacity } from "react-native-gesture-handler";
import Map from "../components/Map";
import SwipeModal from "@birdwingo/react-native-swipe-modal";
import RouteOption from "../components/RouteOption";

const HomeComponent = () => {
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  const modalRef = useRef(null);
  const mapRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;
  const modalHeight = screenHeight * 0.8; // 80% of the screen height
  const showModal = () => modalRef.current?.show();
  // const hideModal = () => modalRef.current?.hide();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  console.log(location);

  const updateLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    mapRef.current.animateToRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };
  return (
    <View style={tw`flex-grow flex-1`}>
      <Map location={location} ref={mapRef} />
      <View style={tw`absolute bottom-5 w-full pl-10 `}>
        <TouchableOpacity
          onPress={() => {
            showModal();
          }}
          style={[
            tw`p-3 flex-row bg-blue-500 items-center rounded-xl`,
            { bottom: 20, right: 20 },
          ]}
        >
          <Icon name="bus" size={30} color="black" />
          <Text style={tw`text-white mx-4`}>Seleccionar Rutas</Text>
        </TouchableOpacity>
      </View>
      <View style={tw`absolute top-10 left-5 z-50 p-3 rounded-full bg-white`}>
        <TouchableOpacity
          onPress={() => {
            navigation.toggleDrawer();
          }}
        >
          <Icon name="bars" size={30} />
        </TouchableOpacity>
      </View>
      <View
        style={tw`absolute bottom-30 left-5 z-50 p-3 rounded-full bg-white`}
      >
        <TouchableOpacity
          onPress={() => {
            updateLocation();
          }}
        >
          <Ionicon name="locate" size={30} />
        </TouchableOpacity>
      </View>

      <SwipeModal
        ref={modalRef}
        bg="white"
        maxHeight={modalHeight}
        style={tw`bg-white rounded-t-3xl`}
        scrollEnabled={true}
      >
        <View style={tw`flex flex-1`}>
          <RouteOption line="1" lineName="Ruta 1" color="red" id={1} />
        </View>
      </SwipeModal>
    </View>
  );
};

function HomeScreen() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeComponent} />
    </Stack.Navigator>
  );
}

export default HomeScreen;

const routes = [
  { line: "1", lineName: "Ruta 1", color: "red", id: 1 },
  { line: "2", lineName: "Ruta 2", color: "blue", id: 2 },
  { line: "3", lineName: "Ruta 3", color: "green", id: 3 },
  { line: "4", lineName: "Ruta 4", color: "yellow", id: 4 },
  { line: "5", lineName: "Ruta 5", color: "purple", id: 5 },
];
