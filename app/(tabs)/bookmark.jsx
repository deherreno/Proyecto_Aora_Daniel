import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../context/ThemeContext"; // Importa useTheme

const Bookmark = () => {
  const { theme } = useTheme(); // Usa el hook useTheme

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <Text style={{ color: theme.color, fontSize: 24, fontWeight: '600', padding: 16 }}>
        Bookmark
      </Text>
    </SafeAreaView>
  );
};

export default Bookmark;
