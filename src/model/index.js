// 可以从Date创建，也可以从json创建。
class TimeStamp {
  constructor (timeObj) {
    if (timeObj instanceof Date) {
      this.timeDateObj = timeObj
    } else if (typeof (timeObj) === 'number') {
      this.timeDateObj = new Date(timeObj)
    }
  }

  GetTimeStampJson () {
    return this.timeDateObj.getTime()
  }

  GetTime () {
    return this.timeDateObj
  }

  SetTime () {
    return this.timeDateObj
  }
}

class TodoEntity {
  constructor (EntityJson) {
    this.completeAt = new TimeStamp(EntityJson.completeAt)
    this.createAt = new TimeStamp(EntityJson.createAt)
    this.creatorId = EntityJson.creatorId
    this.deadline = new TimeStamp(EntityJson.deadline)
    this.description = EntityJson.description
    this.importance = EntityJson.importance
    this.localId = EntityJson.localId
    this.parentId = EntityJson.parentId
    this.plantTime = EntityJson.plantTime
    this.title = EntityJson.title
    this.todoId = EntityJson.todoId
    this.updateAt = new TimeStamp(EntityJson.updateAt)
  }

  parseJson () {
    return {
      completeAt: this.completeAt.GetTimeStampJson(),
      createAt: this.createAt.GetTimeStampJson(),
      creatorId: this.creatorId,
      deadline: this.deadline.GetTimeStampJson(),
      importance: this.importance,
      description: this.description,
      localId: this.localId,
      parentId: this.parentId,
      plantTime: this.plantTime,
      title: this.title,
      todoId: this.todoId,
      updateAt: this.updateAt.GetTimeStampJson()
    }
  }
}

class UserEntity {
  constructor (EntityJson) {
    this.nickname = EntityJson.nickname
    this.password = EntityJson.password
    this.role = EntityJson.role
    this.userId = EntityJson.userId
    this.watchList = EntityJson.watchList
  }

  parseJson () {
    return {
      nickname: this.nickname,
      password: this.password,
      userId: this.userId
    }
  }
}

module.exports = { TimeStamp, TodoEntity, UserEntity }
