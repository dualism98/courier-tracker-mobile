/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../theme/colors';
import indent from '../theme/indent';
import {borderRadius} from '../theme/constants';
import {fontSizes} from '../theme/fonts';
import apiService from '../services/api/Api.service';
import storage from '../services/storage/storage';
import StorageKeys from '../services/storage/StorageKeys';
import {SignUpNavigationProp} from '../navigation/types';
import NavigationKeys from '../navigation/NavigationKeys';

const SignUpScreen: React.FC = () => {
  const [image, setImage] = React.useState<Asset | null>();
  const [name, setName] = React.useState('');

  const navigation = useNavigation<SignUpNavigationProp>();

  const handleImagePress = async () => {
    const options: ImageLibraryOptions = {
      quality: 0.8,
      mediaType: 'photo',
      includeBase64: true,
    };
    const response = await launchImageLibrary(options);
    if (response.assets && response.assets[0].fileSize) {
      const asset = response.assets[0];
      setImage(asset);
    }
  };

  const handleCreatePress = useCallback(async () => {
    const userId = await apiService.createProfile(image!, name);
    storage.set(StorageKeys.USER_ID, userId);
    navigation.replace(NavigationKeys.MapScreen);
  }, [image, name]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={'padding'} style={styles.container}>
        <View />
        <View>
          <Pressable onPress={handleImagePress} style={styles.imageContainer}>
            <Image
              source={require('../assets/img/profileImage.png')}
              style={styles.imagePlaceholder}
            />
            <Image source={{uri: image?.uri}} style={styles.image} />
          </Pressable>
          <TextInput
            value={name}
            onChangeText={value => setName(value)}
            style={styles.input}
            placeholder={'Enter your name...'}
          />
        </View>
        <TouchableOpacity
          disabled={!image || !name}
          onPress={handleCreatePress}
          style={styles.button}>
          <Text style={styles.buttonText}>Create profile</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.tints.white[100],
    justifyContent: 'space-between',
  },

  imageContainer: {
    width: 180,
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.max,
    borderWidth: 2,
    borderColor: colors.tints.accent.yellow[70],
    alignSelf: 'center',
    marginBottom: indent.xl,
    overflow: 'hidden',
  },

  imagePlaceholder: {
    width: 30,
    height: 30,
    position: 'absolute',
  },

  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },

  input: {
    fontSize: fontSizes.s,
    fontWeight: '500',
    paddingVertical: indent.xs,
    marginHorizontal: indent.xl,
    borderBottomWidth: 1,
    borderColor: colors.tints.black[50],
    textAlign: 'center',
  },

  button: {
    marginHorizontal: indent.m,
    marginVertical: indent.xs,
    paddingHorizontal: indent.m,
    paddingVertical: indent.s,
    backgroundColor: colors.tints.accent.yellow[50],
    borderRadius: borderRadius.xl,
  },

  buttonText: {
    fontSize: fontSizes.s,
    lineHeight: fontSizes.s + indent.xxxs,
    fontWeight: '800',
    color: colors.label.black[90],
    textAlign: 'center',
  },
});

export default SignUpScreen;
