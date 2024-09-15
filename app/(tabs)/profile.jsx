import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";
import { useTheme } from "../../context/ThemeContext"; // Importa useTheme
import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));
  const { theme } = useTheme(); // Usa el hook useTheme

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.backgroundColor, flex: 1 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 24, marginBottom: 48 }}>
            <TouchableOpacity
              onPress={logout}
              style={{ alignSelf: 'flex-end', marginBottom: 20 }}
            >
              <Image
                source={icons.logout}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            <View style={{ width: 64, height: 64, borderRadius: 32, borderColor: '#FFA001', borderWidth: 2, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={{ uri: user?.avatar }}
                style={{ width: '90%', height: '90%', borderRadius: 32 }}
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles={{ marginTop: 20 }}
              titleStyles={{ fontSize: 18 }}
            />

            <View style={{ flexDirection: 'row', marginTop: 20 }}>
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                titleStyles={{ fontSize: 20 }}
                containerStyles={{ marginRight: 20 }}
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles={{ fontSize: 20 }}
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
