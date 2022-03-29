import React from 'react';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {
  WrapperCommentsShow,
  CommentContent,
  WrapperCommentsShowLeft,
  WrapperCommentsShowRigth,
  ContainerButtonIcon,
  AvatarUser
} from './styles';

export function CommentShow({
  autor,
  conteudo,
  likes
}) {
  let like = true
  return (
    <WrapperCommentsShow>
      <WrapperCommentsShowLeft>

        <AvatarUser
          size={45}
          src={autor.avatar}
        />
        <CommentContent>
          {conteudo}
        </CommentContent>
      </WrapperCommentsShowLeft>
      <WrapperCommentsShowRigth>
        <ContainerButtonIcon>
          {like ? (
            <FavoriteIcon
              style={{
                color: '#25d366'
              }}
            />

          ) : (
            <FavoriteBorderIcon />
          )}
        </ContainerButtonIcon>
      </WrapperCommentsShowRigth>
    </WrapperCommentsShow>
  );
}