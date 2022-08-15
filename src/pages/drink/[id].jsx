import { NextSeo } from 'next-seo';

import { useRouter } from 'next/router';

import { db } from '../../services/api';
import { Drink } from '../../templates/Drink';
import { Header } from '../../components/Header';
import { ReturnButton } from '../../components/ReturnButton';
import { ErrorComponent } from '../../components/ErrorComponent';

import { GetDrinkInfo } from '../../utils/get-drink-info';

import config from '../../config';

export default function DrinkPage({ drink, info }) {
  const { strDrinkThumb: url } = drink;
  const router = useRouter();

  if (drink === null) {
    return (
      <>
        <NextSeo title={`Server Error | ${config.siteName} `} />
        <ErrorComponent message="Something went wrong, try again later!" />
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={`${drink.strDrink} | ${config.siteName}`}
        description={`${drink.strDrink} - ${config.description}`}
        canonical={config.pageUrl + router.asPath}
        openGraph={{
          url,
          title: `${drink.strDrink} | ${config.siteName}`,
        }}
      />
      <Header />
      <ReturnButton />
      <Drink drink={drink} info={info} />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { id } = params;

  let drink;
  let info;

  try {
    const resp = await db.get(`/api/json/v1/1/lookup.php?i=${id}`);
    try {
      drink = resp.data.drinks[0];
      info = await GetDrinkInfo(drink);
    } catch (error) {
      drink = undefined;
    }
  } catch (error) {
    drink = null;
  }

  if (drink === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      drink,
      info,
    },
  };
};
