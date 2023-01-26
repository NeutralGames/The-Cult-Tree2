let modInfo = {
	name: "The Cult Tree 2",
	id: "cult2",
	author: "Neutral",
	pointsName: "faith",
	modFiles: 
	["layers/thesis.js",
	"layers/stats.js",
	"layers/money.js",
	"layers/story.js",
	"layers/life.js",
	"layers/reinc.js",
	"layers/spooky.js",
	"layers/inv.js",
	"tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "A fresh start",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Started Over.<br>
		- Added stuff.<br><br><br><br><br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything","jobLoop","skillXP","skillXP(skill)"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	let pt = false
	return pt
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('t',01)) gain = gain.mul(upgradeEffect('t',01))
	if (hasUpgrade('t',11)) gain = gain.mul(upgradeEffect('t',11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
	happiness: 100,
	depression: 0,
	age: 12873,
}}

// Display extra things at the top of the page
var displayThings = [
	function() { if (player.points.lte(0)&&!hasUpgrade('m',11)) return "Late Stage Capitalism Demands Your Labor To Sustain Life" },
	function() { return "You Are "+parseDays(player.age)+" old" },
	function() { if (player.age>18250) return "Your Age Slows Your Actions By "+format(2**((player.age-18250)/3650))+"x"}
	
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}

function parseDays (value){ 
    var year, days;
         
    year = value >= 365 ? Math.floor(value / 365) : 0;
    value = year ? value - (year*365) : value;
        
    days = value < 365 ? Math.floor((value % 365)) : 0;
        
    return year+" years, "+days+" days"   
}
setInterval(function() {
	player.age++
},1000)

function skillXP(test) {
	let gain = new Decimal(1)
	let mult = new Decimal(1)
	mult = player.st[player.st.skill[test].stat]

	gain = gain*mult
	player.st.skill[test].progress = player.st.skill[test].progress+gain
	console.log(player.st.skill[test].progress>=player.st.skill[test].next)
	if (player.st.skill[test].progress>=player.st.skill[test].next) {
		player.st.skill[test].progress = 0
		player.st.skill[test].level++
		player.st.skill[test].next = player.st.skill[test].next*1.05
	}
}