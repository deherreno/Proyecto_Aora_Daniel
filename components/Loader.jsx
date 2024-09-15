import { View, ActivityIndicator, Dimensions, Platform } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Importa useTheme

const Loader = ({ isLoading }) => {
  const { theme } = useTheme(); // Usa el hook useTheme
  const osName = Platform.OS;
  const screenHeight = Dimensions.get("screen").height;

  if (!isLoading) return null;

  return (
    <View
      style={{
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: screenHeight,
        backgroundColor: theme.loaderBackgroundColor, // Usa el color de fondo del loader del tema
        zIndex: 10,
      }}
    >
      <ActivityIndicator
        animating={isLoading}
        color={theme.loaderColor} // Usa el color del spinner del loader del tema
        size={osName === "ios" ? "large" : 50}
      />
    </View>
  );
};

export default Loader;
