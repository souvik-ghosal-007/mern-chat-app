import React, { useContext, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { UserType } from "../UserContext";

const User = ({ item }) => {
  const { userId, setUserId } = useContext(UserType);

  const [requestSent, setRequestSent] = useState(false);

  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const res = await fetch(
        "https://chat-app-backend-of1h.onrender.com/friend-request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentUserId, selectedUserId }),
        }
      );

      if (res.ok) {
        setRequestSent(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        onPress={() => sendFriendRequest(userId, item._id)}
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
