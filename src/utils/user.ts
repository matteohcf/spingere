import { store } from '../store';
import { userActions, userSelectors } from '../store/user';
import { showToast } from './toast.ts';
import { t } from 'i18next';
import { User } from "../types";

export const logout = () => {
  store.dispatch(userActions.clearUserLoggedState());
  showToast(t('toasts.logoutSuccessTitle'), t('toasts.logoutSuccessMessage'), { type: 'success' });
};

export const checkIsUserLoggedAndRedirect = (navigation: any) => {
  const state = store.getState();
  const user = userSelectors.isLogged(state);
  console.log('user', user);
  if (!user) {
    if (navigation) {
      navigation.push('Login');
    }
    return false;
  }
  return true;
};

export const getInitials = (user?: User) => {
  if (!user) {
    return '';
  }
  const nameInitial = (user?.name || '')[0] || '';
  const surnameInitial = (user?.surname || '')[0] || '';
  return (nameInitial + surnameInitial).toUpperCase();
};
