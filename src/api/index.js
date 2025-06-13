const TOKEN = '65e854c4-700a-467d-be02-5c38257cf03e';

const config = {
    baseUrl:'https://mesto.nomoreparties.co/v1/cohort-mag-4',
    token:TOKEN,
    headers: {
        'Content-Type': 'application/json',
        'authorization': TOKEN,
    }
}

const _checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
.then(_checkResponse)
}

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'GET',
      headers: config.headers
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
  }

// formData = {name, about}
export function changeProfile (formData){
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(formData)
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

// formData = {name, link}
export function createCard (formData) {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(formData)
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const removeLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const changeAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
    .then(_checkResponse)
  }