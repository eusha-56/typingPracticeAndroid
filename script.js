const text = document.getElementById("text")
const inputField = document.getElementsByClassName("inputField")[0]
const container = document.getElementsByClassName("container")[0]
const typedWord = document.getElementsByClassName("typedWord")[0]
const typing = document.getElementsByClassName("typing")[0]
const correctWord = document.getElementsByClassName("correctWord")[0]
const wrongWord = document.getElementsByClassName("wrongWord")[0]
const upcomingText = document.getElementsByClassName("upcomingText")[0]
const timeElapsed = document.getElementsByClassName("timeElapsed")[0]
const numberOfTypedWords = document.getElementsByClassName("numberOfTypedWords")[0]
const numberOfCorrectWords = document.getElementsByClassName("numberOfCorrectWords")[0]
const numberOfWrongWords = document.getElementsByClassName("numberOfWrongWords")[0]
const wpm = document.getElementsByClassName("wpm")[0]
const minContainer = document.getElementsByClassName("min")[0]
const secContainer = document.getElementsByClassName("sec")[0]
const resetButton = document.getElementsByClassName("resetButton")[0]


inputField.onfocus = function () {
  container.style.cssText = "border: 3px solid #c4b000; border-radius: 30px;"
}
inputField.onblur = function () {
  container.style.cssText = "border: 3px solid #767676; border-radius: 10px;"
  startTimer.pauseTimer()
}
resetButton.onclick = reset

let words = "the of to and a in is it you that was for on are with as I his they be at one have this from or had by not word but what some we can out other were all there when up use your how said an each she which do their time if will way about many then them write would like so these her long make thing see him two has look more day could go come did number sound no most people my over know water than call first who may down side been now find any must big high such follow act why ask men change went light kind off need house picture try us again animal point mother world near build self earth father head stand own page should country found answer school grow study still learn plant cover food sun four between state keep eye never last let   thought city tree cross farm hard start might story saw far sea draw left late run while press close night real life few north open seem together next white children begin got walk example ease paper group always music those both mark often letter until mile river car feet care second book carry took science eat room friend began idea fish mountain stop once base hear horse cut sure watch color face wood main enough plain girl usual young ready above ever red list though feel talk bird soon body dog family direct pose leave song measure door product black short numeral class wind question happen complete ship area half rock order fire south problem piece told knew pass since top whole king space heard best hour better true during hundred five remember step early hold west ground interest reach fast verb sing listen six table travel less morning ten simple several vowel toward war lay against pattern slow center love person money serve appear road map rain rule govern pull cold notice voice unit power town fine certain fly fall lead cry dark machine note wait plan figure star box noun field rest correct able pound done beauty drive stood contain front teach week final gave green oh quick develop ocean warm free minute strong special mind behind clear tail produce fact street inch multiply nothing course stay wheel full force blue object decide surface deep moon island foot system busy test record boat common gold possible plane stead dry wonder laugh thousand ago ran check game shape equate hot miss brought heat snow tire bring yes distant fill east paint language among"

let wordCache = words.split(" ").filter(x => x !== " ")
let typedWords = []
let upcomingLine = ""
let letterIndex = 0
let randomNumber
let currentLetter = ""
let currentTypedWord = ""
let currentWord = ""
let lineThrough = false
let correctWordCount = 0
let wrongWordCount = 0
let totalWordCount = 0
let sec = 0
let min = 0
let timerStarted = false
let regex = /[a-z]/i



function wordAdder() {
  if (wordCache.length < 5) {
    wordCache = words
  }
  randomNumber = Math.ceil(Math.random() * wordCache.length)
  upcomingLine += `${wordCache.splice(randomNumber, 1)[0]} `
  currentWord = upcomingLine.split(" ")[0]
  upcomingTextUpdater()
}


function spacePressed() {
  if (upcomingLine[0] == " ") {
    upcomingLine = upcomingLine.split("").splice(1).join("")
  } else {
    upcomingLine = upcomingLine.split(" ").splice(1).join(" ")
  }
  if (currentTypedWord.trim() == currentWord) {
    correctlyTypedWordAdder(currentTypedWord)
  } else {
    wronglyTypedWordAdder(currentTypedWord)
  }
  currentWord = null
  correctWord.innerHTML = null
  wrongWord.innerHTML = null
  wordAdder()
  lineThrough = false
  letterIndex = 0
  typedWords.push(currentTypedWord)
  currentTypedWord = ""
  upcomingTextUpdater()
  statUpdate()
}
function upcomingTextUpdater() {
  upcomingText.innerHTML = upcomingLine
}
function wronglyTypedWordAdder(word) {
  let span = document.createElement("span")
  span.innerHTML = word.trim()
  span.className = "wrongWord"
  typedWord.appendChild(span)
  correctlyTypedWordAdder("")
  wrongWordCount++
  correctWordCount--
}

function correctlyTypedWordAdder(word) {
  let span = document.createElement("span")
  span.innerHTML = word.trim() + " "
  span.className = "correctWord"
  typedWord.appendChild(span)
  correctWordCount++
  totalWordCount++
}

for (let i = 0; i < 5; i++) {
  wordAdder()
}

inputField.onkeydown = function () {
  inputField.value = null
  if (!timerStarted) {
    startTimer()
  }
}

inputField.onkeyup = function () {
  currentLetter = inputField.value.split('').pop()
  inputField.value = null
  if (currentLetter === ' ') {
    spacePressed()
  } else if (regex.test(currentLetter)) {
    currentTypedWord += currentLetter
    if (currentLetter == upcomingLine[0] && !lineThrough) {
      correctWord.innerHTML += currentLetter
      upcomingLine = upcomingLine.split("").splice(1).join("")
      upcomingTextUpdater()
      letterIndex++
    } else {
      correctWord.innerHTML = ""
      wrongWord.innerHTML = currentTypedWord
      lineThrough = true
    }
  }
}

function timeUpdate() {
  secContainer.innerHTML = sec
  minContainer.innerHTML = min
}
function statUpdate() {
  numberOfTypedWords.innerHTML = totalWordCount
  numberOfWrongWords.innerHTML = wrongWordCount
  numberOfCorrectWords.innerHTML = correctWordCount
}

function startTimer() {
  timerStarted = true
  const clock = setInterval(() => {
    sec++
    if (sec == 60) {
      sec = 0
      min++
    }
    timeUpdate()
  }, 1000);

  wpmUpdate()

  startTimer.pauseTimer = function () {
    timerStarted = false
    wpmUpdate.stopUpdate()
    clearInterval(clock)
  }
}


function wpmUpdate() {
  const clock = setInterval(() => {
    if (min > 0 || sec > 0) {
      wpm.innerHTML = Math.round(correctWordCount / (min * 60 + sec) * 60)
    } else {
      wpm.innerHTML = 0
    }
  }, 10000);
  wpmUpdate.stopUpdate = function () {
    clearInterval(clock)
  }
}


function reset() {
  startTimer.pauseTimer()
  sec = 0
  min = 0
  wordCache = words.split(" ").filter(x => x !== " ")
  typedWords = []
  upcomingLine = ""
  letterIndex = 0
  currentLetter = ""
  currentTypedWord = ""
  currentWord = ""
  lineThrough = false
  correctWordCount = 0
  wrongWordCount = 0
  totalWordCount = 0
  sec = 0
  min = 0
  timerStarted = false
  statUpdate()
  timeUpdate()
  wpm.innerHTML = 0
  startTimer.pauseTimer()
  typedWord.innerHTML = ''
  correctWord.innerHTML = ''
  wrongWord.innerHTML = ''
  for (let i = 0; i < 5; i++) {
    wordAdder()
  }
}
