/* eslint-disable no-undef */
import 'vue-jest'

test('qwq', async () => {
  const n = new NetWork('http://sgp.hareru.moe:8080')
  const user = await n.Register('zyx', '114514')
  console.log(user)
  const uid = user.userId
  const pwd = '114514'
  await n.Login(uid, pwd)
  const currDate = new Date()
  let todoEntity = new TodoEntity({
    completeAt: 0,
    createAt: currDate.getTime(),
    creatorId: uid,
    deadline: new Date(2022, 2, 1, 7, 22),
    description: 'hhh',
    localId: 'a local id',
    parentId: 0,
    plantTime: 10,
    title: 'a todo',
    updateAt: currDate.getTime()
  })
  console.log(todoEntity)
  todoEntity = await n.CreateTODO(todoEntity)
  console.log(todoEntity)
  todoEntity.deadline = new TimeStamp(new Date(2022, 2, 1, 8, 22))
  todoEntity.title = 'Another title'
  await n.UpdateTODO(todoEntity)
  todoEntity = await n.GetTODO(todoEntity.todoId)
  console.log(todoEntity)
  await n.DeleteTODO(todoEntity.todoId)
  await n.CreateTODO(todoEntity)
  await n.CreateTODO(todoEntity)
  let lst = await n.GetTodoList()
  console.log(lst)
  lst[0].title = 'dfvfdv'
  lst[1].title = 'csfv'
  console.log(lst)
  await n.FetchTODOList(lst)
  lst = await n.GetTodoList()
  console.log(lst)
  const ids = await n.SearchByNickname('zyx')
  console.log(ids)
  const info = await n.GetPublishedInfo(33)
  console.log(info)
  let userI = await n.QueryDetailInfo()
  console.log(userI)
  await n.UpdateDetailInfo({
    nickname: 'yxz'
  })
  userI = await n.QueryDetailInfo()
  console.log(userI)
  watchLst = await n.GetWatchList()
  console.log(watchLst)
  ids.forEach(e => watchLst.push(e.userId))
  await n.AddWatchList(watchLst)
  watchLst = await n.GetWatchList()
  console.log(watchLst)
  await n.DeleteWatchList(watchLst)
  watchLst = await n.GetWatchList()
  console.log(watchLst)
})
