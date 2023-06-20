export default class UserInfo {
    constructor(data) {
        this._profileNameElement = document.querySelector(data.profileNameSelector),
        this._profileCaptionElement = document.querySelector(data.profileCaptionSelector)
    }
    getUserInfo() {
        return {
            name: this._profileNameElement.textContent,
            caption: this._profileCaptionElement.textContent,
        }
    }
    setUserInfo(dataJob) {
        this._profileNameElement.textContent = dataJob.name;
        this._profileCaptionElement.textContent = dataJob.job;
    }
}