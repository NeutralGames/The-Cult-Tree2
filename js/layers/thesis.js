addLayer("t", {
    name: "Thesis", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        upgrades: [00],
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "theses", // Name of prestige currency
    resourcesingular: "thesis",
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    hotkeys: [
        {key: "t", description: "t: reset for thesis", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('m',11)},
    tabFormat: [
        "main-display",
        "prestige-button",
        ["infobox", "thesis"],
        ["microtabs", "cult"],      
    ],
    infoboxes: {
        thesis: {
            title: "thesis",
            body() { return "thesis" },
        },
    },
    microtabs: {
        cult: {
            upg: {
                content: [
                    "blank",
                    ["upgrade-tree",[
                        [00,00,11,00,01],
                        [00,21,22,23,00],
                        [00,31,32,00,00],
                        [00,00,00,00,00],
                        [00,00,00,00,00],
                        [00,00,00,00,00],
                        [00,00,00,00,00],
                        [00,00,00,00,00],
                        [00,00,00,00,00],
                        [00,00,00,00,00],
                        [00,00,00,00,00],
                    ]],
                    
                ]
            },
        },
    },
    upgrades: {
        00: {
            fullDisplay: " ",
            style() {return{
                "background-color":"transparent",
                "border":"none"
            }},
        },
        01: {
            fullDisplay() {
                let dis = " "
                if (hasUpgrade('t',01)) dis = "Not So Secret Huh?<br>+1% Faith Gain"
                return dis
            },
            effect() {return new Decimal(1.01)},
            style() {
                let sty = {
                "background-color":"transparent",
                "border":"none"}
                if (hasUpgrade('t',01)) sty = " "
                return sty
            },
            branches() {
                let bra = []
                if (hasUpgrade('t',01)) bra = [11]
                return bra
            },
        },
        11: {
            title: "11",
            branches: [21,22,23],
            cost: new Decimal(1),
            description() {
            let a = "Increase faith gain<br>"
            let b = "by 10% per upgrade<br>"
            let c = "(linear)<br>"
            let d = "<br>"
            let e = "Currently: "+format(upgradeEffect(this.layer,this.id))+"x"
            return "<br>"+a+b+c+d+e },
            effect() {
                let eff = new Decimal(player.t.upgrades.length-1)
                eff = eff.div(10)
                eff = eff.add(1)
                return eff
            },
            
        },
        21: {
            title: "21",
            cost: new Decimal(3),
            description() {
                let a = "Increase Faith Gain<br>"
                let b = "by 1% per second<br>"
                let c = "(linear)/(resets)<br>"
                let d = "<br>"
                let e = "Currently: "+format((player.t.resetTime/100)+1)+"x"
                return "<br>"+a+b+c+d+e },
            branches: [11,31],
            canAfford() {return hasUpgrade('t',11)},
            effect() {
                return new Decimal((player.t.resetTime/100)+1)
            },
        },
        22: {
            title: "22",
            cost: new Decimal(3),
            description() {
                let a = "a<br>"
                let b = "b<br>"
                let c = "c<br>"
                let d = "d<br>"
                let e = "e"
                return "<br>"+a+b+c+d+e },
            branches: [11,32],
            canAfford() {return hasUpgrade('t',11)},
        },
        23: {
            title: "23",
            cost: new Decimal(5),
            description() {
                let a = "a<br>"
                let b = "b<br>"
                let c = "c<br>"
                let d = "d<br>"
                let e = "e"
                return "<br>"+a+b+c+d+e },
            branches: [11],
            canAfford() {return hasUpgrade('t',11)},
        },
        31: {
            title: "31",
            cost: new Decimal(10),
            description() {
                let a = "a<br>"
                let b = "b<br>"
                let c = "c<br>"
                let d = "d<br>"
                let e = "e"
                return "<br>"+a+b+c+d+e },
            branches: [21],
            canAfford() {return hasUpgrade('t',21)},
        },
        32: {
            title: "32",
            cost: new Decimal(10),
            description() {
                let a = "a<br>"
                let b = "b<br>"
                let c = "c<br>"
                let d = "d<br>"
                let e = "e"
                return "<br>"+a+b+c+d+e },
            branches: [22],
            canAfford() {return hasUpgrade('t',22)},
        },
    },
})