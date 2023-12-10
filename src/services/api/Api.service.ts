import {Platform} from 'react-native';
import {Asset} from 'react-native-image-picker';
import axiosInstance from './axiosInstance';

class ApiService {
  async createProfile(file: Asset, name: string): Promise<string> {
    try {
      const data = new FormData();
      data.append('avatar', {
        name: file.fileName,
        type: file.type,
        uri:
          Platform.OS === 'ios' ? file.uri?.replace('file://', '') : file.uri,
      });
      data.append('name', name);

      const response = await axiosInstance.post('/auth', data);

      return response.data.userId;
    } catch (err) {
      throw new Error();
    }
  }
}

const apiService = new ApiService();

export default apiService;
