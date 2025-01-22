import { Pee } from '../types/pee.ts';
import { appAxios } from './config.ts';

export const getPeeDetail = async (id: string) => {
  try {
    const { data } = await appAxios.get<Pee>(`pees/${id}`);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export const pee = async (pee?: Partial<Pee>) => {
  try {
    const params = {
      ...pee,
    };
    const { data } = await appAxios.post<Pee>('pees/button', params);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export const addPeeDetails = async (pee: Partial<Pee>, id: string) => {
  const params = {
    ...pee,
  }
  try {
    const { data } = await appAxios.put<Pee>(`pees/${id}`, params);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export const deletePee = async (peeId: string) => {
  try {
    const { data } = await appAxios.delete(`pees/${peeId}`);
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export const getPeesMap = async (friendIds: string[], maps: boolean) => {
  const params = {
    friendIds,
    maps,
  };
  try {
    const { data } = await appAxios.get('pees/friends', { params });
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}

export const getPeesWeeklyKpi = async (friendIds: string[]) => {
  const params = {
    friendIds,
  };
  try {
    const { data } = await appAxios.get('pees/weekly/kpi', { params });
    return data;
  } catch (e) {
    return Promise.reject(e);
  }
}
