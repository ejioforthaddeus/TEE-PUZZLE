
//DOCUMENT RESOURCES
let levelCount = document.getElementById('levelCount');
let guessedCount = document.getElementById('guessedCount');
let helpCount = document.getElementById('helpCount');
let gameWord = document.getElementById('gameWord');
let checkButton = document.getElementById('check');
let shuffleButton = document.getElementById('shuffle');
let helpButton = document.getElementById('help');
let userInput = document.getElementById('input');
let message = document.getElementById('message');
let msgContainer = document.getElementById('msg-container');
const dim = document.getElementById('dim');
const about = document.getElementById('about');
const letsPlay = document.getElementById('lets-play');

//Display welcome message / guide
letsPlay.addEventListener('click', () => {
    about.style.display = 'none';
    dim.style.display = 'none';
})

//GAME WORD DATABASE
let gameBase = [
    stage1 = [
        'ARRAY', 'BEARING', 'SCARCE', 'GLOBE', 'GROOM', 'GROUP', 'CRUDE', 'SINCE', 'VOUCHER', 'CUBIC'
    ],
    stage2 = [
        'DOWNLOAD', 'GRENADE', 'SUPPLIES', 'STITCHES', 'PRODUCER', 'BLURRY', 'LOGICAL', 'HUMBLE', 'VILLAGE', 'UNFOLD'
    ],
    stage3 = [
        'VIBRANT', 'CLEARANCE', 'GOVERN', 'NONSENSE', 'STUDIOUS', 'DEPARTMENT', 'FLOWERS', 'SQUARES', 'BITTER', 'ACTIVATE'
    ],
    stage4 = [
        'ANTICIPATE', 'REALIZE', 'CRUNCHY', 'PLURAL', 'BOTHERED', 'PLIGHT', 'OPAQUE', 'GROWL', 'BREAKER', 'BOREDOM'
    ],
    stage5 = [
        'COMPANY', 'OUTREACH', 'STYLIST', 'MANAGER', 'BULKY', 'SECURITY', 'DRONES', 'AILMENT', 'ANGUISH', 'FREEDOM'
    ],
    stage6 = [
        'LEVERAGE', 'DIVIDEND', 'SEQUENCE', 'SPIRAL', 'BURGER', 'VULGAR', 'BRILLIANT', 'ZONAL', 'CAREFULL', 'HANDSOME'
    ],
    stage7 = [
        'BEAUTIFUL', 'GLIMPSE', 'DINNER', 'AMERICA', 'CLASSIC', 'ANNOYED', 'BLOGGER', 'GREETINGS', 'SUSPECTS', 'ASTONISHED'
    ],
    stage8 = [
        'SQUEEZE', 'SEPARATE', 'OPERATION', 'ALIGNMENT', 'FORGIVEN', 'CREATIVE', 'UPHOLD', 'DECLINE', 'FOLLOWERS', 'SPONSORS'
    ],
    stage9 = [
        'DUPLICATE', 'AROUSE', 'GLITCH', 'SLIDES', 'OPTIMIZE', 'LIQUID', 'SCATTERED', 'ORGANIZE', 'PREPARE', 'DONATE'
    ],
    stage10 = [
        'CONTRIBUTE', 'PARTAKE', 'PARTICIPATE', 'DELIGATE', 'INTELLIGENCE', 'WORTHY', 'ARRIVED', 'SUPPOSE', 'FRIGHTEN', 'CELEBRATE'
    ],
    stage11 = [
        'CONTRADICT', 'OVERLOOK', 'SUPREMACY', 'INTERROGATE', 'SUCCINT', 'AWKWARD', 'DOMAINS', 'GRADUAL', 'EXPOSES', 'BACKBITE'
    ],
    stage12 = [
        'INFLAMMATORY', 'PROTOCOL', 'GLUTTON', 'DERIVATIVES', 'RESERVOIR', 'CONCATENATE', 'CURRICULUM', 'PARAMETERS', 'SYNCHORONIZE', 'THERMOMETER'
    ],
    stage13 = [
        'GYMNASTICS', 'ASSOCIATION', 'AQUATIC', 'COMBINATION', 'GALVANOMETER', 'CONCUBINE', 'NAVIGATE', 'COUNTRIES', 'ANNIHILATION', 'ENTITIES'
    ],
    stage14 = [
        'PALLID', 'ACCINDENT', 'PLACENTA', 'SORDID', 'ORBITAL', 'LIQUIFY', 'UNDERESTIMATE', 'IMITATE', 'OBLIGATE', 'GLIMPSE'
    ],
    stage15 = [
        'OPULENCE', 'AUXILIARY', 'PNEUMONIA', 'LAUNDRY', 'MOTHERBOARD', 'CATASTROPHY', 'GALLIVANT', 'SUPPORTIVE', 'HOOLIGAN', 'HORRIFY'
    ]
];

//SHUFFLER FUNCTION
function shuffle(word){

    word = word.split('');

    for (p=0; p < word.length; p++){

        let rndmize = Math.floor(Math.random() * word.length);

        let swap1 = word[p];

        let swap2 = word[rndmize];

        word[p] = swap2;

        word[rndmize] = swap1;
    }

    return word.join('');
}

//FADE-IN EFFECT FUNCTION
function fadeIn (info){              

    info.classList.add('fadeIn');

    setTimeout(() => {

        info.classList.remove('fadeIn');

    }, 1500);  
    
}

//GAME LOGIC | ENGINE
let leveller = levelCount.innerText - 1;

rndm =  Math.floor(Math.random() * gameBase[leveller].length);

gameWord.innerText = shuffle(gameBase[leveller][rndm]); 

//convert input to uppercase as the user types
userInput.addEventListener('input', () => {
    
    userInput.value = userInput.value.toUpperCase();

    //prevent input from having whitespaces
    if (userInput.value.includes(' ')){
        // '\s' represent single space, tab or new line
        //userInput.value = userInput.value.replace(/\s/g, '');
        userInput.value = userInput.value.replace(/ /g, '');
    }
});

//MAIN FUNCTION TAHT VALIDATES RIGHT | WRONG INPUTS
function validate(){

    //console.log(gameBase[leveller][rndm]);
    //Prevent use of check button while msg-container is visible to prevent alteration of guessedCount
    //As long as the error or success message remains hidden, check can be used  

    if (msgContainer.classList.contains('hidden')){
        //CONDITIONS WHEN USER INPUTS THE CORRECT VALUE
        if (userInput.value == gameBase[leveller][rndm]){

            guessedCount.innerText++; 
            
            //REMOVE EACH WORD FROM THE ARRAY AFTER EVERY CORRECT GUESS TO AVOID THEM REOCCURRING IN THE SAME GAME PLAY OR LEVEL
            gameBase[leveller].splice(rndm,1);

            //Effect for every new guess
            fadeIn(guessedCount);

            //OUTPUT SUCCESS OR FAILURE MESSAGE BASED ON USER INPUT
            message.innerText = 'CORRECT';
            
            msgContainer.classList.toggle('true'); 

            msgContainer.classList.toggle('hidden'); 

            setTimeout(()=> {

                msgContainer.classList.toggle('true'); 

                msgContainer.classList.toggle('hidden'); 

            }, 2000);

            setTimeout(() => {

                //BONUS HELP AFTER 5 CORRECT GUESSES
                if (guessedCount.innerText % 10 == 0){

                    helpCount.innerText++;

                    if (helpCount.innerText > 0){

                        helpButton.style.cursor = 'pointer';
                
                        helpButton.style.backgroundColor = '#FF7A8F';
                    }

                    //effect for every help count increment
                    fadeIn(helpCount);

                }

                //LEVEL UP AFTER A WHOLE LEVEL WORDS ARE CORRECTLY GUESSED
                if (guessedCount.innerText % 10 == 0){

                    levelCount.innerText++;

                    leveller = levelCount.innerText - 1;

                    //Effect for every new level
                    fadeIn(levelCount);
                }

                //RANDOMIZE AND REASSIGN RANDOM WORD TO THE GAME WORD VALUE
                //RESET USER INPUT
                rndm =  Math.floor(Math.random() * gameBase[leveller].length);

                gameWord.innerText = shuffle(gameBase[leveller][rndm]);   
                
                userInput.value = '';

            }, 2000);

            //alert(gameBase[leveller][rndm]); 
        }
        //CONDITIONS WHEN USER INPUTS THE WRONG VALUE
        else {

            message.innerText = 'WRONG';

            msgContainer.classList.toggle('false'); 

            msgContainer.classList.toggle('hidden'); 

            setTimeout(()=> {

                msgContainer.classList.toggle('false'); 

                msgContainer.classList.toggle('hidden'); 

            }, 2000);

        }
        console.log(gameBase[leveller]);
    }
};

//when "enter" is clicked
document.addEventListener("keydown", function(e){
    if (e.keyCode == 13 || e.which == 13) validate();
});

//Check Button
checkButton.addEventListener('click', function(){ 
    validate();
}); 


//Shuffle Button
shuffleButton.addEventListener('click', function() {
     gameWord.innerText = shuffle(gameWord.innerText); 
});

//Spacebar to shuffle
document.addEventListener('keydown', function(e){
    if (e.keyCode == 32 || e.which == 32) gameWord.innerText = shuffle(gameWord.innerText), e.preventDefault(); 
    // e.preventDefault() is added to ensure the space bar doesn't take after the last clicked button.
    // Too understand this better, inspect the game without the preventDefault() function, click on check botton then...
    // then click on the space key, observe.
});

//Help Button
helpButton.addEventListener('click', function() {

    //prevent user from clicking help when input value is correct (or when help has input correct value already)
    //or when success or error message is been displayed
    if (helpCount.innerText > 0) {

        if (userInput.value == gameBase[leveller][rndm] || !(msgContainer.classList.contains('hidden'))){
            //do nothing
        }
        else {
            userInput.value = gameBase[leveller][rndm]; 
            
            helpCount.innerText--;

            //effect for every help count increment
            fadeIn(helpCount);
        }
    
    }

    //prevent helpcount from reading negative values
    if (helpCount.innerText <= 0){

        helpCount.innerText = 0;

        //userInput.innerText = '';
    }
    if (helpCount.innerText == 0){

        helpButton.style.cursor = 'not-allowed';

        helpButton.style.backgroundColor = 'lightgrey';
    } 

});
