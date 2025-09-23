import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreenNames } from './constants';
import DashboardScreen from '../../features/dashboard/screens/DashboardScreen/DashboardScreen';
import ProductdetailsScreen from '../../features/dashboard/screens/ProductDetails/ProductdetailsScreen';
import CartScreen from '../../features/cart/screens/CartScreen/CartScreen';
import LoginScreen from '../../features/auth/screens/login/LoginScreen';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeIcon from 'react-native-vector-icons/FontAwesome'
import Cart from 'react-native-vector-icons/Feather';
import CategoryIcon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../theme/ThemeProvider';
import CategoryScreen from '../../features/category/screens/CategoryScreen/CategoryScreen'
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AppNavigation = () => {
    const { colors } = useTheme();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ScreenNames.LOGIN_SCREEN} screenOptions={{ headerShown: false }}>
                {/* <Stack.Screen name={ScreenNames.DASHBOARD_SCREEN} component={DashboardScreen} /> */}
                <Stack.Screen name={ScreenNames.DASHBOARD_SCREEN}>
                    {
                        () => {
                            return (
                                <View style={{ flex: 1 }}>
                                    <Tab.Navigator initialRouteName={ScreenNames.HOME_SCREEN}
                                        screenOptions={{
                                            headerShown: false,
                                            tabBarActiveTintColor: colors.primaryCtaText,
                                            tabBarInactiveTintColor: "#FFFFFF80",
                                            tabBarStyle: {
                                                backgroundColor: colors.primary,
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

                                        <Tab.Screen name={ScreenNames.HOME_SCREEN} component={DashboardScreen} options={{
                                            tabBarIcon: ({ focused }) => <HomeIcon name={'home'} size={20} color={focused ? colors.primaryCtaText : colors.contentPrimary} />
                                        }} />

                                        <Tab.Screen name={ScreenNames.CATEGORY_SCREEN} component={CategoryScreen} options={{
                                            tabBarIcon: ({ focused }) => <CategoryIcon name={'category'} size={20} color={focused ? colors.primaryCtaText : colors.contentPrimary} />
                                        }} />


                                        <Tab.Screen name={ScreenNames.CART_SCREEN} component={CartScreen} options={{
                                            tabBarIcon: ({ focused }) => <Cart name={'shopping-cart'} size={20} color={focused ? colors.primaryCtaText : colors.contentPrimary} />
                                        }} />

                                    </Tab.Navigator>
                                </View>
                            )
                        }
                    }
                </Stack.Screen>

                <Stack.Screen name={ScreenNames.PRODUCT_DETAILS} component={ProductdetailsScreen} />
                {/* <Stack.Screen name={ScreenNames.CART_SCREEN} component={CartScreen} /> */}
                <Stack.Screen name={ScreenNames.LOGIN_SCREEN} component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;