import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { db } from '../../services/api';
import { Lists } from '../../templates/Lists';
import { ErrorComponent } from '../../components/ErrorComponent';
import { GetThumbImg } from '../../utils/get-thumb-img';

import config from '../../config';

export default function ListPage({ kinds, kind, type, images, name }) {
  const { t } = useTranslation();

  if (kinds === false) {
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
        <title>{`${name} | ${config.siteName}`}</title>
      </Head>
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

export const getStaticProps = async ({ locale, params }) => {
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
      kinds = null;
    }
  } catch (error) {
    kinds = false;
  }

  if (kinds === null) {
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
      ...(await serverSideTranslations(locale, ['common'])),
      kinds,
      kind,
      type,
      images,
      name,
    },
  };
};
