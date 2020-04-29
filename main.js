const URL = "http://api.unsplash.com/search/photos?page="

let TOTAL_PAGES = 1
const SEARCH_FOR = "&query="
const CLIENT_ID = "&client_id=eymPo17tytd_9pUxyyyEyvVZnWBjJlk-bZI9QmPzM_c"
const PICTURE_CONTAINER = document.querySelector(".picture-container")
const PROTOTYPE = document.querySelector(".pic.prototype")
const SEARCH_INPUT = document.querySelector(".search")

let currentPage = 1
const pictureCache = {}

async function fetchPictures(searchWord, page) {
    if (pictureCache[searchWord, page]) {
        console.log("Cache")
        return pictureCache[searchWord, page]

    }
    const response = await fetch(URL + page + SEARCH_FOR + searchWord + CLIENT_ID)
    const data = await response.json()
    pictureCache[searchWord, page] = data.results
    console.log(data)
    TOTAL_PAGES = data.total_pages
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
let searchWord = "hello"

async function showTenHelloPictures() {
    const pictures = await fetchPictures(searchWord, currentPage)
    renderPictures(PICTURE_CONTAINER, pictures)
}


SEARCH_INPUT.addEventListener("change", () => {
    let searchWord = document.querySelector(".search").value
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

const box = document.getElementById("box")
box.appendChild(lightbox)


const images = document.getRootNode()

images.addEventListener('click', (image) => {
    if (image.srcElement.nodeName == 'IMG') {
        lightbox.style.display = 'flex'
        lightbox.classList.add('active')

        const img = document.createElement('img')
        img.src = image.srcElement.currentSrc
        lightbox.innerHTML = ''
        lightbox.appendChild(img)
    }
})

lightbox.addEventListener('click', ()=>{
    lightbox.style.display = 'none'
    lightbox.classList.remove('active')
})


