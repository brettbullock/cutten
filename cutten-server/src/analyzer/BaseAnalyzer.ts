import * as moment from 'moment'

import {
  createReadStream 
} from 'fs'

import * as readline from 'readline'

// this is going ot be the start of the analyzer
class BaseAnalyzer {
  public static getMessagesPerDay() {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })

      //initialize counts for both total messages and individual messages
      let messageCount = 0

      //initialize date and years for comparison
      const yesterday = moment().subtract(1, 'days').dayOfYear()
      const thisYear = moment().subtract(1, 'days').get('year')

      //for each line..
      rl.on('line', (line) => {
        //take first half of line containing date, time, and name
        const messageInfo= line.split(": ")[0]
        //split message info at date
        const nameStr = messageInfo.split(", ")
        //capture date from message info
        const dateStr = messageInfo.split(", ")[0]
        //convert date string to day of year, and get year
        const messageDay = moment(dateStr).dayOfYear()
        const messageYear = moment(dateStr).get('year')

        //match date to today and check year, increment
        if (messageYear == thisYear && messageDay == yesterday) {
          messageCount++
        }
      })

      //after lines have been looped through
      rl.on('close', () => {
        resolve(messageCount)
      })
    })
  }
}

export default BaseAnalyzer