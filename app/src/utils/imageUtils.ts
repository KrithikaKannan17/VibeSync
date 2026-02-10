import * as ImagePicker from 'expo-image-picker';
import { readAsStringAsync, EncodingType } from 'expo-file-system';

// Request camera permissions
export const requestCameraPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status === 'granted';
};

// Request media library permissions
export const requestMediaLibraryPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  return status === 'granted';
};

// Pick image from gallery
export const pickImageFromGallery = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestMediaLibraryPermission();
    if (!hasPermission) {
      throw new Error('Media library permission not granted');
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [9, 16], // Instagram story aspect ratio
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error picking image from gallery:', error);
    throw error;
  }
};

// Take photo with camera
export const takePhoto = async (): Promise<string | null> => {
  try {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      throw new Error('Camera permission not granted');
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      return result.assets[0].uri;
    }

    return null;
  } catch (error) {
    console.error('Error taking photo:', error);
    throw error;
  }
};

// Convert image to base64
export const convertImageToBase64 = async (uri: string): Promise<string> => {
  try {
    const base64 = await readAsStringAsync(uri, {
      encoding: EncodingType.Base64,
    });
    return base64;
  } catch (error) {
    console.error('Error converting image to base64:', error);
    throw error;
  }
};

// Compress image (resize to max width)
export const compressImage = async (uri: string, maxWidth: number = 1024): Promise<string> => {
  try {
    // Note: In a production app, you'd use a library like expo-image-manipulator
    // For now, we'll return the original URI
    // TODO: Implement actual compression
    return uri;
  } catch (error) {
    console.error('Error compressing image:', error);
    throw error;
  }
};
