import BaseAnalyzer from '../analyzer/BaseAnalyzer'
import { parentPort } from 'worker_threads'

const resolvers = {
  Query: {
    analyze: () => BaseAnalyzer
  },
  Analyze: {
    perDay: (parent) => parent.getMessagesPerDay(),
    perUser: (parent) => parent.getMessagesPerUser()
  },
  Count: {
    Aho: (parent) => parent.first,
    Brad: (parent) => parent.second,
    Brett: (parent) => parent.third
  }
}

export default resolvers