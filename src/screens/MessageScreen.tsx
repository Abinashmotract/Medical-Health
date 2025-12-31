import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppRoute";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<RootStackParamList, "Message">;

interface Message {
  id: string;
  text: string;
  time: string;
  isSent: boolean;
  isAudio?: boolean;
  audioDuration?: string;
}

const MessageScreen: React.FC<Props> = ({ navigation, route }) => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "09:00",
      isSent: true,
    },
    {
      id: "2",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "09:30",
      isSent: true,
    },
    {
      id: "3",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      time: "09:43",
      isSent: true,
    },
    {
      id: "4",
      text: "",
      time: "09:50",
      isSent: false,
      isAudio: true,
      audioDuration: "02:50",
    },
    {
      id: "5",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      time: "09:55",
      isSent: true,
    },
  ]);
  const [isTyping, setIsTyping] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const doctorName = route.params?.doctorName || "Dr. Olivia Turner";

  useEffect(() => {
    // Scroll to bottom when messages change
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const getCurrentTime = (): string => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: messageText.trim(),
        time: getCurrentTime(),
        isSent: true,
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessageText("");
      
      // Simulate doctor typing and response after 2 seconds
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const doctorResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Thank you for your message. I'll get back to you soon.",
          time: getCurrentTime(),
          isSent: false,
        };
        setMessages((prev) => [...prev, doctorResponse]);
      }, 2000);
    }
  };

  const renderMessage = (message: Message) => {
    if (message.isSent) {
      return (
        <View key={message.id} style={styles.sentMessageContainer}>
          <View style={styles.sentBubble}>
            <Text style={styles.sentMessageText}>{message.text}</Text>
          </View>
          <Text style={styles.sentTime}>{message.time}</Text>
        </View>
      );
    } else {
      return (
        <View key={message.id} style={styles.receivedMessageContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>👩</Text>
            </View>
          </View>
          {message.isAudio ? (
            <View style={styles.audioMessageContainer}>
              <View style={styles.audioBubble}>
                <TouchableOpacity style={styles.playButton}>
                  <Ionicons name="play" size={20} color="#FFFFFF" />
                </TouchableOpacity>
                <View style={styles.audioProgressBar}>
                  <View style={styles.audioProgressFill} />
                </View>
                <Text style={styles.audioDuration}>{message.audioDuration}</Text>
              </View>
              <Text style={styles.receivedTime}>{message.time}</Text>
            </View>
          ) : (
            <View style={styles.receivedBubbleContainer}>
              <View style={styles.receivedBubble}>
                <Text style={styles.receivedMessageText}>{message.text}</Text>
              </View>
              <Text style={styles.receivedTime}>{message.time}</Text>
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2260FF" translucent={false} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate("Home");
            }
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{doctorName}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="call" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIconButton}>
            <Ionicons name="videocam" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map(renderMessage)}

          {/* Typing Indicator */}
          {isTyping && (
            <View style={styles.typingContainer}>
              <Text style={styles.typingText}>Dr. Olivia is typing...</Text>
            </View>
          )}
        </ScrollView>

        {/* Message Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.inputIconButton}>
            <Ionicons name="attach" size={24} color="#2260FF" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Write Here..."
            placeholderTextColor="#999999"
            value={messageText}
            onChangeText={setMessageText}
            multiline
            onSubmitEditing={handleSendMessage}
            returnKeyType="send"
          />
          {messageText.trim() ? (
            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
              <Ionicons name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.inputIconButton}>
              <Ionicons name="mic" size={24} color="#2260FF" />
            </TouchableOpacity>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2260FF",
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 16,
  },
  headerIconButton: {
    padding: 4,
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 10,
    paddingBottom: 20,
  },
  sentMessageContainer: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  sentBubble: {
    backgroundColor: "#2260FF",
    borderRadius: 16,
    borderTopRightRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: "75%",
  },
  sentMessageText: {
    fontSize: 14,
    color: "#FFFFFF",
    lineHeight: 20,
  },
  sentTime: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
    textAlign: "right",
  },
  receivedMessageContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  avatarContainer: {
    marginRight: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#E3F2FD",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
  },
  receivedBubbleContainer: {
    flex: 1,
  },
  receivedBubble: {
    backgroundColor: "#F5F5F5",
    borderRadius: 16,
    borderTopLeftRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: "75%",
  },
  receivedMessageText: {
    fontSize: 14,
    color: "#000000",
    lineHeight: 20,
  },
  receivedTime: {
    fontSize: 12,
    color: "#999999",
    marginTop: 4,
  },
  audioMessageContainer: {
    flex: 1,
  },
  audioBubble: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2260FF",
    borderRadius: 16,
    borderTopLeftRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 12,
    maxWidth: "75%",
  },
  playButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  audioProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 2,
    overflow: "hidden",
  },
  audioProgressFill: {
    width: "60%",
    height: "100%",
    backgroundColor: "#FFFFFF",
  },
  audioDuration: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  typingContainer: {
    alignItems: "flex-start",
    marginTop: 8,
  },
  typingText: {
    fontSize: 14,
    color: "#2260FF",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#FFFFFF",
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E3F2FD",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: "#000000",
    maxHeight: 100,
  },
  inputIconButton: {
    padding: 4,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2260FF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MessageScreen;

