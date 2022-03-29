import styled from 'styled-components';


// Component Comment Input

export const WrapperInputComment = styled.div`
  display: flex;

  align-items: center;
  padding: 16px;
`;
export const InputComment = styled.textarea`
  width: 100%;

  background: transparent;

  border-radius: 25px;

  margin: 0 0 0 16px;
  padding: 10px 25px;

  color: #efef;
  font-size: 18px;
  
  min-height: 30px;
  max-height: 70px;
  height: 50px;
  

  display: flex;
  justify-content: center;

`;

export const ButtonPublic = styled.button`
  background: transparent;

  padding: 10px 16px;
  
  color: #fff;
  font-weight: bold;

  border: none;
`;