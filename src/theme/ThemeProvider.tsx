import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Appearance, StatusBar, StatusBarStyle } from 'react-native';
import { darkColors, lightColors } from '../constants/Ui/colors';
import SystemNavigationBar from 'react-native-system-navigation-bar';
const ThemeMode = {
    light: 'light',
    dark: 'dark',
};

type ThemeModeType = keyof typeof ThemeMode

const ThemeContext = createContext<{
    mode: ThemeModeType;
    colors: typeof lightColors;
    toggleTheme: () => void;
}>({
    mode: 'light',
    colors: lightColors,
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    // ✅ Set initial value once
    const colorScheme = Appearance.getColorScheme() as ThemeModeType;
    const [mode, setMode] = useState<ThemeModeType>(colorScheme || 'light');

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const colors = mode === 'light' ? lightColors : darkColors;
    const statusBarStyle: StatusBarStyle = mode === 'light' ? 'dark-content' : 'light-content';

    useEffect(() => {
        SystemNavigationBar.setNavigationColor(colors.primary);
    }, [colors.primary])

    return (
        <ThemeContext.Provider value={{ mode, colors, toggleTheme }}>
            <StatusBar backgroundColor={colors.background_primary} barStyle={statusBarStyle} />
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
