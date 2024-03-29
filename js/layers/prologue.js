addLayer("m", {
    name: "Money",
    symbol: "$",
    startData() { return {
        unlocked: true,
        deactivated: false,
		points: new Decimal(300),
        working: false,
        hired: false,
        job: 0,
        salary: [0,8,12],
        promotions: [0,0,0],
        progress: [0,0,0],
        drain: new Decimal(0),
        max: new Decimal(10),
        stamina: new Decimal(10),
        depression: 0,
        happiness: 100,
        clickables: {[11]: "Apply",[12]: "Apply",[21]:"Off"}
    }},
    row: 20,
    position: 1,
    color: "#4BDC13",
    requires: new Decimal(10),
    resource: "Dollars",
    baseResource: "none",
    baseAmount() {return null},
    type: "none",
    exponent: 0,
    gainMult() { 
        mult = new Decimal(1)
        return mult
    },
    gainExp() { 
        return new Decimal(1)
    },
    layerShown(){
        sho = true
        if (hasUpgrade('m',11)) sho = false
        return sho
    },
    tabFormat: [
        "main-display",
        ["infobox", "job"],
        ["row",[
        ["column",[["display-text", function() { return 'stamina:' }],
        ["bar","staBar"]]],
        "blank",
        ["column",[["display-text", function() { if (player.m.job!=0) return 'progress to promotion:' }],
        function() { if (player.m.job!=0) return ["bar","promoBar"]}]]]],
        ["row",[
            ["column",[["display-text", function() { return 'happiness:' }],
            ["bar","hapBar"]]],
            "blank",
            ["column",[["display-text", function() { return 'depression:' }],
            ["bar","depBar"]]]]],
        "blank",
        ["display-text", function() { 
            let dis = ""
            if (player.m.drain.gt(player.m.max)) dis = "Your Activities Exceed Your Capacity"
            return `<b style="color: #ff6961">${dis}</b>`
        }],
        "blank",
        ["display-text", function() { if (player.m.points.eq(0)) return 'You are broke, losing 1 happiness from going without' }],
        ["display-text", function() { if (Math.floor(Math.log10(player.m.depression+1))>0) return 'You are depressed, everything costs '+Math.floor(Math.log10(player.m.depression+1))+' extra stamina' }],
        "blank",
        "upgrades",
        ["display-text", function() { return 'jobs' }],
        "h-line",
        ["row",[["clickable","11"],"blank",["clickable","12"],"blank",["clickable","13"],"blank",["clickable","14"],"blank",["clickable","15"]]],
        "blank",
        ["display-text", function() { return 'activities' }],
        "h-line",
        ["row",[["clickable","21"],"blank",["clickable","22"],"blank",["clickable","23"]]],
        "blank",
        ["display-text", function() { return 'store' }],
        "h-line",
        ["row",[["clickable","31"],"blank",["clickable","32"],"blank",["clickable","33"]]],
    ],
    infoboxes: {
        job: {
            title: "job",
            body() { return `You have to work to make money. You need money to live. Try not to live to work.<br><br>It currently costs <b style="color: #4BDC13">$4</b> per day to live` },
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
            progress() { return player.m.stamina.div(10) },
            display() { return Math.round(player.m.stamina)+" / 10"},
        },
        promoBar: {
            direction: RIGHT,
            width: 200,
            height: 25,
            fillStyle: {'background-color' : "#f8f38d"},
            baseStyle: {'background-color' : "#696969"},
            textStyle: {'color': '#04e050'},
            progress() { return player.m.progress[player.m.job]/(100*(1.1^(player.m.promotions[player.m.job]))) },
            display() { return player.m.progress[player.m.job]+" / "+(100*(1.1^(player.m.promotions[player.m.job])))},
        },
        hapBar: {
            direction: RIGHT,
            width: 200,
            height: 25,
            fillStyle: {'background-color' : "#f8f38d"},
            baseStyle: {'background-color' : "#696969"},
            textStyle: {'color': '#04e050'},
            progress() { return player.m.happiness/100 },
            display() { return player.m.happiness+" / 100"},
        },
        depBar: {
            direction: RIGHT,
            width: 200,
            height: 25,
            fillStyle: {'background-color' : "#f8f38d"},
            baseStyle: {'background-color' : "#696969"},
            textStyle: {'color': '#04e050'},
            progress() { return player.m.depression/100 },
            display() { return player.m.depression+" / 100"},
        },
    },
    upgrades: {
        11: {
            cost: true,
            canAfford() {return player.m.depression==100},
            unlocked() {return player.m.depression>0},
            fullDisplay() {
                let dis = "Little Bit Stressed"
                if (player.m.depression>40) dis = "kinda miserable"
                if (player.m.depression>70) dis = "maybe capitalism is f***ed"
                if (player.m.depression==100) dis = "give up"
                return dis
            },
            onPurchase() {
                player.m.unlocked = false
                player.m.deactivated = true
                player.b.unlocked = true
                player.tab = 'b'
                player.age = 6009
                player.stop.unlocked = true
            },
        },
    },
    clickables: {
        11: {
            title: "Flip Burgers",
            display() { 
                let data = getClickableState(this.layer, this.id)
                let sal = '<br>$'+format(player.m.salary[1]*((1.05**(player.m.promotions[1]))))+'/hour'
                let prom = '<br>Promoted: '+player.m.promotions[1]+' times'
                return "click to " + data + sal + prom
            },
            onClick() { 
                switch(getClickableState(this.layer, this.id)){
                    case "Work":
                        player.m.hired = true
                        player.m.job = 1
                        player[this.layer].clickables[this.id] = "Quit"
                        break;
                    case "Quit":
                        player.m.hired = false
                        player.m.job = 0
                        player[this.layer].clickables[this.id] = "Work"
                        break;                
                    case "Apply":
                        player[this.layer].clickables[this.id] = "Work"
                        break;
                }
            },
            canClick() {
                switch(getClickableState(this.layer, this.id)){
                    case "Work":
                        return !player.m.hired
                    case "Quit":
                        return true
                    case "Apply":
                        return true
            }},
            style() {
                switch(getClickableState(this.layer, this.id)){
                    case "Work":
                        let dis = {'background-color': 'red'}
                        if (player.m.hired) dis = {'background-color':'gray'}
                        return dis
                    case "Quit":
                        return {'background-color': 'green'}
                    case "Apply":
                        return {'background-color': 'yellow'}
            }},
        },
        12: {
            title: "Sous Chef",
            display() {
                return "click to Apply<br>$12.00/hr<br>Req: 12 Dex<br>Promoted: 0 times"
            },
            onClick() {return },
            canClick() { return false},
            style: {'background-color': 'gray'},
        },
        13: {
            title: "Laborer",
            display() {
                return "click to Apply<br>$13.50/hr<br>Req: 12 Str<br>Promoted: 0 times"
            },
            onClick() {return },
            canClick() { return false},
            style: {'background-color': 'gray'},
        },
        14: {
            title: "Teacher",
            display() {
                return "click to Apply<br>$9.50/hr<br>Req: 12 Int<br>Promoted: 0 times"
            },
            onClick() {return },
            canClick() { return false},
            style: {'background-color': 'gray'},
        },
        15: {
            title: "Politician",
            display() {
                return "click to Apply<br>$43.00/hr<br>Req: 12 Cha<br>Promoted: 0 times"
            },
            onClick() {return },
            canClick() { return false},
            style: {'background-color': 'gray'},
        },
        21: {
            title: "Recreation",
            display() { 
                switch(getClickableState(this.layer, this.id)){
                    case "Off":
                        return "Idle<br><br><br><br>"
                    case "Auto":
                        return "Spending Stamina To Increase Happiness<br><br>1 Stamina/sec"
                }
            },
            onClick() { 
                switch(getClickableState(this.layer, this.id)){
                    case "Off":
                        player.m.recreation = true
                        player[this.layer].clickables[this.id] = "Auto"
                        break;
                    case "Auto":
                        player.m.recreation = false
                        player[this.layer].clickables[this.id] = "Off"
                        break;                
                }
            },
            canClick: true,
            style() {
                switch(getClickableState(this.layer, this.id)){
                    case "Auto":
                        return {'background-color': 'green'}
                    case "Off":
                        return {'background-color': 'red'}
            }},
        },
        22: {
            title: "See A Movie",
            display() {
                return "Increase Happiness<br>by 5<br>Costs $40"
            },
            onClick() { 
                player.m.points = player.m.points.minus(40)
                if (player.m.happiness+5<100) player.m.happiness = player.m.happiness+5
                if (player.m.happiness+5>=100) player.m.happiness = 100
            },
            canClick() { return player.m.points.gte(40)},
            style() { 
                dis = {'background-color':'gray'}
                if (player.m.points.gte(40)) dis = {'background-color':'yellow'}
                return dis
            }
        },
        23: {
            title: "Vacation",
            display() {
                return "Increases Happiness to 100<br>Decreases Depression to 0<br>Costs $850"
            },
            onClick() {return },
            canClick() { return false},
            style: {'background-color': 'gray'},
        },
        31: {
            title: "Anti-<br>depressants",
            display() {
                return "Reduce Depression<br>by 10<br>Costs $100"
            },
            onClick() { 
                player.m.points = player.m.points.minus(100)
                if (player.m.depression-10>0) player.m.depression = player.m.depression-10
                if (player.m.depression-10<=0) player.m.depression = 0
            },
            canClick() { return player.m.points.gte(100)},
            style() { 
                dis = {'background-color':'gray'}
                if (player.m.points.gte(100)) dis = {'background-color':'yellow'}
                return dis
            }
        },
        32: {
            title: "New Bed",
            display() {
                return "Increase Stamina Gain While Resting By 1<br>Costs $1000"
            },
            onClick() {return },
            canClick() { return false},
            style: {'background-color': 'gray'},
        },
        33: {
            title: "New Car",
            display() {
                return "Reduces Recreation Stamina Cost to 0<br>Costs $4500"
            },
            onClick() {return },
            canClick() { return false},
            style: {'background-color': 'gray'},
        },
    },
    })
    
setInterval(function() {
    if (hasUpgrade('m',11)) return;
    let drain = new Decimal(0)
    if (player.m.job==1) drain = drain.add(1)
    if (player.m.job==2) drain = drain.add(3)
    if (player.m.recreation) drain = drain.add(1)
    drain = drain.add(Decimal.round(Math.log10(player.m.depression+1)))
    if (hasUpgrade('m',11)) drain = new Decimal(0)
    player.m.drain = drain
    
    let earn = player.m.salary[player.m.job]
    earn = earn*(1.05**(player.m.promotions[player.m.job]))
    if (hasUpgrade('m',11)) earn = new Decimal(0)
    
    let max = new Decimal(10)
    player.m.max = max
    
    let rec = max.div(10)
    if (hasUpgrade('m',11)) rec = rec.add(1)
    
    if (!player.m.hired&&!player.m.recreation) player.m.working = false
    if (player.m.stamina.minus(drain).lt(0)) player.m.working = false
    
    if (player.m.working&&player.m.hired&&player.m.stamina.minus(drain).gte(0)) {
        addPoints('m',earn)
        player.m.progress[player.m.job]++
        if (player.m.happiness>0) player.m.happiness--
    }
    if (player.m.working&&player.m.recreation&&player.m.stamina.minus(drain).gte(0)) {
        if (player.m.happiness<100) player.m.happiness++
    }
    if (player.m.working&&player.m.stamina.minus(drain).gte(0)) player.m.stamina = player.m.stamina.minus(drain)
    
    if (player.m.working==false&&player.m.stamina.lt(max)) {
        if (player.m.stamina.add(rec).gt(max)) player.m.stamina = max
        if (player.m.stamina.add(rec).lte(max)) player.m.stamina = player.m.stamina.add(rec)
    }
    if (player.m.hired||player.m.recreation) {
        if (player.m.stamina.gte(max)) player.m.working = true
    }
    if (player.m.progress[player.m.job]>=(100*(1.1^(player.m.promotions[player.m.job])))) {
        player.m.promotions[player.m.job]++
        player.m.progress[player.m.job] = 0
    }
    if(player.m.depression<100) player.m.depression = player.m.depression+(Math.round(2-(Math.log10(player.m.happiness+1))))
    if(player.m.depression>100) player.m.depression = 100
    if(player.m.points.gt(0)) addPoints('m',-4)
    if(player.m.points.lte(0)&&player.m.happiness>0) player.m.happiness--
    },1000)