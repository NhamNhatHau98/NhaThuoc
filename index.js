if (typeof require !== 'undefined') XLSX = require('xlsx');
const workbook = XLSX.readFile('links.xlsx');
const fs = require('fs');

function getCellValue() {
    let links1 = []
    let path = './data'
    var files = fs.readdirSync(path);
    var hashLink = {}
    files.forEach(file => {
        var obj = JSON.parse(fs.readFileSync('./data/' + file, 'utf8'));
        obj.forEach(item => {
            if (item.link) {
                if (!hashLink[item.link]) {
                    item.ngaytuongtacgannhat = new Date(item.day)
                    hashLink[item.link] = item
                }
                else {
                    item.day > hashLink[item.link].day ? hashLink[item.link] = item : ''
                }
            }
        })

    })
    let workbook = XLSX.readFile('./links.xlsx', { type: 'file' })
    let data = XLSX.utils.sheet_to_json(workbook.Sheets[`${workbook.SheetNames[0]}`])
    data.forEach(item => {
        let cellValue = item['Tên miền']
        cellValue = cellValue.replace(/(https?:\/\/ | \.inrx\.vn)/g, '')
        cellValue = cellValue.replace(' ', '')
        links1.push(hashLink[cellValue] ? hashLink[cellValue] : { name: item['Tên PK'], link: cellValue })
    })
    Object.keys(hashLink).forEach(key => {
        hashLink[key].songaykhongtuongtac = Math.round((new Date().valueOf() - hashLink[key].day) / (1000 * 60 * 60 * 24))
        delete hashLink[key].day
    })
    const workbook1 = { SheetNames: [], Sheets: {} }
    const ws = XLSX.utils.json_to_sheet(links1)
    XLSX.utils.book_append_sheet(workbook1, ws, "Bao cao")
    XLSX.writeFile(workbook1, 'baocao.xlsx')
}


getCellValue()