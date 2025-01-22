import { appAxios } from './config.ts';
import { FriendStatusesEnum } from '../types/friend.ts';
import { useSelector } from 'react-redux';
import { userSelectors } from '../store/user.ts';
import { store } from '../store';

export const sendFriendRequest = async (toUserId: string) => {
  try {
    const { data } = await appAxios.post('friends/add', { toUserId });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteFriendRequest = async (id: string) => {
  try {
    const { data } = await appAxios.delete(`friends/${id}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const manageFriendRequest = async (id: string, confirm: boolean) => {
  try {
    const { data } = await appAxios.post(`friends/${id}/confirm`, { confirm });
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getCommonFriends = async (friendId: string) => {
  try {
    const { data } = await appAxios.get(`friends/of/${friendId}`);
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
}
