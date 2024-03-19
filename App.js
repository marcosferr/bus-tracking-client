import "react-native-gesture-handler";

import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image } from "react-native";
import Feedback from "./screens/Feedback";
import Settings from "./screens/Settings";
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <Image
        source={{
          uri: "https://miautobus.app/wp-content/uploads/2023/01/cropped-logomiautobus.png",
        }}
        style={{ width: "100%", height: 200 }}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function App() {
  const Drawer = createDrawerNavigator();
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={CustomDrawerContent}
          screenOptions={{
            headerShown: false,
            drawerContentContainerStyle: {
              backgroundColor: "#dd671a",
              flex: 1,
            },
            drawerContentStyle: {
              backgroundColor: "#dd671a",
            },
            drawerLabelStyle: {
              color: "black",
              fontSize: 20,
              fontWeight: "bold",
            },
            drawerActiveTintColor: "black",

            drawerIcon: ({ focused, size }) => (
              <Icon
                name="bars"
                size={size}
                color={focused ? "white" : "black"}
              />
            ),
          }}
        >
          <Drawer.Screen name="Rutas" component={HomeScreen} />
          <Drawer.Screen name="Feedback" component={Feedback} />
          <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
