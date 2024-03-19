import { View, Text } from "react-native";
import { useState } from "react";
import tw from "twrnc";
import Checkbox from "expo-checkbox";
const RouteOption = ({ line, lineName, color, id }) => {
  const [checked, setChecked] = useState(false);
  return (
    <View style={tw`flex flex-row justify-between items-center px-6`}>
      <View style={tw`rounded-full bg-red-300 p-4`}>
        <Text style={tw`text-white px-2 text-sm`}>{line}</Text>
      </View>
      <Text style={tw`text-black text-xl`}>{lineName}</Text>
      <Checkbox
        value={checked}
        onValueChange={() => {
          setChecked(!checked);
          console.log("checkbox hit");
        }}
        color={checked ? "#4DC5F9" : undefined}
        style={tw`rounded-full border-2 border-[#4DC5F9] p-4`}
      />
    </View>
  );
};

export default RouteOption;
