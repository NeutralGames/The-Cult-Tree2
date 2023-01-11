addLayer("l", {
    name: "Life",
    symbol: "L",
    startData() { return {
        unlocked: true,
		points: new Decimal(50),
        salary: [0,3],
        drain: [0,1],
        xp: [0,1],
        job: 0,
        hired: false,
        clickables: {[11]: "Quit"},
        gridy: 101,
    }},
    row: 0,
    position: 1,
    color: "#E5C100",
    requires: new Decimal(10),
    resource: "Gold",
    baseResource: "none",
    baseAmount() {return null},
    type: "none",
    exponent: 0,
    layerShown(){
        sho = false
        if (hasUpgrade('m',11)) sho = true
        return sho
    },
    tabFormat: {
        "Life": {
            content: [
                "main-display",
                ["display-text", function() {
                    let str = `<b style="color: #ff6961">${player.st.str}</b>`
                    let dex = `<b style="color: #59adf6">${player.st.dex}</b>`
                    let con = `<b style="color: #f8f38d">${player.st.con}</b>`
                    let int = `<b style="color: #42d6a4">${player.st.int}</b>`
                    let wis = `<b style="color: #ffb480">${player.st.wis}</b>`
                    let cha = `<b style="color: #c780e8">${player.st.cha}</b>`
                    return `STATS: `+str+" "+dex+" "+con+" "+int+" "+wis+" "+cha }],
                "blank",
                ["display-text", function() {return player.l.gridy}],
                ["bar","staBar"],
                "grid",
                "blank",
                ["microtabs","life"],
            ]
        },
        "Guild": {
            content: [
                "main-display",
                ["display-text", function() {
                    let str = `<b style="color: #ff6961">${player.st.str}</b>`
                    let dex = `<b style="color: #59adf6">${player.st.dex}</b>`
                    let con = `<b style="color: #f8f38d">${player.st.con}</b>`
                    let int = `<b style="color: #42d6a4">${player.st.int}</b>`
                    let wis = `<b style="color: #ffb480">${player.st.wis}</b>`
                    let cha = `<b style="color: #c780e8">${player.st.cha}</b>`
                    return `STATS: `+str+" "+dex+" "+con+" "+int+" "+wis+" "+cha }],
                "blank",
            ],
        },
    },
    microtabs: {
        life: {
            work: {
                content: [
                    "blank",
                    ["clickable",11],
                ]
            },
        },
    },
    bars: {
        staBar: {
            direction: RIGHT,
            width: 200,
            height: 25,
            fillStyle: {'background-color' : "#f8f38d"},
            baseStyle: {'background-color' : "#696969"},
            textStyle: {'color': '#04e050'},
            progress() { return player.st.sta.div(player.st.con.mul(2).minus(10)) },
            display() { return Math.round(player.st.sta)+" / "+player.st.con.mul(2).minus(10)},
        },
    },
    grid: {
        rows: 1,
        cols: 10,
        getStartData(id) {
          return 100
        },
        getCanClick(data, id) {
          return false
        },
        onClick(data, id) {

        },
        getDisplay(data, id) {
          return data
        },
        getUnlocked(id) {
          return true
        }
    },
    clickables: {
        11: {
            title: "Stable Hand",
            display() { 
                let data = getClickableState(this.layer, this.id)
                let sal = '<br>'+format(player.l.salary[1])+' gold/tick'
                return "click to " + data + sal
            },
            onClick() { 
                switch(getClickableState(this.layer, this.id)){
                    case "Work":
                        player.l.hired = true
                        player.l.job = 1
                        player[this.layer].clickables[this.id] = "Quit"
                        break;
                    case "Quit":
                        player.l.hired = false
                        player.l.job = 0
                        player[this.layer].clickables[this.id] = "Work"
                        break;                
            }},
            canClick() {
                switch(getClickableState(this.layer, this.id)){
                    case "Work":
                        return !player.l.hired
                    case "Quit":
                        return true
            }},
            style() {
                switch(getClickableState(this.layer, this.id)){
                    case "Work":
                        let dis = {'background-color': 'red'}
                        if (player.l.hired) dis = {'background-color':'gray'}
                        return dis
                    case "Quit":
                        return {'background-color': 'green'}
            }},
        },
    },
})
setInterval(function() {
    let id = player.l.gridy
    let earn = player.l.grid[id].earn
    let drain = player.l.grid[id].drain
    let xp = player.l.grid[id].xp
    let max = player.st.con.mul(2).minus(10)
    let rec = max.div(10)

    if (!player.l.rest&&player.st.sta.minus(drain).gte(0)) {
        addPoints('l',earn)
        player.st.xp = player.st.xp.add(xp)
        player.st.sta = player.st.sta.minus(drain)
        player.l.gridy = player.l.gridy+1
        
    }
    else { player.l.rest = true }
    if (player.l.rest) {
        if (player.st.sta.add(rec).gt(max)) player.st.sta = max
        if (player.st.sta.add(rec).lte(max)) player.st.sta = player.st.sta.add(rec)
    }
    if (player.st.sta.gte(max)) {
        player.l.rest = false
    }
    if (player.l.gridy>=111) player.l.gridy = 101

},1000)

/*setInterval(function() {
    let drain = player.l.drain[player.l.job]
    
    let earn = player.l.salary[player.l.job]

    let exp = player.l.xp[player.l.job]
    
    let max = player.st.con.mul(2).minus(10)

    let rec = max.div(10)

    if (!player.l.hired) player.l.working = false
    if (player.st.sta.minus(drain).lt(0)) player.l.working = false
    if (player.l.hired) {
        if (player.st.sta.gte(max)) player.l.working = true
    }
    if (player.l.working&&player.st.sta.minus(drain).gte(0)) {
        addPoints('l',earn)
        player.st.xp = player.st.xp.add(exp)
        player.st.sta = player.st.sta.minus(drain)
    }
    if (player.l.working==false&&player.st.sta.lt(max)) {
        if (player.st.sta.add(rec).gt(max)) player.st.sta = max
        if (player.st.sta.add(rec).lte(max)) player.st.sta = player.st.sta.add(rec)
    }
}, 1000)*/