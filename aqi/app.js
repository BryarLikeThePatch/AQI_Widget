const key = "ochrefox93";
const email = "BryTop05@gmail.com";

const states = async function(k, e){
    const url = `https://aqs.epa.gov/data/api/list/states?email=${e}&key=${k}`
    const data = await fetch(url)
        .then((resp) => {
            if(!resp.ok){
                throw new Error(resp.status);
            }else{
                return resp.json();
            }
        })
        .then((data) => {
            console.log(data);
            const obj = JSON.parse(data.Data);   
            return obj;
        });
    return data.Data;
};


function createTable(data) {
    const body = document.body;
    const tbl = document.createElement('table')
    for (let state of data){
        const tr = tbl.insertRow();
        for (i = 0; i<state.length; i++){
            const td = tr.insertCell()
            td.appendChild(document.createTextNode(state[i].value_represented));
        }
    }
    body.appendChild(tbl);
}

const s = states(key,email);