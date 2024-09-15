import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Importa useTheme
import { icons } from "../constants";

const VideoCard = ({ title, creator, avatar, thumbnail, video }) => {
  const [play, setPlay] = useState(false);
  const { theme } = useTheme(); // Usa el hook useTheme

  return (
    <View className="flex flex-col items-center px-4 mb-14">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 8,
              borderColor: theme.secondary, // Ajusta el color del borde
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0.5,
            }}
          >
            <Image
              source={{ uri: avatar }}
              style={{ width: '100%', height: '100%', borderRadius: 8 }}
              resizeMode="cover"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              style={{
                fontFamily: 'psemibold', // Asegúrate de tener esta fuente
                fontSize: 14,
                color: theme.textColor, // Ajusta el color del texto
              }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: 'pregular', // Asegúrate de tener esta fuente
                fontSize: 12,
                color: theme.secondaryTextColor, // Ajusta el color del texto secundario
              }}
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image
            source={icons.menu}
            style={{ width: 20, height: 20, tintColor: theme.iconColor }} // Ajusta el color del ícono
            resizeMode="contain"
          />
        </View>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          style={{ width: '100%', height: 240, borderRadius: 16, marginTop: 12 }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          style={{
            width: '100%',
            height: 240,
            borderRadius: 16,
            marginTop: 12,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{ width: '100%', height: '100%', borderRadius: 16 }}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={{ width: 48, height: 48, position: 'absolute', tintColor: theme.iconColor }} // Ajusta el color del ícono
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
