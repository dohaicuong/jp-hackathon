const faker = require('faker')

module.exports = {
  Answer: () => faker.random.words(),
  DateTime: () => new Date().toISOString(),
  Frequency: () => {
    const minute = faker.random.number()
    const hour = faker.random.number()
    const dayMonth = faker.random.number()
    const month = faker.random.number()
    const dayWeek = faker.random.number()

    return `${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`
  }
}