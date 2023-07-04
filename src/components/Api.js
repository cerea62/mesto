  const handleResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }
    editUserInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            body: JSON.stringify({
                name: data.name,
                about: data.about}),
            headers: this._headers
        })
            .then(handleResponse)
    }
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
        })
        .then(handleResponse)
    }

    editAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            body: JSON.stringify({
                avatar: data.avatar}),
            headers: this._headers
        })
            .then(handleResponse)
    } 
    
    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
          headers: this._headers
        })
        .then(handleResponse);
      }

      addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
        })
        .then(handleResponse);
      }

      deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(handleResponse);
      }
      setLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(handleResponse);
      }
      removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method: 'DELETE',
          headers: this._headers
        })
        .then(handleResponse);
      }
    // updateData(data) {
    //     return fetch(this.url, {
    //       method: 'PATCH',
    //       headers: this.headers,
    //       body: JSON.stringify(data)
    //     })
    //         .then(handleResponse)
    // }
}
