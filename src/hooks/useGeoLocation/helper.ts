import { Linking, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { checkLocationAccuracy, checkMultiple, Permission, PERMISSIONS, PermissionStatus, requestMultiple, RESULTS } from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage';

export const fallBackLocationConfig = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};


export const locationPermissions: Permission[] = Platform.OS === 'android' ?
    [PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION, PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION] :
    [PERMISSIONS.IOS.LOCATION_WHEN_IN_USE]

export const initialMapRegion = {
    latitude: fallBackLocationConfig.latitude,
    longitude: fallBackLocationConfig.longitude,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
};


export const permissionStatusesHelper = async (permissionStatuses: Record<Permission, PermissionStatus>) => {
    const grantedAllPermissions = locationPermissions.every(perm => permissionStatuses[perm] === RESULTS.GRANTED)
    const majorVersionIOS = parseInt(Platform.Version.toString(), 10)
    if (Platform.OS === 'ios' && majorVersionIOS >= 14) {
        const locationAccuracy = await checkLocationAccuracy()
        return locationAccuracy === 'full' && grantedAllPermissions
    }
    return grantedAllPermissions
}

export const checkPermissionsHelper = async () => {
    try {
        const permissionStatuses = await checkMultiple(locationPermissions)
        return permissionStatusesHelper(permissionStatuses)
    } catch (error) {
        console.error('checkPermissions error - ', error)
        return false
    }
};

export const requestPermissionHelper = async () => {
    try {
        const permissionStatuses = await requestMultiple(locationPermissions)
        const granted = await permissionStatusesHelper(permissionStatuses)
        if (!granted) {
            try {
                if (Platform.OS === 'android') {
                    await Linking.openSettings();
                    // Try to open device Location Settings for GPS toggle
                    // @ts-ignore - sendIntent is Android-only
                    if (typeof (Linking as any).sendIntent === 'function') {
                        try { await (Linking as any).sendIntent('android.settings.LOCATION_SOURCE_SETTINGS'); } catch {}
                    } else {
                        try { await Linking.openURL('android.settings.LOCATION_SOURCE_SETTINGS'); } catch {}
                    }
                } else {
                    await Linking.openURL('App-Prefs:root=Privacy&path=LOCATION');
                }
            } catch (e) {
                console.warn('Failed to open settings for location:', e)
            }
        }
        return granted
    } catch (error) {
        console.warn('Error requesting location permission:', error);
        return false;
    }
};

export const getCurrentLocationHelper = async () => {
    try {
        const granted = await requestPermissionHelper();
        if (!granted) {
            throw new Error('Location permission not granted');
        }

        return new Promise<Geolocation.GeoPosition>((resolve, reject) => {
            Geolocation.getCurrentPosition(
                position => resolve(position),
                async error => {
                    console.warn('Geolocation error:', error);
                    // If GPS is off, try to open device location settings
                    if (Platform.OS === 'android' && (error as any)?.code === 2) {
                        try {
                            // @ts-ignore - Android-only
                            if (typeof (Linking as any).sendIntent === 'function') {
                                await (Linking as any).sendIntent('android.settings.LOCATION_SOURCE_SETTINGS');
                            } else {
                                await Linking.openURL('android.settings.LOCATION_SOURCE_SETTINGS');
                            }
                        } catch {}
                    }
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    showLocationDialog: true,
                    timeout: 15000,
                    maximumAge: 10000,
                }
            );
        });
    } catch (error) {
        console.warn('getCurrentLocation error:', error);
        return null;
    }
};

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';

export const reverseGeocodeWithOSM = async (latitude: number, longitude: number): Promise<string | null> => {
    try {
        const lat = typeof latitude === 'number' ? latitude : parseFloat(String(latitude));
        const lon = typeof longitude === 'number' ? longitude : parseFloat(String(longitude));
        if (isNaN(lat) || isNaN(lon)) return null;

        const url = `${NOMINATIM_BASE}/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Accept-Language': 'en',
                'User-Agent': 'MinutosDelivery/1.0 (https://minutos.in; contact@minutos.in)',
            },
        });

        if (!response.ok) {
            console.warn('reverseGeocodeWithOSM: response not ok', response.status);
            return null;
        }

        const data = await response.json();
        if (data?.error) {
            console.warn('reverseGeocodeWithOSM: API error', data.error);
            return null;
        }
        return data?.display_name ?? null;
    } catch (e) {
        console.warn('reverseGeocodeWithOSM error:', e);
        return null;
    }
}

const RECENT_LOCATIONS_KEY = 'recentLocations';

export const saveRecentAddress = async (formatted: string) => {
    try {
        const json = await AsyncStorage.getItem(RECENT_LOCATIONS_KEY);
        const existing: string[] = json ? JSON.parse(json) : [];
        const next = [formatted, ...existing.filter(a => a !== formatted)].slice(0, 5);
        await AsyncStorage.setItem(RECENT_LOCATIONS_KEY, JSON.stringify(next));
    } catch (e) {
        console.warn('saveRecentAddress error:', e);
    }
}

export const getRecentAddresses = async (): Promise<string[]> => {
    try {
        const json = await AsyncStorage.getItem(RECENT_LOCATIONS_KEY);
        return json ? JSON.parse(json) : [];
    } catch {
        return [];
    }
}
