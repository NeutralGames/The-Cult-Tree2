addLayer("c", {
    name: "Cult", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "c", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    row: 0,
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        upgrades: [00],
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "members", // Name of prestige currency
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
        {key: "c", description: "c: reset for members", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return hasUpgrade('m',11)},
    tabFormat: [
        "main-display",
        "prestige-button",
        ["infobox", "cult"],
        ["microtabs", "cult"],      
    ],
    infoboxes: {
        cult: {
            title: "cult",
            body() { return "bar" },
        },
    },
    microtabs: {
        cult: {
            upg: {
                content: [
                    "blank",
                    ["upgrade-tree",[
                        [00,00,11,00,01],
                        [00,21,22,23],
                        [00,31,32,00],
                        [00,00,00,00],
                        [00,00,00,00],
                        [00,00,00,00],
                        [00,00,00,00],
                        [00,00,00,00],
                        [00,00,00,00],
                        [00,00,00,00],
                        [00,00,00,00],
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
                if (hasUpgrade('c',01)) dis = "Not So Secret Huh?<br>+1% Faith Gain"
                return dis
            },
            style() {
                let sty = {
                "background-color":"transparent",
                "border":"none"}
                if (hasUpgrade('c',01)) sty = " "
                return sty
            },
            branches() {
                let bra = []
                if (hasUpgrade('c',01)) bra = [11]
                return bra
            },
        },
        11: {
            description: "11",
            branches: [21,22,23],
            cost: new Decimal(1),
        },
        21: {
            description: "21",
            branches: [11,31],
            cost: new Decimal(1),
            canAfford() {return hasUpgrade('c',11)},
        },
        22: {
            description: "22",
            branches: [11,32],
            cost: new Decimal(1),
            canAfford() {return hasUpgrade('c',11)},
        },
        23: {
            description: "23",
            branches: [11],
            cost: new Decimal(1),
            canAfford() {return hasUpgrade('c',11)},
        },
        31: {
            description: "31",
            branches: [21],
            cost: new Decimal(1),
            canAfford() {return hasUpgrade('c',21)},
        },
        32: {
            description: "32",
            branches: [22],
            cost: new Decimal(1),
            canAfford() {return hasUpgrade('c',22)},
        },
    },
})