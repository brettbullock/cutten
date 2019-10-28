import * as readline from 'readline'
import {
  createReadStream 
} from 'fs'

// object constructor function for getMessagesPerUser
function UserPerDay(name) {
  this.name = name
  this.messageCount = 0
  this.k = 0
}

// object constructor to initialize time values
function TargetTime(date) {
  if (!date) {
    // if no date, get yesterday and year
    const date = new Date()
    this.targetDate = date.setDate(date.getDate() - 1)
  } else {
    // for specific day and year
    this.targetDate = new Date(date)   
  }
}

function parseLine(line) {
  const messageArray = line.split(": ")
  const infoArray = messageArray[0].split(/[,|^ -]+ /)
  return {
    messageArray,
    infoArray
  }
}

// object constructor to organize line data
function MessageDetails({messageArray, infoArray}) {
  // for k's - if statement filters out unwanted undefined's
  if (messageArray[1] && messageArray[1].length === 1) {
    this.k = messageArray[1].match(/^(k|K|\ud83c[\udf4c])$/)
  }

  this.messageDate = new Date(infoArray[0])
}

// this is going ot be the start of the analyzer
class BaseAnalyzer {
  // gets total messages sent per day for the group
  public static getMessagesPerDay(args) {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })
      // initialize return integer
      let messageCount = 0

      // set time
      const targetTime = new TargetTime(args.date)

      // for each line..
      rl.on('line', (line) => {
        // clean up messages
        const parsedLine = parseLine(line)

        // get details 
        const messageDetails = new MessageDetails(parsedLine)

        // match date to target date, increment
        if (messageDetails.messageDate - targetTime.targetDate === 0) {
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
  public static getMessagesPerUser(args) {
    return new Promise((resolve, reject) => {
      const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })

      // initialize return array
      const usersPerDay = []
      // create objects that will represent each of us - for now these will be hardcoded
      const ahoObject = new UserPerDay("Aho")
      const bradObject = new UserPerDay("Poo")
      const brettObject = new UserPerDay("Brett")
      // set time
      const targetTime = new TargetTime(args.date)
      
      // for each line..
      rl.on('line', (line) => {
        // clean up messages
        const parsedLine = parseLine(line)

        // getDetails
        const messageDetails = new MessageDetails(parsedLine)

        // count times each name shows up
        if (!(messageDetails.messageDate - targetTime.targetDate === 0)) {return}
        
        switch (parsedLine.infoArray[2]) {
          case "Adam Aho":
            ahoObject.messageCount +=1
            if (messageDetails.k) { ahoObject.k += 1 }
            break;
          case "Brad Dudeck":
            bradObject.messageCount +=1
            if (messageDetails.k) { bradObject.k += 1 }
            break;
          case "Brett Bullock":
            brettObject.messageCount +=1
            if (messageDetails.k) { brettObject.k += 1 }
            break;
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