'use strict'
class NetWork {
  constructor (loc) {
    this.loc = loc
    this.session = ''
    this.currUserId = 0
  }

  async Login (userid, password) {
    const data = {
      userId: userid,
      password: password
    }
    fetch(`${this.loc}/login`, {
      method: 'POST',
      body: data
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      this.currUserId = userid
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async Register (nickname, password) {
    const data = {
      nickname: nickname,
      password: password
    }
    fetch(`${this.loc}/register`, {
      method: 'POST',
      body: data
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async GetTodoList (limit, maxId, userid = this.currUserId) {
    fetch(`${this.loc}/api/todo/${userid}?limid=${limit}&max_id=${maxId}`, {
      method: 'GET',
      headers: {
        Authorization: this.session
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async FetchTODOList (todoList, userid = this.currUserId) {
    fetch(`${this.loc}/api/todo/${userid}`, {
      method: 'POST',
      headers: {
        Authorization: this.session
      },
      body: todoList
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async CreateTODO (todoItem, userid = this.currUserId) {
    fetch(`${this.loc}/api/todo/${userid}/new`, {
      method: 'POST',
      headers: {
        Authorization: this.session
      },
      body: todoItem
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async GetTODO (todoid, userid = this.currUserId) {
    fetch(`${this.loc}/api/todo/${userid}/${todoid}`,
      { headers: { Authorization: this.session } }
    ).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async UpdateTODO (todoItem, todoid, userid = this.currUserId) {
    fetch(`${this.loc}/api/todo/${userid}/${todoid}`, {
      method: 'PUT',
      headers: {
        Authorization: this.session
      },
      body: todoItem
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async DeleteTODO (todoid, userid = this.currUserId) {
    fetch(`${this.loc}/api/todo/${userid}/${todoid}`, {
      method: 'DELETE',
      headers: { Authorization: this.session }
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async SearchByNickname (nickname) {
    fetch(`${this.loc}/api/user/search?nickname=${nickname}`, {
      method: 'GET'
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async GetPublishedInfo (userid = this.currUserId) {
    fetch(`${this.loc}/api/user/${userid}`, {
      headers: {
        Authorization: this.session
      }
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async GetAvatar (userid = this.currUserId) {
    fetch(`${this.loc}/api/user/${userid}/avatar`).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async UpdateAvatar (image, userid = this.currUserId) {
    fetch(`${this.loc}/api/user/${userid}/avatar`, {
      method: 'POST',
      headers: {
        Authorization: this.session,
        'Content-Type': 'image/jpeg'
      },
      body: image
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async QueryDetailInfo (userid = this.currUserId) {
    fetch(`${this.loc}/api/user/${userid}/detail`, {
      headers: { Authorization: this.session }
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async UpdateDetailInfo (ndata, userid = this.currUserId) {
    fetch(`${this.loc}/api/user/${userid}/detail`, {
      method: 'POST',
      headers: { Authorization: this.session },
      body: ndata
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async GetWatchList (userid = this.currUserId) {
    fetch(`${this.loc}/api/user/${userid}/watchlist`, {
      method: 'GET',
      headers: { Authorization: this.session }
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async AddWatchList (watchData, userid = this.currUserId) {
    fetch(`${this.loc}/api/user/${userid}/watchlist`, {
      method: 'POST',
      headers: { Authorization: this.session },
      body: watchData
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }

  async DeleteWatchList (watchData, userid = this.currUserId) {
    fetch(`${this.loc}/api/user/${userid}/watchlist`, {
      method: 'DELETE',
      headers: { Authorization: this.session },
      body: watchData
    }).then((res) => {
      if (!res.ok) {
        throw new Error(`${res.status} ${res.statusText}`)
      }
      return res.blob()
    }).then((blob) => {
      console.log(blob)
    }).catch(err => {
      console.log(err)
    })
  }
}
module.exports = NetWork
