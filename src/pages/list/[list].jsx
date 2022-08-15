import { NextSeo } from 'next-seo';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { db } from '../../services/api';
import { Lists } from '../../templates/Lists';
import { Header } from '../../../components/Header';
import { ErrorComponent } from '../../components/ErrorComponent';

import { GetThumbImg } from '../../utils/get-thumb-img';

import config from '../../config';

export default function ListPage({ kinds, kind, type, images, name }) {
  const { defaultImageUrl: url, pageUrl, siteName, description } = config;
  const title = `${name} | ${siteName}`;
  const router = useRouter();

  if (kinds === null) {
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
      <Lists
        kinds={kinds}
        kind={kind}
        type={type}
        images={images}
        name={name}
      />
    </>
  );
}

export const getStaticPaths = async () => {
  return {
    paths: [
      {
        params: { list: 'ingredients' },
      },
      {
        params: { list: 'categories' },
      },
      {
        params: { list: 'glasses' },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const kind = params.list.charAt(0);
  let kinds = [];
  let images = [];
  let name;
  let type;

  switch (kind) {
    case 'i':
      type = 'strIngredient1';
      name = 'Ingredients';
      break;

    case 'c':
      type = 'strCategory';
      name = 'Categories';
      break;

    case 'g':
      type = 'strGlass';
      name = 'Glasses';
      break;
  }

  try {
    const resp = await db.get(`/api/json/v1/1/list.php?${kind}=list`);
    try {
      const drinks = resp.data.drinks;
      kinds = drinks;
    } catch (error) {
      kinds = undefined;
    }
  } catch (error) {
    kinds = null;
  }

  if (kinds === undefined) {
    return {
      notFound: true,
    };
  }

  if (kind !== 'i') {
    images = await GetThumbImg(kind, kinds, type);
  }

  if (kind === 'c') {
    kinds = kinds.filter((list) => !list[type].includes('/'));
  }

  return {
    props: {
      kinds,
      kind,
      type,
      images,
      name,
    },
  };
};
