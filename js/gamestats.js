var ballposession = [0,0];
var boostConsumption = [0,0];


function hideGameStats() {
    $("#postgame-overlay").hide();
}

export async function showGameStats(players, currentPlayers) {
    await new Promise(res => setTimeout(res, 4500));
    $("#postgame-overlay").show();
    displayPlayerStats(players, currentPlayers);
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

function displayPlayerStats(players, currentPlayers) {
    $("#gamestats-left").empty();
    $("#gamestats-right").empty();
    players.forEach(player => {
        var container;
        for(var i = 0; i < currentPlayers.length; i++) {
            if(currentPlayers[i].id === player.id) {
                container = currentPlayers[i].team === 'blue' ? $("#gamestats-left") : $("#gamestats-right");
            }
        }
        container.append($("<div class=\"gamestats-player\"><p>" + player.name 
        + "</p><hr><p>" + player.score + "</p><p>" + player.goals  + "</p><p>" 
        + player.assists  + "</p><p>" + player.saves  + "</p><p>" + player.shots 
        + "</p><p>" + player.demos + "</p><p>" + player.touches + "</p></div>"));
    });
}

function displayTeamStats() {
    var ballPossessionLeft = Math.round((ballposession[0]/(ballposession[0]+ballposession[1]))*100);
    var ballPossessionRight = 100-ballPossessionLeft;
    $("#gamestats-team-left").empty();
    $("#gamestats-team-right").empty();
    $("#gamestats-team-left").append($("<div>" + $("#nameLeft").text() + "</div>"));
    $("#gamestats-team-left").append("<hr>");
    $("#gamestats-team-left").append("<div class\"gamestats-boost-consumption\">" + boostConsumption[0] + "</div>");
    $("#gamestats-team-left").append("<div class=\"gamestats-ball-posession\">" + ballPossessionLeft + "%</div>");
    $("#gamestats-team-right").append($("<div>" + $("#nameRight").text() + "</div>"));
    $("#gamestats-team-right").append("<hr>");
    $("#gamestats-team-right").append("<div class\"gamestats-boost-consumption\">" + boostConsumption[1] + "</div>");
    $("#gamestats-team-right").append("<div class=\"gamestats-ball-posession\">" + ballPossessionRight + "%</div>");
}