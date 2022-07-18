import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { db } from '../../../services/api';
import { Kinds } from '../../../templates/Kinds';
import { ErrorComponent } from '../../../components/ErrorComponent';
import { GetThumbImg } from '../../../utils/get-thumb-img';

import config from '../../../config';

export default function ListPage({ drinks, index, kind }) {
  const { t } = useTranslation();

  if (drinks === false) {
    return (
      <>
        <Head>
          <title>{`${t('serverErrorTitle')} | ${config.siteName}`}</title>
        </Head>
        <ErrorComponent message={t('error500message')} />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{`${`${kind.charAt(0).toUpperCase()}${kind
          .slice(1)
          .replace(/_/, ' ')}`} | ${config.siteName} `}</title>
      </Head>
      <Kinds drinks={drinks} index={index} kind={kind} />
    </>
  );
}

// export const getStaticPaths = async () => {
//   const resp = await db.get('/api/json/v1/1/list.php?i=list');
//   const resp2 = await db.get('/api/json/v1/1/list.php?c=list');
//   const resp3 = await db.get('/api/json/v1/1/list.php?g=list');

//   const ingredients = resp.data.drinks;
//   const categories = resp2.data.drinks;
//   const glasses = resp2.data.drinks;

//   const categoryPaths = categories.map((list) => {
//     return {
//       params: { index: 'c', kind: list.strCategory },
//     };
//   });

//   const ingredientPaths = ingredients.map((list) => {
//     return {
//       params: { index: 'i', kind: list.strIngredient1 },
//     };
//   });

//   const glassPaths = glasses.map((list) => {
//     return {
//       params: { index: 'g', kind: list.strGlass },
//     };
//   });

//   const paths = [...categoryPaths, ...ingredientPaths, ...glassPaths];

//   console.log(paths);

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async ({ locale, params }) => {
  const { kind, index } = params;
  let drinks = [];

  try {
    const resp = await db.get(`/api/json/v1/1/filter.php?${index}=${kind}`);
    try {
      drinks = resp.data.drinks.reverse();
    } catch (error) {
      drinks = null;
    }
  } catch (err) {
    drinks = false;
  }

  if (drinks === null) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      drinks,
      index,
      kind,
    },
  };
};
