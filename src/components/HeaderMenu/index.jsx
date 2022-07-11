import * as Styled from './styles';

import { useTranslation } from 'react-i18next';

import Carousel from 'react-elastic-carousel';

import { LinkComponent } from '../LinkComponent';

export const HeaderMenu = () => {
  const { t } = useTranslation();
  const breakPoints = [
    { width: 1, itemsToShow: 1, pagination: false },
    { width: 300, itemsToShow: 2, pagination: false },
    { width: 450, itemsToShow: 3, pagination: false },
    { width: 600, itemsToShow: 4, pagination: false },
    { width: 720, itemsToShow: 5, pagination: false },
    { width: 850, itemsToShow: 6, pagination: false },
    { width: 990, itemsToShow: 7, pagination: false },
    { width: 1140, itemsToShow: 8, pagination: false },
  ];

  return (
    <Styled.Menu>
      <Carousel breakPoints={breakPoints}>
        <LinkComponent link="/favorites" model="alternative">
          {t('headerLinkFavorites')}
        </LinkComponent>
        <LinkComponent link="/kind/a/alcoholic" model="alternative">
          {t('headerLinkAlcoholic')}
        </LinkComponent>
        <LinkComponent link="/kind/a/non_alcoholic" model="alternative">
          {t('headerLinkNAlcoholic')}
        </LinkComponent>
        <LinkComponent link="/kind/a/optional_alcohol" model="alternative">
          {t('headerLinkOAlcoholic')}
        </LinkComponent>
        <LinkComponent link="/all-drinks" model="alternative">
          {t('headerLinkADrinks')}
        </LinkComponent>
        <LinkComponent link="/list/ingredients" model="alternative">
          {t('headerLinkAIngredients')}
        </LinkComponent>
        <LinkComponent link="/list/categories" model="alternative">
          {t('headerLinkACategories')}
        </LinkComponent>
        <LinkComponent link="/list/glasses" model="alternative">
          {t('headerLinkAGlasses')}
        </LinkComponent>
      </Carousel>
    </Styled.Menu>
  );
};
