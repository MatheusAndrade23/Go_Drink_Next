import * as Styled from './styles';

import { IoIosArrowBack } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

export const ReturnButton = () => {
  const { t } = useTranslation();
  return (
    <Styled.ReturnLink href="/" title={t('return')}>
      <IoIosArrowBack />
    </Styled.ReturnLink>
  );
};
