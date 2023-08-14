import { Entypo, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import EmojiInput from "react-native-emoji-input";
import EmojiSelector from "react-native-emoji-selector";
import EmojiPicker from "rn-emoji-keyboard";

const ChatMessagesScreen = () => {
  const [showEmojiSelector, setShowEmojiSelector] = useState(false);
  const [message, setMessage] = useState("");
  const handleEmojiPress = () => {
    Keyboard.dismiss();
    setShowEmojiSelector(!showEmojiSelector);
  };

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
        <EmojiPicker
          onEmojiSelected={({ emoji }) => {
            setMessage((prev) => prev + emoji);
          }}
          style={{ height: 250 }}
          open={showEmojiSelector}
          onClose={() => setShowEmojiSelector(false)}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatMessagesScreen;
