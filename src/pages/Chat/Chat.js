import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import 'moment/locale/pt-br';
import { size } from "lodash";
import Avatar from 'react-avatar';
import api from '../../services/api';
import chatImg from "../../assets/images/chat.png";
import {
  Button,
  Col,
  Container,
  Dropdown,
  Input,
  Nav,
  Row,
  TabContent,
  TabPane
} from "reactstrap";

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

import {
  addMessage,
  getChats,
  getContacts,
  getGroups,
  getMessages,
} from "../../store/actions";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRoomId: 1,
      currentUser: {
        name: "",
        isActive: true,
        avatar: ''
      },
      notification_Menu: false,
      search_Menu: false,
      settings_Menu: false,
      other_Menu: false,
      activeTab: "1",
      Chat_Box_Username: "",
      Chat_Box_User_Status: "online",
      Chat_Box_User_isActive: false,
      curMessage: "",
      chatAPI: [],
      messagesAPI: [],
      breadcrumbItems: [
        // { title: "Nazox", link: "/" },
        // { title: "Chat", link: "#" },
      ],
    };
    this.messageBox = null;
  }

  async getChatAPI() {
    let obj = '';
    if (localStorage.getItem("authUser")) {
      obj = JSON.parse(localStorage.getItem("authUser"));
    }

    const options = {
      headers: {"Authorization" : `Bearer ${obj.token}`}
    }

    await api.get(`/chat`, options)
      .then(({ data })=> {
          this.setState({
              chatAPI: data
          });
      });
  }

  async getMensagensAPI(roomId) {
    let obj = '';
    if (localStorage.getItem("authUser")) {
      obj = JSON.parse(localStorage.getItem("authUser"));
    }

    const options = {
      headers: {"Authorization" : `Bearer ${obj.token}`}
    }

    await api.get(`/chat/mensagens/${roomId}`, options)
      .then(({ data })=> {
          this.setState({
              messagesAPI: data
          });
          let objDiv = document.getElementById("scroll-chat");
          objDiv.scrollTop = objDiv.scrollHeight;
      });
  }

  async setMensagensAPI(menssage, roomId) {
    let obj = '';
    if (localStorage.getItem("authUser")) {
      obj = JSON.parse(localStorage.getItem("authUser"));
    }

    const options = {
      headers: {"Authorization" : `Bearer ${obj.token}`}
    }

    await api.post(`/chat/mensagens/`, menssage, options)
      .then(({ data })=> {
          this.getMensagensAPI(roomId);
      });
  }

  async setVisualizacoes(roomId) {
    let obj = '';
    if (localStorage.getItem("authUser")) {
      obj = JSON.parse(localStorage.getItem("authUser"));
    }

    const options = {
      headers: {"Authorization" : `Bearer ${obj.token}`}
    }

    await api.put(`/chat/mensagens/${roomId}`, false, options)
      .then(()=> {
        this.getChatAPI();
      });
  }

  carregandoDadosUsusarios() {
    let avatar = '';
    if (localStorage.getItem("authUser")) {
        const sessaoUsuario = JSON.parse(localStorage.getItem("authUser"));
        avatar = sessaoUsuario.avatar;
        this.setState({
          currentUser: {
            name: sessaoUsuario.nome,
            isActive: true,
            avatar: avatar
          }
        });
    }
  }

  carregarEventos() {
    document.addEventListener('keyup', this.handleEnter);
  }

  handleEnter = (e) => {
    if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById('botao-enviar-mensagem').click();
    }
  };

  componentDidMount() {
    this.carregandoDadosUsusarios();
    this.carregarEventos();
    this.getChatAPI();
    const { onGetChats, onGetGroups, onGetContacts, onGetMessages } =
      this.props;
    const { currentRoomId } = this.state;
    onGetChats();
    onGetGroups();
    onGetContacts();
    onGetMessages(currentRoomId);
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    const { messages } = this.props;
    if (size(messages) !== size(prevProps.messages)) {
      this.scrollToBottom();
    }
  }

  toggleNotification = () => {
    this.setState((prevState) => ({
      notification_Menu: !prevState.notification_Menu,
    }));
  };

  //Toggle Chat Box Menus
  toggleSearch = () => {
    this.setState((prevState) => ({
      search_Menu: !prevState.search_Menu,
    }));
  };

  toggleSettings = () => {
    this.setState((prevState) => ({
      settings_Menu: !prevState.settings_Menu,
    }));
  };

  toggleOther = () => {
    this.setState((prevState) => ({
      other_Menu: !prevState.other_Menu,
    }));
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  };

  //Use For Chat Box
  userChatOpen = (id, name, status, roomId) => {
    // const { onGetMessages } = this.props;
    this.setState({
      Chat_Box_Username: name,
      currentRoomId: roomId,
    });
    this.getMensagensAPI(roomId);
    this.setVisualizacoes(roomId);
    // onGetMessages(roomId);
  };

  addMessage = (roomId, sender) => {
    
    // const { onAddMessage } = this.props;
    // const message = {
    //   id: Math.floor(Math.random() * 100),
    //   roomId,
    //   sender,
    //   message: this.state.curMessage,
    //   createdAt: new Date(),
    // };

    // console.log('addMessage', roomId, sender, this.state.curMessage);

    // this.setState({ curMessage: "" });
    // onAddMessage(message);

    const messageAPI = {
      roomId,
      message: this.state.curMessage,
    }

    this.setState({ curMessage: "" });
    this.setMensagensAPI(messageAPI, roomId);
  };

  scrollToBottom = () => {
    if (this.messageBox) {
      this.messageBox.scrollTop = this.messageBox.scrollHeight + 1000;
    }
  };

  onKeyPress = (e) => {
    const { key, value } = e;

    const { currentRoomId, currentUser } = this.state;

    if (key === "Enter") {
      this.setState({ curMessage: value });
      this.addMessage(currentRoomId, currentUser.name);
    }
  };

  render() {
    let { groups, contacts } = this.props;

    const { currentRoomId, currentUser } = this.state;
  
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs
              title="Dashboard"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <div className="d-lg-flex mb-4">
              <div className="chat-leftsidebar">
                <div className="p-3 border-bottom">
                  <div className="d-flex">
                    <div className="align-self-center me-3">
                      <img
                        src={currentUser.avatar}
                        className="avatar-xs rounded-circle"
                        alt=""
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="font-size-15 mt-0 mb-1" style={{ paddingTop: 8 }}>
                        {currentUser.name}
                      </h5>
                      {/* <p className="text-muted mb-0">
                        <i className="mdi mdi-circle text-success align-middle me-1"></i>{" "}
                        online
                      </p> */}
                    </div>

                    <div>
                      {/* <Dropdown
                        isOpen={this.state.notification_Menu}
                        toggle={this.toggleNotification}
                        className="chat-noti-dropdown"
                      >
                        <DropdownToggle
                          tag="button"
                          className="btn dropdown-toggle"
                          type="button"
                        >
                          <i className="mdi mdi-dots-horizontal font-size-20"></i>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end">
                          <DropdownItem href="#">Online</DropdownItem>
                          <DropdownItem href="#">Ausente</DropdownItem>
                          <DropdownItem href="#">Offline</DropdownItem>
                        </DropdownMenu>
                      </Dropdown> */}
                    </div>
                  </div>
                </div>
                {/* <CardBody className="border-bottom py-2">
                  <div className="search-box chat-search-box">
                    <div className="position-relative">
                      <Input type="text" placeholder="Pesquisar..." />
                      <i className="ri-search-line search-icon"></i>
                    </div>
                  </div>
                </CardBody> */}
                <div className="chat-leftsidebar-nav">
                  <Nav pills justified>
                    {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1",
                        })}
                        onClick={() => {
                          this.toggleTab("1");
                        }}
                      >
                        <i className="ri-message-2-line font-size-20"></i>
                        <span className="mt-2 d-none d-sm-block">Conversas</span>
                      </NavLink>
                    </NavItem> */}
                    {/* <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "2",
                        })}
                        onClick={() => {
                          this.toggleTab("2");
                        }}
                      >
                        <i className="ri-group-line font-size-20"></i>
                        <span className="mt-2 d-none d-sm-block">Grupo</span>
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "3",
                        })}
                        onClick={() => {
                          this.toggleTab("3");
                        }}
                      >
                        <i className="ri-contacts-book-2-line font-size-20"></i>
                        <span className="mt-2 d-none d-sm-block">Contatos</span>
                      </NavLink>
                    </NavItem> */}
                  </Nav>
                </div>
                <TabContent activeTab={this.state.activeTab} className="py-4">
                  <TabPane tabId="1">
                    <div>
                      <h5 className="font-size-14 px-3 mb-3">Recentes</h5>
                      <ul className="list-unstyled chat-list">
                        <PerfectScrollbar style={{ maxHeight: "345px" }}>
                          {this.state.chatAPI.map((chat, key) => (
                            <li
                              key={key}
                              className={chat.isActive ? "active" : ""}
                            >
                              <Link
                                to="#"
                                onClick={() => {
                                  this.userChatOpen(
                                    chat.id, chat.name, chat.status, chat.roomId
                                  );
                                }}
                              >
                                <div className="d-flex">
                                <div 
                                className={
                                    chat.status === "online"
                                      ? "user-img online align-self-center me-3"
                                      : "user-img away align-self-center me-3"
                                  }>
                                    <Avatar 
                                      className="rounded-circle header-profile-user me-3" 
                                      name={chat.name} 
                                      src={chat.image} 
                                      size="40" 
                                      round={true} 
                                      maxInitials={2}
                                    />
                                    {/* <span className="user-status"></span> */}
                                </div>

                                  <div className="flex-1 overflow-hidden">
                                    { chat.sem_visualizar === '0' ? (
                                      <p className="text-truncate mb-0" style={{ paddingTop: 15 }}>
                                        {chat.name}
                                      </p>
                                    ) : (
                                      <h5 className="text-truncate font-size-14 mb-1" style={{ paddingTop: 15 }}>
                                        {chat.name} <span class="badge rounded-pill bg-success float-end" style={{ padding: 5 }}>
                                          {chat.sem_visualizar === '0' ? '' : chat.sem_visualizar }
                                        </span>
                                      </h5>
                                    )}
                                    
                                    <p className="text-truncate mb-0">
                                      {chat.description}
                                    </p>
                                  </div>
                                  <div className="font-size-11">
                                    {chat.time}
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                        </PerfectScrollbar>
                      </ul>
                    </div>
                  </TabPane>
                  <TabPane tabId="2">
                    <h5 className="font-size-14 px-3 mb-3">Group</h5>
                    <ul className="list-unstyled chat-list">
                      <PerfectScrollbar style={{ height: "345px" }}>
                        {groups &&
                          groups.map((group) => (
                            <li key={"test" + group.image}>
                              <Link
                                to="#"
                                onClick={() => {
                                  this.userChatOpen(
                                    group.id,
                                    group.name,
                                    group.status,
                                    Math.floor(Math.random() * 100)
                                  );
                                }}
                              >
                                <div className="d-flex align-items-center">
                                  <div className="avatar-xs me-3">
                                    <span className="avatar-title rounded-circle bg-light text-body">
                                      {group.image}
                                    </span>
                                  </div>

                                  <div className="flex-1">
                                    <h5 className="font-size-14 mb-0">
                                      {group.name}
                                    </h5>
                                  </div>
                                </div>
                              </Link>
                            </li>
                          ))}
                      </PerfectScrollbar>
                    </ul>
                  </TabPane>

                  <TabPane tabId="3">
                    <h5 className="font-size-14 px-3 mb-3">Contact</h5>

                    <div>
                      <PerfectScrollbar style={{ height: "345px" }}>
                        {contacts &&
                          contacts.map((contact) => (
                            <div
                              key={"test_" + contact.category}
                              className={contact.category === "A" ? "" : "mt-4"}
                            >
                             <div className="p-3">
                                  {contact.category}
                              </div>

                              <ul className="list-unstyled chat-list">
                                {contact.child.map((array) => (
                                  <li key={"test" + array.id}>
                                    <Link
                                      to="#"
                                      onClick={() => {
                                        this.userChatOpen(
                                          array.id,
                                          array.name,
                                          array.status,
                                          Math.floor(Math.random() * 100)
                                        );
                                      }}
                                    >
                                      <h5 className="font-size-14 mb-0">
                                        {array.name}
                                      </h5>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                      </PerfectScrollbar>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
              {!this.state.Chat_Box_Username ? (
                <div className="w-100 user-chat mt-4 mt-sm-0">
                  <div className="my-5 pt-5">
                      <Container>
                          <Row>
                              <Col lg={12}>
                                  <div className="text-center my-5">
                                      <h1 className="fw-bold text-error"><img src={chatImg} alt="" className="error-img" width={140} /></h1>
                                      <h3 className="">Selecione uma conversa...</h3>

                                  </div>
                              </Col>
                          </Row>
                      </Container>
                  </div>
                </div>
              ) : (
                <div className="w-100 user-chat mt-4 mt-sm-0">
                  <div className="p-3 px-lg-4 user-chat-border">
                    <Row>
                      <Col md={4} xs={6}>
                        <h5 className="font-size-15 mb-1 text-truncate" style={{ paddingTop: 8 }}>
                          {this.state.Chat_Box_Username}
                        </h5>
                        {/* <p className="text-muted text-truncate mb-0">
                          <i
                            className={
                              this.state.Chat_Box_User_Status === "online"
                                ? "mdi mdi-circle text-success align-middle me-1"
                                : this.state.Chat_Box_User_Status ===
                                  "Intermediate"
                                ? "mdi mdi-circle text-warning align-middle me-1"
                                : "mdi mdi-circle align-middle me-1"
                            }
                          ></i>
                          {this.state.Chat_Box_User_Status}
                        </p> */}
                      </Col>
                      <Col md={8} xs={6}>
                        <ul className="list-inline user-chat-nav text-end mb-0">
                          <li className="list-inline-item d-inline-block d-sm-none">
                            <Dropdown
                              isOpen={this.state.settings}
                              toggle={() =>
                                this.setState({ settings: !this.state.settings })
                              }
                            >
                              {/* <DropdownToggle
                                className="btn nav-btn dropdown-toggle"
                                type="button"
                              >
                                <i className="mdi mdi-magnify"></i>
                              </DropdownToggle>
                              <DropdownMenu right className="dropdown-menu-md">
                                <Form className="p-2">
                                  <div className="search-box">
                                    <div className="position-relative">
                                      <Input
                                        type="text"
                                        className="form-control rounded"
                                        placeholder="Pesquisar..."
                                      />
                                      <i className="mdi mdi-magnify search-icon"></i>
                                    </div>
                                  </div>
                                </Form>
                              </DropdownMenu> */}
                            </Dropdown>
                          </li>
                          {/* <li className="d-none d-sm-inline-block">
                            <div className="search-box me-2">
                              <div className="position-relative">
                                <Input type="text" placeholder="Pesquisar..." />
                                <i className="mdi mdi-magnify search-icon"></i>
                              </div>
                            </div>
                          </li> */}
                          <li className="list-inline-item m-0 d-none d-sm-inline-block">
                            {/* <Dropdown
                              isOpen={this.state.settings2}
                              toggle={() =>
                                this.setState({
                                  settings2: !this.state.settings2,
                                })
                              }
                            >
                              <DropdownToggle className="btn nav-btn" tag="i">
                                <i className="mdi mdi-cog"></i>
                              </DropdownToggle>
                              <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#">Ver perfil</DropdownItem>
                                <DropdownItem href="#">Limpar conversa</DropdownItem>
                                <DropdownItem href="#">Apagar conversa</DropdownItem>
                              </DropdownMenu>
                            </Dropdown> */}
                          </li>

                          <li className="list-inline-item">
                            <Dropdown
                              isOpen={this.state.other2}
                              toggle={() =>
                                this.setState({ other2: !this.state.other2 })
                              }
                            >
                              {/* <DropdownToggle className="btn nav-btn " tag="i">
                                <i className="mdi mdi-dots-horizontal"></i>
                              </DropdownToggle> */}
                              {/* <DropdownMenu className="dropdown-menu-end">
                                <DropdownItem href="#">Action</DropdownItem>
                                <DropdownItem href="#">
                                  Another action
                                </DropdownItem>
                                <DropdownItem href="#">
                                  Something else
                                </DropdownItem>
                              </DropdownMenu> */}
                            </Dropdown>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </div>

                  <div className="px-lg-2">
                    <div className="chat-conversation p-3 chat-conversation-height">
                      <ul className="list-unstyled mb-0 pe-3">
                        <PerfectScrollbar style={{ maxHeight: "450px" }} id="scroll-chat">
                          {this.state.messagesAPI.map((message, key) => (
                            <li
                              key={key}
                              className={
                                  message.sender === currentUser.name
                                    ? "right"
                                    : ""
                                }
                              style={{ paddingRight: "20px" }}
                            >
                                
                              <div className="conversation-list">
                                
                                  <div className="chat-avatar">
                                    { message.image ? (
                                      <img src={ message.image ? message.image : '' } alt="" />
                                    ) : (
                                      <Avatar 
                                        className="rounded-circle header-profile-user me-3" 
                                        name={message.sender}
                                        size="40" 
                                        round={true} 
                                        maxInitials={2}
                                      />
                                    )}
                                    
                                  </div>
                                

                                <div className="ctext-wrap">
                                  <div className="conversation-name">
                                    {message.sender}
                                  </div>
                                  <div className="ctext-wrap-content">
                                    <p className="mb-0">{message.message}</p>
                                  </div>
                                  <p className="chat-time mb-0">
                                    
                                    {moment(message.createdAt).locale('pt-br').format("llll")}
                                  </p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </PerfectScrollbar>
                      </ul>
                    </div>
                  </div>

                  <div className="px-lg-3">
                    <div className="p-3 chat-input-section">
                      <Row>
                        <Col>
                          <div className="position-relative">
                            <Input
                              id="input-nova-mensagem"
                              type="text"
                              value={this.state.curMessage}
                              onChange={(e) => {
                                this.setState({ curMessage: e.target.value });
                              }}
                              className="form-control chat-input"
                              placeholder="Digitar mensagem..."
                            />
                          </div>
                        </Col>
                        <Col xs={{ size: "auto" }}>
                          { this.state.curMessage ? (
                              <Button
                                  id="botao-enviar-mensagem"
                                  type="button"
                                  color="primary"
                                  onClick={() =>
                                    this.addMessage(
                                      currentRoomId,
                                      currentUser.name
                                    )
                                  }
                                  className="btn-rounded chat-send w-md"
                                >
                                  <span className="d-none d-sm-inline-block me-2">
                                    Enviar
                                  </span>{" "}
                                  <i className="mdi mdi-send"></i>
                                </Button>
                          ) : (
                              <></>
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              )}
              
              
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

Chat.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func,
};

const mapStateToProps = ({ chat }) => ({
  chats: chat.chats,
  groups: chat.groups,
  contacts: chat.contacts,
  messages: chat.messages,
});

const mapDispatchToProps = (dispatch) => ({
  onGetChats: () => dispatch(getChats()),
  onGetGroups: () => dispatch(getGroups()),
  onGetContacts: () => dispatch(getContacts()),
  onGetMessages: (roomId) => dispatch(getMessages(roomId)),
  onAddMessage: (roomId) => dispatch(addMessage(roomId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
