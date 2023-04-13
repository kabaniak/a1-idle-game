import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from 'vuex'

import './assets/main.css'

const names = [
    "Steve",
    "Polly",
    "Jeff",
    "Blackeye",
    "Tamar",
    "Badbreath",
    "Hiccup",
    "Sparrow"
]

const feats = [
    " maimed a man using only one thumb.",
    " ran away and joined the circus.",
    " got caught for tax evasion.",
    " ate three gold coins.",
    " made out with a mermaid.",
    " dueled the King of England."
]

const shipNames = [
    "The Ship",
    "Hollyhock",
    "The Black Pearl",
    "Ghostship",
    "Fido",
    "Mermaid's Song",
    "The Odyssey",
    "The Pinta",
    "The U.S.S. Kelvin"
]

const descriptions = [
    "sparkling",
    "oaken",
    "cherry red",
    "haunting",
    "majestic",
    "imposing",
    "eerie",
    "dainty",
    "creaky",
    "crappy",
    "ugly",
    "daunting",
    "second-hand",
    "magnificent"
]

const creatures = [
    {name: "mermaid", success: 0.6, shipLoss: 0, crewLoss: 0.2, fearGain: 10, goldGain: 6},
    {name: "kraken", success: 0.25, shipLoss: 0.5, crewLoss: 0.5, fearGain: 50, goldGain: 3},
    {name: "witch", success: 0.8, shipLoss: 0.2, crewLoss: 0.2, fearGain: 5, goldGain: 6},
    {name: "kelpie", success: 0.35, shipLoss: 0.2, crewLoss: 0.4, fearGain: 20, goldGain: 3},
    {name: "dolphin", success: 0.6, shipLoss: 0, crewLoss: 0.05, fearGain: -10, goldGain: 5}
]

const succNote = [
    "It waves as it vanishes over the horizon.",
    "It gives you a conch shell for if you ever find yourself in need.",
    "You impressed it with your sick dance moves.",
    "It was enraptured by your rugged good looks.",
    "You charmer!",
    "It does a back flip before vanishing into the deep.",
    "You shed a single tear of joy."
]
const failNote = [
    "It did not like your knock-knock joke.",
    "It found you objectively ugly.",
    "You weep with shame.",
    "Who will let you rob them now?",
    "Your crew all laughs and you finally realize you forgot to wear pants the whole time.",
    "Your lost ships sink to the deep.",
    "The creature laughs maniacally as it leaves you behind.",
    "On the bright side now you get a hook hand.",
    "This is your darkest day."
]

// constants
const store = createStore({
    state() {
        return {
            counterValues: {
                gold: 0,
                fear: 0,
                manpower: { deckhand: 1, muscle: 0 },
                ships: { dingy: 1, galley: 0, warship: 0 },
            },
            incRate: {
                gold: 0.2,
                fear: 0.1
            },
            messageLog: [
                "Congratulations matey you just got your first boat! Time to search for riches."
            ],
            coolDown: 0
        }
    },
    mutations: {
    },
    actions: {
        updateIfStorage({ commit }, storeVal) {
            this.replaceState(JSON.parse(storeVal))
        },
        incrementAsync() {
            setTimeout(() => {
                // update values based on inc rates
                this.state.counterValues.gold += this.state.incRate.gold;
                this.state.counterValues.fear += this.state.incRate.fear;
                this.state.coolDown += 1
                localStorage.setItem("pirateStates", JSON.stringify(this.state))
                this.dispatch("incrementAsync")
            }, 1000)
        },
        hireCrew({ commit }, crewType) {
            if (crewType == "mercenary") {
                this.state.counterValues.manpower.muscle++;
                this.state.incRate.gold += 0.5;
                this.state.incRate.fear += 0.5;
                this.state.counterValues.gold -= 20;
            }
            else {
                this.state.counterValues.manpower.deckhand++;
                this.state.incRate.gold += .05;
                this.state.counterValues.gold -= 5;
            }

            let name = names[Math.floor(Math.random() * names.length)]
            let feat = feats[Math.floor(Math.random() * feats.length)]
            this.state.messageLog.unshift("Welcome aboard your newest " + crewType + " - " + name + " who once " + feat);
        },
        buyShip({ commit }, shipType) {
            if(shipType == "dingy"){
                this.state.counterValues.ships.dingy++;
                this.state.counterValues.gold -= 50;
            }
            else if(shipType == "galley"){
                this.state.counterValues.ships.galley++;
                this.state.counterValues.gold -= 600;
                this.state.incRate.fear += 3;
            }
            else {
                this.state.counterValues.ships.warship++;
                this.state.counterValues.gold -= 5000;
                this.state.incRate.fear += 10;
            }

            console.log("Here");

            let name = shipNames[Math.floor(Math.random() * shipNames.length)]
            let desc = descriptions[Math.floor(Math.random() * descriptions.length)]
            this.state.messageLog.unshift("Avast! You watch as " + name+ " - your " + desc + " new " + shipType + " - sets sail on her maiden voyage.");
        
        },
        befriendAttempt (){
            let creat = creatures[Math.floor(Math.random() * creatures.length)]
            let note = ""

            // successful befriending
            if( Math.random() < creat.success){
                this.state.incRate.fear += creat.fearGain;
                this.state.incRate.gold += creat.goldGain;

                note = succNote[Math.floor(Math.random() * succNote.length)]

                this.state.messageLog.unshift("Incredible! You were able to befriend a "+creat.name+ " that you encountered on your travels. " + note);
            }
            // unsuccessful befriending
            else {
                console.log("Gold rate before "+ this.state.incRate.gold);
                this.state.incRate.gold -= creat.crewLoss * ((0.05 * this.state.counterValues.manpower.deckhand) + (0.5 * this.state.counterValues.manpower.muscle))
               
                console.log("Gold rate after "+ this.state.incRate.gold);
                this.state.counterValues.manpower.deckhand = Math.floor(this.state.counterValues.manpower.deckhand * (1 - creat.crewLoss));
                this.state.counterValues.manpower.muscle = Math.floor(this.state.counterValues.manpower.muscle*(1 - creat.crewLoss));

                this.state.incRate.fear -= creat.shipLoss * ((3 * this.state.counterValues.ships.galley) + (10 * this.state.counterValues.ships.warship))
                this.state.counterValues.ships.dingy = Math.floor(this.state.counterValues.ships.dingy*(1 - creat.shipLoss));
                this.state.counterValues.ships.galley = Math.floor(this.state.counterValues.ships.galley*(1 - creat.shipLoss));
                this.state.counterValues.ships.warship = Math.floor(this.state.counterValues.ships.warship*(1 - creat.shipLoss));

                note = failNote[Math.floor(Math.random() * failNote.length)];

                this.state.messageLog.unshift("Blast! You foolishly attempted to befriend a "+creat.name+ " that you encountered on your travels. It was a catastrophic disaster. " + note);
            }
            this.state.coolDown = 0;
        }
    }
})

// create stuff
createApp(App).use(store).mount('#app')
