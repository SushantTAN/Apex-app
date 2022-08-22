import { Alert } from "react-native";

export const errorAlert = (title, message, callback = () => { }) => {
  Alert.alert(title, message, [
    {
      text: "Cancel",
      onPress: () => null,
      style: "cancel"
    },
    { text: "Ok", onPress: () => { callback() } }
  ]);
}