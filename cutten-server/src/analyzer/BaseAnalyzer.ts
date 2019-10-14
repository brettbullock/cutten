import * as moment from 'moment'
import * as readline from 'readline'
import {
  createReadStream 
} from 'fs'


// object constructor function for getMessagesPerUser
function UserPerDay(name) {
  this.name = name
  this.messageCount = 0
  this.kCount = 0
}

// obhect constructor to initialize time values
function TargetTime() {
  // for specific day
  // this.day = moment(date).dayOfYear()
  this.yesterday = moment().subtract(1, 'days').dayOfYear()
  // for specific year
  // this.year = moment(date).get('year')
  this.thisYear = moment().subtract(1, 'days').get('year')
}

// object constructor to organize line data
function MessageDetails(line) {
  this.messageArray = line.split(": ")
  this.infoArray = this.messageArray[0].split(/[,|^ -]+ /)
  // fof k's - if statement filters out unwanted undefined's
  if (this.messageArray[1]) {
    this.k = this.messageArray[1].match(/^(k|K|Potassium|\ud83c[\udf4c])$/)
  }
  this.messageDay = moment(this.infoArray[0]).dayOfYear()
  this.messageYear = moment(this.infoArray[0]).get('year')
}

// this is going ot be the start of the analyzer
class BaseAnalyzer {
  // gets total messages sent per day for the group
  public static getMessagesPerDay() {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })

      // initialize return integer
      let messageCount = 0
      // set time
      const time = new TargetTime()

      // for each line..
      rl.on('line', (line) => {
        // clean up messages
        const messageDetails = new MessageDetails(line)

        // match date to today and check year, increment
        if (messageDetails.messageYear === time.thisYear && messageDetails.messageDay === time.yesterday) {
          messageCount++
        }
      })

      // after lines have been looped through
      rl.on('close', () => {
        resolve(messageCount)
      })
    })
  }
  // gets total number of messages per user for the day - the information needs to come back as an array of objects
  public static getMessagesPerUser() {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })

      // initialize return array
      const usersPerDay = []
      // create objects that will represent each of us - for now these will be hardcoded
      const ahoObject = new UserPerDay("Aho")
      const bradObject = new UserPerDay("Poo")
      const brettObject = new UserPerDay("Brett")
      // set time
      const time = new TargetTime()
      
      // for each line..
      rl.on('line', (line) => {
        // clean up messages 
        const messageDetails = new MessageDetails(line)

        // for now we will use hard coded names
        // count times each name shows up
        if (messageDetails.infoArray[2] === "Adam Aho") {
          ahoObject.messageCount += 1
          // if k exists, add to k count
          if (messageDetails.k) {
            ahoObject.kCount += 1
          }
        } else if (messageDetails.infoArray[2] === "Brad Dudeck") {
          bradObject.messageCount += 1
          if (messageDetails.k) {
            bradObject.kCount += 1
          }
        } else if (messageDetails.infoArray[2] === "Brett Bullock") {
          brettObject.messageCount += 1
          if (messageDetails.k) {
            brettObject.kCount += 1
          }
        }
      })

      // after lines have been looped through
      rl.on('close', () => {
        // add objects to return array 
        usersPerDay.push(ahoObject, bradObject, brettObject)
        // return array
        resolve(usersPerDay)
      })
    })
  }
}

export default BaseAnalyzer