//Default Layer

//Layer Data, Features, Customization
addLayer("pro", {
    startData() { return {
        unlocked: true,
        points: new Decimal(869),
    }},
    layerShown() { return true },
    color: "#4BDC13",
    resource: "Money",
    symbol: "$",
    row: 100,
    position: 0,
    branches: [],
    deactivated: false,
    tooltip() {return "A deadend life with a deadend job"},
    tooltipLocked() {return "How did you break this? WTF?"},

//Hotkey setup
    hotkeys: [
        {
        key: "$",
        description: "$: reset for money",
        onPress() { if (player.pro.unlocked) doReset("pro") },
        unlocked() {return true}
        }],

//Layer Points Behavior
    baseResource: "points",
    baseAmount() { return player.points },
    requires: new Decimal(10),
    type: "normal",
    exponent: 0.5,

//Layer Points Gain Mults
    gainMult() {
        return new Decimal(1)
    },
    gainExp() {
        return new Decimal(1)
    },

//Display of the Tab
    tabFormat: [
        "main-display",
        "prestige-button",
        "blank",
    ],

//Upgrades Start
    upgrades: {
        
    },
})