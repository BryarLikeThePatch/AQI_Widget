const key = `${key1}`;
const email = `${email}`;
const state = 49;
const county = '035';
const site = '4001';
const paramClass = 'AIRNOW MAPS';
const begDate = dateMath(-7,0);
const endDate = dateMath(0,0);
const param = '42101'
console.log(begDate);

function dateMath(i=0,type){
    const d = new Date()
    const day = d.getDate() + i;
    const month = (d.getMonth()+1).toString();
    const year = d.getFullYear();
    month.length < 2 ? '0'+ month : month;
    if (type === 1){
        return `${year}-${month}-${day}`;
    } else if (type === 0){
        return `${year}${month}${day}`;
    };

};


var counter = 0;
function newTbl(data){
    const div1 = document.querySelector("#div1")
    let tblHdrs = ['Code','State'];
    
    // while (div1.firstChild) div1.removeChild(div1.firstChild); //removes any data under the div;

    let tbl = document.createElement('table');
    tbl.id = 'table1';
    let tblHdrEl = document.createElement('thead'); //creates a table header group element
    let hdrRow = document.createElement('tr');
    
    tblHdrs.forEach(hdr => {
        let h = document.createElement('th');
        h.innerText = hdr;
        hdrRow.append(h);
    });

    tblHdrEl.append(hdrRow); //appends the newly filled header row to the header element
    tbl.append(tblHdrEl);

    let tblBody = document.createElement('tbody'); //creates a body where I can append rows and values
    tblBody.className = `tableBody_${counter}`; 
    tblBody.id = 'tableBody';
    tbl.append(tblBody);

    div1.append(tbl);

    for (let d of data){
        let row = document.createElement('tr');
        for (let v in d){
            let cell = document.createElement('td');
            cell.innerText = `${d[v]}`;
            row.append(cell);
        }
        tblBody.append(row);
    };
    counter++
}

// const states = async function(k,e){
//     const url = `https://aqs.epa.gov/data/api/list/states?email=${e}&key=${k}`;
//     const data = await fetch(url)
//         .then((resp) => {
//             if(!resp.ok){
//                 throw new Error(resp.status);
//             } else {
//                 return resp.json();
//             };
//         })
//         .then((data) => {
//             console.log(data);
//             return data.Data;
//         });
//     return newTbl(data);
// };

// const counties = async function(k,e,s){
//     const url = `https://aqs.epa.gov/data/api/list/countiesByState?email=${e}&key=${k}&state=${s}`;
//     const data = await fetch(url)
//         .then((resp) => {
//             if(!resp.ok){
//                 throw new Error(resp.status);
//             } else {
//                 return resp.json();
//             };
//         })
//         .then((data) => {
//             return data.Data;
//         });
//     return newTbl(data);
// };

async function fetchListData(u){
    const data = await fetch(u)
        .then((resp) => {
            if (!resp.ok){
                throw new Error(resp.status);
            } else {
                return resp.json();
            };
        })
        .then((data) => {
            return data.Data;
        })
    return newTbl(data);
};

const stateURL = (e,k) => {
    return `https://aqs.epa.gov/data/api/list/states?email=${e}&key=${k}`;
};

const countyURL = (e,k,s) => {
    return `https://aqs.epa.gov/data/api/list/countiesByState?email=${e}&key=${k}&state=${s}`
};

const siteURL = (e,k,s,c) => {
    return `https://aqs.epa.gov/data/api/list/sitesByCounty?email=${e}&key=${k}&state=${s}&county=${c}`;
};
const paramClassURL = (e,k) => {
    return `https://aqs.epa.gov/data/api/list/classes?email=${e}&key=${k}`;
};

const pClassNumURL = (e,k,p) => {
    return `https://aqs.epa.gov/data/api/list/parametersByClass?email=${e}&key=${k}&pc=${p}`;
}


//here it is. The thing I've been working to achieve this entire time. 
const testSiteURL = (email,key,param,begDate,endDate,state,county,site) => {
    return `https://aqs.epa.gov/data/api/dailyData/bySite?email=${email}&key=${key}&param=${param}&bdate=${begDate}&edate=${endDate}&state=${state}&county=${county}&site=${site}`
};

const testCountyURL = (email,key,param,begDate,endDate,state,county,site) => {
    return `https://aqs.epa.gov/data/api/dailyData/byCounty?email=${email}&key=${key}&param=${param}&bdate=${begDate}&edate=${endDate}&state=${state}&county=${county}`;
};

async function whatsTheAQIofThisBongRip(url){
    const data = await fetch(url)
        .then((resp) => {
            if(!resp.ok) {
                throw new Error(resp.status);
            } else {
                console.log(resp);
                return resp.json();
            };
        })
        .then((data) => {
            console.log(data);
            return data.Data
        })
        .catch((err) => console.log(`${err}`));
    return data;
}


const limits = [
    {
        pollutant: 'Carbon Monoxide',
        id: 'CO',
        code: 42101,
        good:   {lo: 0,    hi: 4.4,  aqiLo: 0,    aqiHi: 50},
        mod:    {lo: 4.5,  hi: 9.4,  aqiLo: 51,   aqiHi: 100},
        usg:    {lo: 9.5,  hi: 12.4, aqiLo: 101,  aqiHi: 150},
        uHel:   {lo: 12.5, hi: 15.4, aqiLo: 151,  aqiHi: 200},
        vUHel:  {lo: 15.5, hi: 30.4, aqiLo: 201,  aqiHi: 300},
        haz1:   {lo: 30.5, hi: 40.4, aqiLo: 301,  aqiHi: 400},
        haz2:   {lo: 40.5, hi: 50.4, aqiLo: 401,  aqiHi: 500}
    },
    {
        pollutant: 'Sulfur Dioxide',
        id: 'SO2',
        code: 42401,
        good:   {lo: 0,    hi: 35,   aqiLo: 0,    aqiHi: 50},
        mod:    {lo: 36,   hi: 75,   aqiLo: 51,   aqiHi: 100},
        usg:    {lo: 76,   hi: 185,  aqiLo: 101,  aqiHi: 150},
        uHel:   {lo: 186,  hi: 304,  aqiLo: 151,  aqiHi: 200},
        vUHel:  {lo: 305,  hi: 604,  aqiLo: 201,  aqiHi: 300},
        haz1:   {lo: 605,  hi: 804,  aqiLo: 301,  aqiHi: 400},
        haz2:   {lo: 805,  hi: 1004, aqiLo: 401,  aqiHi: 500}
    },
    {
        pollutant: 'Nitrogen Dioxide',
        id: 'NO2',
        code: 42602,
        good:   {lo: 0,    hi: 53,   aqiLo: 0,    aqiHi: 50},
        mod:    {lo: 54,   hi: 100,  aqiLo: 51,   aqiHi: 100},
        usg:    {lo: 101,  hi: 360,  aqiLo: 101,  aqiHi: 150},
        uHel:   {lo: 361,  hi: 649,  aqiLo: 151,  aqiHi: 200},
        vUHel:  {lo: 650,  hi: 1249, aqiLo: 201,  aqiHi: 300},
        haz1:   {lo: 1250, hi: 1649, aqiLo: 301,  aqiHi: 400},
        haz2:   {lo: 1650, hi: 2049, aqiLo: 401,  aqiHi: 500}
    },
    {
        pollutant: 'Ozone',
        id: 'O3',
        code: 44201,
        good:   {lo: 0.000,  hi: 0.054,  aqiLo: 0,    aqiHi: 50},
        mod:    {lo: 0.055,  hi: 0.070,  aqiLo: 51,   aqiHi: 100},
        usg:    {lo: 0.071,  hi: 0.085,  aqiLo: 101,  aqiHi: 150},
        uHel:   {lo: 0.086,  hi: 0.105,  aqiLo: 151,  aqiHi: 200},
        vUHel:  {lo: 0.106,  hi: 0.200,  aqiLo: 201,  aqiHi: 300},
        haz1:   {lo: null, hi: null, aqiLo: 301, aqiHi: 400},
        haz2:   {lo: null, hi: null, aqiLo: 401, aqiHi: 500}
    },
    {
        pollutant: 'PM10 Total STP',
        id: 'PM10',
        code: 81102,
        good:   {lo: 0,    hi: 54,   aqiLo: 0,    aqiHi: 50},
        mod:    {lo: 55,   hi: 154,  aqiLo: 51,   aqiHi: 100},
        usg:    {lo: 155,  hi: 254,  aqiLo: 101,  aqiHi: 150},
        uHel:   {lo: 255,  hi: 354,  aqiLo: 151,  aqiHi: 200},
        vUHel:  {lo: 355,  hi: 424,  aqiLo: 201,  aqiHi: 300},
        haz1:   {lo: 425,  hi: 504,  aqiLo: 301,  aqiHi: 400},
        haz2:   {lo: 505,  hi: 604,  aqiLo: 401,  aqiHi: 500}
    },
    {
        pollutant: 'PM 2.5 Local',
        id: 'PM2_5',
        code: 88101,
        good:   {lo: 0.0,    hi: 12.0,  aqiLo: 0,    aqiHi: 50},
        mod:    {lo: 12.1,   hi: 35.4,  aqiLo: 51,   aqiHi: 100},
        usg:    {lo: 35.5,   hi: 55.4,  aqiLo: 101,  aqiHi: 150},
        uHel:   {lo: 55.5,   hi: 150.4, aqiLo: 151,  aqiHi: 200},
        vUHel:  {lo: 150.5,  hi: 250.4, aqiLo: 201,  aqiHi: 300},
        haz1:   {lo: 250.5,  hi: 350.4, aqiLo: 301,  aqiHi: 400},
        haz2:   {lo: 350.5,  hi: 500.4, aqiLo: 401,  aqiHi: 500}
    }
]

// fetchListData(stateURL(email,key));
// fetchListData(countyURL(email,key,state));
// fetchListData(siteURL(email,key,state,county));
// fetchListData(paramClassURL(email,key));
fetchListData(pClassNumURL(email,key,paramClass));

// const aqi = whatsTheAQIofThisBongRip(testCountyURL(email,key,param,begDate,endDate,state,county,site));
// const aqi2 = whatsTheAQIofThisBongRip(testSiteURL(email,key,param,begDate,endDate,state,county,site));


//===================================================================================================================================
//going to try the airnow API to see if it treats me better. 

const airNowKey = `${airnowKey1}`
var data = []
const zCodes = ['84044','84101','84102','84103','84104','84105','84106','84108','84109','84111']
const pullDate = dateMath(0,1);
const urlBuilder = (z,dt,ds = 25,k) => {
    return `https://airnowapi.org/aq/forecast/zipCode/?format=application/json&zipCode=${z}&date=${dt}&distance=${ds}&API_KEY=${k}`;
};

async function airNow(url){
    const data = await fetch(url)
        .then((resp) => {
            console.log(resp);
            return resp.json();
        })
        .then((data) => {
            console.log(data);
            return data.Data;
        });
    return data;
};

const aNdata = airNow(urlBuilder(zCodes[0],pullDate,25,airNowKey));
