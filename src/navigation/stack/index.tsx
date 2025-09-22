import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreenNames } from './constants';
import DashboardScreen from '../../features/dashboard/screens/DashboardScreen/DashboardScreen';
import ProductdetailsScreen from '../../features/dashboard/screens/ProductDetails/ProductdetailsScreen';
import CartScreen from '../../features/cart/screens/CartScreen/CartScreen';
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={ScreenNames.DASHBOARD_SCREEN} screenOptions={{ headerShown: false }}>
                <Stack.Screen name={ScreenNames.DASHBOARD_SCREEN} component={DashboardScreen} />
                <Stack.Screen name={ScreenNames.PRODUCT_DETAILS} component={ProductdetailsScreen} />
                <Stack.Screen name={ScreenNames.CART_SCREEN} component={CartScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;