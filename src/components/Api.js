

  const handleResponse = res => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export default class Api {
    constructor(config) {
        this.url = config.url;
        this.headers = config.headers;
    }
    editUserInfo(data) {
        return fetch(`${this.url}v1/cohort-70/users/me`, {
            method: "PATCH",
            body: JSON.stringify({
                name: data.name,
                about: data.about}),
            headers: this.headers
        })
            .then(handleResponse)
    }
    getUserInfo() {
        return fetch(`${this.url}v1/cohort-70/users/me`, {
            headers: this.headers
        })
        .then(handleResponse)
    }

    editAvatar(data) {
        return fetch(`${this.url}v1/cohort-70/users/me/avatar`, {
            method: "PATCH",
            body: JSON.stringify({
                avatar: data.avatar}),
            headers: this.headers
        })
            .then(handleResponse)
    } 
    
    getCards() {
        return fetch(`${this.url}v1/cohort-70/cards`, {
            headers: this.headers
        })
        .then(handleResponse)
    }

    deleteCard(data) {
        return fetch(`${this.url}v1/cohort-70/cards`, {
          method: 'DELETE',
          headers: this.headers,
          body: JSON.stringify(data)
        })
            .then(handleResponse)
    }

    updateData(data) {
        return fetch(this.url, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify(data)
        })
            .then(handleResponse)
    }
}
