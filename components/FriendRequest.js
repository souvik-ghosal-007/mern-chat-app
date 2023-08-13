import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { UserType } from "../UserContext";

const FriendRequest = ({ item, friendRequests, setFriendRequests }) => {
  const { userId, setUserId } = useContext(UserType);

  const navigation = useNavigation();

  const acceptRequest = async (FriendRequestId) => {
    try {
      const res = await fetch(
        "https://chat-app-backend-of1h.onrender.com/friend-request/accept",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: FriendRequestId,
            recipientId: userId,
          }),
        }
      );

      if (res.ok) {
        setFriendRequests(
          friendRequests.filter((req) => req._id !== FriendRequestId)
        );

        navigation.navigate("Chats");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        onPress={() => acceptRequest(item._id)}
        style={{ backgroundColor: "#0066b2", padding: 10, borderRadius: 6 }}
      >
        <Text style={{ textAlign: "center", color: "white" }}>Accept</Text>
      </Pressable>
    </Pressable>
  );
};

export default FriendRequest;
