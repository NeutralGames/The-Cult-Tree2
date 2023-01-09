addNode("qyz", {
    layerShown: "ghost",
    row: "side",
    position: 0,
}, 
)
addLayer("st", {
    name: "Stats",
    symbol: "st",
    row: "side",
    position: 1,
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
        str: new Decimal(10),
        dex: new Decimal(10),
        con: new Decimal(10),
        int: new Decimal(10),
        wis: new Decimal(10),
        cha: new Decimal(10),
        sta: new Decimal(10),
    }},
    tooltip() {
      let str = `<b style="color: #ff6961">${player.st.str}</b>`
      let dex = `<b style="color: #59adf6">${player.st.dex}</b>`
      let con = `<b style="color: #f8f38d">${player.st.con}</b>`
      let int = `<b style="color: #42d6a4">${player.st.int}</b>`
      let wis = `<b style="color: #ffb480">${player.st.wis}</b>`
      let cha = `<b style="color: #c780e8">${player.st.cha}</b>`
      return str+" "+dex+" "+con+" "+int+" "+wis+" "+cha
    },
    color: "#a06060",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    layerShown() { return true },
    tabFormat: [
        "blank",
        ["display-text", function() { return 'STR: '+player.st.str },{ "color": "#ff6961", "font-size": "32px" }],
        "blank",
        ["display-text", function() { return 'DEX: '+player.st.dex },{ "color": "#59adf6", "font-size": "32px" }],
        "blank",
        ["display-text", function() { return 'CON: '+player.st.con },{ "color": "#f8f38d", "font-size": "32px" }],
        "blank",
        ["display-text", function() { return 'INT: '+player.st.int },{ "color": "#42d6a4", "font-size": "32px" }],
        "blank",
        ["display-text", function() { return 'WIS: '+player.st.wis },{ "color": "#ffb480", "font-size": "32px" }],
        "blank",
        ["display-text", function() { return 'CHA: '+player.st.cha },{ "color": "#c780e8", "font-size": "32px" }],
        "blank",
    ],
    bars: {
        staBar: {
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() { return player.st.sta.div(player.st.con) },
        },
    }
});