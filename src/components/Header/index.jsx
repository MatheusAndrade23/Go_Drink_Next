import * as Styled from './styles';

import { useState, useEffect, useContext, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

import { AuthContext } from '../../providers/AuthProvider/index';

import { Logo } from '../Logo';
import { HeaderMenu } from '../HeaderMenu';
import { LinkComponent } from '../LinkComponent';
import { SmallContainer } from '../SmallContainer';
import { InputComponent } from '../InputComponent';
import { ButtonComponent } from '../ButtonComponent';
import { MessageComponent } from '../MessageComponent';

export const Header = ({ search }) => {
  const input_container = useRef(null);
  const { user } = useContext(AuthContext);

  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null);

  const SearchInput = (e) => {
    setUrl(e.target.value);
  };

  const SearchSubmit = () => {
    if (url.length > 0) {
      window.location.href = `/search/${url}`;
      return;
    }
    setMessage('Please type something to search!');
  };

  useEffect(() => {
    if (search) {
      input_container.current.value = search;
      setUrl(search);
    }
  }, [search]);

  return (
    <>
      <Styled.Header>
        <SmallContainer>
          <Logo text="GODRINK" smallText="GD" />
        </SmallContainer>
        <SmallContainer disposition="row">
          <InputComponent
            type="text"
            handleChange={SearchInput}
            placeholder="Type your search here..."
            name="search"
            reference={input_container}
          />
          <ButtonComponent
            handleSubmit={SearchSubmit}
            model="icon"
            name="Click to search"
            disabled={url.length === 0}
          >
            <FaSearch />
          </ButtonComponent>
        </SmallContainer>
        {user.authenticated ? (
          <LinkComponent link="/auth/signout">Sign Out</LinkComponent>
        ) : (
          <LinkComponent link="/auth/signin">Sign In</LinkComponent>
        )}
      </Styled.Header>
      <HeaderMenu />
      {message && <MessageComponent message={message} hide={setMessage} />}
    </>
  );
};
