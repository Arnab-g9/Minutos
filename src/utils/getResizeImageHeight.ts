import { Dimensions, Image } from "react-native";
const { width: screenWidth } = Dimensions.get('window');

export const getResizeImageHeight = (uri: any, excludeWidth: number) => {
    console.log("the function called ===>");
    const { width, height } = Image.resolveAssetSource(uri);

    console.log("the function called ===>", width, height);

    const newHeight = (height / width) * (screenWidth - excludeWidth);

    return newHeight;
}