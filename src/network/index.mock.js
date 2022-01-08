'use strict'
import { TodoEntity, UserEntity } from '../model/index'
class NetWorkMock {
  constructor (loc) {
    this.loc = loc
    this.session = ''
    this.currUserId = 0
  }

  mockTodoentity = new TodoEntity({
    completeAt: {
      date: 8,
      hours: 21,
      minutes: 28,
      month: 1,
      nanos: 0,
      seconds: 33,
      time: 1641648543184,
      year: 2021
    },
    createAt: {
      date: 8,
      hours: 21,
      minutes: 28,
      month: 1,
      nanos: 0,
      seconds: 33,
      time: 1641648543184,
      year: 2021
    },
    creatorId: 4,
    deadline: {
      date: 8,
      hours: 21,
      minutes: 28,
      month: 1,
      nanos: 0,
      seconds: 33,
      time: 1641648543184,
      year: 2021
    },
    description: 'string',
    importance: 0,
    localId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    parentId: 0,
    plantTime: 0,
    title: 'a title',
    todoId: 0,
    updateAt: {
      date: 8,
      hours: 21,
      minutes: 28,
      month: 1,
      nanos: 0,
      seconds: 33,
      time: 1641648543184,
      year: 2021
    }
  })

  mockUserEntity = new UserEntity({
    nickname: 'hhh',
    password: '114514',
    role: [{
      authority: 'ROLE_USER'
    }],
    userId: 4,
    watchList: [0]
  })

  WaitForSecond (tim) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, tim)
    })
  }

  async Login (userid, password) {
    await this.WaitForSecond(100)
    const u = new UserEntity({
      nickname: 'hhh',
      password: password,
      role: [{
        authority: 'ROLE_USER'
      }],
      userId: userid,
      watchList: [0]
    })
    return u
  }

  async Register (nickname, password) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('An error occured..')
    } else {
      const u = new UserEntity({
        nickname: nickname,
        password: password,
        role: [{
          authority: 'ROLE_USER'
        }],
        userId: 3,
        watchList: [0]
      })
      return u
    }
  }

  async GetTodoList (limit, maxId, userid = this.currUserId) {
    await this.WaitForSecond(100)
    const c1 = this.mockTodoentity
    const c2 = this.mockTodoentity
    return [c1, c2]
  }

  async FetchTODOList (todoList, userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('An error occured..')
    } else {
      return true
    }
  }

  async CreateTODO (todoItem, userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('An error occured..')
    } else {
      return true
    }
  }

  async GetTODO (todoid, userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('An error occured..')
    } else {
      return this.mockTodoentity
    }
  }

  async UpdateTODO (todoItem, todoid, userid = this.currUserId) {
    await this.WaitForSecond(100)
    return true
  }

  async DeleteTODO (todoid, userid = this.currUserId) {
    await this.WaitForSecond(100)
    return true
  }

  async SearchByNickname (nickname) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      return []
    } else {
      return [this.mockUserEntity, this.mockUserEntity]
    }
  }

  async GetPublishedInfo (userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('Non authorized')
    } else {
      return {
        nickname: 'zyx',
        userid: 4,
        avator: ''
      }
    }
  }

  async GetAvatar (userid = this.currUserId) {
    await this.WaitForSecond(100)
    return ''
  }

  async UpdateAvatar (image, userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('Network Error')
    } else {
      return true
    }
  }

  async QueryDetailInfo (userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('Non authorized')
    } else {
      return {
        nickname: 'zyx',
        userid: 4,
        avator: ''
      }
    }
  }

  async UpdateDetailInfo (ndata, userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('Non authorized')
    } else {
      return true
    }
  }

  async GetWatchList (userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('Failed')
    } else {
      return [1, 2, 3]
    }
  }

  async AddWatchList (watchData, userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('Failed')
    } else {
      return [1, 2, 3]
    }
  }

  async DeleteWatchList (watchData, userid = this.currUserId) {
    await this.WaitForSecond(100)
    const r = Math.random()
    if (r > 0.8) {
      throw new Error('Failed')
    } else {
      return true
    }
  }
}

module.exports = NetWorkMock
