addLayer("b", {
    name: "book",
    symbol: "📖",
    row: "side",
    position: 2,
    startData() { return {
        unlocked: false,
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
                "The last thing you remember:"+ 
                `<br><br><b style="color:gold">twin points of blinding light.</b>`+
                "<br><br>It was only a moment. A flash of agony. A sudden jolt as gravity leapt sideways. "+
                "As quick as it came, it left, leaving a profound nothingness in its wake. Bliss was found in the silence.."+
                "<br><br>Minutes became hours, days blended into weeks, months became endless years, eons passed in the nothing that remained. Drifting.. floating.. without sensation."+
                "<br><br>And then the silence was broken.<br><br>"+
                `<b style="color:#ff6961">Awaken child</b><br><br>`+
                "Light pierces the darkness, warmth floods your senses, and you find yourself in a dingy room lit by the embers still burning in the hearth opposite you from the fire you lit last night. "+ 
                "The memory of which clashes violently in your mind. "+
                "Like The straw bed beneath you, it is both intimately familar and completely foreign. "+
                "As you come to know them to be your own, the concept of a world full of dispair ebbs, and in flows a sense of belonging. "+
                "The faint ring of the blacksmith's hammer marks the passage of time as your reality settles. With each strike a name echoes through your mind. With each echo your purpose "+
                "becomes more clear. All must know, all must be told.<br><br>"+
                `<b style="color:#ff6961">Praise be to Yh'eormuhm</b>`
        
        },
        },
    },
})