import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenNames } from './constants';
import DashboardScreen from '../../features/dashboard/screens/DashboardScreen/DashboardScreen';
import ProductdetailsScreen from '../../features/dashboard/screens/ProductDetails/ProductdetailsScreen';
import CartScreen from '../../features/cart/screens/CartScreen/CartScreen';
import LoginScreen from '../../features/auth/screens/login/LoginScreen';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from 'react-native-vector-icons/FontAwesome';
import Cart from 'react-native-vector-icons/Feather';
import CategoryIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeProvider';
import CategoryScreen from '../../features/category/screens/CategoryScreen/CategoryScreen';
import ProfileScreen from '../../features/profile/screens/ProfileScreen/ProfileScreen';
import OTPScreen from '../../features/auth/screens/otp/OTPScreen';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { default as Text } from '../../components/Text/MSText'
import SubCategoriesScreen from '../../features/dashboard/screens/SubCategoriesScreen/SubCategoriesScreen';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  const { colors } = useTheme();
  const { isAuthorized } = useSelector((store: RootState) => store.auth);
  const { cart } = useSelector((store: RootState) => store.cart)
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={
        //   !isAuthorized ? ScreenNames.DASHBOARD_SCREEN : ScreenNames.LOGIN_SCREEN
        // }
        screenOptions={{ headerShown: false }}
      >
        {!!isAuthorized ? (
          <>
            <Stack.Screen
              name={ScreenNames.LOGIN_SCREEN}
              component={LoginScreen}
            />
            <Stack.Screen name={ScreenNames.OTP_SCREEN} component={OTPScreen} />
          </>

        ) : (
          <>
            <Stack.Screen name={ScreenNames.DASHBOARD_SCREEN}>
              {() => {
                return (
                  <View style={{ flex: 1, backgroundColor: colors.background_primary }}>
                    <Tab.Navigator
                      initialRouteName={ScreenNames.HOME_SCREEN}
                      screenOptions={{
                        headerShown: false,
                        tabBarActiveTintColor: colors.primary,
                        tabBarInactiveTintColor: colors.contentPrimary,
                        tabBarStyle: {
                          backgroundColor: colors.card_bg_primary,
                          borderTopWidth: 0,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          paddingBottom: 5,
                          height: 60,
                        },
                        tabBarHideOnKeyboard: true,
                        tabBarIconStyle: { marginTop: 5 },
                        tabBarLabelStyle: {
                          fontSize: 12,
                          marginTop: 0,
                        },
                      }}
                    >
                      <Tab.Screen
                        name={ScreenNames.HOME_SCREEN}
                        component={DashboardScreen}
                        options={{
                          tabBarIcon: ({ focused }) => (
                            <HomeIcon
                              name={'home'}
                              size={20}
                              color={
                                focused ? colors.primary : colors.contentPrimary
                              }
                            />
                          ),
                          tabBarLabel: ({ focused }) => (
                            <Text style={{ color: focused ? colors.primary : colors.contentPrimary }}>Home</Text>
                          )
                        }}
                      />

                      <Tab.Screen
                        name={ScreenNames.CATEGORY_SCREEN}
                        component={CategoryScreen}
                        options={{
                          tabBarIcon: ({ focused }) => (
                            <CategoryIcon
                              name={'category'}
                              size={20}
                              color={
                                focused ? colors.primary : colors.contentPrimary
                              }
                            />
                          ),
                          tabBarLabel: ({ focused }) => (
                            <Text style={{ color: focused ? colors.primary : colors.contentPrimary }}>Category</Text>
                          )
                        }}
                      />

                      <Tab.Screen
                        name={ScreenNames.CART_SCREEN}
                        component={CartScreen}
                        options={{
                          tabBarIcon: ({ focused }) => (
                            <View >
                              <Cart
                                name={'shopping-cart'}
                                size={20}
                                color={
                                  focused ? colors.primary : colors.contentPrimary
                                }
                              />
                              <View style={{ position: 'absolute', top: -10, right: -15, width: 20, height: 20, borderRadius: 50, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: colors.primaryCtaText }}>{cart?.length}</Text>
                              </View>
                            </View>
                          ),
                          tabBarLabel: ({ focused }) => (
                            <Text style={{ color: focused ? colors.primary : colors.contentPrimary }}>Cart</Text>
                          )
                        }}
                      />
                    </Tab.Navigator>
                    <SafeAreaView edges={['bottom']} style={{ backgroundColor: colors.background_primary }} />
                  </View>
                );
              }}
            </Stack.Screen>

            <Stack.Screen
              name={ScreenNames.PRODUCT_DETAILS}
              component={ProductdetailsScreen}
            />
            <Stack.Screen
              name={ScreenNames.PROFILE_SCREEN}
              component={ProfileScreen}
            />
            <Stack.Screen
              name={ScreenNames.SUBCATEGORY_SCREEN}
              component={SubCategoriesScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
