import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../AvatarEditPopup/EditAvatarPopup';
import { api } from '../../utils/Api';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';
import * as authentication from '../../utils/Authentication';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import okImage from '../../images/Ok.svg';
import falseImage from '../../images/False.svg'




function App() {

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ cardOpened: false, cardLink: '', cardName: '' });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentInfoTooltip, setCurrentInfoTooltip] = useState({ isOpen: false, message: '', infoImage: [] });
  const [userData, setUserData] = useState('');


  const history = useHistory();

  // Регистрация и авторизация пользователя

  const tokenCheck = () => {
      authentication.getContent()
      .then((res) => {
        if (res.email) {
          setUserData({
            email: res.email
          });
          setLoggedIn(true);
          history.push('/')
        } else {
          setLoggedIn(false);
          history.push('/sign-in')
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleRegister = (email, password) => {
    return authentication
      .register(email, password)
      .then((res) => {
        setCurrentInfoTooltip({ isOpen: true, message: 'Вы успешно зарегистрировались!', infoImage: okImage })
        history.push('/login')
      })
      .catch((err) => {
        console.log(err)
        setCurrentInfoTooltip({ isOpen: true, message: 'Что-то пошло не так! Попробуйте еще раз.', infoImage: falseImage })
      });
  }

  const handleLogin = (email, password) => {
    return authentication
      .authorize(email, password)
      .then((data) => {
        console.log(data)
        setLoggedIn(true)
        history.push('/')
      })
      .catch(err => {
        console.log(err)
        setCurrentInfoTooltip({ isOpen: true, message: 'Что-то пошло не так! Попробуйте еще раз.', infoImage: falseImage })
      })
      .finally(() => { tokenCheck() })
  }

  const handleSignOut = () => {
    return authentication
      .unlogin()
      .then((res) => {
        console.log(res)
        setLoggedIn(false);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
  }

  // Функции загрузки карточек с API и данных о пользователе

  const getCardsFromRequest = () => {
    api.getCards()
      .then((res) => {
        setCards(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const getUserInfo = () => {
    api.getProfile()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err)
      })
  }

  // Функции лайка карточки и удаления

  function handleCardLike(card) {
    // Проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then(newCard => {
        setCards(state => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log(err)
      });
  }

  function handleDeleteCard(card) {
    api.deleteCard(card._id)
      .then(setCards(state => state.filter((c) => c._id !== card._id)))
      .catch(err => {
        console.log(err)
      })
  }

  // Функции Сабмитов форм

  const handleUpdateUser = (UserData) => {
    api.editProfile(UserData.name, UserData.about)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleUpdateAvatar = (UserData) => {
    api.changeProfileAvatar(UserData.avatar)
      .then(res => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData.name, cardData.link)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch(err => {
        console.log(err)
      });
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  // Открытие попапа с картчокой

  const handleCardClick = (link, name) => {
    setSelectedCard({ ...selectedCard, cardOpened: true, cardLink: link, cardName: name });
  }

  // Закрытие попапов

  const closeAllPopups = () => {
    setCurrentInfoTooltip({ isOpen: false })
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({ ...selectedCard, cardOpened: false });
  }


  useEffect(() => {
    if (loggedIn) {
      getUserInfo()
    }
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      getCardsFromRequest()
    }
  }, [loggedIn])

  useEffect(() => {
    tokenCheck();
  }, []);


  useEffect(() => {
    if (loggedIn) {
      history.push("/");
      return;
    }
    history.push('/sign-in');
  }, [loggedIn]);



  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Switch>
          <ProtectedRoute loggedIn={loggedIn} exact path="/">
            <Header handleSignOut={handleSignOut} headerCaptionText='Выйти' userData={userData.email} />
            <Main
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onEditProfile={handleEditProfileClick}
              onCardClick={handleCardClick}
              cards={cards} onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard} >
            </Main>
            <Footer />
          </ProtectedRoute>

          <Route path="/sign-up">
            <Header headerCaptionLink="/sign-in" headerCaptionText="Войти" />
            <div className="registerContainer">
              <Register handleRegister={handleRegister} />
            </div>
          </Route>

          <Route path="/sign-in">
            <Header headerCaptionLink="/sign-up" headerCaptionText="Регистрация" />
            <div className="loginContainer">
              <Login handleLogin={handleLogin} />
            </div>
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <InfoTooltip currentInfoTooltip={currentInfoTooltip} onClose={closeAllPopups} />

        <ImagePopup
          card={selectedCard.cardOpened}
          link={selectedCard.cardLink}
          name={selectedCard.cardName}
          onClose={closeAllPopups} >
        </ImagePopup>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

        <PopupWithForm name="delete-submit" title="Вы уверены?" submitButtonText="Да"></PopupWithForm>

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
