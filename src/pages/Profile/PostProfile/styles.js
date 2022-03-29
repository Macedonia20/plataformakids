import styled from 'styled-components';
import Avatar from 'react-avatar';

export const Container = styled.div`
 /* flex: 1; */

 padding: 25px; 
`;
// Data User
export const WrapperDatasUser = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;
`;

export const AvatarUser = styled(Avatar).attrs({
  round: true,
})`
  height: ${({ size }) => size ? size : 50}px;
  width: ${({ size }) => size ? size : 50}px;

`;
export const ContainerUserData = styled.div`
  margin-left: 25px;
`;

export const TitleUser = styled.h2`
  color: "#efefef";
  font-size: 22px;
  font-weight: bolder;
`;
export const SubTitleHours = styled.text`
  color: "#e2e2e2e2";
  font-size: 14px;
  font-weight: 400;
`;

// Post Data

export const WrapperDataPost = styled.div`
  margin: 18px 0;
  padding: 0 16px;
`;

export const ContentPost = styled.p`
  color: "#e2e2e2e2";
  font-size: 18px;
  font-weight: 400;
`;
export const WrapperButtonInter = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ButtonInterLeft = styled.div`

`;
export const ButtonInterRigth = styled.div`

`;

export const ContainerButtonIcon = styled.button`
  padding: 16px 20px;
  background: transparent;

  border: none;

  color: #efef;
`;

