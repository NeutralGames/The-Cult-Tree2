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
        none: new Decimal(10),
        xp: new Decimal(0),
        statpts: new Decimal(0),
        race: 0,
        races: ["Human","Orc","Halfling","Dwarf","Elf","Aasimar","Tiefling"],
        skill: {
            none:{level:0,progress:0,next:1,stat:"none"},
            mining:{level:0,progress:0,next:100,stat:"str"},
            smithing:{level:0,progress:0,next:100,stat:"str"}, 
            persuasion:{level:0,progress:0,next:100,stat:"cha"}, 
            deception:{level:0,progress:0,next:100,stat:"cha"},
        },
    }},
    tooltip() {
        let sp = `SP:${player.st.statpts}`
        let xp = `XP:${player.st.xp}`
        let str = `<b style="color: #ff6961">${player.st.str}</b>`
        let dex = `<b style="color: #59adf6">${player.st.dex}</b>`
        let con = `<b style="color: #f8f38d">${player.st.con}</b>`
        let int = `<b style="color: #42d6a4">${player.st.int}</b>`
        let wis = `<b style="color: #ffb480">${player.st.wis}</b>`
        let cha = `<b style="color: #c780e8">${player.st.cha}</b>`
        return sp+" "+xp+"<br>"+str+" "+dex+" "+con+" "+int+" "+wis+" "+cha
    },
    color: "#C0C0C0",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "lvl",
    baseResource: "xp",
    baseAmount() {return player.st.xp},
    type: "static", 
    roundUpCost: true,
    exponent: 0.3,
    resetsNothing() { return true },
    autoPrestige() { return true },
    layerShown() { return true },
    onPrestige() {
        player.st.statpts = player.st.statpts.add(1)
        player.st.xp = new Decimal(0)
    },
    tabFormat: [
        ["display-text", function() { return `RACE: `+player.st.races[player.st.race] },{ "font-size": "32px" }],
        ["display-text", function() { return `LEVEL: `+player.st.points },{ "font-size": "32px" }],
        ["display-text", function() { return `XP: `+format(player.st.xp)+` / `+format(tmp['st'].nextAt)},{ "font-size": "16px" }],
        ["display-text", function() { return `STAT PTS: `+player.st.statpts },{ "font-size": "16px" }],
        "blank","blank",
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
        ["display-text", function() { return `SKILLS` },{ "font-size": "32px" }],
        "h-line",
        ["display-text", function() { return `STR` },{  "color": "#ff6961","font-size": "24px" }],
        ["display-text", function() { return `Mining: ${player.st.skill.mining.level}<br><h6>Progress: ${format(player.st.skill.mining.progress)}/${format(player.st.skill.mining.next)}<br>Best: ${player.reinc.skill.mining}</h6>` }],"blank",
        ["display-text", function() { return `Smithing: ${player.st.skill.smithing.level}<br><h6>Progress: ${format(player.st.skill.smithing.progress)}/${format(player.st.skill.smithing.next)}<br>Best: ${player.reinc.skill.smithing}</h6>` }],"blank",
        "h-line",
        ["display-text", function() { return `DEX` },{ "color": "#59adf6","font-size": "24px" }],
        "h-line",
        ["display-text", function() { return `CON` },{ "color": "#f8f38d","font-size": "24px" }],
        "h-line",
        ["display-text", function() { return `INT` },{ "color": "#42d6a4","font-size": "24px" }],
        "h-line",
        ["display-text", function() { return `WIS` },{ "color": "#ffb480","font-size": "24px" }],
        "h-line",
        ["display-text", function() { return `CHA` },{ "color": "#c780e8","font-size": "24px" }],
        ["display-text", function() { return `Persuasion: ${player.st.skill.persuasion.level}<br><h6>Progress: ${format(player.st.skill.persuasion.progress)}/${format(player.st.skill.persuasion.next)}<br>Best: ${player.reinc.skill.persuasion}</h6>` }],"blank",
        ["display-text", function() { return `Deception: ${player.st.skill.deception.level}<br><h6>Progress: ${format(player.st.skill.deception.progress)}/${format(player.st.skill.deception.next)}<br>Best: ${player.reinc.skill.deception}</h6>` }],"blank",
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
        "clickable"() { return {'height':'32px','width':'32px','min-height':'32px','font-size':'24px'} },
    },
    clickables: {
        11: {
            display() {return "+"},
            canClick() {return player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.str.minus(10).div(5))))},
            onClick() {
                player.st.statpts = player.st.statpts.minus(new Decimal(1).add(Math.floor(player.st.str.minus(10).div(5))))
                player.st.str = player.st.str.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.str.minus(10).div(5))))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(1).add(Math.floor(player.st.str.minus(10).div(5)))+" sp"
            },
        },
        12: {
            display() {return "+"},
            canClick() {return player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.dex.minus(10).div(5))))},
            onClick() {
                player.st.statpts = player.st.statpts.minus(new Decimal(1).add(Math.floor(player.st.dex.minus(10).div(5))))
                player.st.dex = player.st.dex.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.dex.minus(10).div(5))))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(1).add(Math.floor(player.st.dex.minus(10).div(5)))+" sp"
            },
        },
        13: {
            display() {return "+"},
            canClick() {return player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.con.minus(10).div(5))))},
            onClick() {
                player.st.statpts = player.st.statpts.minus(new Decimal(1).add(Math.floor(player.st.con.minus(10).div(5))))
                player.st.con = player.st.con.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.con.minus(10).div(5))))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(1).add(Math.floor(player.st.con.minus(10).div(5)))+" sp"
            },
        },
        14: {
            display() {return "+"},
            canClick() {return player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.int.minus(10).div(5))))},
            onClick() {
                player.st.statpts = player.st.statpts.minus(new Decimal(1).add(Math.floor(player.st.int.minus(10).div(5))))
                player.st.int = player.st.int.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.int.minus(10).div(5))))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(1).add(Math.floor(player.st.int.minus(10).div(5)))+" sp"
            },
        },
        15: {
            display() {return "+"},
            canClick() {return player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.wis.minus(10).div(5))))},
            onClick() {
                player.st.statpts = player.st.statpts.minus(new Decimal(1).add(Math.floor(player.st.wis.minus(10).div(5))))
                player.st.wis = player.st.wis.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.wis.minus(10).div(5))))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(1).add(Math.floor(player.st.wis.minus(10).div(5)))+" sp"
            },
        },
        16: {
            display() {return "+"},
            canClick() {return player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.cha.minus(10).div(5))))},
            onClick() {
                player.st.statpts = player.st.statpts.minus(new Decimal(1).add(Math.floor(player.st.cha.minus(10).div(5))))
                player.st.cha = player.st.cha.add(1)
            },
            style() {
                dis = {'background-color':'gray'}
                if (player.st.statpts.gte(new Decimal(1).add(Math.floor(player.st.cha.minus(10).div(5))))) dis = {'background-color': 'green'}
                return dis },
            tooltip() {
                return "Req: "+new Decimal(1).add(Math.floor(player.st.cha.minus(10).div(5)))+" sp"
            },
        },
    },
});