addLayer("l", {
    name: "Life",
    symbol: "L",
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
        job:0,
        earn:0,
        drain:0,
        xp:0,
        rec:0,
        skill:"none",
        scale:0,
        gridy: 101,
        actions: 1,
    }},
    row: 0,
    position: 2,
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
                //["display-text", function() {return player.l.gridy}],
                ["display-text", function() {return `stamina`}],
                ["bar","staBar"],
                ["display-text", function() {if (player.l.rest) return `<b style="color: #ff6961">Exhausted:</b> Recovering Slowly`}],
                "blank",
                ["display-text", function() {return `schedule`}],
                ["row",[["gridable",101],["gridable",102],["gridable",103],["gridable",104],["gridable",105]]],
                ["row",[["gridable",106],["gridable",107],["gridable",108],["gridable",109],["gridable",110]]],
                ["row",[["gridable",111],["gridable",112],["gridable",113],["gridable",114],["gridable",115]]],
                ["row",[["gridable",116],["gridable",117],["gridable",118],["gridable",119],["gridable",120]]],
                //"blank",
                ["microtabs","life"],
            ]
        },
        "Guild": {
            unlocked: false,
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
                        return "Assigning: "+dis
                    }],
                    "blank",
                    "clickables",
                ]
            },
            home: {
                content: [
                    "blank",
                    ["row",[["upgrade",11],["upgrade",12],["upgrade",13],["upgrade",14],["upgrade",15]]],
                    "blank",
                    ["row",[["upgrade",21],["upgrade",22],["upgrade",23],["upgrade",24],["upgrade",25]]],
                ]
            },
            town: {
                content: [
                    "blank",
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
        cols: 21,
        maxrows: 1,
        maxcols: 21,
        getStartData(id) { return {
            job:0,
            earn:0,
            drain:0,
            xp:0,
            rec:0,
            skill:"none",
            scale:0,
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
                skill:player.l.skill,
                scale:player.l.scale,
            })
        },
        getDisplay(data, id) {
          if (data.job==0) return "<br>unassigned"
          let act = "<br>"
          if (player.l.gridy==id) act = "*<br>"
          return act+data.job
        },
        getUnlocked(id) {
          return id<=100+player.l.actions
        }
    },
    skipBS() {
        while (player.l.grid[player.l.gridy].job==0 && player.l.gridy<121) {
            player.l.gridy++
        }
        if (player.l.gridy>120) player.l.gridy = 101
    },
    doAction() {
        let id = player.l.gridy
        let earn = player.l.grid[id].earn
        let drain = player.l.grid[id].drain
        let xp = player.l.grid[id].xp
        let rec = player.l.grid[id].rec
        let test = player.l.grid[id].skill
        let scale = player.l.grid[id].scale
        let max = player.st.con.mul(2).minus(10)
        let skill = player.st.skill[player.l.grid[id].skill].level
        let endearn = earn+(skill*scale)
        let acttime = (new Decimal(1).div(Math.log10(player.st.dex)))
        if (1==1) acttime = acttime*(Math.max(1,(2**((player.age-18250)/3650))))

        if (player.l.resetTime>=acttime&&player.l.unlocked) {
            player.l.resetTime = 0
            if (!player.l.rest&&player.st.sta.minus(drain).gte(0)) {
                addPoints('l',endearn)
                console.log(endearn)
                player.st.xp = player.st.xp.add(xp)
                player.st.sta = player.st.sta.minus(drain)
                skillXP(test)
                if (player.st.sta.add(rec).gt(max)) player.st.sta = max
                if (player.st.sta.add(rec).lte(max)) player.st.sta = player.st.sta.add(rec)
                player.l.gridy++
                if (player.l.gridy>120) player.l.gridy = 101
            }
            if (!player.l.rest&&player.st.sta.minus(drain).lt(0)) { 
                player.st.sta = player.st.sta.minus(player.st.sta)
                player.l.rest = true 
            }
            if (player.l.rest) {
                if (player.st.sta.add(player.st.con.div(20)).gt(max)) player.st.sta = max
                if (player.st.sta.add(player.st.con.div(20)).lte(max)) player.st.sta = player.st.sta.add(player.st.con.div(20))
                if (player.st.sta.gte(max)) player.l.rest = false
            }
        }
    },
    clickables: {
        11: {
            title: "Clear",
            display() { 
                let a = "<br>click to assign"
                let b = "<br>"
                let c = "<br>"
                let d = "<br>"
                let e = "<br>"
                let f = "<br>"
                let g = "<br>"
                return a+b+c+d+e+f+g
            },
            onClick() { 
                player.l.job = 0
                player.l.earn = 0
                player.l.drain = 0
                player.l.xp = 0
                player.l.rec = 0,
                player.l.skill = "none"
                player.l.scale = 0
            },
            canClick() {
                return true
            },
            style() {
                if (player.l.job==0) return {'background-color':'green'}
            },
        },
        12: {
            title: "Odd Jobs",
            display() { 
                let a = "<br>click to assign"
                let b = "<br>+"+format(3)+" gold"
                let c = "<br>-1 stamina"
                let d = "<br>"
                let e = "<br>--"
                let f = "<br>req: --"
                let g = "<br>"
                return a+b+c+d+e+f+g
            },
            onClick() { 
                player.l.job = "Odd Jobs"
                player.l.earn = 3
                player.l.drain = 1
                player.l.xp = 0
                player.l.rec = 0
                player.l.skill = "none"
                player.l.scale = 0
            },
            canClick() {
                return true
            },
            style() {
                if (player.l.job=="Odd Jobs") return {'background-color':'green'}
            },
        },
        13: {
            title: "Beg",
            display() { 
                let a = "<br>click to assign"
                let b = "<br>+"+format(2+(player.st.skill.persuasion.level*0.25))+" gold"
                let c = "<br>-1 stamina"
                let d = "<br>"
                let e = "<br>+persuasion"
                let f = "<br>req: --"
                let g = "<br>"
                return a+b+c+d+e+f+g
            },
            onClick() { 
                player.l.job = "Beg"
                player.l.earn = 2
                player.l.drain = 1
                player.l.xp = 0
                player.l.rec = 0
                player.l.skill = "persuasion"
                player.l.scale = 0.25
            },
            canClick() {
                return player.st.str>=10&&player.st.con>=10
            },
            style() {
                if (player.l.job=="Beg") return {'background-color':'green'}
            },
        },
        31: {
            title: "Rest",
            unlocked() {return hasUpgrade('l',11)},
            display() { 
                let a = "<br>click to assign"
                let b = "<br>"
                let c = "<br>+2 stamina"
                let d = "<br>"
                let e = "<br>"
                let f = "<br>"
                return a+b+c+d+e+f
            },
            onClick() { 
                player.l.job = "Rest"
                player.l.earn = 0
                player.l.drain = 0
                player.l.xp = 0
                player.l.rec = 2
                player.l.skill = "none"
                player.l.scale = 0
            },
            canClick() {
                return true
            },
            style() {
                if (player.l.job=="Rest") return {'background-color':'green'}
            },
        },
    },
    upgrades: {
        11: {
            title: `new bed`,
            cost: new Decimal(100),
            description: `<br>unlocks the "rest" action`,
        },
        21: {
            title: `to-do list`,
            cost: new Decimal(10),
            description: `<br>unlocks an action slot`,
            onPurchase() {
                player.l.actions++
            }
        },
        22: {
            title: `planner`,
            cost: new Decimal(100),
            description: `<br>unlocks an action slot`,
            onPurchase() {
                player.l.actions++
            }
        },
        23: {
            title: `calendar`,
            cost: new Decimal(500),
            description: `<br>unlocks two action slots`,
            onPurchase() {
                player.l.actions++
                player.l.actions++
            }
        },
        24: {
            title: `gilded journal`,
            cost: new Decimal(2500),
            description: `<br>unlocks two action slots`,
            onPurchase() {
                player.l.actions++
                player.l.actions++
            }
        },
        25: {
            title: `chalk-board reminders`,
            cost: new Decimal(10000),
            description: `<br>unlocks three action slots<br><h6>why the fuck is this so expensive?</h6>`,
            onPurchase() {
                player.l.actions++
                player.l.actions++
                player.l.actions++
            }
        },
    },
})