var ballposession = [0,0];
var boostConsumption = [0,0];


function hideGameStats() {
    $("#gamestats").empty(); 
}

export async function showGameStats() {
    //TODO: calculate values
    await new Promise(res => setTimeout(res, 4500));
    $("#gamestats").load("./../html/gamestats.html"); 
    displayTeamStats();
}

export function resetGameStats() {
    hideGameStats();
    ballposession = [0,0];
    boostConsumption = [0,0];
}

export function updateBallPosession(team) {
    if(team === 0) {
        ballposession[0]++;
    } else if(team == 1) {
        ballposession[1]++;
    }
}

export function updateBoostConsumption(team, boost) {
    boostConsumption[team] += boost;
}

function displayTeamStats() {
    var percentageLeft = Math.round((ballposession[0]/(ballposession[0]+ballposession[1]))*100);
    var percentageRight = 100-percentageLeft;
    console.log(boostConsumption[0])
    console.log(boostConsumption[1])
    console.log(percentageLeft)
    console.log(percentageRight)
}