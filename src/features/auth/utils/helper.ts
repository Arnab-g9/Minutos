import regularExpressions from "../../../constants/regularExpressions";
import { commonColors } from "../../../constants/Ui/colors";
import { ColorsType } from "../../../constants/Ui/colors/colors.types";

/**
 * @returns string with appropriate message
 */
export const invalidPhoneNumberErrorMessage = ({
    inputPhoneNumber,
    incomplete,
    invalid,
}: {
    inputPhoneNumber: string
    incomplete: boolean;
    invalid: boolean
}): string => {
    if (inputPhoneNumber.length === 0) {
        return '';
    }
    if (invalid) {
        return 'Please enter a valid phone number';
    }
    if (incomplete) {
        return 'Please enter 10 digits';
    }
    return '';
};

/**
 * @returns whether input number is valid phone number
 */
export const isValidIndianPhoneNumber = (number: string) => {
    if (regularExpressions.LESS_THAN_10_DIGITS.test(number)) {
        return { incomplete: true };
    }
    if (!regularExpressions.VALID_PHONE_NUMBER.test(number)) {
        return { invalid: true };
    }
    return { valid: true };
};


export const getInfoTextColorBasedOnError = (invalid: boolean, colors: ColorsType) => {
    if (invalid) {
        return commonColors.error;
    }
    return colors.contentSecondary;
};