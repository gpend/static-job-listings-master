let selected = {} //TODO refactor to allowing multiple selections

fetch("./data.json")
.then(response => response.json())
.then(data => {
    
    // console.log(data)
    const filteredData = data  // BUG sub functions are not using all the data
    displayJobs(filteredData, data)
})

//takes in {data} and maps over it and create the HTML for each one
function getJobHTML(data){
    return data.map(job =>{
        const langs = job.languages.map(language =>{
            return `<p class="job--language">${language}</p>`
        }).join("")

        const tools = job.tools.map(tool =>{
            return `<p class="job--tool">${tool}</p>`
        }).join("")

        return(
            `
            <div class="job${job.featured ? " featured" : ""}">
                <div class="job--details">
                    <img class="job--logo" src=${job.logo}></img>
                    <div class="job--info">
                        <div class="job--company_details">
                            <p class="job--company">${job.company}</p>
                            ${job.new ? '<p class= "job--company__new">NEW!</p>' : ""}
                            ${job.featured ? '<p class= "job--company__featured">FEATURED</p>' : ""}
                        </div>
                        <p class="job--position">${job.position}</p>
                        <p class="job--about">${job.postedAt} · ${job.contract} · ${job.location}</p>
                    </div>
                </div>
                <div class="job--attributes">
                    <p class="job--role">${job.role}</p>
                    <p class="job--level">${job.level}</p>
                    ${tools}
                    ${langs}
                </div>
            </div>
            `
        )
    }).join("")
}

//takes {data}, gets the HTML from getJobHTML displays it and adds listeners for the buttons
function displayJobs (filteredData, data){

    //display the jobs in separate cards
    const jobHTML = getJobHTML(filteredData)
    document.querySelector(".jobs").innerHTML = jobHTML

    //add language to the job and add it to selected  state and to the header on click
    document.querySelectorAll(".job--language").forEach(element => {
        // @ts-ignore
        element.addEventListener("click", (e)=> {handleJobClick(e.target.innerText, 'language', data)})
    })

    //add tool to the job and add it to selected and to the header on click
    document.querySelectorAll(".job--tool").forEach(element => {
        // @ts-ignore
        element.addEventListener("click", (e)=> {handleJobClick(e.target.innerText, 'tool', data)})
            
    })

    //add level to the job and add it to selected and to the header on click
    document.querySelectorAll(".job--level").forEach(element => {
        // @ts-ignore
        element.addEventListener("click", (e)=> {handleJobClick(e.target.innerText, 'level', data)})     
    })
    
    //add role to the job and add it to selected and to the header on click
    document.querySelectorAll(".job--role").forEach(element => {
        // @ts-ignore
        element.addEventListener("click", (e)=> {handleJobClick(e.target.innerText, 'role', data)})   
    })

}

function handleJobClick(text, type, data){

    selected[type] = text
    let html = `
            <div class="selector__block  ${text}">
                <div class="selector__block--text">${text}</div>
                <div class="close_x ${type} ${text}">X</div>
            </div>`
    
    document.querySelector(`.selector__${type}`).innerHTML = html

    document.querySelector(`.selector__${type}`).addEventListener("click", () => handleSelectorClose(event, data, text))
    displayJobs(filterData(data), data)
}

function handleSelectorClose(e, data, text){
    const classes = e.target.classList
    selected[classes[1]]  = "" //1 is type, 2 is text
    document.querySelector(`.selector__block.${text}`).remove()
    displayJobs(filterData(data), data)
}

// function handleJobClickMulti(text, type, data){
//     if (!selected[type].includes(text)){ 
//         selected[type].push(text)
//         let html = selected[type].map(text => {
//             return `
//                 <div class="selector__block">
//                     <div class="selector__block--text">${text}</div>
//                     <div class="close_x">X</div>
//                 </div>`
//         }).join('')

//         document.querySelector(`.selector__${type}`).innerHTML = html
        


//         displayJobs(filterData(data, text, type))
//     }
// }

function filterData(data){ 
    console.log(selected)
    let filteredData = data
    selected.tool && (filteredData = filteredData.filter(job => job.tools.includes(selected.tool)))
    selected.role && (filteredData = filteredData.filter(job => job.role.includes(selected.role)))
    selected.level && (filteredData = filteredData.filter(job => job.level.includes(selected.level)))
    selected.language && (filteredData = filteredData.filter(job => job.languages.includes(selected.language)))
    console.log(filteredData)
    return filteredData
}