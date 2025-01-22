import { useEffect } from 'react';
import { userActions, userSelectors } from '../store/user.ts';
import { useDispatch, useSelector } from 'react-redux';
import { updateMe } from '../api/user.ts';
import { appSelectors } from '../store/app.ts';

export const useUserPreferences = () => {
  const userPreferences = useSelector(userSelectors.favouriteMusicalGenreIds);
  const musicalGenres = useSelector(appSelectors.musicalGenre);
  const isLogged = useSelector(userSelectors.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogged) {
      updateMe({ passionsIds: userPreferences });
    }
  }, [isLogged, userPreferences]);

  useEffect(() => {
    if (userPreferences.length === 0) {
      const guestGenre = musicalGenres.find(genre => genre.name === 'Ospite');
      if (guestGenre) {
        dispatch(userActions.setFavouriteMusicalGenreIds([guestGenre._id]));
      }
    }
  }, [dispatch, isLogged, musicalGenres, userPreferences.length]);
};
