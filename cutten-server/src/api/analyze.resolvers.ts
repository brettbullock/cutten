import BaseAnalyzer from '../analyzer/BaseAnalyzer'

const resolvers = {
  Query: {
    analyze: () => BaseAnalyzer
  },
  Analyze: {
    totalPerDay: (parent, args) => parent.Main(args, true, true),
    // usersPerDay: (parent, args) => parent.getMessagesPerUser(args)
  },
  userPerDay: {
    name: (parent) => parent.name,
    messageCount: (parent) => parent.messageCount,
    kCount: (parent) => parent.kCount
  }
}

export default resolvers