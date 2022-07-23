import { NextSeo } from 'next-seo';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { db } from '../../services/api';
import { Drink } from '../../templates/Drink';
import { ErrorComponent } from '../../components/ErrorComponent';
import { IngredientsArray } from '../../utils/ingredients-array';

import config from '../../config';

export default function DrinkPage({ drink, ingredients }) {
  const url = drink.strDrinkThumb;
  const router = useRouter();
  const title = `${drink.strDrink} | ${config.siteName}`;

  if (drink === false) {
    const title = `Server Error | ${config.siteName} `;
    return (
      <>
        <NextSeo
          title={title}
          description={`${title} - ${config.description}`}
          canonical={config.pageUrl + router.asPath}
          openGraph={{
            url,
            title,
          }}
        />
        <ErrorComponent message="Something went wrong, try again later!" />
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={title}
        description={`${title} - ${config.description}`}
        canonical={config.pageUrl + router.asPath}
        openGraph={{
          url,
          title,
        }}
      />
      <Drink drink={drink} ingredients={ingredients} />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  let ingredients;
  let drink;

  try {
    const resp = await db.get(`/api/json/v1/1/lookup.php?i=${id}`);
    try {
      const drinkInfo = resp.data.drinks[0];
      const ingredientsInfo = await IngredientsArray(drinkInfo);
      ingredients = ingredientsInfo;
      drink = drinkInfo;
    } catch (error) {
      drink = null;
    }
  } catch (error) {
    drink = false;
  }

  if (drink === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      drink,
      ingredients,
    },
  };
};
