import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ height: 50, width: 50, borderRadius: 25 }}
      />
      <Text
        style={{
          marginHorizontal: 10,
          flex: 1,
          fontWeight: "500",
          fontSize: 14,
        }}
      >
        {item?.name} sent you a friend request.
      </Text>

      <Pressable
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;
