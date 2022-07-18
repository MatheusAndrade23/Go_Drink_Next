import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { db } from '../../services/api';
import { Drink } from '../../templates/Drink';
import { ErrorComponent } from '../../components/ErrorComponent';
import { IngredientsArray } from '../../utils/ingredients-array';

import config from '../../config';

export default function DrinkPage({ drink, ingredients }) {
  const { t } = useTranslation();

  if (drink === false) {
    return (
      <>
        <Head>
          <title>{`${t('serverErrorTitle')} | ${config.siteName} `}</title>
        </Head>
        <ErrorComponent message={t('error500message')} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${drink.strDrink} | ${config.siteName}`}</title>
      </Head>
      <Drink drink={drink} ingredients={ingredients} />
    </>
  );
}

export const getServerSideProps = async ({ locale, params }) => {
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
      ...(await serverSideTranslations(locale, ['common'])),
      drink,
      ingredients,
    },
  };
};
