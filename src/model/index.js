// 可以从Date创建，也可以从json创建。
class TimeStamp {
  constructor (timeObj) {
    if (timeObj instanceof Date) {
      this.timeDateObj = new Date(timeObj.time)
      this.date = timeObj.getDate()
      this.hours = timeObj.getHours()
      this.minutes = timeObj.getMinutes()
      this.month = timeObj.getMonth()
      this.nanos = 0
      this.seconds = timeObj.getSeconds()
      this.time = timeObj.getTime()
      this.year = timeObj.getFullYear()
    } else if (typeof (timeObj) === 'object') {
      this.date = timeObj.date
      this.hours = timeObj.hours
      this.minutes = timeObj.minutes
      this.month = timeObj.month
      this.nanos = timeObj.nanos
      this.seconds = timeObj.seconds
      this.time = timeObj.time
      this.year = timeObj.year
      this.timeDateObj = new Date(timeObj.time)
    }
  }

  GetTimeStampJson () {
    return {
      date: this.timeDateObj.getDate(),
      hours: this.timeDateObj.getHours(),
      minutes: this.timeDateObj.getMinutes(),
      month: this.timeDateObj.getMonth(),
      nanos: 0,
      seconds: this.timeDateObj.getSeconds(),
      time: this.timeDateObj.getTime(),
      year: this.timeDateObj.getFullYear()
    }
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
    this.localId = EntityJson.localId
    this.parentId = EntityJson.parentId
    this.plantTime = EntityJson.plantTime
    this.title = EntityJson.title
    this.todoId = EntityJson.todoId
    this.updateAt = EntityJson.updateAt
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
}

module.exports = { TimeStamp, TodoEntity, UserEntity }
