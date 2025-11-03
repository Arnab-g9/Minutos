import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { default as Text } from '../../../../components/Text/MSText';
import { TextInput } from 'react-native-gesture-handler';
const AddressModal = ({
  visible,
  onPressDetectLocation,
  onPressSaveLocation,
  onDismiss,
  addressTxt,
}: {
  visible: boolean;
  onPressDetectLocation: () => void;
  onPressSaveLocation: () => void;
  onDismiss: () => void;
  addressTxt: string;
}) => {
  const { colors } = useTheme();
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <TouchableOpacity
        style={styles.modalBackground}
        onPress={onDismiss}
        activeOpacity={1}
      >
        <View
          style={{
            backgroundColor: colors.card_bg_primary,
            borderRadius: 16,
            padding: 20,
            width: '80%',
          }}
        >
          <Text
            varient="semiBold"
            fontSize={20}
            style={{ color: colors.contentPrimary, marginBottom: 20 }}
          >
            Choose your location
          </Text>
          <Text fontSize={16} style={{ color: colors.contentPrimary }}>
            {' '}
            Detect your location or enter manually:{' '}
          </Text>

          <View style={{ gap: 15, marginTop: 20 }}>
            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: colors.primaryCtaText }}>
                Detect Current Location
              </Text>
            </TouchableOpacity>

            <TextInput
              value={addressTxt}
              style={{
                height: 40,
                // backgroundColor: colors.primary,
                borderWidth: 1,
                borderColor: colors.border_1,
                justifyContent: 'center',
                paddingLeft: 10,
                borderRadius: 5,
                color: colors.contentPrimary,
              }}
              pointerEvents="none"
              editable={false}
            />

            <TouchableOpacity
              style={{
                height: 40,
                backgroundColor: colors.contentSecondary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
            >
              <Text style={{ fontSize: 16, color: colors.primaryCtaText }}>
                Save Location
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddressModal;
