addNode("stop", {
    row: "side",
    position: 0,
    symbol: "⏸",
    layerShown: true,
    unlocked: false,
    canClick() {return player.stop.unlocked},
    onClick() {return player.pause = !player.pause},
    tooltip() {return "Pause/Unpause"},
    tooltipLocked() {return "Come Back Later"},
    nodeStyle() {
        if (player.pause) return {'color':'red'}
    }
}, 
)
