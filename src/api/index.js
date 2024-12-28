const TOKEN = '65e854c4-700a-467d-be02-5c38257cf03e';

const config = {
    baseurl:'https://mesto.nomoreparties.co/v1/cohort-mag-4',
    token:TOKEN,
    headers: {
        'Content-Type': 'application/json',
        'authorization': TOKEN,
    }
}

const _checkResponse = (res) => {
  if (res.ok) {
    // console.log(res)
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = () => {
  return fetch(`${config.baseurl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
.then(_checkResponse)
}

export const getCards = () => {
    return fetch(`${config.baseurl}/cards`, {
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
    return fetch(`${config.baseurl}/users/me`, {
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
    return fetch(`${config.baseurl}/cards`, {
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
    return fetch(`${config.baseurl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const likeCard = (cardId) => {
    return fetch(`${config.baseurl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const removeLikeCard = (cardId) => {
    return fetch(`${config.baseurl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}

export const changeAvatar = (avatarLink) => {
    return fetch(`${config.baseurl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    })
    .then(_checkResponse)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
  }
  
export const validateImageUrl = (url) => {
    const urlPattern = /\.(jpeg|jpg|gif|png)$/i;
    if (!urlPattern.test(url)) {
        console.error('Неверный формат URL изображения');
        return false;
    }
    return fetch(url, { method: 'HEAD', mode: 'no-cors' })
    .then(_checkResponse)
    .then((response) => response.ok)
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      }); 
}