export default class UserInfo {
    constructor(data) {
        this._profileNameElement = document.querySelector(data.profileNameSelector),
        this._profileCaptionElement = document.querySelector(data.profileCaptionSelector)
        this._profileAvatarElement = document.querySelector(data.profileAvatarSelector)
    }
    getUserInfo() {
        return {
            name: this._profileNameElement.textContent,
            about: this._profileCaptionElement.textContent,
            avatar: this._profileAvatarElement.src
        }
    }
    setUserInfo(dataJob) {
        this._profileNameElement.textContent = dataJob.name;
        this._profileCaptionElement.textContent = dataJob.about;
    }
    setAvatar(data) {
        this._profileAvatarElement.src = data.avatar;
    }
}