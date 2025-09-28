import React from 'react';
import { Modal, View, StyleSheet, TouchableOpacity } from 'react-native';
import { default as Text } from '../../../components/Text/MSText';
import { useTheme } from '../../../theme/ThemeProvider';

const ConfermationModal = ({
  visible,
  onConfirm,
  onDecline,
}: {
  visible: boolean;
  onConfirm: () => void;
  onDecline: () => void;
  title?: string;
}) => {
  const { colors } = useTheme();
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      statusBarTranslucent
    >
      <View style={styles.modalBackground}>
        <View style={{ height: 164, width: 285, backgroundColor: colors.primary, borderRadius: 16 }}>
          <View style={styles.loaderContainer}>
            <View style={{ width: 246, height: 48, paddingHorizontal: 30 }}>
              <Text varient='medium' fontSize={16} style={{ textAlign: 'center', lineHeight: 24 }}>Are you sure of clearing your cart ?</Text>
            </View>
            <View style={styles.btnContainer}>
              <TouchableOpacity style={{ width: 112, height: 42, borderWidth: 1, borderRadius: 12, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' }} onPress={onDecline}>
                <Text>No</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 112, height: 42, borderRadius: 12, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' }} onPress={onConfirm}>
                <Text style={{ color: colors.primaryCtaText }}>Yes, clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
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
  loaderContainer: {
    height: 164, width: 285,
    backgroundColor: '#ffff',
    borderRadius: 16,
    gap: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -5,
    marginLeft: -5,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  btn: {
    flex: 1,
  },
});

export default ConfermationModal;
