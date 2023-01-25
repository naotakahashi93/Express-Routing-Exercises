const express = require('express');
const ExpressError = require('./expressErrors');

const app = express();

app.get("/mean", function(req, res){

    if (!req.query.nums) {
        throw new ExpressError('You must pass in query of numbers.', 400)
      }

    const numsStr = req.query.nums.split(',');
    const numsArr = numsStr.map(i=>Number(i))

    let total = 0;

    for (let i=0; i<numsArr.length; i++){
        total = total + numsArr[i]
    }
    let averge = total/ (numsArr.length);

    result = {
        operation: "mean",
        result: averge
    }
    return res.send(result)
})

app.get("/median", function(req, res){
    if (!req.query.nums) {
        throw new ExpressError('You must pass in query of numbers.', 400)
      }
    const numsStr = req.query.nums.split(',');
    const numsArr = numsStr.map(i=>Number(i))
    const sortedArr = numsArr.sort(function (a, b) {  return a - b;  })
    
    console.log(sortedArr, sortedArr.length)
    let median;
    let Idx;
    let medIdx;
    let result;

    if(sortedArr.length % 2 == 0 ){
        console.log("even")
         let Idx = ((sortedArr.length)/2)
         medIdx = Idx-1
         median = (sortedArr[Idx]+ sortedArr[medIdx])/2
         result = {
            operation: "median",
            result: median
        }
    }
    else{
        console.log("odd")
         Idx = (sortedArr.length + 1) / 2
         medIdx = Idx-1
        median = sortedArr[medIdx]
        result = {
            operation: "median",
            result: median
        }
    }
    return res.send(result)

})

app.get("/mode", function(req, res){
    if (!req.query.nums) {
        throw new ExpressError('You must pass in query of numbers.', 400)
      }
    const numsStr = req.query.nums.split(',');
    const numsArr = numsStr.map(i=>Number(i))
    let returnObj = {}

    for (let i=0; i<numsArr.length; i++){
        if (returnObj[numsArr[i]] === undefined ){
            returnObj[numsArr[i]] = 1
        }
        else{
            returnObj[numsArr[i]] ++
        }
    }
    console.log(returnObj)
    
    let mostFreq = numsArr[0];

    for (let i=1; i<numsArr.length; i++){
        if (returnObj[numsArr[i]] > mostFreq ){
            mostFreq = returnObj[numsArr[i]]
        }
    }
    console.log("MFFF", mostFreq)
    return res.send(Object.keys(returnObj).find(key => returnObj[key] === mostFreq))
})



app.listen(3000, function(){
    console.log("app running on port 3000");
})