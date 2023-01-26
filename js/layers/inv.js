addLayer("inv", {
    name: "Inventory",
    symbol: "inv",
    row: "side",
    position: 4,
    startData() { return {
        unlocked: true,
        mining: {ore:(new Decimal(0)),ingot:(new Decimal(0))},
        leather: {pelt:(new Decimal(0)),leather:(new Decimal(0))},
        theft: {trinket:(new Decimal(0)),relic:(new Decimal(0))}
        }
    },
    tooltip() {
        return "inventory"
    },
    color: "#C0C0C0",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "lvl",
    baseResource: "xp",
    baseAmount() {return 0},
    type: "none", 
    tabFormat: [
        ["display-text", function() { return `mining` },{ "font-size": "32px" }],
        ["display-text", function() { return `ore: ${player.inv.mining.ore}` }],
        ["display-text", function() { return `ingot: ${player.inv.mining.ingot}` }],
        "blank",
        "blank",
        ["display-text", function() { return `leather` },{ "font-size": "32px" }],
        ["display-text", function() { return `pelt: ${player.inv.leather.pelt}` }],
        ["display-text", function() { return `leather: ${player.inv.leather.leather}` }],
        "blank",
        "blank",
        ["display-text", function() { return `theft` },{ "font-size": "32px" }],
        ["display-text", function() { return `trinket: ${player.inv.theft.trinket}` }],
        ["display-text", function() { return `relic: ${player.inv.theft.relic}` }],
        "blank",
        "blank",
    ],
})