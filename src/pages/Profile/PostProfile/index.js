import React, { useState } from 'react';

//Icon Like
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import CommentIcon from '@mui/icons-material/Comment';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import {
  Container,
  WrapperDatasUser,
  AvatarUser,
  TitleUser,
  SubTitleHours,
  ContainerUserData,
  WrapperDataPost,
  ContentPost,
  WrapperButtonInter,
  ContainerButtonIcon,
  ButtonInterLeft,
  ButtonInterRigth,
} from './styles';

import { CommentShow } from '../CommentShow';
import { InputComment } from '../InputComment';

export function PostProfile({
  autor,
  conteudo,
  createAt,
  comentarios,
  likes,
  saves,
  // shareds
}) {

  const [like, setLike] = useState(false);
  const [isFocusInputComment, setIsFocusInputComment] = useState(false)

  function handleIsFocusInputComment() {
    setIsFocusInputComment(true)
  }

  function handleIsNoFocusInputComment() {
    setIsFocusInputComment(false)
  }
  return (
    <Container>
      {/* User Data */}
      <WrapperDatasUser>
        <AvatarUser
          src={autor.avatar}
          size={70}
        />
        <ContainerUserData>
          <TitleUser>{autor.nome}</TitleUser>
          <SubTitleHours>{createAt}</SubTitleHours>
        </ContainerUserData>
        <ContainerButtonIcon
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <MoreVertIcon />
        </ContainerButtonIcon>
      </WrapperDatasUser>

      {/* Post Show */}
      <WrapperDataPost>
        <ContentPost>{conteudo}</ContentPost>
      </WrapperDataPost>

      {/* Button Interage */}
      <WrapperButtonInter>
        <ButtonInterLeft>
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
          <ContainerButtonIcon>
            <CommentIcon />
          </ContainerButtonIcon>
          <ContainerButtonIcon>
            <ShareIcon />
          </ContainerButtonIcon>
        </ButtonInterLeft>

        <ButtonInterRigth>
          <ContainerButtonIcon>
            <BookmarkBorderIcon />
          </ContainerButtonIcon>
        </ButtonInterRigth>
      </WrapperButtonInter>

      {/* Input Comment */}

      <InputComment />

      {/* Render Comments */}
      {comentarios.map(comment => (
        <CommentShow
          {...comment}
        />
      ))}

    </Container>
  );
}