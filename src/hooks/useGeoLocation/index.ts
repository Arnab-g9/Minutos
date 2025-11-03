import { useIsFocused } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { AppState } from "react-native"
import { useDispatch } from "react-redux"
import { checkPermissionsHelper, getCurrentLocationHelper, requestPermissionHelper, reverseGeocodeWithOSM, saveRecentAddress } from "./helper"
import { AppDispatch } from "../../store/store"
import { setCurrentAddress, setCurrentCoords } from "../../features/dashboard/slice/DashboardSlice"
import { ICoordinate } from "../../features/dashboard/Types/GetCoordinate.types"

const useGetLocation = () => {
    const [isLocationPermissionGranted, setLocationPermissionStatus] = useState(false)
    const isFocused = useIsFocused() //--
    const dispatch = useDispatch<AppDispatch>();

    const checkPermission = async () => {
        const granted = await checkPermissionsHelper()
        setLocationPermissionStatus(granted)
        return granted
    }

    const requestPermission = async () => {
        const granted = await requestPermissionHelper()
        setLocationPermissionStatus(granted)
        return granted
    }

    const getCurrentLocation = async () => {
        const currentLocation = await getCurrentLocationHelper()
        if (currentLocation?.coords) {
            const coords = currentLocation.coords as ICoordinate
            dispatch(setCurrentCoords(coords));
            try {
                const address = await reverseGeocodeWithOSM(coords.latitude, coords.longitude)
                if (address) {
                    dispatch(setCurrentAddress(address))
                    await saveRecentAddress(address)
                }
            } catch (e) {
                console.warn('reverse geocode failed:', e)
            }
            return currentLocation
        }
        return null
    }

    useEffect(() => {
        const sub = AppState.addEventListener('change', async (state) => {
            if (state === 'active' && isFocused) {
                const granted = await requestPermission()
                if (granted) {
                    await getCurrentLocation()
                }
            }
        })
        return () => {
            // @ts-ignore RN types allow remove()
            sub?.remove?.()
        }
    }, [isFocused])

    useEffect(() => {
        // Prompt for permission and GPS on initial mount
        (async () => {
            const granted = await requestPermission()
            if (granted) {
                await getCurrentLocation()
            }
        })()
    }, [])

    return {
        isLocationPermissionGranted,
        checkPermission,
        requestPermission,
        getCurrentLocation
    }
}

export default useGetLocation