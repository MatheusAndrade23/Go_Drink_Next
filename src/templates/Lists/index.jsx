import * as Styled from './styles';

import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { db } from '../../services/api';

import { Header } from '../../components/Header';
import { Loading } from '../../components/Loading';
import { Heading } from '../../components/Heading';
import { ReturnButton } from '../../components/ReturnButton';
import { ErrorComponent } from '../../components/ErrorComponent';
import { ButtonComponent } from '../../components/ButtonComponent';

import { GetThumbImg } from '../../utils/get-thumb-img';
import config from '../../config';

export const Lists = () => {
  const { t } = useTranslation();
  const { list } = useParams();
  const kind = list.charAt(0);
  const KINDS_PER_PAGE = 8;

  const [loadMoreControl, setLoadMoreControl] = useState(KINDS_PER_PAGE);
  const [loadingControl, setLoadingControl] = useState(true);
  const [kindsToShow, setKindsToShow] = useState([]);
  const [name, setName] = useState('');
  const [linksImg, setLinksImg] = useState(undefined);
  const [kinds, setKinds] = useState([]);
  const [type, setType] = useState('');
  const [next, setNext] = useState(0);
  const [errorControl, setErrorControl] = useState({
    error: false,
    message: '',
  });

  const handleShowMoreKinds = () => {
    const nextPage = next + KINDS_PER_PAGE;
    const nextKinds = kinds.slice(nextPage, nextPage + KINDS_PER_PAGE);
    setKindsToShow([...kindsToShow, ...nextKinds]);
    setNext(nextPage);
    setLoadMoreControl((loaded) => loaded + KINDS_PER_PAGE);
  };

  const getTemplateTitle = (index, word) => {
    const wordFormatted = `${word.charAt(0).toUpperCase()}${word
      .slice(1)
      .replace(/_/, ' ')}`;
    switch (index) {
      case 'i':
        return `${t('ingredientTitle')} ${wordFormatted}:`;

      case 'c':
        return `${t('drinksKindCategory')} ${wordFormatted} ${t('category')}:`;

      case 'g':
        return `${t('drinksKindGlass')} ${wordFormatted} ${
          word.includes('lass') ? ':' : index === 'g' && `${t('glass')}:`
        }`;

      case 'a':
        if (wordFormatted.charAt(0) === 'A') {
          return `${t('headerLinkAlcoholic')}:`;
        } else if (wordFormatted.charAt(0) === 'N') {
          return `${t('headerLinkNAlcoholic')}:`;
        } else {
          return `${t('headerLinkOAlcoholic')}:`;
        }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadImgLinks = async () => {
    document.title = `${name} | ${config.siteName}`;
    const images = await GetThumbImg(kind, kinds, type);
    if (images && images.length > 0) {
      setLinksImg(images);
      setLoadingControl(false);
    } else if (images === undefined) {
      setKinds(undefined);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await db.get(`/api/json/v1/1/list.php?${kind}=list`);
        try {
          const kinds = resp.data.drinks;
          setKinds(kinds);
          setKindsToShow(kinds.slice(0, KINDS_PER_PAGE));
        } catch (error) {
          setKinds(null);
        }
      } catch (error) {
        setKinds(undefined);
      }
    })();
  }, [kind]);

  useEffect(() => {
    if (kinds && kinds.length > 0) {
      switch (kind) {
        case 'i':
          setType('strIngredient1');
          setLoadingControl(false);
          setName('Ingredients');
          document.title = `Ingredients | ${config.siteName}`;
          break;

        case 'c':
          setType('strCategory');
          setName('Categories');
          loadImgLinks();
          break;

        case 'g':
          setType('strGlass');
          setName('Glasses');
          loadImgLinks();
          break;

        case 'a':
          setType('strAlcoholic');
          setName('Alcoholic');
          loadImgLinks();
          break;
      }
    } else if (kinds === null) {
      window.location.href = '/not-found';
    } else if (kinds === undefined) {
      setErrorControl({
        error: true,
        message: t('error500message'),
        code: 500,
      });
      document.title = `${t('serverErrorTitle')} | ${config.siteName} `;
    }
  }, [kind, kinds, loadImgLinks, t]);

  return (
    <>
      <Header />
      {!errorControl.error ? (
        <Styled.KindsContainer>
          {!loadingControl ? (
            <>
              <Heading size="small" as="h4">
                {`All ${name}:`}
              </Heading>
              <Styled.Container>
                {kindsToShow.map((kinds, index) => (
                  <Styled.Kind
                    title={getTemplateTitle(kind, kinds[type])}
                    key={kinds[type]}
                    onClick={() =>
                      (window.location.href = `/kind/${kind}/${kinds[type]
                        .replace(/ /, '_')
                        .replace('/', '_')}`)
                    }
                  >
                    {linksImg && <img src={linksImg[index]} />}
                    {kind === 'i' && (
                      <img
                        src={`https://www.thecocktaildb.com/images/ingredients/${kinds[type]}.png`}
                        alt={kinds[type]}
                      />
                    )}
                    <Heading as="h6" size="small">
                      {kinds[type]}
                    </Heading>
                  </Styled.Kind>
                ))}
              </Styled.Container>
            </>
          ) : (
            <Styled.Container>
              <Loading />
            </Styled.Container>
          )}
          {kinds && loadMoreControl < kinds.length && (
            <ButtonComponent handleSubmit={handleShowMoreKinds} bold={false}>
              {t('loadMoreButton')}
            </ButtonComponent>
          )}
        </Styled.KindsContainer>
      ) : (
        <ErrorComponent
          message={errorControl.message}
          code={errorControl.code && errorControl.code}
        />
      )}
      <ReturnButton />
    </>
  );
};
