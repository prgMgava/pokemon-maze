const header = document.getElementById("header")
const main = document.getElementById("main")
const footer = document.getElementById("footer")
const modalBackground = document.getElementById("modalBackground")

let isBagOpen = false
let isDisplayOpen = false
let isPokedexOpen = true
let isPlayerMove = false
let isHistoryOpen = false
let unlocked = false
let isPause = false
let cross = true
let startWatch
let inGame = false

// AUDIOS

const arrowsSound = new Audio("./assets/mid/arrow-select.mp3")
const openPokedexSound = new Audio("./assets/mid/pokedex.mp3")
const toBackSound = new Audio("./assets/mid/back.mp3")
const playSound = new Audio("./assets/mid/play-game.mp3")
const openSettingSound = new Audio("./assets/mid/setting-open.mp3")
const openBagSound = new Audio("./assets/mid/bag-open.mp3")
const exitSound = new Audio("./assets/mid/exit.mp3")
const openAboutSound = new Audio("./assets/mid/about-open.mp3")
const settingSelectSound = new Audio("./assets/mid/setting-select.mp3")
const openingSound = new Audio("./assets/mid/opening.mp3")
const gameSound = new Audio("./assets/mid/lavender-town.mp3")
const itemSound = new Audio("./assets/mid/colect-item.mp3")
const keySound = new Audio("./assets/mid/colect-key.mp3")
const scoreSound = new Audio("./assets/mid/score.mp3")
const questionSound = new Audio("./assets/mid/question.mp3")


// MODAL LOADING

const initialButton = document.getElementById("initialButton")
initialButton.innerHTML = "PLAY"
initialButton.style.cursor = "pointer"
initialButton.addEventListener("click",showPokedex)


function showPokedex () {
    openingSound.play()
    openingSound.loop = true
    initialButton.innerHTML = "LOADING"
    initialButton.style.cursor = "none"
    const loading = setInterval(function () {
        clearInterval(loading);
        document.getElementById("loading").style.display = "none";
        main.classList.remove("hidden")
    }, 20000);
}

// POKEMON CHARACTER CONSTRUCTOR
const imageHaunter = new Image()
const imageVoltorb = new Image()
const imageTogepi = new Image()
imageHaunter.src = "./assets/image/haunter-character.png"
imageVoltorb.src = "./assets/image/voltorb-character.png"
imageTogepi.src = "./assets/image/togepi-character.png"

class Character{
    constructor(name,url,visibility,animation){
        this.character = name;
        this.image = url.src;
        this.width = 100
        this.height = 100
        this.visible = visibility
        this.isPlay = false
        this.animation = animation
    }
}

// POKEMON CHARACTER
const haunter = new Character("#093 Haunter",imageHaunter,true,'haunter_animation')
const voltorb = new Character("#100 Voltorb",imageVoltorb,true,'voltorb_animation')
const togepi = new Character("#175 Togepi",imageTogepi,false,'togepi_animation')
const characters = createDiv("screen_characters", "displayCharacters")
const player = document.createElement("img")
const nameCharacter = document.createElement("p")
const setOptions = [haunter,voltorb]
let currentOption = 0

// BAG AND ITEMS
const inventory = []
const showBag = document.getElementById("displayBag")
const currentBagItem = document.getElementById("item")
let setItems = []
const everyItems = document.getElementById("everyItem")
const tabBag = document.getElementById("bagTab")
const hiddenBag = document.getElementById("showBag")
const setItemsInventory = []
let currentIndex = 0
const itemDisplay = document.createElement("img")
const nameItem = document.createElement("p")
nameItem.classList.add("empty_style")
const itemEspec = document.getElementById("itemEspec")
const descripionNameEspec = document.getElementById("descriptionItemEspec")
const nameItemEspec = document.getElementById("nameItemEspec")
const bag = document.getElementById("bag")
const totalItems = 9

class Item{
    constructor(obj,url,px,py,visibility,idx,ax,ay,w,h,scale){
        this.elt = new Image()
        this.name = obj;
        this.elt.src = url;
        this.x = px;
        this.y = py;
        this.visible = visibility;
        this.index = idx;
        this.axisX = ax === undefined ? this.axisX = 0 : ax;
        this.axisY = ay === undefined ? this.axisY = 0 : ay;
        this.width = w === undefined ? this.width = 100 : w ;
        this.height = h === undefined ? this.height = 100 : w ;
        this.size = scale === undefined ? this.size = 25 : scale 
        this.gotcha = false 
    }
}

const egg = new Item("Egg","./assets/image/egg.png",480,1060,false,7);
const key = new Item("Key","./assets/image/key.png",864,1120,false,6);
const pokeball = new Item("Poké Ball","./assets/image/set-pokeballs.png",288,1125, true,0,0,0,37,37);
const masterball = new Item("Master Ball","./assets/image/set-pokeballs.png",224,37, true,3,63,63,37,37);
const ultraball = new Item("Ultra Ball","./assets/image/set-pokeballs.png",736,101, true,2,0,63,37,37);
const greatball = new Item("Great Ball","./assets/image/set-pokeballs.png",736,1189, true,1,63,0,37,37);
const pokeballGs = new Item("Poke Ball Gs","./assets/image/pokeball-gs.png",544,165,false,8)
const potion = new Item("Potion","./assets/image/potion-2.png",288,741,true,4);
const map = new Item("Map","./assets/image/scroll.png",736,805,true,5);
const chest = new Item("Treasure Chest","./assets/image/treasure-chest.png",475,1060,true,9,0,0,100,100,40)

const bagOfItems = [egg,key,pokeball,masterball,ultraball,greatball,pokeballGs,potion,map]

bag.addEventListener("click", showDisplayBag)

function showDisplayBag () {
    showBag.classList.remove("hidden")
    characters.classList.add("hidden")
    displaySettings.classList.add("hidden")
    arrowsLR.classList.remove("hidden")
    isBagOpen = true
    isDisplayOpen = false
    currentIndex = 0
    nameItem.innerText = ""
    for(let i in bagOfItems){
        if(bagOfItems[i].gotcha){
            inventory[bagOfItems[i].index] = bagOfItems[i]
        }
    }
    if(inventory.length === 0){
        nameItem.innerText = "Empty"
       showBag.appendChild(nameItem)
    } else{
        for (let i in inventory){
            if(!setItems.includes(inventory[i])){
                setItems.push(inventory[i])
            }
        }
        setItems = setItems.sort((a,b) => a.index + b.index)
        if (setItems[0].index < 4){
            positionImgItem(setItems[0],true)
            currentBagItem.style.backgroundImage = `url(${setItems[0].elt.src})`
        } else {
            positionImgItem(false)
            currentBagItem.style.backgroundImage = `url(${setItems[0].elt.src})`
        }
        nameItem.innerText = setItems[0].name
        showBag.appendChild(nameItem)
    }
    openBagSound.play()
    openBagSound.currentTime = 0
}


// POKEDEX SCREEN
const screenPokedex = document.getElementById("pokedexScreen")
const characterOption = setCharacters(setOptions,"None")
const displaySettings = document.getElementById("displaySettings")
const arrowsLR = document.getElementById("arrowsLR")

function createDiv(className,id){
    const div = document.createElement('div')
    div.classList.add(className)
    div.id = id
    return div
}
function appendChild(father,child){
    father.appendChild(child)
}
function setCharacters(option,direction){
    if(direction === "None"){
        player.src = option[0].image
        option[0].isPlay = true
        option[1].isPlay = false
        if (option[2]) {
            option[2].isPlay = false
        }
        player.classList.add("character") 
        player.classList.remove("togepi_animation")
        player.classList.remove("haunter_animation")
        player.classList.remove("voltorb_animation") 
        player.classList.add(`${option[0].animation}`)
        nameCharacter.classList.add("character_name")
        nameCharacter.innerText = option[0].character
        characters.appendChild(player)
        characters.appendChild(nameCharacter)
        appendChild(screenPokedex,characters)
    }
    if(direction === "Right"){
        if(option[currentOption + 1]){
            player.src = option[currentOption + 1].image
            if (option[currentOption + 1].character === '#093 Haunter') {
                option[0].isPlay = true
                option[1].isPlay = false
                if (option[2]) {
                    option[2].isPlay = false
                }

            } else if (option[currentOption + 1].character === "#100 Voltorb") {
                option[0].isPlay = false
                option[1].isPlay = true
                if (option[2]) {
                    option[2].isPlay = false
                }
            }else if (option[2]) {
                if (option[currentOption + 1].character === '#175 Togepi')
                option[0].isPlay = false
                option[1].isPlay = false
                option[2].isPlay = true
            }
            player.classList.add("character")
            player.classList.remove("togepi_animation")
            player.classList.remove("haunter_animation")
            player.classList.remove("voltorb_animation") 
            player.classList.add(`${option[currentOption + 1].animation}`)  
            nameCharacter.classList.add("character_name")
            nameCharacter.innerText = option[currentOption + 1].character
            characters.appendChild(player)
            characters.appendChild(nameCharacter)
            appendChild(screenPokedex,characters)
            currentOption++
        } else {
            player.src = option[0].image
            player.classList.remove("togepi_animation")
            player.classList.remove("haunter_animation")
            player.classList.remove("voltorb_animation") 
            player.classList.add(`${option[0].animation}`) 
            option[0].isPlay = true
            option[1].isPlay = false
            if (option[2]) {
                option[2].isPlay = false
            }
            player.classList.add("character")
            nameCharacter.classList.add("character_name")
            nameCharacter.innerText = option[0].character
            characters.appendChild(player)
            characters.appendChild(nameCharacter)
            appendChild(screenPokedex,characters)
            currentOption = 0
        }
    }
    if(direction === "Left"){
        if(option[currentOption - 1]){
            player.src = option[currentOption - 1].image
            if (option[currentOption - 1].character === '#093 Haunter') {
                option[0].isPlay = true
                option[1].isPlay = false
                if (option[2]) {
                    option[2].isPlay = false
                }
            } else if (option[currentOption - 1].character === '#100 Voltorb') {
                option[0].isPlay = false
                option[1].isPlay = true
                if (option[2]) {
                    option[2].isPlay = false
                }
            } else if (option[2]) {
                if (option[currentOption - 1].character === '#175 Togepi')
                option[0].isPlay = false
                option[1].isPlay = false
                option[2].isPlay = true
            }
            player.classList.add("character")
            player.classList.remove("togepi_animation")
            player.classList.remove("haunter_animation")
            player.classList.remove("voltorb_animation") 
            player.classList.add(`${option[currentOption - 1].animation}`)
            nameCharacter.classList.add("character_name")
            nameCharacter.innerText = option[currentOption - 1].character
            characters.appendChild(player)
            characters.appendChild(nameCharacter)
            appendChild(screenPokedex,characters)
            currentOption--
        } else {
            player.src = option[option.length - 1].image
            if (option[option.length - 1].character === '#100 Voltorb') {
                option[0].isPlay = false
                option[1].isPlay = true
                if (option[2]) {
                    option[2].isPlay = false
                }
            } else if (option[2]) {
                if (option[option.length - 1].character === '#175 Togepi')
                option[0].isPlay = false
                option[1].isPlay = false
                option[2].isPlay = true
            }
            player.classList.add("character")
            player.classList.remove("togepi_animation")
            player.classList.remove("haunter_animation")
            player.classList.remove("voltorb_animation") 
            player.classList.add(`${option[option.length - 1].animation}`)
            nameCharacter.classList.add("character_name")
            nameCharacter.innerText = option[option.length - 1].character
            characters.appendChild(player)
            characters.appendChild(nameCharacter)
            appendChild(screenPokedex,characters)
            currentOption = option.length - 1
        }
    }
}

// ANIMATIONS SCREEN
const arrowRightImg = document.getElementById("arrowRightImg")
const arrowLeftImg = document.getElementById("arrowLeftImg")

function arrowAnimation (direction) {
    if (direction === "Right") {
        arrowRightImg.style.animation = "";
        setTimeout(() => arrowRightImg.style.animation = "moveArrow 200ms linear", 5);
    } else if (direction === "Left") {
        arrowLeftImg.style.animation = "";
        setTimeout(() => arrowLeftImg.style.animation = "moveArrow 200ms linear", 5);
    } else if (direction === "Up") {
        canvasScrollUp.style.animation = "";
        setTimeout(() => canvasScrollUp.style.animation = "moveArrow 200ms linear", 5);
    } else if (direction === "Down") {
        canvasScrollDown.style.animation = "";
        setTimeout(() => canvasScrollDown.style.animation = "moveArrow 200ms linear", 5);
    }
}

// POKEDEX CONTROL
const menuPokedex = document.getElementById("pokedexMenu")
const frontPokedex = document.getElementById("pokedexFront")
const displayPokedex = document.getElementById("pokedexDisplay")
const openPokedex = document.getElementById("pokedexOpen")
const play = document.getElementById("buttonPlay")
const currentPlayer = new Image()
const currentPlayerAnimated = new Image()
const toBack = document.getElementById("toBack")
const crossLeft = document.getElementById("crossLeft")
const crossRight = document.getElementById("crossRight")
const crossUp = document.getElementById("crossUp")
const crossDown = document.getElementById("crossDown")
const infoSettings = document.getElementById("infoSetting")
const canvasScrollDown = document.getElementById("canvasScrollDown")
const canvasScrollUp = document.getElementById("canvasScrollUp")
const textHistory = document.getElementById("containerHistory")
const about = document.getElementById("about")
const canvasHistory = document.getElementById("history")
const exitHistory = document.getElementById("exitHistory")
let translateHistory = 0

openPokedex.addEventListener("click", () => {
    menuPokedex.classList.remove("hidden")
    displayPokedex.classList.remove("hidden")
    frontPokedex.classList.add("hidden")
    isDisplayOpen = true
    isPokedexOpen = false
    openPokedexSound.play()
    openingSound.volume = .4
})

play.addEventListener("click", playGame)

function playGame () {
    inGame = true
    isDisplayOpen = false
    startTransition()
    setTimeout(() => {
        modalScore.classList.add("hidden")
        currentPlayer.src = player.src
        menuPokedex.classList.add("hidden")
        displayPokedex.classList.add("hidden")
        infoBar.classList.remove("hidden")
        hiddenBag.classList.remove("hidden")
        isBagOpen = false
        isPause = true
        isPlayerMove = true
        mazeCanvas.classList.remove("hidden")
        modalScore.classList.add("hidden")
        arrowsLR.classList.remove("hidden")
        playSound.play()
        gameSound.play()
        gameSound.loop = true
        openingSound.pause()

        // TIMER COUNT
        clearInterval(startWatch)
        second = 0
        minute = 0
        startWatch = setInterval(toCount,1000)

        function toCount(){
            second++
            if(second === 60){
                second = 0
                minute++
            }
            second = ("0" + second).slice(-2)
            currentTime.innerHTML = `${minute}:${second}` 
            return second
        }

        if(isDisplayOpen){
            hiddenBag.classList.add("remove")
        }
       
        if (isPokeballGsVisible(bagOfItems)) {
            if(setOptions[2].isPlay)
                pokeballGs.visible = true
            }
           
    },10000); 
    return currentPlayer
}
function isPokeballGsVisible (bag) {
    const howManyIsGotcha = bag.filter(item => item.gotcha === true)
    if (howManyIsGotcha.length > 7) {
        return true
    }
    return false
}
toBack.addEventListener("click", () =>{
    characters.classList.remove("hidden")
    showBag.classList.add("hidden")
    displaySettings.classList.add("hidden")
    arrowsLR.classList.remove("hidden")
    isDisplayOpen = true
    isBagOpen = false
    toBackSound.play()
    toBackSound.currentTime = 0
})
crossLeft.addEventListener("click", () =>{
    setCharacters(setOptions,"Left")
    changeItemBag(setItems,"Left")
    arrowAnimation("Left")
    arrowsSound.play()
    arrowsSound.currentTime = 0
})
crossRight.addEventListener("click", () =>{
    setCharacters(setOptions,"Right")
    changeItemBag(setItems,"Right")
    arrowAnimation("Right")
    arrowsSound.play()
    arrowsSound.currentTime = 0
})
about.addEventListener("click", () =>{
    isDisplayOpen = false
    isHistoryOpen = true
    canvasHistory.classList.remove("hidden")
    exitHistory.classList.add("hidden") 
    mazeCanvas.classList.remove("hidden")
    menuPokedex.classList.add("hidden")
    displayPokedex.classList.add("hidden")
    canvasScrollUp.classList.add("hidden")
    arrowsLR.classList.remove("hidden")
    openAboutSound.play()
})
canvasScrollDown.addEventListener("click", moveHistoryDown)

function moveHistoryDown (direction) {
    if (translateHistory < 340) {
        translateHistory += 20
    }
    if(translateHistory >= 20){
        canvasScrollUp.classList.remove("hidden")
        exitHistory.classList.remove("hidden")
    } 
    if (translateHistory >= 340){
        canvasScrollDown.classList.add("hidden")
    }
   textHistory.style.transform = `translateY(-${translateHistory}px)`
       arrowAnimation("Down")
    arrowsSound.play()
    arrowsSound.currentTime = 0
   return translateHistory
}

canvasScrollUp.addEventListener("click", moveHistoryUp)

function moveHistoryUp (direction) {
    if (translateHistory > 0) {
        translateHistory -= 20
    }
    textHistory.style.transform = `translateY(-${translateHistory}px)`
    if(translateHistory === 0){
        canvasScrollUp.classList.add("hidden")
    } else if ( translateHistory < 340){
        canvasScrollDown.classList.remove("hidden")
    }
    arrowAnimation ("Up")
    arrowsSound.play()
    arrowsSound.currentTime = 0
    return translateHistory
}
exitHistory.addEventListener("click",() => {
    canvasHistory.classList.add("hidden")
    mazeCanvas.classList.add("hidden")
    menuPokedex.classList.remove("hidden")
    displayPokedex.classList.remove("hidden")
    textHistory.style.transform = `translateY(0px)`
    translateHistory = 0
    canvasScrollDown.classList.remove("hidden")
    canvasScrollUp.classList.add("hidden")
    isDisplayOpen = true
    isHistoryOpen = false
    exitSound.play()
})
infoSettings.addEventListener("click", () =>{
    characters.classList.add("hidden")
    displaySettings.classList.remove("hidden")
    showBag.classList.add("hidden")
    arrowsLR.classList.add("hidden")
    openSettingSound.play()
    openSettingSound.currentTime = 0
})

// GLOBAL MAZE SETTINGS 
const mazeCanvas = document.getElementById("maze");
const mazeContext = mazeCanvas.getContext("2d");
const tileSize = 32;
const tileImageSize = 225

// INFO BAR SETTINGS
const infoBar = document.getElementById("infoBar")
let points = 0000
let second = 0
let minute = 0
let sound = true
const infoPoints = document.getElementById("infoScore")
const currentTime = document.getElementById("currentTimer")
let sumTimerPoints = 0

function updateScore(){
    points = points + 1000
    infoPoints.innerHTML = `Score ${points}`;
    return points
}

function updateModalEndGame(){
    itemsPoints.innerText =  ("0000" + points).slice(-4);
    let totalItemsGotcha = bagOfItems.filter(item => item.gotcha).filter((elt,idx,array) => array.indexOf(elt) === idx).length;
    itemScore.innerText = `Items ${totalItemsGotcha}/9`;
    timerPoints.innerText = ("0000" + sumTimerPoints).slice(-4);
    let currenteTotalPoints = sumTimerPoints + points
    if (currenteTotalPoints > 9999) {
        totalPoints.innerText = currenteTotalPoints
    } else {
        totalPoints.innerText = ("0000" + currenteTotalPoints).slice(-4);
    }
}


    // CREATES DIV OF ITEMS

for(let i = 0; i < totalItems; i++){
    const itemInBag = createDiv("item_in_bag",`item${i}`)
    everyItems.appendChild(itemInBag)
    setItemsInventory.push(itemInBag)
}

tabBag.addEventListener("click",() =>{
    if(hiddenBag.style.left === "0px"){
        hiddenBag.style.left = "340px"
        isPlayerMove = false
          for(let i in bagOfItems){
            if(bagOfItems[i].gotcha){
                inventory[bagOfItems[i].index] = bagOfItems[i]
            }
        }
        for (let i in inventory){
            if(!setItems.includes(inventory[i])){
                setItems.push(inventory[i])
            }
        }
        for(let i in setItems){
            if(setItemsInventory[setItems[i].index].childNodes.length === 0){
                let currentDiv = document.getElementById(`item${setItems[i].index}`) 
                if (setItems[i].index < 4) {
                    getPokeball(setItems[i],currentDiv)
                } else {
                    getItem(setItems[i],currentDiv)
                }
            }
        }
    } else {
        hiddenBag.style.left = "0px"
        isPlayerMove = true
    }
    openBagSound.play()

})

function changeItemBag(items, direction){
    if(items.length === 0){
    } else if(direction === "Right"){
        if(setItems[currentIndex + 1]){
            if(setItems[currentIndex + 1].index < 4){
                positionImgItem(setItems[currentIndex + 1],true)
                currentBagItem.style.backgroundImage = `url(${setItems[currentIndex + 1].elt.src})`
            } else {
                positionImgItem(setItems[currentIndex + 1],false)
                currentBagItem.style.backgroundImage = `url(${setItems[currentIndex + 1].elt.src})`
            }
            nameItem.innerText = setItems[currentIndex + 1].name
            currentIndex++
        } else {
            if (setItems[0].index < 4){ 
                positionImgItem(setItems[0],true)
                currentBagItem.style.backgroundImage = `url(${setItems[0].elt.src})` 
            } else {
                positionImgItem(setItems[0],false)
                currentBagItem.style.backgroundImage = `url(${setItems[0].elt.src})`
            }
            nameItem.innerText = setItems[0].name
            currentIndex = 0
        } 
    } else if (direction === "Left"){
        if(setItems[currentIndex - 1]){
            if(setItems[currentIndex - 1].index < 4){
                positionImgItem(setItems[currentIndex - 1],true)
                currentBagItem.style.backgroundImage = `url(${setItems[currentIndex - 1].elt.src})`
            } else {
                positionImgItem(setItems[currentIndex - 1],false)
                currentBagItem.style.backgroundImage = `url(${setItems[currentIndex - 1].elt.src})`
            }
            nameItem.innerText = setItems[currentIndex - 1].name
            currentIndex--
        }
        else {
            if (setItems[setItems.length -1].index < 4){ 
                positionImgItem(setItems[setItems.length -1],true)
                currentBagItem.style.backgroundImage = `url(${setItems[setItems.length -1].elt.src})` 
            } else {
                positionImgItem(setItems[setItems.length -1],false)
                currentBagItem.style.backgroundImage = `url(${setItems[setItems.length -1].elt.src})`
            }
            // itemDisplay.src = setItems[setItems.length -1].elt.src
            nameItem.innerText = setItems[setItems.length -1].name
            currentIndex = setItems.length - 1

        } 
    }
}

function getPokeball (item,div) {
    if (item.name === "Poké Ball") {
        div.style.backgroundImage = `url(assets/image/pokeball.png)`
    }
    if (item.name === "Master Ball") {
        div.style.backgroundImage = `url(assets/image/master-ball.png)`
    }
    if (item.name === "Ultra Ball") {
        div.style.backgroundImage = `url(assets/image/ultra-ball.png)`
    }
    if (item.name === "Great Ball") {
        div.style.backgroundImage = `url(assets/image/great-ball.png)`
    }
}
function getItem(item,div) {
    if (item.name === "Potion") {
        div.style.backgroundImage = `url(assets/image/potion-2.png)`
    }
    if (item.name === "Map") {
        div.style.backgroundImage = `url(assets/image/scroll.png)`
    }
    if (item.name === "Key") {
        div.style.backgroundImage = `url(assets/image/key.png)`
    }if (item.name === "Egg") {
        div.style.backgroundImage = `url(assets/image/egg.png)`
    }if (item.name === "Poke Ball GS") {
        div.style.backgroundImage = `url(assets/image/pokeball-gs.png)`
    }
}
function positionImgItem(item,ispokeball) {
    if (ispokeball) {
        if (item.name === "Poké Ball") {
            currentBagItem.style.backgroundPosition = "50px 50px"
            currentBagItem.style.transform = "scale(2)"
            currentBagItem.style.margin = "30px 10px"
        }
        if (item.name === "Master Ball") {
            currentBagItem.style.backgroundPosition = "-30px -30px"
            currentBagItem.style.transform = "scale(2)"
            currentBagItem.style.margin = "90px 70px"

        }
        if (item.name === "Ultra Ball") {
            currentBagItem.style.backgroundPosition = "50px -30px"
            currentBagItem.style.transform = "scale(2)"
            currentBagItem.style.margin = "90px 10px"

        }
        if (item.name === "Great Ball") {
            currentBagItem.style.backgroundPosition = "-50px 50px"
            currentBagItem.style.transform = "scale(2)"
            currentBagItem.style.margin = "30px 110px"
        }
    } else {
        currentBagItem.style.backgroundPosition = "center"
        currentBagItem.style.transform = "none"
        currentBagItem.style.margin = "57px 40px"
    }
}

everyItems.addEventListener("click", (evt) => {
    const currentItemEspec = evt.path[0].style.backgroundImage
    if ( currentItemEspec === 'url("assets/image/pokeball.png")'){
        descripionNameEspec.innerHTML = "A device for catching wild Pokémon. It's thrown like a ball at a Pokémon, comfortably encapsulating its target."
        nameItemEspec.innerHTML = "Poké Ball"
    }
    if ( currentItemEspec === 'url("assets/image/master-ball.png")'){
        descripionNameEspec.innerHTML = "The best Poké Ball with the ultimate level of performance. With it, you will catch any wild Pokémon without fail."
        nameItemEspec.innerHTML = "Master Ball"
    }
    if ( currentItemEspec === 'url("assets/image/ultra-ball.png")'){
        descripionNameEspec.innerHTML = "An ultra-high-performance Poké Ball that provides a higher success rate for catching Pokémon than a Great Ball."
        nameItemEspec.innerHTML = "Ultra Ball"
    }
    if ( currentItemEspec === 'url("assets/image/great-ball.png")'){
        descripionNameEspec.innerHTML = "A good, high-performance Poké Ball that provides a higher success rate for catching Pokémon than a standard Poké Ball."
        nameItemEspec.innerHTML = "Great Ball"
    }
    if ( currentItemEspec === 'url("assets/image/potion-2.png")'){
        descripionNameEspec.innerHTML = "A spray-type medicine for treating wounds. It can be used to restore 20 HP to a single Pokémon."
        nameItemEspec.innerHTML = "Potion"
    }
    if ( currentItemEspec === 'url("assets/image/pokeball-gs.png")'){
        descripionNameEspec.innerHTML = "The mysterious BALL."
        nameItemEspec.innerHTML = "Poké Ball GS"
    }
    if ( currentItemEspec === 'url("assets/image/key.png")'){
        descripionNameEspec.innerHTML = "A key."
        nameItemEspec.innerHTML = "Key"
    }
    if ( currentItemEspec === 'url("assets/image/egg.png")'){
        descripionNameEspec.innerHTML = "The mysterious Egg."
        nameItemEspec.innerHTML = "Egg"
    }
    if ( currentItemEspec === 'url("assets/image/scroll.png")'){
        descripionNameEspec.innerHTML = "A map"
        nameItemEspec.innerHTML = "Map"
    }
    arrowsSound.play()
})

// MODALS END GAME
const modalScore = document.getElementById("canvasScore")
const buttonFirstModal = document.getElementById("next")
const question = document.getElementById("canvasQuestion")
const accepted = document.getElementById("buttonYes")
const denied = document.getElementById("buttonNo")
const lockedMsg = document.getElementById("canvasLocked")
const exitLocked = document.getElementById("buttonExit")

buttonFirstModal.addEventListener("click",restartGame)
denied.addEventListener("click",showScore)
accepted.addEventListener("click",secondMaze)
exitLocked.addEventListener("click",closeMsg)

function restartGame(){
    modalScore.classList.add("hidden")
    mazeCanvas.classList.add("hidden")
    menuPokedex.classList.remove("hidden")
    displayPokedex.classList.remove("hidden")
    hiddenBag.classList.add('hidden')
    isDisplayOpen = true
    isPlayerMove = false
    inGame = false
    exitSound.play()
    openingSound.play()
    gameSound.pause()
}

function showScore(){
    question.classList.add("hidden")
    modalScore.classList.remove("hidden")
    isDisplayOpen = true
    isPlayerMove = false
    inGame = false
    calcTimerPoints(second,minute)
    updateModalEndGame()
    questionSound.pause()
    exitSound.play()
}
function secondMaze(){
    currentPlayer.src = imageHaunter.src
    isPlayerMove = true
    key.visible = true
    question.classList.add("hidden")
    infoBar.classList.remove("hidden")
    questionSound.pause()
    exitSound.play()
    gameSound.play()
}
function closeMsg(){
    isPlayerMove = true
    lockedMsg.classList.add("hidden")
    unlocked = false
    exitSound.play()
}

// KEYBOARD COMMAND 

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if(keyName  === "ArrowRight"){
        if(isBagOpen){
            changeItemBag(setItems,"Right")
            arrowsSound.play()
            arrowsSound.currentTime = 0
        }
        if(isDisplayOpen){
            setCharacters(setOptions,"Right")
            if(!isPlayerMove) {
                arrowsSound.play()
                arrowsSound.currentTime = 0  
            }
            arrowsSound.play()
            arrowsSound.currentTime = 0  
        }
        arrowAnimation("Right")
    }
    if(keyName === "ArrowLeft"){
        if(isBagOpen){
            changeItemBag(setItems,"Left")
            arrowsSound.play()
            arrowsSound.currentTime = 0
        }
        if(isDisplayOpen){
            setCharacters(setOptions,"Left")
            if(!isPlayerMove) {
                arrowsSound.play()
                arrowsSound.currentTime = 0  
            }
            arrowsSound.play()
            arrowsSound.currentTime = 0 
        }
        arrowAnimation("Left")
    }
    if (keyName === "ArrowUp") {
        if (isHistoryOpen) {
            arrowsSound.play()
            arrowsSound.currentTime = 0
            arrowAnimation("Up")
            moveHistoryUp()
        }
        if (!isPlayerMove && isDisplayOpen) {
            arrowsSound.play()
            arrowsSound.currentTime = 0
        }
    } 
    if (keyName === "ArrowDown") {
        if (isHistoryOpen) {
            arrowAnimation ("Down")
            moveHistoryDown()
            arrowsSound.play()
            arrowsSound.currentTime = 0
        }
        if (!isPlayerMove && isDisplayOpen) {
            arrowsSound.play()
            arrowsSound.currentTime = 0
        }
    }
    if(keyName === " "){
        if(isDisplayOpen) {
            playGame()
        }
        if(key.gotcha && unlocked){
            chest.visible = false
            egg.visible = true
            openBagSound.play()
        } else if(unlocked){
            lockedMsg.classList.remove("hidden")
            isPlayerMove = false
            toBackSound.play()
        }
    }
    if (!inGame) {
        if(keyName === "x"){
            canvasHistory.classList.add("hidden")
            showBag.classList.add("hidden")
            characters.classList.remove("hidden")
            displaySettings.classList.add("hidden")
            arrowsLR.classList.remove("hidden")
            textHistory.style.transform = `translateY(0px)`
            if(!isPokedexOpen) {
                toBackSound.play()
                toBackSound.currentTime = 0
            } 
            if (isHistoryOpen){
                mazeCanvas.classList.add("hidden")
                menuPokedex.classList.remove("hidden")
                displayPokedex.classList.remove("hidden")
            }
            if (isPlayerMove) {   
            }
            isDisplayOpen = true
            isHistoryOpen = false
            translateHistory = 0
        }
    }
   
})

// SCORE MODAL UPDATE

const itemScore = document.getElementById("itemScore")
const itemsPoints = document.getElementById("itemsPoints")
const timerPoints = document.getElementById("timerPoints")
const totalPoints = document.getElementById("totalPoints")

function calcTimerPoints(seg,min){
    seg++
    if(min === 0){
        sumTimerPoints = (1000 + parseInt(1000/seg))
        return sumTimerPoints
    } 
    sumTimerPoints = ((1000 - (min*500)) + parseInt(1000/seg))
    return sumTimerPoints
}

// TRASITION OF SCREENS - PIXELS
function startTransition () {
    const modalTransition = document.getElementById("transitionModal")
    modalTransition.classList.remove("hidden")
    let count = 0
    let widthSquare = Math.floor(34)
    const thisWidth = innerWidth
    const thisHeight = innerHeight
    const columnSquares = Math.floor(thisWidth/widthSquare)
const rowSquares = Math.ceil(thisHeight/widthSquare)
    const rest = Math.floor(thisWidth%widthSquare) + .01
    const totalSquare = columnSquares * rowSquares
    for (let i = 0; i <= totalSquare + 500; i++){
        if (i%columnSquares === 0 ) {
            const div = document.createElement("div")
            div.style.width = `${widthSquare + rest}px`
            div.style.animationDelay = getTimer()
            div.style.animationDuration = "0.1s"
            div.style.background = getColor()
            div.classList.add("square") 
            modalTransition.appendChild(div)
            setTimeout(function(){div.classList.add("hidden")},15550)
        } else {
          
            const div = document.createElement("div")
            div.style.width = `${Math.ceil(widthSquare)}px`
            div.style.animationDelay = getTimer()
            div.style.animationDuration = "0.1s"
            div.style.background = getColor()
            div.classList.add("square") 
            modalTransition.appendChild(div)
            setTimeout(function(){div.classList.add("hidden")},15550)

        }
    }

    function getColor() {
        let r = Math.random() * 15;
        let g = Math.random() * 9;
        let b = Math.random() * 9;
        
        return `rgba(${r}, ${g}, ${b})`;
    }
    function getTimer(){
        return `${count = count + 0.010}s`
    }
}

// SETTINGS CONTROLS
const soundOn = document.getElementById("soundOn")
const soundOff = document.getElementById("soundOff")
const infoSound = document.getElementById("infoSound")
const classic = document.getElementById("classicTheme")
const ghost = document.getElementById("ghostTheme")
const fairy = document.getElementById("fairyTheme")

soundOn.addEventListener("click", () => {
    soundOn.classList.add("setting_selected")
    soundOff.classList.remove("setting_selected")
    settingSelectSound.play()
    settingSelectSound.currentTime = 0
    let on = true
    isSound(on)
})
soundOff.addEventListener("click", () => {
    soundOn.classList.remove("setting_selected")
    soundOff.classList.add("setting_selected")
    settingSelectSound.play()
    settingSelectSound.currentTime = 0
    let on = false
    isSound(on)
})
classic.addEventListener("click", () => {
    classic.classList.add("setting_selected")
    ghost.classList.remove("setting_selected")
    fairy.classList.remove("setting_selected")
    settingSelectSound.play()
    settingSelectSound.currentTime = 0
    const theme = "classic"
    changeBackground(theme)
})
ghost.addEventListener("click", () => {
    classic.classList.remove("setting_selected")
    ghost.classList.add("setting_selected")
    fairy.classList.remove("setting_selected")
    settingSelectSound.play()
    settingSelectSound.currentTime = 0
    const theme = "ghost"
    changeBackground(theme)
})
fairy.addEventListener("click", () => {
    classic.classList.remove("setting_selected")
    ghost.classList.remove("setting_selected")
    fairy.classList.add("setting_selected")
    settingSelectSound.play()
    settingSelectSound.currentTime = 0
    const theme = "fairy"
    changeBackground(theme)
})

function isSound (isOn) {
    if(isOn) {
        infoSound.style.backgroundImage = "url(./assets/image/sound-on.png)"
        arrowsSound.volume = 1
        openPokedexSound.volume = 1
        toBackSound.volume = 1
        playSound.volume = 1
        openSettingSound.volume = 1
        openBagSound.volume = 1
        exitSound.volume = 1
        openAboutSound.volume = 1
        settingSelectSound.volume = 1
        openingSound.volume = .4
        gameSound.volume = .5
        itemSound.volume = 1
        keySound.volume = 1
        scoreSound.volume = 1
        questionSound.volume = 1
    } else {
        infoSound.style.backgroundImage = "url(./assets/image/sound-off.png)"
        arrowsSound.volume = 0
        openPokedexSound.volume = 0
        toBackSound.volume = 0
        playSound.volume = 0
        openSettingSound.volume = 0
        openBagSound.volume = 0
        exitSound.volume = 0
        openAboutSound.volume = 0
        settingSelectSound.volume = 0
        openingSound.volume = 0
        gameSound.volume = 0
        itemSound.volume = 0
        keySound.volume = 0
        scoreSound.volume = 0
        questionSound.volume = 0
    }
} 

function changeBackground (theme) {
    if (theme === "classic") {
        modalBackground.style.backgroundImage = "url(./assets/image/classic-background.jpg)"
    }
    if (theme === "ghost") {
        modalBackground.style.backgroundImage = "url(https://i.pinimg.com/564x/1d/88/39/1d8839ae5de483b4fafa5226b4ccea4c.jpg)"
    }
    if (theme === "fairy") {
        modalBackground.style.backgroundImage = "url(https://i.pinimg.com/originals/5b/4d/83/5b4d8396a23986bac605d6c526992ba7.png)"
    }
}
// ---------------------------------------------------------------------------------------------------

(function () {

    // ITEMS AND MAZE CREATERS
     
    const wallImage = new Image()
    const groundImage = new Image()
    const door = new Image()
    wallImage.src = "./assets/image/wall.png"
    groundImage.src = "./assets/image/ground.png"
    door.src = "./assets/image/door.png"
    
// ARRAY MAZES

    const mazeInitial = [];
    const maze = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1],
    [1,0,1,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,0,1,1,1,1,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1],
    ["I",0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1],
    [1,0,1,0,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,1],
    [1,0,1,0,1,1,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,0,0,0,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,"E"],
    [1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,"F",1,1,0,1,0,1,0,1,1,1],
    [1,0,0,0,0,0,0,0,1,0,0,0,1,0,1,"C",0,0,0,0,1,0,1,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,1,1,1,1,0,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1],
    [1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,"E2"],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// TILES AND WALLS
    let walls = [];
    let exit = ""
    for (let row in maze){
            for (let column in maze[row]){
                let tiles = maze[row][column]
                if (tiles === 1 || tiles === "I"){
                    let wall = {
                        x:tileSize*column,
                        y:tileSize*row,
                        width:tileSize,
                        height:tileSize,
                        exit:false,
                        pop:false
                    }
                    
                    walls.push(wall)
                } else if (tiles === "E"){
                    let wall = {
                        x:tileSize*column,
                        y:tileSize*row,
                        width:tileSize,
                        height:tileSize,
                        exit:true,
                        pop:false
                    }
                    exit = wall
                } else if (tiles === "F") {
                    let wall = {
                        x:tileSize*column,
                        y:tileSize*row,
                        width:tileSize,
                        height:tileSize,
                        exit:false,
                        pop:true
                    }
                    walls.push(wall)
                } else if (tiles === "E2") {
                    let wall = {
                        x:tileSize*column,
                        y:tileSize*row,
                        width:tileSize,
                        height:tileSize,
                        exit:true,
                        pop:true
                    }
                    walls.push(wall)
                }
            }
    }

// CONTROLS E PLAYER
    let player = {
        x:tileSize + 2,
        y:tileSize*19,
        // x: 475,
        // y: 1150, // for next tests
        width: 30,
        height: 30,
        speed: 2,
        direction: true
    };
    let left = "ArrowLeft", up = "ArrowUp", right = "ArrowRight", down = "ArrowDown";
    let moveLeft = moveUp = moveRight = moveDown = false;

// CANVAS MAZE
    const canvasWidth = mazeCanvas.width, canvasHeight = mazeCanvas.height;
    const mazeWidth = maze[0].length * tileSize, mazeHeight = maze.length * tileSize;

// EVENTS CONTROLS
    window.addEventListener("keydown", keyDownHandler,false)
    window.addEventListener("keyup", keyUpHandler,false)

    function keyDownHandler(evt){
        let key = evt.key
        switch(key){
            case left:
                moveLeft = true
                unlocked = false
                player.direction = true
                break
            case up:
                moveUp = true
                unlocked = false
                break
            case right:
                moveRight = true
                unlocked = false
                player.direction = false
                break
            case down:
                moveDown = true
                unlocked = false
                break
        }
    }
    function keyUpHandler(evt){
        let key = evt.key
        switch(key){
            case left:
                moveLeft = false
                unlocked = false
                break
            case up:
                moveUp = false
                unlocked = false
                break
            case right:
                moveRight = false
                unlocked = false
                break
            case down:
                moveDown = false
                unlocked = false
                break
        }
    }

// LOGICAL COLLISION
function collisionLogical(player,obj,item,exit,chst){

    // FOR EXIT

    if(player.x > exit.x+(exit.width/2) && player.y < exit.y+(exit.width/2)){
        modalScore.classList.remove("hidden")
        infoBar.classList.add("hidden")
        player.x = tileSize + 2    
        player.y = tileSize * 19
        calcTimerPoints(second,minute)
        updateModalEndGame()
        gameSound.pause()
        scoreSound.play()
        
    } else if (player.x > exit.x+(exit.width/2) && player.y > exit.y+(exit.width/2)) {
        question.classList.remove("hidden")
        infoBar.classList.add("hidden")
        isPlayerMove = false
        player.x = tileSize + 2    
        player.y = tileSize*19
        questionSound.play()
        questionSound.loop = true
        gameSound.pause()
        setOptions[0].isPlay = true
        setOptions[1].isPlay = false
        if(setOptions[2]){
            setOptions[2].isPlay = false
        }
    }
    
    // FOR WALLS 

    let axisXWalls = (player.x + player.width) - (obj.x + obj.width)
    let axisYWalls = (player.y + player.height/2) - (obj.y + obj.height/2)
    let sumWidthWalls = (player.width + obj.width)/3
    let sumHeightWalls = (player.height + obj.height)/2.5

    if(Math.abs(axisXWalls) < sumWidthWalls && Math.abs(axisYWalls) < sumHeightWalls){
        let overLapX = sumWidthWalls - Math.abs(axisXWalls)
        let overLapY = sumHeightWalls - Math.abs(axisYWalls)
        if (obj.pop && !obj.exit) {
            if (setOptions[0].isPlay){

            }  else if(overLapX > overLapY){
                player.y = axisYWalls > 0 ? player.y + overLapY : player.y - overLapY
            } else {
                player.x = axisXWalls > 0 ? player.x + overLapX : player.x - overLapX
            }

        } 
        else if (obj.pop && obj.exit) {
            if (setOptions[1].isPlay) {
            }
            else if(overLapX > overLapY){
                player.y = axisYWalls > 0 ? player.y + overLapY : player.y - overLapY
            } else {
                player.x = axisXWalls > 0 ? player.x + overLapX : player.x - overLapX
            }
        }
        else if(overLapX > overLapY){
            player.y = axisYWalls > 0 ? player.y + overLapY : player.y - overLapY
        } else {
            player.x = axisXWalls > 0 ? player.x + overLapX : player.x - overLapX
        }
    }

// FOR ITEMS
    for(let i in item){
        let axisXItem = (player.x + player.width/2) - (item[i].x + item[i].size/2)
        let axisYItem = (player.y + player.width/2) - (item[i].y + item[i].size/2)
        let sumWidthItem = (player.width + item[i].size)/2
        let sumHeightItem = (player.width + item[i].size)/2
        if(Math.abs(axisXItem) < sumWidthItem && Math.abs(axisYItem) < sumHeightItem){
            if(item[i].visible){
                item[i].gotcha = true
                item[i].visible = false
                if (item[i].name === "Key" || item[i].name === "Egg"){
                    keySound.play()
                } else {
                    itemSound.play()
                }
                updateScore()
            }
        } 
    }

    // FOR TRESURE CHEST
    if(player.x > 505 && player.x < 517){
        if(player.y > 1045 && player.y < 1075){
            unlocked = true
        }
    }
    if(chst.visible){
        let axisXChest = (player.x + player.width/2) - (chst.x + 25 )
        let axisYChest = (player.y + player.height/2) - (chst.y + 10)
        let sumWidthChest = (player.width + 25)/2
        let sumHeightChest = (player.height + 10)/2

        if(Math.abs(axisXChest) < sumWidthChest && Math.abs(axisYChest) < sumHeightChest){
            let overLapX = sumWidthChest - Math.abs(axisXChest)
            let overLapY = sumHeightChest - Math.abs(axisYChest)
            if(overLapX > overLapY){
                player.y = axisYChest > 0 ? player.y + overLapY : player.y - overLapY
            } else {
                player.x =  axisXWalls > 0 ? player.x + overLapX : player.x - overLapX
            }
        }
    }
}

// CAM OBJECT
    const cam = {
        x:0,
        y:tileSize*13.5,
        width:canvasWidth,
        height:canvasHeight,
        maxLimitLeft: function(){
            return this.x + this.width*.25
        },
        maxLimitRight: function(){
            return this.x + this.width*.75
        },
        maxLimitTop: function(){
            return this.y + this.height*.25
        },
        maxLimitBottom: function(){
            return this.y + this.height*.75
        }
    }
  
// RENDER, LOOP AND UPDATE MAZE 
    function updateMaze(){

    // MOVIMENTS OF CHARACTER
    if(isPlayerMove){
        if(moveLeft && !moveRight){
            player.x -= player.speed
        }else if(moveRight && !moveLeft){
            player.x += player.speed
        }
        if(moveUp && !moveDown){
            player.y -= player.speed
        } else if (moveDown && !moveUp){
            player.y += player.speed
        }
    }

    // LOGICAL COLLISIONS
    for (let i in walls){
        let wall = walls[i]
        collisionLogical(player,wall,bagOfItems,exit,chest)
    }

    // LOGICAL CAM
    if(player.x < cam.maxLimitLeft()){
        cam.x = player.x - cam.width*.25
    }
    if(player.x + player.width > cam.maxLimitRight()){
        cam.x = player.x + player.width - cam.width*.75
    }
    if(player.y < cam.maxLimitTop()){
        cam.y = player.y - cam.height*.25
    }
    if(player.y + player.height> cam.maxLimitBottom()){
        cam.y = player.y + player.height - cam.height*.75
    }
    cam.x = Math.max(0, Math.min(cam.x,(mazeWidth - cam.width)))
    cam.y = Math.max(0,Math.min(cam.y,(mazeHeight - cam.height)))
    }
   
    function renderMaze(){
        mazeContext.clearRect(0,0,canvasWidth,canvasHeight)
        mazeContext.save()
        mazeContext.translate(-cam.x,-cam.y)
       
        for (let row in maze){
            for (let column in maze[row]){
                let tiles = maze[row][column]
                let x = column*tileSize
                let y = row*tileSize
                if (tiles === 1 || tiles === "F"){
                    mazeContext.drawImage(
                        wallImage,0,0,tileImageSize,tileImageSize,
                        x,y,tileSize,tileSize
                    ) 
                   
                } 
                if (tiles === 0 || tiles === "I" || tiles === "E" || tiles === "E2" || tiles === "C"){
                    mazeContext.drawImage(
                        groundImage,0,0,tileImageSize,tileImageSize,
                        x,y,tileSize,tileSize
                    )
                    if(tiles === "C"){
                        if(chest.visible){
                            mazeContext.drawImage(chest.elt,chest.axisX,chest.axisY,chest.width,chest.height,
                                chest.x,chest.y,chest.size,chest.size)
                            
                        } else {
                            maze[33][15] = 0
                        }
                    }
                } 
                if (tiles === "E" || tiles === "E2"){
                    
                    mazeContext.drawImage(
                        door,0,0,tileImageSize,tileImageSize,
                        x-22,y-10,tileSize+50,tileSize+30
                    )
                }
            }
        }
        if (player.direction) {
            mazeContext.drawImage(currentPlayer,0,0,tileImageSize,tileImageSize,
            player.x,player.y,player.width,player.height)   
        } else {
            mazeContext.drawImage(currentPlayerAnimated,225,0,tileImageSize,tileImageSize,
            player.x,player.y,player.width,player.height)   
        }
              
// PUT ITEMS IN MAZE
        const drawItems = (bag) => {
            for (let i in bag){
                let currentItem = bag[i]
                if(currentItem.visible){
                    mazeContext.drawImage(currentItem.elt,currentItem.axisX,currentItem.axisY,currentItem.width,currentItem.height,
                        currentItem.x,currentItem.y,currentItem.size,currentItem.size)
                }
            }
         
        }
        drawItems(bagOfItems)

        // CONDITIONS ESTAER EGGS
        if(setOptions[0].isPlay){
            maze[39][28] = 1
            maze[32][18] = "F"
            currentPlayerAnimated.src = "./assets/image/z-haunter-character.png"
        } else if (setOptions[1].isPlay) {
            currentPlayerAnimated.src = "./assets/image/z-voltorb-character.png"
            maze[39][28] = "E2"
            key.visible = false
        } else {
            
            if (setOptions[2].isPlay){
                maze[39][28] = 1
                currentPlayerAnimated.src = "./assets/image/z-togepi-character.png"
            }
        }
        mazeContext.restore()
        if (egg.gotcha) {
            if (!setOptions.includes(togepi)){
                setOptions.push(togepi)
            }
        }
    }
    function loopMaze(){
        updateMaze()
        renderMaze()
        requestAnimationFrame(loopMaze,mazeCanvas)
    }
    requestAnimationFrame(loopMaze,mazeCanvas)
})()
