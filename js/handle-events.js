const constants = {
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
const scoreBoardTeam = ".scorebug .team";
const teamLeft = scoreBoardTeam + ".left";
const teamRight = scoreBoardTeam + ".right";
var matchRunning = true;
var showBoost = false;
var currentPlayers = [];
var getValidId = function(playerId) {
    return "player_" + playerId.replace(/\s/g, "");
};

const WsSubscribers = {
    __subscribers: {},
    websocket: undefined,
    webSocketConnected: false,
    registerQueue: [],
    init: function(port, debug, debugFilters) {
        port = port || 49322;
        debug = debug || false;
        if (debug) {
            if (debugFilters !== undefined) {
                console.warn("WebSocket Debug Mode enabled with filtering. Only events not in the filter list will be dumped");
            } else {
                console.warn("WebSocket Debug Mode enabled without filters applied. All events will be dumped to console");
                console.warn("To use filters, pass in an array of 'channel:event' strings to the second parameter of the init function");
            }
        }
        WsSubscribers.webSocket = new WebSocket("ws://localhost:" + port);
        WsSubscribers.webSocket.onmessage = function(event) {
            let jEvent = JSON.parse(event.data);
            if (!jEvent.hasOwnProperty('event')) {
                return;
            }
            let eventSplit = jEvent.event.split(':');
            let channel = eventSplit[0];
            let event_event = eventSplit[1];
            WsSubscribers.triggerSubscribers(channel, event_event, jEvent.data);
        };
        WsSubscribers.webSocket.onopen = function() {
            WsSubscribers.triggerSubscribers("ws", "open");
            WsSubscribers.webSocketConnected = true;
            WsSubscribers.registerQueue.forEach((r) => {
                WsSubscribers.send("wsRelay", "register", r);
            });
            WsSubscribers.registerQueue = [];
        };
        WsSubscribers.webSocket.onerror = function() {
            WsSubscribers.triggerSubscribers("ws", "error");
            WsSubscribers.webSocketConnected = false;
        };
        WsSubscribers.webSocket.onclose = function() {
            WsSubscribers.triggerSubscribers("ws", "close");
            WsSubscribers.webSocketConnected = false;
        };
    },
    /**
     * Add callbacks for when certain events are thrown
     * Execution is guaranteed to be in First In First Out order
     * @param channels
     * @param events
     * @param callback
     */
    subscribe: function(channels, events, callback) {
        if (typeof channels === "string") {
            let channel = channels;
            channels = [];
            channels.push(channel);
        }
        if (typeof events === "string") {
            let event = events;
            events = [];
            events.push(event);
        }
        channels.forEach(function(c) {
            events.forEach(function(e) {
                if (!WsSubscribers.__subscribers.hasOwnProperty(c)) {
                    WsSubscribers.__subscribers[c] = {};
                }
                if (!WsSubscribers.__subscribers[c].hasOwnProperty(e)) {
                    WsSubscribers.__subscribers[c][e] = [];
                    if (WsSubscribers.webSocketConnected) {
                        WsSubscribers.send("wsRelay", "register", `${c}:${e}`);
                    } else {
                        WsSubscribers.registerQueue.push(`${c}:${e}`);
                    }
                }
                WsSubscribers.__subscribers[c][e].push(callback);
            });
        })
    },
    clearEventCallbacks: function(channel, event) {
        if (WsSubscribers.__subscribers.hasOwnProperty(channel) && WsSubscribers.__subscribers[channel].hasOwnProperty(event)) {
            WsSubscribers.__subscribers[channel] = {};
        }
    },
    triggerSubscribers: function(channel, event, data) {
        if (WsSubscribers.__subscribers.hasOwnProperty(channel) && WsSubscribers.__subscribers[channel].hasOwnProperty(event)) {
            WsSubscribers.__subscribers[channel][event].forEach(function(callback) {
                if (callback instanceof Function) {
                    callback(data);
                }
            });
        }
    },
    send: function(channel, event, data) {
        if (typeof channel !== 'string') {
            console.error("Channel must be a string");
            return;
        }
        if (typeof event !== 'string') {
            console.error("Event must be a string");
            return;
        }
        if (channel === 'local') {
            this.triggerSubscribers(channel, event, data);
        } else {
            let cEvent = channel + ":" + event;
            WsSubscribers.webSocket.send(JSON.stringify({
                'event': cEvent,
                'data': data
            }));
        }
    }
};

//Manager, for changing display infos
const DisplayManager = {
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
        var players = Object.keys(playersObject).map(function(k) {
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

        $(teamLeft + " .name").text(firstTeam["name"]);
        $(teamRight + " .name").text(secondTeam["name"]);
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

        if (!showBoost) {
            showBoost = true;
            $targetDisplay.show();
        }
        $boostTarget.text(targetPlayer.boost);
        $speedTarget.text(targetPlayer.speed + " km/h");
    }
};

//socket event handling
$(() => {
    WsSubscribers.init(49322, true);

    //event: match destroyed
    WsSubscribers.subscribe("game", "match_destroyed", (d) => {
        matchRunning = true;
        $(document.body).show();
    });

    //event: match ended
    WsSubscribers.subscribe("game", "match_ended", (d) => {
        matchRunning = false;
        $("." + constants.team.blue).empty();
        $("." + constants.team.orange).empty();
        DisplayManager.updateTargetInfo();
        $(document.body).hide();
    });

    //event: replay startet
    WsSubscribers.subscribe("game", "replay_start", (d) => {
        matchRunning = false;
        DisplayManager.updateTargetInfo();
    });

    //event: replay ended
    WsSubscribers.subscribe("game", "replay_end", (d) => {
        matchRunning = true;
    });

    //event: contionous update
    WsSubscribers.subscribe("game", "update_state", (d) => {
        if (!matchRunning) {
            return;
        }
        var target = d["game"].target;
        var players = d["game"].hasTarget ? Object.keys(d["players"]).map(k => d["players"][k]) : null;
        var targetPlayer = players != null ? players.find(player => player.id == target) : null;
        DisplayManager.updateTargetInfo(targetPlayer);
        DisplayManager.updateScoreBoard(d["game"]["teams"]);
        DisplayManager.loadPlayerInfos(d["players"]);
    });
});