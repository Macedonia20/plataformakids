import Avatar from 'react-avatar';
import styled from 'styled-components';


export const WrapperCommentsShow = styled.div`
display: flex;
flex-direction: row;

/* justify-content: ; */

padding: 10px 25px;

align-items: center;
`;
export const CommentContent = styled.p`
flex: 2;
color: "#e2e2e2e2";
font-size: 18px;
font-weight: 400;

text-align: start;

margin: 0 16px;
`;

export const WrapperCommentsShowLeft = styled.div`

display: flex;

justify-content: center;
align-items: center;
`;
export const WrapperCommentsShowRigth = styled.div`
flex: 1;
display: flex;

justify-content: end;
align-items: center;
`;

export const AvatarUser = styled(Avatar).attrs({
  round: true,
})`
  height: ${({ size }) => size ? size : 50}px;
  width: ${({ size }) => size ? size : 50}px;

`;

export const ContainerButtonIcon = styled.button`
  padding: 16px 20px;
  background: transparent;

  border: none;

  color: #efef;
`;

