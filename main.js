const URL = "http://api.unsplash.com/search/photos?page="

let TOTAL_PAGES = 1
let complete_url
const SEARCH_FOR = "&query="
const CLIENT_ID = "&client_id=eymPo17tytd_9pUxyyyEyvVZnWBjJlk-bZI9QmPzM_c"
const PICTURE_CONTAINER = document.querySelector(".picture-container")
const PROTOTYPE = document.querySelector(".pic.prototype")
const SEARCH_INPUT = document.querySelector(".search")

let currentPage = 1
const pictureCache = {}
let dataCache = {}
let searchWord = ""

async function fetchPictures(searchWord, page) {
    complete_url = URL + page + SEARCH_FOR + searchWord + CLIENT_ID
    console.log(complete_url)
    if (pictureCache[complete_url]) {
        console.log("Data from cache")
        return pictureCache[complete_url]
    }
    const response = await fetch(complete_url)
    const data = await response.json()
    pictureCache[complete_url] = data.results
    console.log(pictureCache)
    TOTAL_PAGES = data.total_pages
    console.log("Fetching data")
    console.log(data.results[0].user.name)
    console.log(data.results[0].likes)
    console.log(data.results[0].liked_by_user)
    dataCache = data.results
    console.log(dataCache)
    return data.results
}

function next() {
    currentPage++
    searchPictures(searchWord)
    disabledButton()
}

function previous() {
    currentPage--
    searchPictures(searchWord)
    disabledButton()
}


const NEXT_BUTTON = document.querySelector(".next")
const PREV_BUTTON = document.querySelector(".prev")

function renderPictures(container, pictureArray) {
    for (let pic of pictureArray) {
        let newPicture = PROTOTYPE.cloneNode(true)
        newPicture.classList.remove("prototype")
        newPicture.src = pic.urls.regular
        newPicture.alt = pic.alt_description
        container.append(newPicture)
    }
}

//Visa 10 hello bilder
async function showTenHelloPictures() {
    searchWord = "hello"
    const pictures = await fetchPictures(searchWord, currentPage)
    renderPictures(PICTURE_CONTAINER, pictures)
}


SEARCH_INPUT.addEventListener("change", () => {
    currentPage = 1
    searchWord = document.querySelector(".search").value
    searchPictures(searchWord)
})

async function searchPictures(searchWord) {
    PICTURE_CONTAINER.innerHTML = ""
    const pictures = await fetchPictures(searchWord, currentPage)
    renderPictures(PICTURE_CONTAINER, pictures)
}

function initEvents() {
    NEXT_BUTTON.addEventListener("click", next)
    PREV_BUTTON.addEventListener("click", previous)
}

async function run() {
    disabledButton()
    initEvents()
    showTenHelloPictures()
}

run()



function disabledButton() {
    PREV_BUTTON.disabled = false
    NEXT_BUTTON.disabled = false

    if (currentPage == 1) {
        PREV_BUTTON.disabled = true
    } else if (currentPage == TOTAL_PAGES) {
        NEXT_BUTTON.disabled = true
    }
}
/*
//Favorit-lista sparad i webbläsaren

function populateFavorites() {
    localStorage.setItem('1', 'data.id')
}
*/




//DA LIGHTBOX
const lightbox = document.createElement("div")
lightbox.id = "lightbox"

const save = document.createElement("button")
save.id = "save"

const like = document.createElement("button")
like.id = "like"


const box = document.querySelector("#box")

const PAGINATION = document.querySelector(".pagination")

console.log(PAGINATION)

box.appendChild(lightbox)
box.appendChild(PAGINATION)
box.appendChild(save)
box.appendChild(like)

const SAVE_BUTTON = document.querySelector(".saveButton")
//SAVE_BUTTON.setAttribute("download", "")
const images = document.getRootNode()
console.log(images)
const FAVORITER = document.querySelector('#favorites-container')

images.addEventListener('click', (image) => {

    if (image.srcElement.nodeName == 'IMG') {

        let output = image.srcElement
        console.log(output.src)
        let output2 = output.src
        console.log(output2)
        save.setAttribute("download", "")
        lightbox.style.display = 'flex'
        lightbox.classList.add('active')

        save.style.display = 'block'
        save.classList.add('active')

        like.style.display = 'block'
        like.classList.add('active')


        like.addEventListener("click", () => {
            console.log("like button is clicked")
            let favoritImg = document.createElement('img')
            
            favoritImg = output2
            
            console.log(favoritImg)
            console.log(dataCache[0].urls.regular)
            //console.log(favoritImg)
            //FAVORITER.appendChild(favoritImg)

            let likes = 0


            for(let i = 0; i < dataCache.length; i++){
                //console.log(dataCache[i].urls)
                if(dataCache[i].urls.regular === favoritImg){
                    console.log("inne i loopen")
                    likes = dataCache[i].likes
                    console.log(likes)
                    name = dataCache[i].user.name
                    console.log(name)
                    let liked_by_user = dataCache[i].liked_by_user
                    console.log(liked_by_user)
                    break
                } else {
                    console.log("FAIL!")
                }
            }

        })

        const img = document.createElement('img')
        img.src = image.srcElement.currentSrc
        lightbox.innerHTML = ''
        lightbox.appendChild(img)
        console.log(lightbox)
        /*SAVE_BUTTON.style.display = 'block'
        PAGINATION.style.display = 'block'*/


        // test
        //for (let i = 0; i < 10; i++) {
        //     console.log(pictureCache.complete_url[i]) 
        // }

    }
})



lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none'
    lightbox.classList.remove('active')

    save.style.display = 'none'
    save.classList.remove('active')
    //SAVE_BUTTON.style.display = 'none'

    like.classList.remove('active')
    like.style.display = 'none'
    //PAGINATION.style.display = 'none'
    console.log(lightbox)
    /*SAVE_BUTTON.style.display = 'block'
    PAGINATION.style.display = 'block'*/

})













