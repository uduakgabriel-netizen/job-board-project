import { api, authService } from '../lib/api';

export const socialLogin = async (provider: string, code: string) => {
  try {
    const response = await api.post(`/auth/${provider}/`, { code });
    const { access, refresh, user } = response.data;
    
    // Save to local storage using existing authService
    if (access && refresh && user) {
      authService.setSession(access, refresh, user);
      return user;
    }
    
    throw new Error('Invalid authentication response');
  } catch (error) {
    console.error(`Error during ${provider} login:`, error);
    throw error;
  }
};
