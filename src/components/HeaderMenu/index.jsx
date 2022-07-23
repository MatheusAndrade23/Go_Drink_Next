import * as Styled from './styles';

import Carousel from 'react-elastic-carousel';

import { LinkComponent } from '../LinkComponent';

export const HeaderMenu = () => {
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
          My Favorites
        </LinkComponent>
        <LinkComponent link="/kind/a/alcoholic" model="alternative">
          Alcoholic
        </LinkComponent>
        <LinkComponent link="/kind/a/non_alcoholic" model="alternative">
          Non Alcoholic
        </LinkComponent>
        <LinkComponent link="/kind/a/optional_alcohol" model="alternative">
          Optional Alcoholic
        </LinkComponent>
        <LinkComponent link="/all-drinks" model="alternative">
          All Drinks
        </LinkComponent>
        <LinkComponent link="/list/ingredients" model="alternative">
          All Ingredients
        </LinkComponent>
        <LinkComponent link="/list/categories" model="alternative">
          All Categories
        </LinkComponent>
        <LinkComponent link="/list/glasses" model="alternative">
          All Glasses
        </LinkComponent>
      </Carousel>
    </Styled.Menu>
  );
};
