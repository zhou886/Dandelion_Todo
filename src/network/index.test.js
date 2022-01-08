/* eslint-disable no-undef */
import 'vue-jest'
const Net = require('./index.mock')

test('qwq', () => {
  const a = new Net('http://sgp.hareru.moe:8080/swagger-ui/index.htm')
  return a.Login('4', '114514').then(data => {
    expect(data).toBe({})
  })
})
