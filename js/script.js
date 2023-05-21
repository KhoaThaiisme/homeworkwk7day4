const raceDataForm = document.querySelector('#racerDataForm')
const season = document.querySelector('#year')
const round = document.querySelector('#round')
const body = document.querySelector('#tableBody')
const lowerDiv = document.querySelector('#lowerDiv')
let loadTable

function checkDiv() {
    if (!loadTable) {
        lowerDiv.style.display = 'none'
    } else {
        lowerDiv.style.display = 'initial'
    }
}

async function getRacerApiCall(season, round) {
    const res = await fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`, {method: "GET"})
    if (res.ok) {
        const data = await res.json()
        return data.MRData.StandingsTable.StandingsLists[0].DriverStandings
    }

    // console.log(`This is the given name from f1 racer ${res.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver.givenName}`)
}
// console.log(getRacerApiCall(2018, 2))
// let callout = (async () => console.log(await getRacerApiCall(2021,1)))()


// generateTable(getRacerApiCall(2020, 3))
// generateTable(callout)
// document.querySelector('#submitButton').addEventListener('click', () => generateTable())

function getData(racers) {
    let arr = []
    for (let i = 0; i < 7; i++){
        let obj = {}
        obj.position = racers[i].position
        obj.firstName = racers[i].Driver.givenName
        obj.lastName = racers[i].Driver.familyName
        obj.nationality = racers[i].Driver.nationality
        obj.sponsor = racers[i].Constructors[0].name
        obj.points = racers[i].points
        arr.push(obj)
    }
    console.log(arr)
    return arr  
}
// getData(getRacerApiCall(2022, 5))

function generateTable(datas) {
    // let racerName = getRacerApiCall()
    for (const d of datas){
        // const tbl = document.createElement('table')
        // const tblBody = document.createElement('tbody')
        let head = document.createElement('th')
        let row = document.createElement('tr')
        let cell1 = document.createElement('td')
        let cell2 = document.createElement('td')
        let cell3 = document.createElement('td')
        let cell4 = document.createElement('td')
        let a1 = document.createElement('a')
        let a2 = document.createElement('a')
        // const cellText = document.createTextNode(d.firstName)
        // cellText.innerText = ''
        head.innerText = (`${d.position}`)
        head.scope = `${"row"}`
        a1.innerText = `${d.firstName} ${d.lastName}`
        cell1.append(a1)
        cell2.innerText = `${d.nationality}`
        a2.innerText= `${d.sponsor}`
        cell3.append(a2)
        cell4.innerText = `${d.points}`
        row.append(head, cell1, cell2, cell3, cell4)
        body.appendChild(row)
    }
}
// console.log(generateTable(getRacerApiCall(2021, 3)))

raceDataForm.addEventListener('submit', async e => {
    e.preventDefault()
    if (loadTable) {
        checkDiv()
        body.innerHTML = ''
        loadTable = false
    }
    const v = await getRacerApiCall(season.value, round.value)
    generateTable(getData(v))
    loadTable = true
    checkDiv()
})
