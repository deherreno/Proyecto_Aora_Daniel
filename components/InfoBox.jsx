import { useTheme } from "../context/ThemeContext";
import { View, Text } from "react-native";

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }) => {
  const { theme } = useTheme(); // Usa el hook useTheme

  return (
    <View style={[{ backgroundColor: theme.infoBoxBackground }, containerStyles]}>
      <Text style={[{ color: theme.infoBoxTitleColor, textAlign: 'center', fontWeight: '600' }, titleStyles]}>
        {title}
      </Text>
      <Text style={{ color: theme.infoBoxSubtitleColor, textAlign: 'center', fontSize: 14 }}>
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
