import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { useTheme } from "../context/ThemeContext"; // Importa useTheme
import { icons } from "../constants";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const { theme } = useTheme(); // Usa el hook useTheme

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        spaceX: 4,
        width: '100%',
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: theme.backgroundColor,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.borderColor,
      }}
    >
      <TextInput
        style={{
          color: theme.textColor,
          fontSize: 16,
          flex: 1,
          marginTop: 2,
          fontFamily: 'PRegular', // Asegúrate de que el nombre de la fuente coincida con el que estás usando
        }}
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor={theme.placeholderColor}
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image
          source={icons.search}
          style={{ width: 20, height: 20 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
