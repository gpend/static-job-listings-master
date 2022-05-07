fetch("./data.json")
.then(response => response.json())
.then(data => {
    const jobHTML = getJobHTML(data)
    document.querySelector(".jobs").innerHTML = jobHTML
})

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
            <div class="job">
            <p class="${job.new && "new"} ${job.featured && "featured"}">${job.company}</p>
            <img class="job--logo" src=${job.logo}></img>
            <p class="job--position">${job.position}</p>
            <p class="job--about">${job.postedAt} . ${job.contract} . ${job.location}</p>
            <hr>
            ${langs}
            ${tools}
            </div>
            `
        )

    }).join("")

}

// "postedAt": "1d ago",
//     "contract": "Full Time",
//     "location": "USA Only",