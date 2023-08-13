import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { UserType } from "../UserContext";

const ChatsScreen = () => {
  const { userId, setUserId } = useContext(UserType);

  const [acceptedFriends, setAcceptedFriends] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        
      } catch (error) {
        console.log(error);
      }
    }
  })

  return (
    <View>
      <Text>ChatsScreen</Text>
    </View>
  );
};

export default ChatsScreen;
