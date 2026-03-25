export class UserInfo {
  constructor({ nameSelector, jobSelector}) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(".profile__image");
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      job: this._job.textContent
    };
  }

  setUserInfo({ name, job }) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar(avatarUrl) {
    this._avatar.src = avatarUrl;
  }
}
