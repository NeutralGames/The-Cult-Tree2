addNode("reinc", {
    symbol: "R",
    row:0,
    position:0,
    layerShown() { return hasUpgrade('m',11) },
    branches: ['l'],
    tooltip() {return "Reincarnate"},
    canClick: true,
    startData() { return {
        skill: {
            mining:0,
            smithing:0, 
            persuasion:0, 
            deception:0,
            },
        }
    },
    onClick() {
        player.age = 6570
        player.reinc.skill.mining = Math.max(player.reinc.skill.mining,player.st.skill.mining.level)
        player.reinc.skill.smithing = Math.max(player.reinc.skill.smithing,player.st.skill.smithing.level)
        player.reinc.skill.persuasion = Math.max(player.reinc.skill.persuasion,player.st.skill.persuasion.level)
        player.reinc.skill.deception = Math.max(player.reinc.skill.deception,player.st.skill.deception.level)
        layerDataReset('l')
        layerDataReset('st')
        player.st.skill.mining.next = 100*(0.99**player.reinc.skill.mining)
        player.st.skill.smithing.next = 100*(0.99**player.reinc.skill.smithing)
        player.st.skill.persuasion.next = 100*(0.99**player.reinc.skill.persuasion)
        player.st.skill.deception.next = 100*(0.99**player.reinc.skill.deception)
    },
    
}
)