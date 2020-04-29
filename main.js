const URL = "http://api.unsplash.com/search/photos?page="

let TOTAL_PAGES = 1
const SEARCH_FOR = "&query="
const CLIENT_ID = "&client_id=eymPo17tytd_9pUxyyyEyvVZnWBjJlk-bZI9QmPzM_c"
const PICTURE_CONTAINER = document.querySelector(".picture-container")
const PROTOTYPE = document.querySelector(".pic.prototype")
const SEARCH_INPUT = document.querySelector(".search")

let currentPage = 1
const pictureCache = {}
let searchWord = ""

async function fetchPictures(searchWord, page) {
    let complete_url = URL + page + SEARCH_FOR + searchWord + CLIENT_ID
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


const box = document.querySelector("#box")

const PAGINATION = document.querySelector(".pagination")

console.log(PAGINATION)

box.appendChild(lightbox)

box.appendChild(PAGINATION)

box.appendChild(save)

const SAVE_BUTTON = document.querySelector(".saveButton")
const images = document.getRootNode()
console.log(images)
images.addEventListener('click', (image) => {

    if (image.srcElement.nodeName == 'IMG') {
        lightbox.style.display = 'flex'
        save.style.disply = 'block'
        lightbox.classList.add('active')
        save.classList.add('active')
        const img = document.createElement('img')
        img.src = image.srcElement.currentSrc
        console.log(img.src)
        lightbox.innerHTML = ''
        lightbox.appendChild(img)
        console.log(lightbox)
        SAVE_BUTTON.style.display = 'block'
        PAGINATION.style.display = 'block'
        
    }
})

lightbox.addEventListener('click', ()=>{
    lightbox.style.display = 'none'
    lightbox.classList.remove('active')
    save.classList.remove('active')
    SAVE_BUTTON.style.display = 'none'
    save.style.display = 'none'
    PAGINATION.style.display = 'none'
})


