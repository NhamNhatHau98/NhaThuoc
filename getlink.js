function getAllLinkFromDay() {
    let a = document.querySelectorAll('.im_history_message_wrap')
    let arr = []
    a.forEach(item => { arr.push(item.textContent) })
    let arr2 = [], days = [], names = [], links = []
    let day, name1, link, name, dayStr
    //let hashLink = {}
    arr.forEach(item => {
        if (item) {
            if (item.includes('INRX Notification')) {
                let checkDay = item.split('---')
                if (checkDay[1]) {
                    day = new Date(checkDay[1].trim()).valueOf()
                    dayStr = new Date(checkDay[1].trim())

                }
                let checkName = item.split(/\(\d\d-\d\d\d\d\d\d\s-\s/)
                if (checkName.length) {
                    name1 = checkName[0].split('\n')
                    name = name1[name1.length - 1].trim()
                    link = checkName[1]?.split(')')[0]
                    link = link?.split('https://')[1]
                    link = link?.split('.')[0]
                    if (day !== undefined) {
                        arr2.push({ day, name, link })
                    }
                }

            }
        }
    })
    window.open("data:application/txt," + encodeURI(JSON.stringify(arr2)))
}

getAllLinkFromDay()
