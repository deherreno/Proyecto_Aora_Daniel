import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../../context/ThemeContext"; // Asegúrate de importar useTheme
import { useGlobalContext } from "../../context/GlobalProvider";
import { Loader } from "../../components";

const AuthLayout = () => {
  const { loading, isLogged } = useGlobalContext();
  const { isDarkMode, theme } = useTheme(); // Usa el hook useTheme

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar backgroundColor={theme.backgroundColor} style={isDarkMode ? "light" : "dark"} />
    </>
  );
};

export default AuthLayout;
