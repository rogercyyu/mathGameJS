let startBut = document.querySelector('#start');
let backBut = document.querySelector('#back');
let backBut2 = document.querySelector('#back-2');
let playBut = document.querySelector('#play');
let restartBut = document.querySelector('#restart');
let saveBut = document.querySelector('#save');
let restoreBut = document.querySelector('#restore');
let cursorMath = document.querySelector('#div-mathBox');
let musicPauseBut = document.querySelector('#music-play');
let musicPlayBut = document.querySelector('#music-pause');
let rulesBut = document.querySelector('#rulesBut');
let style = document.createElement('style');
//let tieClass = ['bomber.png', 'fighter.png', 'interceptor.png'];
let hitsCount = [0, 0, 0];
let missesCount = [0, 0, 0];
let totalScore = 0;
let roundNum = 0;
let roundMins = 0;
let roundSecs = 0; // SEE PageStart() for LEVEL TIMES;
let nameGlobal;
let ageGlobal;
let bgMusic;
let timer;

window.onload = pageStart;
window.addEventListener('mousemove', mathCursor);
backBut.addEventListener('click', pageStart);
backBut2.addEventListener('click', pageStart);
startBut.addEventListener('click', pagePlayerDetails);
playBut.addEventListener('click', pageGame);
restartBut.addEventListener('click', pageStart);
musicPlayBut.addEventListener('click', playMusic);
musicPauseBut.addEventListener('click', pauseMusic);
saveBut.addEventListener('click', saveGame);
rulesBut.addEventListener('click', rules);
restoreBut.addEventListener('click', checkStorage);

function rules() {
    document.querySelector('#div-introPage').style.display = 'none';
    document.querySelector('#div-playerDetails').style.display = 'none';
    document.querySelector('#div-game').style.display = 'none';
    document.querySelector('#div-mathBox').style.display = 'none';
    document.querySelector('#div-scoreStats').style.display = 'none';
    document.querySelector('#restart').style.display = 'none';
    document.querySelector('#div-rules').style.display = 'block';
    document.querySelector('#restore').style.display = 'none';
}

// Music stuff
bgMusic = new Audio('../sounds/music.mp3');

bgMusic.addEventListener('ended', function () {
    this.currentTime = 0;
    this.play();
}, false);

function playMusic() {
    bgMusic.play();
    document.querySelector('#music-pause').style.display = 'none';
    document.querySelector('#music-play').style.display = 'block';
}

function pauseMusic() {
    bgMusic.pause();
    document.querySelector('#music-pause').style.display = 'block';
    document.querySelector('#music-play').style.display = 'none';
}

class Player {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    getName() {
        return this.name;
    }

    getAge() {
        return this.age;
    }
}

let playerGlobal = new Player();

function pageStart() {
    let scoreID = document.querySelector('#score');
    let hitID = document.querySelector('#hits');
    let missID = document.querySelector('#misses');

    hitsCount = [0, 0, 0];
    missesCount = [0, 0, 0];
    totalScore = 0;
    roundNum = 0;
    roundMins = [1.5, 2.0, 2.5]; // DEFAULT: CHANGE TIME OF LEVELS HERE
    //roundMins = [0.1, 0.1, 0.1]; // SPEED RUN: CHANGE TIME OF LEVELS HERE
    roundSecs = [roundMins[0] * 60, roundMins[1] * 60, roundMins[2] * 60];
    scoreID.innerHTML = totalScore * 100;
    hitID.innerHTML = hitsCount[roundNum];
    missID.innerHTML = missesCount[roundNum];
    clearTimeout(timer);

    document.querySelector('#div-introPage').style.display = 'block';
    document.querySelector('#div-rules').style.display = 'none';
    document.querySelector('#div-playerDetails').style.display = 'none';
    document.querySelector('#div-game').style.display = 'none';
    document.querySelector('#div-mathBox').style.display = 'none';
    document.querySelector('#div-scoreStats').style.display = 'none';
    document.querySelector('#restart').style.display = 'none';
    document.querySelector('#save').style.display = 'none';
    document.querySelector('#music-play').style.display = 'none';
    document.querySelector('#restore').style.display = 'block';
}

function pagePlayerDetails() {
    document.querySelector('#div-introPage').style.display = 'none';
    document.querySelector('#div-rules').style.display = 'none';
    document.querySelector('#div-playerDetails').style.display = 'block';
    document.querySelector('#div-game').style.display = 'none';
    document.querySelector('#div-mathBox').style.display = 'none';
    document.querySelector('#div-scoreStats').style.display = 'none';
    document.querySelector('#restart').style.display = 'none';
    document.querySelector('#save').style.display = 'none';
    document.querySelector('#restore').style.display = 'none';

    let name = document.querySelector('#userName');
    let age = document.querySelector('#userAge');

    playerGlobal = new Player(name, age);
}

function pageGame() {
    if (!Number.isNaN(parseInt(playerGlobal.getAge().value)) || playerGlobal.getAge().value == "") {
        playRound(roundNum);
    } else {
        alert(`Please enter a number in the age field before proceeding.`);
    }
}

function endGame() {
    document.querySelector('#div-introPage').style.display = 'none';
    document.querySelector('#div-rules').style.display = 'none';
    document.querySelector('#div-playerDetails').style.display = 'none';
    document.querySelector('#div-game').style.display = 'none';
    document.querySelector('#div-mathBox').style.display = 'none';
    document.querySelector('#div-scoreStats').style.display = 'grid';
    document.querySelector('#restart').style.display = 'block';
    document.querySelector('#save').style.display = 'none';
    document.querySelector('#restore').style.display = 'none';

    let scoreID = document.querySelector('#score_final');
    let hitID = document.querySelector('#hits_final');
    let missID = document.querySelector('#misses_final');
    let nameID = document.querySelector('#name_final');
    let ageID = document.querySelector('#age_final');
    let hit_1 = document.querySelector('#hits_1');
    let hit_2 = document.querySelector('#hits_2');
    let hit_3 = document.querySelector('#hits_3');
    let miss_1 = document.querySelector('#misses_1');
    let miss_2 = document.querySelector('#misses_2');
    let miss_3 = document.querySelector('#misses_3');

    clearBalloons();
    clearTimeout(timer);

    if (playerGlobal.getAge().value == "") {
        document.querySelector('.div-age').style.display = 'none';
    } else {
        document.querySelector('.div-age').style.display = 'block';
        ageID.innerHTML = playerGlobal.getAge().value;
    }

    if (playerGlobal.getName().value == "") {

    } else {
        nameID.innerHTML = ' ' + playerGlobal.getName().value;
    }
    scoreID.innerHTML = totalScore * 100;
    hit_1.innerHTML = hitsCount[0];
    hit_2.innerHTML = hitsCount[1];
    hit_3.innerHTML = hitsCount[2];
    hitID.innerHTML = hitsCount[0] + hitsCount[1] + hitsCount[2];
    miss_1.innerHTML = missesCount[0];
    miss_2.innerHTML = missesCount[1];
    miss_3.innerHTML = missesCount[2];
    missID.innerHTML = missesCount[0] + missesCount[1] + missesCount[2];
}

function playRound(levelNum) {
    console.log("game start");
    document.querySelector('#div-introPage').style.display = 'none';
    document.querySelector('#div-rules').style.display = 'none';
    document.querySelector('#div-playerDetails').style.display = 'none';
    document.querySelector('#div-game').style.display = 'block';
    document.querySelector('#div-mathBox').style.display = 'block';
    document.querySelector('#div-scoreStats').style.display = 'none';
    document.querySelector('#restart').style.display = 'block';
    document.querySelector('#save').style.display = 'block';
    document.querySelector('#restore').style.display = 'none';
    clearBalloons();
    questionsGenerator(levelNum);
    countdown(levelNum);
}

Number.prototype.pad = function (size) {
    var s = String(this);
    while (s.length < (size || 2)) {
        s = '0' + s;
    }
    return s;
}

function countdown(round) {
    let roundsID = document.querySelector('#round');
    timer = setTimeout(Decrement, 60, round);
    roundsID.innerHTML = round + 1;
}

function Decrement(round) {
    if (document.getElementById) {
        let minutes = document.getElementById('minutes');
        let seconds = document.getElementById('seconds');
        //if less than a minute remaining 
        //Display only seconds value. 
        if (seconds < 59) {
            seconds.value = secs;
        }
        //Display both minutes and seconds 
        //getminutes and getseconds is used to 
        else {
            minutes.value = getminutes(round).pad(2);
            seconds.value = getseconds(round).pad(2);
        }
        //when less than half a minute remaining 
        //colour of the minutes and seconds 
        //changes to red 
        if (roundSecs[round] < 30) {
            minutes.style.color = 'red';
            seconds.style.color = 'red';

        }
        //if seconds becomes zero, 
        //then page alert time up 
        if (roundMins[round] < 0) {
            minutes.value = '00';
            seconds.value = '00';
            roundNum++;
            if (roundNum < 3) {
                playRound(roundNum);
            } else {
                endGame();
                return;
            }
        }
        //if seconds > 0 then seconds is decremented 
        else {
            roundSecs[round]--;
            timer = setTimeout(Decrement, 1000, round);
        }
    }
}

function getminutes(i) {
    roundMins[i] = Math.floor(roundSecs[i] / 60);
    return roundMins[i];
}

function getseconds(i) {
    return roundSecs[i] - Math.round(roundMins[i] * 60);
}

function mathCursor() {
    cursorMath.style.top = (event.clientY + 10) + 'px';
    cursorMath.style.left = (event.clientX - 125) + 'px';
    if (event.clientX >= webpageSizeWidth() - 150) {
        cursorMath.style.left = webpageSizeWidth() - 275 + 'px';
    } else if (event.clientX < 150) {
        cursorMath.style.left = 20 + 'px';
    }
    if (event.clientY >= webpageSizeHeight() - 250) {
        cursorMath.style.top = webpageSizeHeight() - 200 + 'px';
    }
}

function questionsGenerator(round) {
    let mathQuest = document.querySelector('#mathBox-question');
    let num1 = 0.0,
        num2 = 0.0,
        answer = 0,
        operator;

    if (round == 0) {
        num1 = Math.floor((Math.random() * 25) + 1);
        num2 = Math.floor((Math.random() * 9) + 1);
        operator = '+';
        answer = parseInt(num1) + parseInt(num2);
        let result = `${num1} ${operator} ${num2}`;
        mathQuest.innerHTML = result;
    } else if (round == 1) {
        num1 = Math.floor((Math.random() * 25) + 1);
        num2 = Math.floor((Math.random() * 9) + 1);
        while (num2 > num1) {
            num2 = Math.floor((Math.random() * 9) + 1);
        }
        operator = '-';
        answer = parseInt(num1) - parseInt(num2);
        let result = `${num1} ${operator} ${num2}`;
        mathQuest.innerHTML = result;
    } else if (round == 2) {
        num1 = Math.floor((Math.random() * 25) + 1);
        num2 = Math.floor((Math.random() * 9) + 2);
        operator = '/';
        while (num1 % num2 != 0) {
            num2 = Math.floor((Math.random() * 9) + 2);
            num1 = Math.floor((Math.random() * 25) + 1);
        }
        answer = parseInt(num1) / parseInt(num2);
        let result = `${num1} ${operator} ${num2}`;
        mathQuest.innerHTML = result;
    }

    let correctAnchor = document.querySelector('#div-balloon-answer');
    let correctBal;
    let correctBut;

    correctBal = document.createElement('div');
    correctBal.setAttribute('id', 'div-balloon-correct');
    correctBal.setAttribute('class', 'balloon-answer');
    let tieNum = Math.floor((Math.random() * 3));
    if (tieNum == 0) {
        correctBal.style.backgroundImage = "url('bomber.png')";
    } else if (tieNum == 1) {
        correctBal.style.backgroundImage = "url('fighter.png')";
    } else {
        correctBal.style.backgroundImage = "url('interceptor.png')";
    }
    //correctBal.style.backgroundImage = `url('../img/${tieClass[tieNum]}')`;
    correctAnchor.appendChild(correctBal);
    correctBut = document.createElement('input');
    correctBut.setAttribute('id', `input-correct`);
    correctBut.setAttribute('type', 'button');
    correctBut.setAttribute('value', answer);
    correctBut.setAttribute('class', 'balloon-but');
    correctBal.appendChild(correctBut);
    animateDiv('#div-balloon-correct');
    correctBut.addEventListener('click', function () {
        correct(round);
    });

    let balloonAnchor = document.querySelector('#div-wrong-balloons');
    let fakeAnsBal = [];
    let fakeAnsBut = [];
    let node = [];
    let wrongAnswers = [];
    let x, y;

    for (let i = 0; i < 8; i++) {
        wrongAnswers[i] = Math.floor((Math.random() * 34) + 1);

        while (wrongAnswers[i] == answer) {
            wrongAnswers[i] = Math.floor((Math.random() * 34) + 1);
        }

        for (let j = 0; j < 8; j++) {
            while (wrongAnswers[i] == wrongAnswers[j] && wrongAnswers[i] == answer) {
                wrongAnswers[i] = Math.floor((Math.random() * 34) + 1);
            }
        }
    }

    for (let i = 0; i < 8; i++) {
        if (1) {
            fakeAnsBal[i] = document.createElement('div');
            fakeAnsBal[i].setAttribute('id', `div-balloon-wrong-${i}`);
            fakeAnsBal[i].setAttribute('class', 'balloon-wrong');
            let tieNum = Math.floor((Math.random() * 3));
            if (tieNum == 0) {
                fakeAnsBal[i].style.backgroundImage = "url('bomber.png')";
            } else if (tieNum == 1) {
                fakeAnsBal[i].style.backgroundImage = "url('fighter.png')";
            } else {
                fakeAnsBal[i].style.backgroundImage = "url('interceptor.png')";
            }
            //fakeAnsBal[i].style.backgroundImage = `url('../img/${tieClass[tieNum]}')`;
            balloonAnchor.appendChild(fakeAnsBal[i]);
            fakeAnsBut[i] = document.createElement('input');
            fakeAnsBut[i].setAttribute('id', `input-wrong-${i}`);
            fakeAnsBut[i].setAttribute('type', 'button');
            fakeAnsBut[i].setAttribute('value', wrongAnswers[i]);
            fakeAnsBut[i].setAttribute('class', 'balloon-but');
            fakeAnsBal[i].appendChild(fakeAnsBut[i]);
            animateDiv(`#div-balloon-wrong-${i}`);
            fakeAnsBal[i].addEventListener('click', function () {
                incorrect(round, fakeAnsBal[i]);
            });
        }
    }

    $("input").click(function () {
        var clickedValue = $(this).val();
        if (clickedValue == answer) {} else {}
    });
}

// ---------------------------------------------------------- //
// Source for Animation: https://codepen.io/anon/pen/ZgEEoB

function makeNewPosition() {
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() + 350;
    var w = $(window).width() + 350;

    var nh = Math.floor((Math.random() * h) - 350);
    var nw = Math.floor((Math.random() * w) - 350);

    return [nh, nw];
}

function animateDiv(myclass) {
    var newq = makeNewPosition();
    $(myclass).animate({
        top: newq[0],
        left: newq[1]
    }, 3000, function () {
        animateDiv(myclass);
    });
}

// ---------------------------------------------------------- //

function scoreKeeper(points) {
    let scoreID = document.querySelector('#score');
    let hitID = document.querySelector('#hits');
    let missID = document.querySelector('#misses');

    if (points > 0) {
        hitsCount[roundNum]++;
        totalScore++;
    } else if (points < 0) {
        missesCount[roundNum]++;
        if (totalScore > 0) {
            totalScore--;
        }
    } else {
        alert('scoreKeeper - invalid parameters.');
    }

    if (missesCount[0] + missesCount[1] + missesCount[2] == 6) {
        clearTimeout(timer);
        endGame();
    }

    scoreID.innerHTML = totalScore * 100;
    hitID.innerHTML = hitsCount[0] + hitsCount[1] + hitsCount[2];
    missID.innerHTML = missesCount[0] + missesCount[1] + missesCount[2];
}

function clearBalloons() {
    let nodeAnswer = document.querySelector('#div-balloon-answer');
    while (nodeAnswer.firstChild) {
        nodeAnswer.removeChild(nodeAnswer.firstChild);
    }

    let nodeWrong = document.querySelector('#div-wrong-balloons');
    while (nodeWrong.firstChild) {
        nodeWrong.removeChild(nodeWrong.firstChild);
    }

    style.innerHTML = '';
}

function correct(round) {
    scoreKeeper(1);
    clearBalloons();
    let correctBal = document.querySelector('#div-balloon-correct');
    $(correctBal).stop();
    questionsGenerator(round);
}

function incorrect(round, fakeAnsBal) {
    scoreKeeper(-1);
    clearBalloons();
    $(fakeAnsBal).stop();
    questionsGenerator(round);
}

// Browser size
function webpageSizeWidth() {
    let width = window.innerWidth;

    return width;
}

function webpageSizeHeight() {
    let height = window.innerHeight;

    return height;
}

// Local Storage

function checkStorage() {
    const localStorageValue = JSON.parse(localStorage.getItem("GameDate"));

    if (localStorageValue != null) {
        let hitID = document.querySelector('#hits');
        let missID = document.querySelector('#misses');
        let scoreID = document.querySelector('#score');
        let roundsID = document.querySelector('#round');
        let minutes = document.getElementById('minutes');
        let seconds = document.getElementById('seconds');

        clearTimeout(timer);

        alert("Loading save...");
        hitsCount[0] = localStorageValue["0"];
        hitsCount[1] = localStorageValue["1"];
        hitsCount[2] = localStorageValue["2"];
        missesCount[0] = localStorageValue["3"];
        missesCount[1] = localStorageValue["4"];
        missesCount[2] = localStorageValue["5"];
        totalScore = localStorageValue["6"];
        roundNum = localStorageValue["7"];
        roundMins[roundNum] = localStorageValue["8"];
        roundSecs[roundNum] = localStorageValue["9"];
        playRound(roundNum);

        hitID.innerHTML = hitsCount[roundNum];
        missID.innerHTML = missesCount[roundNum];
        scoreID.innerHTML = totalScore * 100;
        roundsID.innerHTML = roundNum + 1;
        minutes.value = '00';
        seconds.value = '00';
    } else {
        alert("No save game found.");
    }
}

function saveGame() {
    alert("Saving game...");
    const gameDataArr = [hitsCount[0], hitsCount[1], hitsCount[2], missesCount[0], missesCount[1], missesCount[2], totalScore, roundNum, roundMins[roundNum], roundSecs[roundNum]];
    localStorage.setItem("GameDate", JSON.stringify(gameDataArr));
    const localStorageValue = JSON.parse(localStorage.getItem("GameDate"));
}
