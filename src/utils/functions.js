import { Alert } from "react-native";

export const errorAlert = (title, message, callback = () => { }) => {
  Alert.alert(title, message, [
    {
      text: "Cancel",
      onPress: () => null,
      style: "cancel"
    },
    { text: "Ok", onPress: () => null }
  ]);
}

export const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

export const getDuration = (date1) => {
  return (new Date(date1).getTime() - new Date().getTime()) /1000
}