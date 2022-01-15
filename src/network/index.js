'use strict'

const { UserEntity, TodoEntity } = require('../model')

class NetWork {
  constructor (loc) {
    this.loc = loc
    this.session = ''
    this.currUserId = 0
    this.currPassword = ''
    this.currNickname = ''
  }

  static getInstance () {
    if (!NetWork.instance) {
      NetWork.instance = new NetWork('http://sgp.hareru.moe:8080')
    }
    return NetWork.instance
  }
  /**
   * 登录函数
   * @param {number} userid
   * @param {string} password
   */

  async Login (userid, password) {
    try {
      const res = await fetch(`${this.loc}/login?userId=${userid}&password=${password}`, {
        method: 'POST'
      })
      const resJson = await res.json()
      if (resJson.status === 200) {
        this.session = resJson.data
        this.currPassword = password
        this.currUserId = userid
      } else {
        throw new Error(resJson.msg)
      }
    } catch (error) {
      throw new Error('Network Error!')
    }
  }

  /**
   * 注册函数
   * @param {string} nickname
   * @param {string} password
   * @returns {UserEntity} user信息，使用UserEntity
   */
  async Register (nickname, password) {
    const res = await fetch(`${this.loc}/register`, {
      body: JSON.stringify({
        nickname: nickname,
        password: password
      }),
      headers: {
        'content-type': 'application/json;charset=utf-8'
      },
      method: 'POST'
    })
    this.currPassword = password
    this.currNickname = nickname
    const resJson = await res.json()
    if (resJson.status === 200) {
      return new UserEntity(resJson.data)
    } else {
      throw new Error(resJson.msg)
    }
  }

  /**
   * 获取所有TODO列表，用于分页获取
   * @param {number} limit 最大获取量
   * @param {number} maxId 从哪个开始
   * @param {number} userid 用户ID
   */
  async GetTodoListWithPage (limit, maxId, userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/todo/${userid}?limid=${limit}&max_id=${maxId}`, {
      method: 'GET',
      headers: {
        Authorization: this.session
      }
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
      const resData = JSON.parse(resJson.data)
      const res = []
      resData.forEach(e => res.push(new TodoEntity(e)))
      return res
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.GetTodoListWithPage(limit, maxId, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 获取所有TODO列表，不进行分页
   * @param {*} userid 用户ID
   * @returns {TodoEntity[]} Todo列表
   */
  async GetTodoList (userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/todo/${userid}`, {
      method: 'GET',
      headers: {
        Authorization: this.session
      }
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
      const resData = resJson.data
      const res = []
      resData.forEach(e => res.push(new TodoEntity(e)))
      return res
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.GetTodoList(userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 同步TODOList
   * @param {TodoEntity[]} todoList TODO数组
   * @param {number} userid 用户id
   */
  async FetchTODOList (todoList, userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/todo/${userid}`, {
      method: 'POST',
      headers: {
        Authorization: this.session,
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(todoList.map(e => e.parseJson()))
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.FetchTODOList(todoList, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 创建Todo
   * @param {TodoEntity} todoItem TODO项
   * @param {number} userid 用户id
   */
  async CreateTODO (todoItem, userid = this.currUserId) {
    console.log(JSON.stringify(todoItem.parseJson()))
    console.log(this.currUserId, this.currPassword)
    const res = await fetch(`${this.loc}/api/todo/${userid}/new`, {
      method: 'POST',
      headers: {
        Authorization: this.session,
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(todoItem.parseJson())
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
      return new TodoEntity(resJson.data)
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.CreateTODO(todoItem, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 获取json
   * @param {number} todoid TODO id
   * @param {number} userid User id
   * @returns {TodoEntity} 得到的TODO
   */
  async GetTODO (todoid, userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/todo/${userid}/${todoid}`, {
      method: 'GET',
      headers: {
        Authorization: this.session
      }
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
      return new TodoEntity(resJson.data)
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.GetTODO(todoid, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 更新TODO
   * @param {TodoEntity} todoItem TODO项，要求包含Todo ID
   * @param {number} todoid TODO ID，可不传，如果不传则会取item中的对应项
   * @param {number} userid User ID
   */
  async UpdateTODO (todoItem, todoid = -1, userid = this.currUserId) {
    if (todoid === -1) {
      todoid = todoItem.todoId
    }
    const res = await fetch(`${this.loc}/api/todo/${userid}/${todoid}`, {
      method: 'PUT',
      headers: {
        Authorization: this.session,
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(todoItem.parseJson())
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.UpdateTODO(todoItem, todoid, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 删除TODO
   * @param {number} todoid TODO id
   * @param {number} userid User id
   */
  async DeleteTODO (todoid, userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/todo/${userid}/${todoid}`, {
      method: 'DELETE',
      headers: {
        Authorization: this.session,
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({
        todoId: todoid,
        creatorId: userid
      })
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.DeleteTODO(todoid, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 根据昵称搜索
   * @param {string} nickname 昵称
   * @returns {number[]} userid数组
   */
  async SearchByNickname (nickname) {
    const res = await fetch(`${this.loc}/api/user/search?nickname=${nickname}`, {
      method: 'GET',
      headers: {
        Authorization: this.session
      }
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
      return resJson.data
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.SearchByNickname(nickname)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 根据用户ID获取公开信息
   * @param {number} userid 用户ID
   * @returns {object} 有userId、nickname、avatar三个参数
   */
  async GetPublishedInfo (userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/user/${userid}`, {
      method: 'GET',
      headers: {
        Authorization: this.session
      }
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
      return resJson.data
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.GetPublishedInfo(userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 获取头像
   * @param {number} userid 用户头像
   * @returns .
   */
  async GetAvatar (userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/user/${userid}/avatar`, {
      method: 'GET',
      headers: {
        Authorization: this.session
      }
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
      return resJson.data
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.GetAvatar(userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 更新头像
   * @param {*} image 图片
   * @param {*} userid 用户id
   */
  async UpdateAvatar (image, userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/user/${userid}/avatar`, {
      method: 'POST',
      headers: {
        Authorization: this.session,
        'content-type': 'application/json;charset=utf-8'
      },
      body: image
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.UpdateAvatar(image, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 查询详细信息
   * @param {number} userid 用户ID
   * @returns {UserEntity} 用户信息
   */
  async QueryDetailInfo (userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/user/${userid}/detail`, {
      method: 'GET',
      headers: {
        Authorization: this.session
      }
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
      return new UserEntity(resJson.data)
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.QueryDetailInfo(userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 更新用户信息
   * @param {object} ndata 新数据，可能是nickname和password两个参数，如{password: '114514'}
   * @param {number} userid 用户id
   */
  async UpdateDetailInfo (ndata, userid = this.currUserId) {
    ndata.userId = userid
    if (ndata.password !== undefined) {
      this.currPassword = ndata.password
    }
    const res = await fetch(`${this.loc}/api/user/${userid}/detail`, {
      method: 'POST',
      headers: {
        Authorization: this.session,
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(ndata)
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.UpdateDetailInfo(ndata, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 获取关注列表
   * @param {number} userid 用户ID
   * @returns {number[]} 关注列表数组
   */
  async GetWatchList (userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/user/${userid}/watchlist`, {
      method: 'GET',
      headers: {
        Authorization: this.session
      }
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
      return resJson.data
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.GetWatchList(userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  /**
   * 添加关注
   * @param {number[]} watchData 关注列表
   * @param {number} userid 用户id
   */
  async AddWatchList (watchData, userid = this.currUserId) {
    console.log(watchData)
    console.log(JSON.stringify(watchData))
    const res = await fetch(`${this.loc}/api/user/${userid}/watchlist`, {
      method: 'POST',
      headers: {
        Authorization: this.session,
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ watchList: watchData })
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.AddWatchList(watchData, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }

  async DeleteWatchList (watchData, userid = this.currUserId) {
    const res = await fetch(`${this.loc}/api/user/${userid}/watchlist`, {
      method: 'DELETE',
      headers: {
        Authorization: this.session,
        'content-type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ watchList: watchData })
    })
    const resStatus = await res.status
    const resJson = await res.json()
    if (resJson.status === 200 && resStatus === 200) {
    } else if (resJson != null) {
      if (resJson.status === 403) {
        await this.Login(this.currUserId, this.currPassword)
        await this.DeleteWatchList(watchData, userid)
      } else {
        throw new Error(resJson.msg)
      }
    } else {
      throw new Error('Network Error')
    }
  }
}
module.exports = NetWork

// http://sgp.hareru.moe:8080
