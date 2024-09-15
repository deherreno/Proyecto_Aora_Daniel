import { router } from "expo-router";
import { View, Text, Image } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Importa useTheme
import CustomButton from "./CustomButton";
import { images } from "../constants";

const EmptyState = ({ title, subtitle }) => {
  const { theme } = useTheme(); // Usa el hook useTheme

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: theme.backgroundColor // Fondo de la vista
      }}
    >
      <Image
        source={images.empty}
        resizeMode="contain"
        style={{ width: 270, height: 216 }}
      />

      <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: theme.textColor, // Color del título
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: '600',
          color: theme.subtitleColor, // Color del subtítulo
          textAlign: 'center',
          marginTop: 8
        }}
      >
        {subtitle}
      </Text>

      <CustomButton
        title="Back to Explore"
        handlePress={() => router.push("/home")}
        containerStyles={{ width: '100%', marginVertical: 20 }}
      />
    </View>
  );
};

export default EmptyState;
