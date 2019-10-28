import BaseAnalyzer from '../analyzer/BaseAnalyzer'

const resolvers = {
  Query: {
    analyze: () => BaseAnalyzer
  },
  Analyze: {
    totalPerDay: (parent, args) => parent.getMessagesPerDay(args),
    usersPerDay: (parent, args) => parent.getMessagesPerUser(args)
  },
  userPerDay: {
    name: (parent) => parent.name,
    messageCount: (parent) => parent.messageCount,
    kCount: (parent) => parent.k
  }
}

export default resolvers