import BaseAnalyzer from '../analyzer/BaseAnalyzer'

const resolvers = {
  Query: {
    analyze: () => BaseAnalyzer
  },
  Analyze: {
    // totalPerDay: (parent, args) => parent.getMessagesPerDay(args),
    totalPerDay: (parent) => parent.getMessagesPerDay(),
    // usersPerDay: (parent, args) => parent.getMessagesPerUser(args)
    usersPerDay: (parent) => parent.getMessagesPerUser()
  },
  userPerDay: {
    name: (parent) => parent.name,
    messageCount: (parent) => parent.messageCount,
    kCount: (parent) => parent.kCount
  }
}

export default resolvers