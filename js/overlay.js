import { showGameStats, resetGameStats, updateBoostConsumption } from "./gamestats.js";

export const constants = {
    player: {
        name: 'name',
        goals: 'goals',
        assists: 'assists',
        saves: 'saves',
        shots: 'shots',
        boost: 'boostValue'
    },
    matchState: {
        created: 'match_created',
        ended: 'match_ended'
    },
    team: {
        blue: 'team-info-left',
        orange: 'team-info-right'
    }
};
export const scoreBoardTeam = ".scorebug .team";
export var matchRunning = true;
const teamLeft = scoreBoardTeam + ".left";
const teamRight = scoreBoardTeam + ".right";
var showBoost = false;
var players = [];
var currentPlayers = [];
var getValidId = function(playerId) {
    return "player_" + playerId.replace(/\s/g, "");
};


//Manager, for changing display infos
export const DisplayManager = {
    //remove player from scoreboard
    removePlayerInfo: function(player) {
        $("#" + player.id).remove();
        $("#" + player.id + "_boost").remove();
    },
    //setup html for the playerinfo
    appendPlayerInfoText: function($playerInfo, domClass, text, colspan) {
        if (colspan) {
            $playerInfo.append($("<td class='" + domClass + "' colspan='" + colspan + "'>")
                .text(text));
            return;
        }
        $playerInfo.append($("<td class='" + domClass + "'>")
            .text(text));
    },
    //setup html for the boost bar
    appendPlayerInfoBar: function($playerInfo, domClass) {
        $playerInfo.append($("<td class='" + domClass + "' colspan='5'>")
            .append($("<div class='container'>")
                .append($("<div class='progress progress-striped'>")
                    .append($("<div class='progress-bar'>")))));
    },
    //update values of a player
    updatePlayerInfo: function($playerInfo, player) {
        //update goals
        var $goals = $playerInfo.find(".goals");
        $goals.text("" + player.goals);

        //update assists
        var $assists = $playerInfo.find(".assists");
        $assists.text("" + player.assists);

        //update saves
        var $saves = $playerInfo.find(".saves");
        $saves.text("" + player.saves);

        //update shots
        var $shots = $playerInfo.find(".shots");
        $shots.text("" + player.shots);
    },

    //update boost of a player
    updatePlayerInfoBoost: function($playerInfoBoost, boostValue) {
        //update boost value
        var $boost = $playerInfoBoost.find(".boostValue");
        if (boostValue < $boost.text()) {
            updateBoostConsumption($playerInfoBoost.parent('.team-info-right').length, $boost.text() - boostValue);
        }
        $boost.text("" + boostValue);

        //update boost progress bar
        var $boost = $playerInfoBoost.find(".progress-striped .progress-bar");
        $boost.width(boostValue + "%");
    },

    //add player to a team
    addPlayerInfo: function(player) {
        var playerObject = currentPlayers.find(pl => pl.id == player.id);
        const isTeamBlue = player.team == 0;
        const exists = playerObject !== undefined;
        if (exists) {
            //get previous player row of DOM object
            var $playerInfo = $("#" + player.id);
            var $playerInfoBoost = $("#" + player.id + "_boost");
            //update if player already exists
            DisplayManager.updatePlayerInfo($playerInfo, player);
            DisplayManager.updatePlayerInfoBoost($playerInfoBoost, player.boost);
            return;
        }
        var teamTable = isTeamBlue ? constants.team.blue : constants.team.orange;
        //add new player row to DOM object
        var $teamTable = $("." + teamTable);
        $teamTable.append($("<tr id='" + player.id + "' class='player-row'>"));
        $teamTable.append($("<tr id='" + player.id + "_boost' class='player-boost'>"));
        //get the new player row DOM object
        var $playerInfo = $("#" + player.id);
        var $playerInfoBoost = $("#" + player.id + "_boost");

        //append infos of the new player
        DisplayManager.appendPlayerInfoText($playerInfo, constants.player.name, player.name, 2);
        DisplayManager.appendPlayerInfoText($playerInfo, constants.player.goals, player.goals)
        DisplayManager.appendPlayerInfoText($playerInfo, constants.player.assists, player.assists);
        DisplayManager.appendPlayerInfoText($playerInfo, constants.player.saves, player.saves);
        DisplayManager.appendPlayerInfoText($playerInfo, constants.player.shots, player.shots);
        DisplayManager.appendPlayerInfoText($playerInfoBoost, constants.player.boost, player.boost);
        DisplayManager.appendPlayerInfoBar($playerInfoBoost, "boostBar");

        //add player object
        const newPlayerObject = {
            id: player.id,
            team: isTeamBlue ? 'blue' : 'orange'
        }
        currentPlayers.push(newPlayerObject);
    },
    //load info of a player
    loadPlayerInfos: function(playersObject) {
        players = Object.keys(playersObject).map(function(k) {
            var player = playersObject[k];
            const isBot = player.primaryID == '0';
            player.id = isBot ? player.name : getValidId(player.primaryID);
            return player;
        });
        var removedPlayers = currentPlayers.filter((pl) => !players.some((newPl) => newPl.id == pl.id));
        removedPlayers.forEach(DisplayManager.removePlayerInfo);
        currentPlayers = currentPlayers.filter((pl) => players.some((newPl) => newPl.id == pl.id));
        for (let i = 0; i < players.length; i++) {
            DisplayManager.addPlayerInfo(players[i]);
        }
    },
    //update values at the top of the screen
    updateScoreBoard: function(teams) {
        var firstTeam = teams[0];
        var secondTeam = teams[1];

        $(teamLeft + " .teamname").text(firstTeam["name"]);
        $(teamRight + " .teamname").text(secondTeam["name"]);
    },
    //setup director
    updateTargetInfo: function(targetPlayer) {

        var $targetDisplay = $("#targetDisplay");
        var $boostTarget = $(".boostTarget");
        var $speedTarget = $(".speedTarget");

        if (targetPlayer == undefined || targetPlayer == null) {
            //if there is no target but there was one before -> remove infos
            if ($boostTarget.text().trim().length) {
                if (showBoost) {
                    showBoost = false;
                }
                //set watching player to none
                $targetDisplay.hide();
            }
            return;
        }

        //show boost overlay
        if (!showBoost) {
            showBoost = true;
            $targetDisplay.show();
        }
        $boostTarget.text(targetPlayer.boost);
        $speedTarget.text(targetPlayer.speed + " km/h");
    },
    updateMatchState: function(state) {
        matchRunning = state;
    },
    //handle postgame overlay
    toggleGameOverview: function(state) {
        if (state) {
            showGameStats(players, currentPlayers);
        } else {
            resetGameStats();
        }
    }
};