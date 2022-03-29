import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card
} from "reactstrap";

import { formatDistance } from 'date-fns'

import ShareIcon from '@mui/icons-material/Share';

import {
  ContainerHeader,
  WrapperTitleHeader,
  TitleHeader,
  TitleSection,
  WrapperWarnnig,
  TittleWarnnig,
  WrapperInputPost,
  AvatarComp,
  ContainerInput,
  InputPost,
  TitleWrapperPost,
  ButtonPost,
  WrapperButton,
  WrapperIcon
} from './styles'
import { PostProfile } from './PostProfile';


const user = {
  id: '4152',
  nome: 'Wanderley Junior',
  avatar: 'https://qgr-files.s3.sa-east-1.amazonaws.com/avatars/avatar_32170',
}

const POSTS = [
  {
    autor: user,
    conteudo: '😀 Hoje é dia de Curtir a vida adoidado... Lembre-se de que o dia o dia é feito amigos, você precisa cair pra dentro... #borattt #tmjadf',
    createAt: '3 horas',
    comentarios: [
      {
        autor: user,
        conteudo: '#qgr apreveita e segue @deleyjr',
        likes: []
      }
    ],
    likes: [],
    shareds: [],
    saves: []
  },

]

function Profile() {

  const [userData, setUserData] = useState(user);
  const [contentPost, setContentPost] = useState('');

  const [postUser, setPostUser] = useState(POSTS);
  let random = Math.ceil(Math.random() * (3 - 0) + 0)

  // Change InputPost
  function handleOnChengeText(text) {
    if (text.length > 1) {
      return setContentPost(text)
    }
  }

  // Create New Post
  function handleNewPost() {

    if (contentPost.length > 2) {

      setPostUser([...postUser, {
        autor: userData,
        conteudo: contentPost,
        comentarios: [{
          autor: {
            avatar: "data:image/jpeg;base64,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",
            id: '54',
            nome: "Pablo Marçal"
          },
          conteudo: [
            '#Tmjadf general',
            '#boraTTT',
            'Pra trás nem pra pegar impulso',
            'Cai pra dentro General #qgr'
          ][random],

        }],
        createAt: `${formatDistance(new Date(), new Date())}`,
        likes: [],
        saves: [],
        shareds: []
      }])
    }
    setContentPost(' ')
  }


  return (
    <>
      <div className="page-content">
        <Container fluid>
          <Row
            style={{
              paddingRight: 160,
              paddingLeft: 160,
            }}
          >
            <Card style={{
              display: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 0
            }} >
              <ContainerHeader >
                <WrapperIcon>
                  <ShareIcon
                    color='#e9e9e9'
                  />
                </WrapperIcon>
              </ContainerHeader>
              <AvatarComp
                src={userData.avatar}
                round
                size={120}
                unique
              />

              <WrapperTitleHeader>
                <TitleHeader>{userData.nome}</TitleHeader>
              </WrapperTitleHeader>
            </Card>
          </ Row>

          <Row
            style={{
              paddingRight: 160,
              paddingLeft: 160,
            }}
          >
            {/* Wrapper Left - CONQUISTAS */}
            <Col sm={12}>
              <Row>
                <Col
                  md={4}
                  style={{
                    padding: 0
                  }}
                >
                  <Card
                  >
                    <TitleSection>Conquistas</TitleSection>
                    <WrapperWarnnig>
                      <TittleWarnnig>😞 Você ainda não possui Conquistas</TittleWarnnig>
                    </WrapperWarnnig>
                  </Card>
                </Col>
                <Col
                  md={8}
                  style={{
                    padding: 0,
                    paddingLeft: 40
                  }}
                >
                  <Card
                    style={{
                      padding: 0
                    }}
                  >
                    <WrapperInputPost>
                      <TitleWrapperPost>Hora do Transbordo</TitleWrapperPost>
                      <ContainerInput>
                        <AvatarComp
                          src={userData.avatar}
                          round
                          size={50}
                        />

                        <InputPost
                          placeholder='Digite um novo codigo...'
                          onChange={(e) => handleOnChengeText(e.currentTarget.value)}
                        />
                      </ContainerInput>
                      <WrapperButton>
                        <ButtonPost
                          onClick={handleNewPost}
                        >Enviar</ButtonPost>
                      </WrapperButton>
                    </WrapperInputPost>
                  </Card>
                  {/* Render Posts Profiles */}
                  {postUser.map((post, index) => (
                    <Card>
                      <PostProfile
                        key={index}
                        autor={post.autor}
                        {...post}
                      />
                    </Card>
                  ))}


                </Col>
              </Row>
            </ Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Profile;