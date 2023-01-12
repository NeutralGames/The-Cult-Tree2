addLayer("l", {
    name: "Life",
    symbol: "L",
    startData() { return {
        unlocked: true,
		points: new Decimal(50),
        job: 0,
        earn: 0,
        drain: 0,
        xp: 0,
        rec: 0,
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
                ["display-text", function() {if (player.l.rest) return `<b style="color: #ff6961">Exhausted:</b> Recovering Slowly`}],
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
                    ["display-text", function() {
                        dis = player.l.job
                        if (player.l.job==0) dis = "Clearing"
                        return "Currently: "+dis
                    }],
                    "blank",
                    "clickables",
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
            display() { return Math.floor(player.st.sta)+" / "+player.st.con.mul(2).minus(10)},
        },
    },
    grid: {
        rows: 1,
        cols: 10,
        maxrows: 1,
        maxcols: 10,
        getStartData(id) { return {
            job:0,
            earn:0,
            drain:0,
            xp:0,
            rec:0,
        }},
        getCanClick(data, id) {
          return true
        },
        onClick(data, id) {
            setGridData(this.layer,id,{
                job:player.l.job,
                earn:player.l.earn,
                drain:player.l.drain,
                xp:player.l.xp,
                rec:player.l.rec,
            })
        },
        getDisplay(data, id) {
          if (data.job==0) return "<br>unassigned"
          let act = "<br>"
          if (player.l.gridy==id) act = "*<br>"
          return act+data.job
        },
        getUnlocked(id) {
          return true
        }
    },
    skipBS() {
        while (player.l.grid[player.l.gridy].job==0&&player.l.gridy<111) player.l.gridy++
        if (player.l.gridy>110) player.l.gridy = 101
    },
    doAction() {
        let id = player.l.gridy
        
        let earn = player.l.grid[id].earn
        if (earn == undefined) earn = 0
    
        let drain = player.l.grid[id].drain
        if (drain == undefined) drain = 0
    
        let xp = player.l.grid[id].xp
        if (xp == undefined) xp = 0
    
        let rec = player.l.grid[id].rec
        if (rec == undefined) rec = 0
    
        let max = player.st.con.mul(2).minus(10)
        
        if (player.l.resetTime>=1) {
            player.l.resetTime = 0
            console.log("reset time")
            if (!player.l.rest&&player.st.sta.minus(drain).gte(0)) {
                addPoints('l',earn)
                player.st.xp = player.st.xp.add(xp)
                player.st.sta = player.st.sta.minus(drain)
                if (player.st.sta.add(rec).gt(max)) player.st.sta = max
                if (player.st.sta.add(rec).lte(max)) player.st.sta = player.st.sta.add(rec)
                player.l.gridy++
                console.log("did action "+id)
                console.log("earn: "+earn)
                console.log("drain: "+drain)
                console.log("xp: "+xp)
                console.log("rec: "+rec)
            }
            if (!player.l.rest&&player.st.sta.minus(drain).lt(0)) { 
                player.st.sta = player.st.sta.minus(player.st.sta)
                player.l.rest = true 
                console.log("got exhausted")
            }
            if (player.l.rest) {
                if (player.st.sta.add(player.st.con.div(20)).gt(max)) player.st.sta = max
                if (player.st.sta.add(player.st.con.div(20)).lte(max)) player.st.sta = player.st.sta.add(player.st.con.div(20))
                console.log("exhausted sta gain")
                if (player.st.sta.gte(max)) { player.l.rest = false
                console.log("finished exhaustion")
                }
            }
            
        }
    },
    clickables: {
        11: {
            title: "Clear",
            display() { 
                let a = "click to assign<br>"
                return a
            },
            onClick() { 
                player.l.job = 0
            },
            canClick() {
                return true
            },
            style() {
                
            },
        },
        12: {
            title: "Stable Hand",
            display() { 
                let a = "click to assign<br>"
                let b = "Gold: 3<br>"
                let c = "Stam: -1<br>"
                let d = "Xp: 1<br>"
                return a+b+c+d
            },
            onClick() { 
                player.l.job = "Stable Hand"
                player.l.earn = 3
                player.l.drain = 1
                player.l.xp = 1
                player.l.rec = 0
            },
            canClick() {
                return true
            },
            style() {
                
            },
        },
        31: {
            title: "Rest",
            display() { 
                let a = "click to assign<br>"
                let b = "gain 2 sta"
                return a+b
            },
            onClick() { 
                player.l.job = "Rest"
                player.l.earn = 0
                player.l.drain = 0
                player.l.xp = 0
                player.l.rec = 2
            },
            canClick() {
                return true
            },
            style() {
                
            },
        },
    },
})