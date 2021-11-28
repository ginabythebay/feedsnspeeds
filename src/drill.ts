import drillLookup from "./drill_lookup.json"
const DrillLookup = drillLookup as {
    [key: string]: number
};

var possibleEvents = new Set(["input", "onpropertychange", "keyup", "change", "paste"]);

window.onload = () => {
    const materialsMenu = document.getElementById("material") as HTMLSelectElement;
    const drillInput = document.getElementById("drill_diameter") as HTMLInputElement;
    const calculator: Calculator = new Calculator(materialsMenu, drillInput)
    possibleEvents.forEach((eventName: string) => {
        drillInput.addEventListener(eventName, () => {
            calculator.calc()
        })
    });
    materialsMenu.onchange = () => {
        calculator.calc();
    }
    // calcs value on page reload if something was already entered
    calculator.calc();
};

interface DrillReco {
    rpm: number;
    ipm: number;
    maxDepth: number;
}

class Calculator {
    materialsMenu: HTMLOptionsCollection;
    diameterElement: HTMLInputElement;

    constructor(materialsMenu: HTMLSelectElement, diameterElement: HTMLInputElement) {
        this.materialsMenu = materialsMenu.options;
        this.diameterElement = diameterElement;
    }

    calc() {
        const material = this.materialsMenu.item(this.materialsMenu.selectedIndex) as HTMLOptionElement;
        const val = material.value;
        const sfm = Number(val);

        let input = this.diameterElement.value as string;
        let diameter = 0.0;
        if (input in DrillLookup) {
            diameter = DrillLookup[input]
            setLabel("diameter_note", `${input} has a diameter of ${diameter}`)
        } else {
            diameter = Number(input);
            if (!diameter) {
                setLabel("diameter_note", "Enter diameter like .25, A or #23")
            } else {
                setLabel("diameter_note", `Diameter ${diameter}`)
            }
        }


        let reco = recommend(sfm, diameter);

        setLabel("sfm", sfm)
        setLabel("rpm", reco.rpm)
        setLabel("ipm", reco.ipm.toFixed(1))
        setLabel("depth", reco.maxDepth.toFixed(3))
    }
}

export function recommend(sfm: number, diameter: number): DrillReco {
    const ipr = Math.min(.25, .001 * (diameter / .0625))
    const rpm = Math.round((3.8197 / diameter) * sfm)
    return { rpm: rpm, ipm: ipr * rpm, maxDepth: diameter * 4 }
}

function setLabel(id: string, value: number | string) {
    const output = document.getElementById(id) as HTMLLabelElement;
    output.innerHTML = String(value)
}
