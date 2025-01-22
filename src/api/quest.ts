import { appAxios } from './config.ts';
import { Quest } from '../types/quest.ts';

export const getQuestDetail = async (id: string) => {
  try {
    const { data } = await appAxios.get<Quest>(`quests/${id}`);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};
