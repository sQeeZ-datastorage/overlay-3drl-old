var ballposession = [0, 0];
var boostConsumption = [0, 0];

export async function showGameStats(players, currentPlayers) {
    //show postgame overlay after podium
    displayPlayerStats(players, currentPlayers);
    displayTeamStats();
    await new Promise(res => setTimeout(res, 4500));
    $("#postgame-overlay").show();
}

export function resetGameStats() {
    hideGameStats();
    ballposession = [0, 0];
    boostConsumption = [0, 0];
}

export function updateBallPosession(team) {
    if (team === 0) {
        ballposession[0]++;
    } else if (team == 1) {
        ballposession[1]++;
    }
}

export function updateBoostConsumption(team, boost) {
    boostConsumption[team] += boost;
}

function hideGameStats() {
    $("#postgame-overlay").hide();
}

function displayPlayerStats(players, currentPlayers) {
    $("#gamestats-left").empty();
    $("#gamestats-right").empty();
    $("#gamestats-comparison").empty();
    var teamStats = [
        ['score', 0, 0],
        ['goals', 0, 0],
        ['assists', 0, 0],
        ['saves', 0, 0],
        ['shots', 0, 0],
        ['demos', 0, 0],
        ['ball touches', 0, 0]
    ];
    //load player stats into postgame overlay
    players.forEach(player => {
        var container;
        var team;
        for (var i = 0; i < currentPlayers.length; i++) {
            if (currentPlayers[i].id === player.id) {
                container = currentPlayers[i].team === 'blue' ? $("#gamestats-left") : $("#gamestats-right");
                team = currentPlayers[i].team === 'blue' ? 1 : 2;
            }
        }
        container.append($("<div class=\"gamestats-player\"><p>" + player.name +
            "</p><hr><p>" + player.score + "</p><p>" + player.goals + "</p><p>" +
            player.assists + "</p><p>" + player.saves + "</p><p>" + player.shots +
            "</p><p>" + player.demos + "</p><p>" + player.touches + "</p></div>"));
        teamStats[0][team] += player.score;
        teamStats[1][team] += player.goals;
        teamStats[2][team] += player.assists;
        teamStats[3][team] += player.saves;
        teamStats[4][team] += player.shots;
        teamStats[5][team] += player.demos;
        teamStats[6][team] += player.touches;
    });
    //load team stats into progress bars
    teamStats.forEach(stat => {
        var blue = (stat[1] + stat[2]) === 0 ? 1 : stat[1];
        var sum = (stat[1] + stat[2]) === 0 ? 2 : (stat[1] + stat[2]);
        $("#gamestats-comparison").append("<div class=\"seperator\"><div class=\"label\">" + stat[0] +
            "</div><progress class=\"progress\" value=\"" + blue + "\" max=\"" +
            sum + "\"></progress></div>");
    });
}

function displayTeamStats() {
    //load team stats into postgame overlay
    var ballPossessionLeft = Math.round((ballposession[0] / (ballposession[0] + ballposession[1])) * 100);
    var ballPossessionRight = 100 - ballPossessionLeft;
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