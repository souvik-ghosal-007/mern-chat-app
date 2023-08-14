import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import EmojiModal from "react-native-emoji-modal";
import EmojiPicker from "rn-emoji-keyboard";
import { UserType } from "../UserContext";

const ChatMessagesScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [recipientData, setRecipientData] = useState();
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const handleEmojiPress = () => {
    Keyboard.dismiss();
    setShowEmojiSelector(!showEmojiSelector);
  };

  const route = useRoute();
  const { recipientId } = route.params;

  const handleSend = async (messageType, imageUri) => {
    try {
      const formData = new FormData();

      formData.append("senderId", userId);
      formData.append("recipientId", recipientId);

      if (messageType === "image") {
        formData.append("messageType", "image");
        formData.append("image", {
          uri: imageUri,
          name: "image.jpg",
          type: "image/jpeg",
        });
      } else {
        formData.append("messageType", "text");
        formData.append("messageText", message);
      }

      console.log(formData);

      const res = await fetch(
        "https://chat-app-backend-of1h.onrender.com/messages",
        {
          method: "POST",
          body: formData,
        }
      );

      if (res.ok) {
        setMessage("");
        setSelectedImage("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRecipientData = async () => {
      try {
        const res = await axios.get(
          `https://chat-app-backend-of1h.onrender.com/user/${recipientId}`
        );

        setRecipientData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRecipientData();
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={26}
            color="black"
          />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 15,
                resizeMode: "cover",
              }}
              source={{ uri: recipientData?.image }}
            />

            <Text style={{ marginLeft: 5, fontSize: 15, fontWeight: "bold" }}>
              {recipientData?.name}
            </Text>
          </View>
        </View>
      ),
    });
  }, [recipientData]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `https://chat-app-backend-of1h.onrender.com/messages/messages/${senderId}/${recipientId}`
      );

      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  });

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <ScrollView></ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderTopWidth: 1,
          borderColor: "#dddddd",
          margin: 10,
          gap: 5,
          backgroundColor: "#36454f",
          borderRadius: 50,
        }}
      >
        <MaterialIcons
          onPress={handleEmojiPress}
          style={{ padding: 5 }}
          name="emoji-emotions"
          size={26}
          color="#D3D3D3"
        />
        <TextInput
          style={{
            flex: 1,
            height: 40,
            fontSize: 18,
            borderColor: "#dddddd",
            borderRadius: 25,
            paddingHorizontal: 10,
            fontWeight: "500",
            color: "#D3D3D3",
          }}
          placeholder="Message"
          placeholderTextColor="#D3D3D3"
          value={message}
          onChangeText={(text) => setMessage(text)}
          onPressIn={() => setShowEmojiSelector(false)}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginHorizontal: 8,
          }}
        >
          <Entypo name="camera" size={26} color="#D3D3D3" />

          <MaterialIcons name="mic" size={26} color="#D3D3D3" />
        </View>

        <Pressable
          onPress={() => handleSend("text")}
          style={{
            backgroundColor: "#D3D3D3",
            padding: 10,
            borderRadius: 50,
          }}
        >
          <MaterialIcons name="send" size={26} color="#36454f" />
        </Pressable>
      </View>
      {showEmojiSelector && (
        <EmojiModal
          onEmojiSelected={(emoji) => {
            setMessage((prev) => prev + emoji);
          }}
          columns={10}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;
