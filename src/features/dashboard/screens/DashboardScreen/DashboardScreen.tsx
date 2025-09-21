import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader'
import { useNavigation } from '@react-navigation/native'

const DashboardScreen = () => {
    const navigation = useNavigation();
    useEffect(() => {
        const renderHeader = () => <DashboardHeader />;
        navigation.setOptions({
            headerShown: true,
            header: renderHeader,
        });
    }, [navigation]);
    return (
        <View>
            <Text>DashboardScreen</Text>
        </View>
    )
}

export default DashboardScreen

const styles = StyleSheet.create({})