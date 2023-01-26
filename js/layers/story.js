addLayer("b", {
    name: "book",
    symbol: "b",
    row: "side",
    position: 1,
    startData() { return {
        unlocked: true,
    }},
    tooltip() {
      return "story"
    },
    color: "#59adf6",
    requires: new Decimal(0), // Can be a function that takes requirement increases into account
    resource: "",
    type: "none", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    layerShown() { return hasUpgrade('m',11) },
    tabFormat: [
        ["infobox","story"],
        ["row",["upgrade",11],["upgrade",11],["upgrade",11],["upgrade",11],["upgrade",11],["upgrade",11],]
    ],
    infoboxes: {
        story: {
            title: "Start",
            unlocked: true,
            body() { return ""+
                "The last thing you remember before the darkness: headlights."+
                "<br><br>"+
                "Then eternity passed."+
                "<br><br>Minutes faded to hours, days blended with weeks, months became endless years, eons passed in the nothing that remained. Drifting.. floating.. without sensation time "+
                "became nothing more than a memory. Blissful was the silence. And then the silence was broken.<br><br>"+
                `<b style="color:#ff6961">Awaken, child.</b><br><br>`+
                "Light pierces the darkness, agony floods your senses, and you find yourself in a room you know to be your own. The straw bed beneath you feels strange. "+
                "Somehow, it is both intimately familar, and completely foreign. The hearth in the corner of your hut still glows from the embers of the fire you lit the night before."+
                "The faint ring of the blacksmith's hammer marks the passage of time as your reality settles. With each strike a name echoes through your mind. With each echo your purpose "+
                "becomes more clear.<br><br>"+
                `<b style="color:#ff6961">Praise be to Yh'eormuhm</b>`
        
        },
        },
    },
})