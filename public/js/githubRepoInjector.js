document.addEventListener("DOMContentLoaded", findRepos);

// <div github-repo="Timerix22/webserver"></div>
function findRepos() {
    let elements = document.getElementsByTagName("*")
    // let i
    for (let i in elements){
        if(elements[i].hasAttribute && elements[i].hasAttribute("github-repo")){
            let repoDiv=elements[i]
            let attrData=repoDiv.getAttribute("github-repo").split('/')
            let repoOwner=attrData[0], repoName=attrData[1]
            repoDiv.innerHTML=genRepoPin(repoOwner,repoName)
        }
    }
}

// https://github.com/anuraghazra/github-readme-stats#github-extra-pins
function genRepoPin(repoOwner,repoName) {
    console.log(`generating pin for https://github.com/${repoOwner}/${repoName}`)
    let md = `[![Readme Card](https://github-readme-stats.vercel.app/api/pin/?username=${repoOwner}&repo=${repoName}&bg_color=555570&icon_color=ef9709&title_color=ef9709&text_color=f0f0f0&font=consolas)](https://github.com/${repoOwner}/${repoName})`
    //console.log("pin markdown:" + md)
    return marked.parse(md)
}
