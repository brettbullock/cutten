import BaseAnalyzer from '../analyzer/BaseAnalyzer'

const resolvers = {
  Query: {
    analyze: () => BaseAnalyzer
  },
  Analyze: {
    totalPerDay: (parent) => parent.getMessagesPerDay(),
    usersPerDay: (parent) => parent.getMessagesPerUser()
  },
  userPerDay: {
    name: (parent) => parent.name,
    messageCount: (parent) => parent.messageCount
  }
}

export default resolvers