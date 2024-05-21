//Question 1

const fs = require('fs')

function countWordsInFile(){
    let res = 0 

    fs.readFile('file.txt', (err, data) => {
        if(err) throw 'Error reading file'
        let dataStr = data.toString()
        let dataArray = dataStr.split(" ")
        res = dataArray.length
    })
    
    return res
}

console.log(countWordsInFile())

//Question 2

const ExcelReader = require('simple-excel-reader')
const excelReader = new ExcelReader('Grades.xlsx')

function calcAvgFromXlsx(){
    let sum = 0
    let avg = 0
    let avgResArray = []
    excelReader
    .getWorkbook()
    .then(recordsets => {
        return excelReader.getWorksheetNames()
    })
    .then(worksheetNames => {
        return excelReader.getWorksheet(worksheetNames[2])
    })
    .then(records => records.forEach(element => {
        element.GradesList.split(", ").forEach((grade) => sum += Number(grade))
        avg = sum / element.GradesList.split(", ").length 
        avgResArray.push({
            Name: element.Name, 
            Avg: avg 
        })
        sum = 0
        avg = 0
    }))
    .catch(error => console.error(error))

    return avgResArray
}

console.log(calcAvgFromXlsx())