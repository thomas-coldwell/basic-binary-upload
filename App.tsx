import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";

const testAsset = Asset.fromModule(require("./assets/icon.png"));
const serverUrl = "http://127.0.0.1:3000";

const uploadFile = async () => {
  const localAssetUri = (await testAsset.downloadAsync()).localUri;
  if (localAssetUri == null) return;
  await FileSystem.uploadAsync(`${serverUrl}/binaryUpload`, localAssetUri, {
    headers: {
      Authorization: "an auth token",
    },
    httpMethod: "POST",
    uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
    sessionType: FileSystem.FileSystemSessionType.BACKGROUND,
  });
};

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Upload file" onPress={uploadFile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
