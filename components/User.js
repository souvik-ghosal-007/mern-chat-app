import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const User = ({ item }) => {
  return (
    <Pressable
      style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}
    >
      <View>
        <Image
          source={{ uri: item.image }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            resizeMode: "cover",
          }}
        />
      </View>

      <View style={{ marginLeft: 12, flex: 1 }}>
        <Text style={{ fontWeight: "900", fontSize: 16, letterSpacing: 0.5 }}>
          {item?.name}
        </Text>
        <Text style={{ marginTop: 4, color: "grey" }}>{item?.email}</Text>
      </View>

      <Pressable
        style={{
          backgroundColor: "#567189",
          padding: 10,
          borderRadius: 6,
          width: 105,
        }}
      >
        <Text style={{ textAlign: "center", color: "white", fontSize: 14 }}>
          Add Friend
        </Text>
      </Pressable>
    </Pressable>
  );
};

export default User;
