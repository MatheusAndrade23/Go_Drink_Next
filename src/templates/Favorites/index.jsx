import * as Styled from '../Kinds/styles';

import { useEffect, useState, useContext } from 'react';

import { AuthContext } from '../../providers/AuthProvider';

import { Heading } from '../../components/Heading';
import { Loading } from '../../components/Loading';
import { ReturnButton } from '../../components/ReturnButton';
import { DrinksContainer } from '../../components/DrinksContainer';

import { api } from '../../services/api';

export const Favorites = () => {
  const { user } = useContext(AuthContext);
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await api.get(`/drink/favorites/${user._id}`);
        setDrinks(resp.data.user.favoritesInfo);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [user._id]);

  return (
    <Styled.Container>
      {!loading ? (
        <>
          <Heading size="small" as="h4">
            Favorites:
          </Heading>
          <DrinksContainer drinks={drinks} />
        </>
      ) : (
        <Loading />
      )}
      <ReturnButton />
    </Styled.Container>
  );
};
