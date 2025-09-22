import React from 'react';
import { Dimensions, Keyboard, Platform, SafeAreaView, View } from 'react-native';
import Modal from 'react-native-modal';
import { useTheme } from '../../../theme/ThemeProvider';

export const deviceHeight = Dimensions.get('window').height

const ActionSheetModal = ({
  show,
  onDismiss,
  children,
  gestureMount = true,
  renderHeader,
  onBackdropPress,
}: {
  show: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  gestureMount: boolean;
  renderHeader?: () => React.ReactNode;
  onBackdropPress?: () => void;
}) => {
  const { colors } = useTheme();
  return (
    <Modal
      style={{ margin: 0, justifyContent: 'flex-end', padding: 0, flex: 1 }}
      backdropColor="#000000"
      isVisible={show}
      onDismiss={onDismiss}
      onBackButtonPress={onDismiss}
      onBackdropPress={onBackdropPress || onDismiss}
      statusBarTranslucent
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      // animationOutTiming={800}
      // animationInTiming={250}
      // backdropTransitionOutTiming={1000}
      // backdropTransitionInTiming={900}
      swipeDirection={['down']}
      onSwipeComplete={onDismiss}
      swipeThreshold={100}
      backdropOpacity={0.4}
      deviceHeight={deviceHeight}
      panResponderThreshold={100}
      avoidKeyboard={true}
      // propagateSwipe
      // useNativeDriverForBackdrop={true}
      // useNativeDriver
    >
      <View
        style={[
          {
            backgroundColor: '#fff',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            maxHeight: deviceHeight * 0.6,
            paddingBottom: 50,
          },
          Platform.OS === 'android' && {
            // marginBottom: isKeyboardVisible ? Keyboard.metrics()?.height : 0,
          },
        ]}
      >
        {gestureMount && (
          <View
            style={{
              width: 48,
              alignSelf: 'center',
              height: 5,
              backgroundColor: '#CDCFD0',
              borderRadius: 100,
              marginVertical: 8,
            }}
          />
        )}
        {renderHeader && renderHeader()}
        {children}
        <SafeAreaView />
      </View>
    </Modal>
  );
};

export default ActionSheetModal;
