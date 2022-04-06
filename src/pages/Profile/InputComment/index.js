import React, { useState } from 'react';
import { AvatarUser } from '../PostProfile/styles';

import {
  ButtonPublic,
  InputComment as InputCommentComp,
  WrapperInputComment
} from './styles';

export function InputComment() {
  const [isFocusInputComment, setIsFocusInputComment] = useState(false)

  function handleIsFocusInputComment() {
    setIsFocusInputComment(true)
  }

  function handleIsNoFocusInputComment() {
    setIsFocusInputComment(false)
  }

  return (
    <WrapperInputComment>
      <AvatarUser
        size={50}
      />
      <InputCommentComp
        onFocus={handleIsFocusInputComment}
        onBlur={handleIsNoFocusInputComment}
        placeholder='Adicione um Comentário a publicação...'
      />
      {isFocusInputComment && (
        <ButtonPublic>Publicar</ButtonPublic>
      )}
    </WrapperInputComment>
  );
}