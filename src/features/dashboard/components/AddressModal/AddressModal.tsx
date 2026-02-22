import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '../../../../theme/ThemeProvider';
import { default as Text } from '../../../../components/Text/MSText';
const AddressModal = ({
  visible,
  onPressDetectLocation,
  onPressSaveLocation,
  onDismiss,
  addressTxt,
  isDetecting = false,
}: {
  visible: boolean;
  onPressDetectLocation: () => void;
  onPressSaveLocation: () => void;
  onDismiss: () => void;
  addressTxt: string;
  isDetecting?: boolean;
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
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {}}
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
            Detect your location or enter manually:
          </Text>

          <View style={{ gap: 15, marginTop: 20 }}>
            <TouchableOpacity
              onPress={onPressDetectLocation}
              disabled={isDetecting}
              style={{
                height: 40,
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                opacity: isDetecting ? 0.7 : 1,
              }}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 16, color: colors.primaryCtaText }}>
                {isDetecting ? 'Detecting...' : 'Detect Current Location'}
              </Text>
            </TouchableOpacity>

            <TextInput
              value={addressTxt}
              style={{
                height: 40,
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
              onPress={onPressSaveLocation}
              style={{
                height: 40,
                backgroundColor: colors.contentSecondary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
              }}
              activeOpacity={0.8}
            >
              <Text style={{ fontSize: 16, color: colors.primaryCtaText }}>
                Save Location
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
