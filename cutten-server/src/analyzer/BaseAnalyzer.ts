import * as moment from 'moment'

import {
  createReadStream 
} from 'fs'

import * as readline from 'readline'

// this is going ot be the start of the analyzer
class BaseAnalyzer {
  // gets total messages sent per day for the group
  public static getMessagesPerDay() {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })

      // initialize counts for both total messages and individual messages
      let messageCount = 0

      // initialize date and years for comparison
      const yesterday = moment().subtract(1, 'days').dayOfYear()
      const thisYear = moment().subtract(1, 'days').get('year')

      // for each line..
      rl.on('line', (line) => {
        // take first half of line containing date, time, and name
        const messageInfo = line.split(": ")[0]
        // split message info at date
        const nameStr = messageInfo.split(", ")
        // capture date from message info
        const dateStr = messageInfo.split(", ")[0]
        // convert date string to day of year, and get year
        const messageDay = moment(dateStr).dayOfYear()
        const messageYear = moment(dateStr).get('year')

        // match date to today and check year, increment
        if (messageYear === thisYear && messageDay === yesterday) {
          messageCount++
        }
      })

      // after lines have been looped through
      rl.on('close', () => {
        resolve(messageCount)
      })
    })
  }
  // gets total number of messages per user for the day
  public static getMessagesPerUser() {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })

      // initialize counts for both total messages and individual messages
      const countObject = {
        first: 0,
        second: 0,
        third: 0
      }

      // initialize date and years for comparison
      const yesterday = moment().subtract(1, 'days').dayOfYear()
      const thisYear = moment().subtract(1, 'days').get('year')
      
      // for each line..
      rl.on('line', (line) => {
        // take first half of line containing date, time, and name
        const messageInfo = line.split(": ")[0]

        // split info into three parts - date time name. Regex looks for ", ", and " - "
        const infoArray = messageInfo.split(/[,|^ -]+ /)

        // for now we will use hard coded names
        // count times each name shows up
        if (infoArray[2] === "Adam Aho") {
          countObject.first += 1
        } else if (infoArray[2] === "Brad Dudeck") {
          countObject.second += 1
        } else if (infoArray[2] === "Brett Bullock") {
          countObject.third += 1
        }
      })

      // after lines have been looped through
      rl.on('close', () => {
        resolve(countObject)
      })
    })
  }
}

export default BaseAnalyzer