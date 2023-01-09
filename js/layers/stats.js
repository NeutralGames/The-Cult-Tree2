addNode("z", {
    layerShown: "ghost",
    row: "side",
    position: 0,
}),
addNode("y", {
    layerShown: "ghost",
    row: "side",
    position: 2,
}),
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
    resource: "xp",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    layerShown() { return true },
    tabFormat: [
        "main-display",
        "blank",
        ["row",[["clickable",11],"blank",["display-text", function() { return 'STR: '+player.st.str },{ "color": "#ff6961", "font-size": "32px" }]]],
        "blank","blank",
        ["row",[["clickable",12],"blank",["display-text", function() { return 'DEX: '+player.st.dex },{ "color": "#59adf6", "font-size": "32px" }]]],
        "blank","blank",
        ["row",[["clickable",13],"blank",["display-text", function() { return 'CON: '+player.st.con },{ "color": "#f8f38d", "font-size": "32px" }]]],
        "blank","blank",
        ["row",[["clickable",14],"blank",["display-text", function() { return 'INT: '+player.st.int },{ "color": "#42d6a4", "font-size": "32px" }]]],
        "blank","blank",
        ["row",[["clickable",15],"blank",["display-text", function() { return 'WIS: '+player.st.wis },{ "color": "#ffb480", "font-size": "32px" }]]],
        "blank","blank",
        ["row",[["clickable",16],"blank",["display-text", function() { return 'CHA: '+player.st.cha },{ "color": "#c780e8", "font-size": "32px" }]]],
        "blank","blank",
    ],
    bars: {
        staBar: {
            direction: RIGHT,
            width: 200,
            height: 50,
            progress() { return player.st.sta.div(player.st.con) },
        },
    },
    componentStyles: {
        "clickable"() { return {'height':'45px','width':'45px','min-height':'45px','font-size':'32px'} },
    },
    clickables: {
        11: {
            display() {return "+"},
            canClick() {return player.st.points.gte(new Decimal(100).add(player.st.str.minus(10).mul(100)))},
            onClick() {
                player.st.points = player.st.points.minus(new Decimal(100).add(player.st.str.minus(10).mul(100)))
                player.st.str = player.st.str.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.points.gte(new Decimal(100).add(player.st.str.minus(10).mul(100)))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(100).add(player.st.str.minus(10).mul(100))+"xp"
            },
        },
        12: {
            display() {return "+"},
            canClick() {return player.st.points.gte(new Decimal(100).add(player.st.dex.minus(10).mul(100)))},
            onClick() {
                player.st.points = player.st.points.minus(new Decimal(100).add(player.st.dex.minus(10).mul(100)))
                player.st.dex = player.st.dex.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.points.gte(new Decimal(100).add(player.st.dex.minus(10).mul(100)))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(100).add(player.st.dex.minus(10).mul(100))+"xp"
            },
        },
        13: {
            display() {return "+"},
            canClick() {return player.st.points.gte(new Decimal(100).add(player.st.con.minus(10).mul(100)))},
            onClick() {
                player.st.points = player.st.points.minus(new Decimal(100).add(player.st.con.minus(10).mul(100)))
                player.st.con = player.st.con.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.points.gte(new Decimal(100).add(player.st.con.minus(10).mul(100)))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(100).add(player.st.con.minus(10).mul(100))+"xp"
            },
        },
        14: {
            display() {return "+"},
            canClick() {return player.st.points.gte(new Decimal(100).add(player.st.int.minus(10).mul(100)))},
            onClick() {
                player.st.points = player.st.points.minus(new Decimal(100).add(player.st.int.minus(10).mul(100)))
                player.st.int = player.st.int.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.points.gte(new Decimal(100).add(player.st.int.minus(10).mul(100)))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(100).add(player.st.int.minus(10).mul(100))+"xp"
            },
        },
        15: {
            display() {return "+"},
            canClick() {return player.st.points.gte(new Decimal(100).add(player.st.wis.minus(10).mul(100)))},
            onClick() {
                player.st.points = player.st.points.minus(new Decimal(100).add(player.st.wis.minus(10).mul(100)))
                player.st.wis = player.st.wis.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.points.gte(new Decimal(100).add(player.st.wis.minus(10).mul(100)))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(100).add(player.st.wis.minus(10).mul(100))+"xp"
            },
        },
        16: {
            display() {return "+"},
            canClick() {return player.st.points.gte(new Decimal(100).add(player.st.cha.minus(10).mul(100)))},
            onClick() {
                player.st.points = player.st.points.minus(new Decimal(100).add(player.st.cha.minus(10).mul(100)))
                player.st.cha = player.st.cha.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.points.gte(new Decimal(100).add(player.st.cha.minus(10).mul(100)))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(100).add(player.st.cha.minus(10).mul(100))+"xp"
            },
        },
    },
});