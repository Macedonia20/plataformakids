import styled, { css } from 'styled-components'

import Avatar from 'react-avatar';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ContainerHeader = styled.div`
  width: 100%;

  max-height: 350px;
  height: 280px;

  background-image: url('	https://app.plataformaqgr.com.br/static/media/familia-general-do-reino.1cd85b48.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  opacity: 0.9;


  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;
`;

export const WrapperTitleHeader = styled.div`
  padding: 25px 0;
`;

export const TitleHeader = styled.div`
  font-size: 25px;
  font-weight: 800;
  color: #fff;
`;

export const TitleSection = styled.text`
  font-size: 20px;
  color: #79859c;
  padding: 20px 16px 25px;
`;

export const WrapperWarnnig = styled.div`
  background-color: rgba(247, 24, 24, 0.47);
  
  margin: 10px 16px 35px;
  padding: 25px 16px;

  border-radius: 7px;

`;

export const TittleWarnnig = styled.text`
    font-size: 16px;
  color: #F9D6E2;
`;


// Input Publicação

export const WrapperInputPost = styled.div`
  display: flex;

  flex-direction: column;
  
`;

export const ContainerInput = styled.div`
  display: flex;

  flex-direction: row;
  padding: 25px 16px 0;

  justify-content: center;
  align-items: flex-start;
`;

export const TitleWrapperPost = styled.text`
  font-size: 20px;
  color: #79859c;

  padding: 25px 25px 0;
  font-weight: bolder;
`;

export const AvatarComp = styled(Avatar)`
   ${({ unique }) => unique && css` 
     position: absolute;
      top: auto;
      bottom: 35px;
   `}
`;

export const InputPost = styled.textarea.attrs({
  cols: '33',

})`
  width: 100%;

  background-color: #2a3042;
  border: none;
  border-radius: 7px;

  padding: 16px;
  margin: 0 16px 20px;

  height: 80px;
  color: #79859c;

  &::placeholder {
    font-size: 20px;
  color: #79859c;
  }

  overflow: hidden;

  font-size: 20px;
  line-height: 16px;
`;

export const ButtonPost = styled.button`
  padding: 12px 40px;

  border: none;

  border-radius: 7px;

  background-color: #1cbb8c;
  margin-right: 16px;
  margin-bottom: 16px;

  color: #fff;
  font-size: 20px;
  font-weight: bolder;
`;


export const WrapperButton = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const WrapperIcon = styled.button`
  padding: 12px;

  position: absolute;
  top: auto;
  bottom: 0;
  right: 0;
  
  border-radius: 15px;
  margin-bottom: 16px;
  margin-right: 16px;
  
  font-size: 25px;
  
  border: none;
  color: #e9e9e9;
  background-color: #e9e9e9;
  background: transparent;
`;