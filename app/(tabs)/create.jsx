import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useTheme } from "../../context/ThemeContext"; // Importa useTheme
import { icons } from "../../constants";
import { createVideoPost } from "../../lib/appwrite";
import { CustomButton, FormField } from "../../components";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const { theme } = useTheme(); // Usa el hook useTheme
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields");
    }

    setUploading(true);
    try {
      await createVideoPost({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <ScrollView style={{ padding: 16 }}>
        <Text style={{ color: theme.color, fontSize: 24, fontWeight: '600', marginBottom: 16 }}>
          Upload Video
        </Text>

        <FormField
          title="Video Title"
          value={form.title}
          placeholder="Give your video a catchy title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View style={{ marginTop: 16, marginBottom: 16 }}>
          <Text style={{ color: theme.color }}>Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                style={{ width: '100%', height: 256, borderRadius: 16 }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View style={styles.uploadContainer}>
                <View style={styles.uploadIconContainer}>
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    style={styles.uploadIcon}
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 16, marginBottom: 16 }}>
          <Text style={{ color: theme.color }}>Thumbnail Image</Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                style={styles.thumbnail}
              />
            ) : (
              <View style={styles.thumbnailPlaceholder}>
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  style={styles.uploadIconSmall}
                />
                <Text style={{ color: theme.color }}>Choose a file</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          value={form.prompt}
          placeholder="The AI prompt of your video...."
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  uploadContainer: {
    width: '100%',
    height: 160,
    backgroundColor: '#000',
    borderRadius: 16,
    borderColor: '#333',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 56,
    height: 56,
    borderColor: '#FFA001',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIcon: {
    width: '50%',
    height: '50%',
  },
  thumbnail: {
    width: '100%',
    height: 256,
    borderRadius: 16,
  },
  thumbnailPlaceholder: {
    width: '100%',
    height: 64,
    backgroundColor: '#000',
    borderRadius: 16,
    borderColor: '#333',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadIconSmall: {
    width: 20,
    height: 20,
  },
});

export default Create;
