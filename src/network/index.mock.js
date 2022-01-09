'use strict'
import { TodoEntity, UserEntity } from '../model/index'
class NetWorkMock {
  constructor (loc) {
    this.loc = loc
    this.session = ''
    this.currUserId = 0
  }

  mockTodoentity = new TodoEntity({
    completeAt: 1641699781012,
    createAt: 1641699781012,
    creatorId: 4,
    deadline: 1641699782012,
    description: 'string',
    importance: 0,
    localId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    parentId: 0,
    plantTime: 0,
    title: 'a title',
    todoId: 0,
    updateAt: 1641699781012
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

  mockAvatar = 'data:image/jpg;base64,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'

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
    return this.mockAvatar
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
      return true
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
