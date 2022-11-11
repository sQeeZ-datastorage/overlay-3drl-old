var ballposession = [0,0];
var boostConsumption = [0,0];


function hideGameStats() {
    $("#gamestats").empty(); 
}

export async function showGameStats() {
    //TODO: calculate values
    //TODO: Show Dialog
    await new Promise(res => setTimeout(res, 4500));
    $("#gamestats").load("./../html/gamestats.html"); 
}

export function resetGameStats() {
    hideGameStats();
    ballposession = [0,0];
    boostConsumption = [0,0];
}

export function updateBallPosession() {
    //TODO: on update read team with ball, set team with ball ++
}

export function updateBoostConsumption() {
    //TODO: on update calc boost cinsumption per player
}