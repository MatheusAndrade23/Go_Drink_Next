import * as Styled from './styles';

import { TbApi } from 'react-icons/tb';
import { GiThorHammer } from 'react-icons/gi';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import { AiOutlineLinkedin, AiOutlineGithub } from 'react-icons/ai';

import { LinkComponent } from '../LinkComponent';
import { TextComponent } from '../TextComponent';
import { ThemeSwitcher } from '../ThemeSwitcher';

import config from '../../config';

export const Footer = () => {
  return (
    <Styled.Footer>
      <TextComponent>
        {`This website uses ${''}`}
        <LinkComponent link={config.dbUrl}>TheCocktailDB.</LinkComponent>
      </TextComponent>
      <TextComponent>
        {`If you like the site, please consider giving a star on ${''}`}
        <LinkComponent link={config.repository}>GitHub.</LinkComponent>
      </TextComponent>
      <Styled.Icons disposition="row">
        <Styled.SocialMedia href={config.linkedin} title="Linkedin">
          <AiOutlineLinkedin />
        </Styled.SocialMedia>
        <Styled.SocialMedia href={config.gitHub} title="GitHub">
          <AiOutlineGithub />
        </Styled.SocialMedia>
        <Styled.SocialMedia href={config.programaThor} title="ProgramaThor">
          <GiThorHammer />
        </Styled.SocialMedia>
        <Styled.SocialMedia href={config.apiUrl} title="Api">
          <TbApi />
        </Styled.SocialMedia>
      </Styled.Icons>
      <Styled.FooterLogo>
        GODRINK © <span className="fi fi-br fis"></span>
      </Styled.FooterLogo>
      <Styled.GoTop href="#" title="Go Top">
        <BsFillArrowUpSquareFill />
      </Styled.GoTop>
      <ThemeSwitcher />
    </Styled.Footer>
  );
};
