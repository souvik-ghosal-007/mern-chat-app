import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const UserChat = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Messages", {
          recipientId: item._id,
        })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 0.7,
        borderColor: "#d0d0d0",
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightColor: 0,
        padding: 10,
      }}
    >
      <Image
        style={{ height: 50, width: 50, borderRadius: 25, resizeMode: "cover" }}
        source={{ uri: item.image }}
      />
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: "500" }}>{item.name}</Text>
        <Text style={{ marginTop: 3, color: "gray", fontWeight: "500" }}>
          Hello, How are you ?
        </Text>
      </View>
      <View>
        <Text style={{ fontSize: 13, fontWeight: "400", color: "#585858" }}>
          3:00 pm
        </Text>
      </View>
    </Pressable>
  );
};

export default UserChat;
