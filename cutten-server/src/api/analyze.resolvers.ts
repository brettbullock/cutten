import BaseAnalyzer from '../analyzer/BaseAnalyzer'

const resolvers = {
  Query: {
    analyze: async (parent) => {
      const count = await BaseAnalyzer.getMessagesPerDay()
      
      return count;
    }
  }
}

export default resolvers