// 可以从Date创建，也可以从json创建。
class TimeStamp {
  constructor (timeObj) {
    if (timeObj instanceof Date) {
      this.timeDateObj = timeObj
    } else if (typeof timeObj === 'number') {
      this.timeDateObj = new Date(timeObj)
    }
  }

  GetTimeStampJson () {
    return this.timeDateObj.getTime()
  }

  GetTime () {
    return this.timeDateObj
  }

  SetTime (date) {
    if (date instanceof Date) {
      this.timeDateObj = date
    } else if (typeof date === 'number') {
      this.timeDateObj = new DataTransfer(date)
    }
  }
}

class TodoEntity {
  constructor (EntityJson) {
    this.completeAt = new TimeStamp(
      EntityJson.completeAt === undefined ? 0 : EntityJson.completeAt
    )
    this.createAt = new TimeStamp(
      EntityJson.createAt === undefined ? Date() : EntityJson.createAt
    )
    this.creatorId = EntityJson.creatorId
    this.deadline = new TimeStamp(
      EntityJson.deadline === undefined ? 0 : EntityJson.deadline
    )

    if (EntityJson.description) {
      this.description = EntityJson.description
    } else {
      this.description = ''
    }
    this.importance = EntityJson.importance
    this.localId = EntityJson.localId
    this.parentId = EntityJson.parentId
    this.plantTime = EntityJson.plantTime
    this.title = EntityJson.title
    this.todoId = EntityJson.todoId
    this.updateAt = new TimeStamp(
      EntityJson.updateAt === undefined ? 0 : EntityJson.updateAt
    )
  }

  /**
   * 更新当前todo的完成时间
   */
  completeTodo () {
    this.completeAt.SetTime(new Date())
    this.updateAt.SetTime(new Date())
  }

  /**
   * 更新当前的todo时间
   */
  updateTodo () {
    this.updateAt.SetTime(new Date())
  }

  /**
   * 增加种树时间，要求传入time是number
   * @param {number} time 种树时长
   */
  plantForTime (time) {
    if (typeof time === 'number') {
      this.plantTime += time
      this.updateAt.SetTime(new Date())
    }
  }

  /**
   * 更新Deadline
   * @param {Date} timeDate deadline的时间，要求是Date类型
   */
  updateDeadline (timeDate) {
    if (timeDate instanceof Date) {
      this.deadline.SetTime(timeDate)
      this.updateAt.SetTime(new Date())
    }
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
