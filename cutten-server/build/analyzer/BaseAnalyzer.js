"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var moment = require("moment");
var readline = require("readline");
var fs_1 = require("fs");
// object constructor function for getMessagesPerUser
function UserPerDay(name) {
    this.name = name;
    this.messageCount = 0;
    this.k = 0;
}
// object constructor for returned values
function Results() {
    this.messageCount = 0;
    this.usersPerDay = [];
}
// object constructor to initialize time values
function TargetTime(date) {
    if (!date) {
        // if no date, get yesterday and year
        this.day = moment().subtract(1, 'days').dayOfYear();
        this.year = moment().subtract(1, 'days').get('year');
    }
    else {
        // for specific day and year
        this.day = moment(date).dayOfYear();
        this.year = moment(date).get('year');
    }
}
function parseLine(line) {
    var messageArray = line.split(": ");
    var infoArray = messageArray[0].split(/[,|^ -]+ /);
    return {
        messageArray: messageArray,
        infoArray: infoArray
    };
}
// object constructor to organize line data
function MessageDetails(_a) {
    var messageArray = _a.messageArray, infoArray = _a.infoArray;
    // for k's - if statement filters out unwanted undefined's
    if (messageArray[1] && messageArray[1].length === 1) {
        this.k = messageArray[1].match(/^(k|K|\ud83c[\udf4c])$/);
    }
    this.messageDay = moment(infoArray[0]).dayOfYear();
    this.messageYear = moment(infoArray[0]).get('year');
}
// this is going ot be the start of the analyzer
// class BaseAnalyzer {
//   // gets total messages sent per day for the group
//   public static getMessagesPerDay(args) {
//     return new Promise((resolve, reject) => {
//       const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })
//       // initialize return integer
//       let messageCount = 0
//       // set time
//       const targetTime = new TargetTime(args.date)
//       // for each line..
//       rl.on('line', (line) => {
//         // clean up messages
//         const messageDetails = new MessageDetails(line)
//         // match date to target date and check year, increment
//         if (messageDetails.messageYear === targetTime.year && messageDetails.messageDay === targetTime.day) {
//           messageCount++
//         }
//       })
//       // after lines have been looped through
//       rl.on('close', () => {
//         resolve(messageCount)
//       })
//     })
//   }
//   // gets total number of messages per user for the day - the information needs to come back as an array of objects
//   public static getMessagesPerUser(args) {
//     return new Promise((resolve, reject) => {
//       const rl = readline.createInterface({input: createReadStream('/cutten-server/cutten.txt') })
//       // initialize return array
//       const usersPerDay = []
//       // create objects that will represent each of us - for now these will be hardcoded
//       const ahoObject = new UserPerDay("Aho")
//       const bradObject = new UserPerDay("Poo")
//       const brettObject = new UserPerDay("Brett")
//       // set time
//       const targetTime = new TargetTime(args.date)
//       // for each line..
//       rl.on('line', (line) => {
//         // clean up messages 
//         const messageDetails = new MessageDetails(line)
//         //   for now we will use hard coded names
//         // count times each name shows up
//         if (!(messageDetails.messageYear === targetTime.year && messageDetails.messageDay === targetTime.day)) {return}
//         switch (messageDetails.infoArray[2]) {
//           case "Adam Aho":
//             ahoObject.messageCount +=1
//             if (messageDetails.k) { ahoObject.k += 1 }
//             break;
//           case "Brad Dudeck":
//             bradObject.messageCount +=1
//             if (messageDetails.k) { bradObject.k += 1 }
//             break;
//           case "Brett Bullock":
//             brettObject.messageCount +=1
//             if (messageDetails.k) { brettObject.k += 1 }
//             break;
//         }
//       })
//       // after lines have been looped through
//       rl.on('close', () => {
//         // add objects to return array 
//         usersPerDay.push(ahoObject, bradObject, brettObject)
//         // return array
//         resolve(usersPerDay)
//       })
//     })
//   }
// }
var BaseAnalyzer = /** @class */ (function () {
    function BaseAnalyzer() {
    }
    BaseAnalyzer.getMessagesPerDay = function (results, targetTime, parsedLine) {
        // clean up messages
        var messageDetails = new MessageDetails(parsedLine);
        // match date to target date and check year, increment
        if (messageDetails.messageYear === targetTime.year && messageDetails.messageDay === targetTime.day) {
            results.messageCount++;
            console.log(results.messageCount);
        }
    };
    // gets total number of messages per user for the day - the information needs to come back as an array of objects
    BaseAnalyzer.getMessagesPerUser = function (ahoObject, bradObject, brettObject, targetTime, parsedLine) {
        // clean up messages 
        var messageDetails = new MessageDetails(parsedLine);
        // for now we will use hard coded names
        // count times each name shows up
        if (!(messageDetails.messageYear === targetTime.year && messageDetails.messageDay === targetTime.day)) {
            return;
        }
        switch (parsedLine.infoArray[2]) {
            case "Adam Aho":
                ahoObject.messageCount += 1;
                if (messageDetails.k) {
                    ahoObject.k += 1;
                }
                break;
            case "Brad Dudeck":
                bradObject.messageCount += 1;
                if (messageDetails.k) {
                    bradObject.k += 1;
                }
                break;
            case "Brett Bullock":
                brettObject.messageCount += 1;
                if (messageDetails.k) {
                    brettObject.k += 1;
                }
                break;
        }
    };
    BaseAnalyzer.Main = function (args) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            console.log("main started");
            var rl = readline.createInterface({ input: fs_1.createReadStream('/cutten-server/cutten.txt') });
            console.log("read stream ccreated");
            // initialize return integer
            var results = new Results();
            // set time
            var targetTime = new TargetTime(args.date);
            // initialize return array
            var usersPerDay = [];
            // create objects that will represent each of us - for now these will be hardcoded
            var ahoObject = new UserPerDay("Aho");
            var bradObject = new UserPerDay("Poo");
            var brettObject = new UserPerDay("Brett");
            // for each line..
            console.log("about to start lines");
            rl.on('line', function (line) {
                var parsedLine = parseLine(line);
                _this.getMessagesPerDay(results, targetTime, parsedLine);
                _this.getMessagesPerUser(ahoObject, bradObject, brettObject, targetTime, parsedLine);
            });
            // after lines have been looped through
            rl.on('close', function () {
                usersPerDay.push(ahoObject, bradObject, brettObject);
                var analysis = {
                    messageCount: results.messageCount,
                    usersPerDay: usersPerDay
                };
                // // add objects to return array 
                // usersPerDay.push(ahoObject, bradObject, brettObject)
                // // return array
                // resolve(usersPerDay)
                console.log(analysis);
                resolve(results.messageCount);
                console.log("main closed");
            });
        });
    };
    return BaseAnalyzer;
}());
exports.default = BaseAnalyzer;
//# sourceMappingURL=BaseAnalyzer.js.map