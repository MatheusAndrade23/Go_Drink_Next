import { NextSeo } from 'next-seo';

import { useRouter } from 'next/router';

import { db } from '../../../services/api';
import { Kinds } from '../../../templates/Kinds';
import { Header } from '../../../components/Header';
import { ErrorComponent } from '../../../components/ErrorComponent';

import config from '../../../config';

export default function KindPage({ drinks, index, kind }) {
  const { defaultImageUrl: url, pageUrl, siteName, description } = config;
  const router = useRouter();

  const title = `${`${kind.charAt(0).toUpperCase()}${kind
    .slice(1)
    .replace(/_/, ' ')}`} | ${siteName} `;

  if (drinks === null) {
    return (
      <>
        <NextSeo title={`Server Error | ${siteName}`} />
        <ErrorComponent message="Something went wrong, try again later!" />
      </>
    );
  }

  return (
    <>
      <NextSeo
        title={title}
        description={`${title} - ${description}`}
        canonical={pageUrl + router.asPath}
        openGraph={{
          url,
          title,
        }}
      />
      <Header />
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

export const getServerSideProps = async ({ params }) => {
  const { kind, index } = params;
  let drinks = [];

  try {
    const resp = await db.get(`/api/json/v1/1/filter.php?${index}=${kind}`);
    try {
      drinks = resp.data.drinks.reverse();
    } catch (error) {
      drinks = undefined;
    }
  } catch (err) {
    drinks = null;
  }

  if (drinks === undefined) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      drinks,
      index,
      kind,
    },
  };
};
