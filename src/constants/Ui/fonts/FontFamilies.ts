import { isIOS } from "../../../utils/platformUtil";

export const FontFamilies = {
    regular: isIOS() ? 'Roboto-Regular' : 'RobotoRegular',
    medium: isIOS() ? 'Roboto-Medium' : 'RobotoMedium',
    semiBold: isIOS() ? 'Roboto-SemiBold' : 'RobotoSemiBold',
    bold: isIOS() ? 'Roboto-Bold' : 'RobotoBold',
};