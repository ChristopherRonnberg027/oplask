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
let name = document.createElement("p")
name.id = "name"
box.appendChild(name)

const SAVE_BUTTON = document.querySelector(".saveButton")
const images = document.getRootNode()
console.log(images)
const FAVORITER = document.querySelector(".favorites-container")
console.log(FAVORITER)

images.addEventListener('click', (image) => {

    if (image.srcElement.nodeName == 'IMG') {

        let output = image.srcElement

        save.setAttribute("download", "")
        lightbox.style.display = 'flex'
        lightbox.classList.add('active')

        save.style.display = 'block'
        save.classList.add('active')

        like.style.display = 'block'
        like.classList.add('active')

        name.classList.add('active')
        name.style.display = 'block'

        let likes = 0
        let nameFromImg = ""
        let liked_by_user = false

        for (let i = 0; i < dataCache.length; i++) {
            if (dataCache[i].urls.regular === output.src) {
                likes = dataCache[i].likes
                nameFromImg = dataCache[i].user.name
                liked_by_user = dataCache[i].liked_by_user
            }
            name.innerText = nameFromImg
        }

        like.addEventListener("click", () => {
            console.log("like button is clicked")
            likedPictures.push(output.src)
            localStorage.setItem("likedPictures", JSON.stringify(likedPictures))
            //sparadArray = JSON.parse(localStorage.getItem("likedPictures"))
            console.log(JSON.parse(localStorage.getItem("likedPictures")))
            //console.log(sparadArray)
            for (let i = 0; i < likedPictures.length; i++) {
                console.log(likedPictures[i])
                console.log("här" + i)
            }
        })

        //const array = [] // array
        //array[0] = "Hell World" // array med något
        //localeStorage.setItem("array", JSPN.stringify(array)) // sparar arrayen i browsern

        //const sparadArray = JSON.parse(localStorage.getItem("array")) // hämtar array från localestorage


        const img = document.createElement('img')
        img.src = image.srcElement.currentSrc
        lightbox.innerHTML = ''
        lightbox.appendChild(img)
    }
})

myStorage = window.localStorage;

let likedPictures = []
const sparadArray = []
// ta
lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none'
    lightbox.classList.remove('active')

    save.style.display = 'none'
    save.classList.remove('active')

    like.classList.remove('active')
    like.style.display = 'none'

    name.style.display = 'none'
    name.classList.remove('active')
})





