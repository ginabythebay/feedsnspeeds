import drillLookup_ from "./drill_lookup.json"
const drillLookup = drillLookup_ as {
    [key: string]: number
};

const fractionRe = /((\d+)\s+)?(\d+)\/(\d+)/;
const mmRe = /(\d+(\.\d+)?)\s*mm/;

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
        if (input in drillLookup) {
            diameter = drillLookup[input]
            setLabel("diameter_note", `${input} has a diameter of ${diameter}`)
        } else {
            diameter = Number(input);
            if (!diameter) {
                let match = input.match(fractionRe);
                if (match) {
                    let inches = Number(match[2])
                    if (!inches) {
                        inches = 0
                    }
                    const numerator = Number(match[3])
                    const denominator = Number(match[4])
                    diameter = inches + numerator / denominator
                    if (inches) {
                        setLabel("diameter_note", `Diameter ${inches} ${numerator}/${denominator}=${diameter}`)
                    } else {
                        setLabel("diameter_note", `Diameter  ${numerator}/${denominator}=${diameter}`)
                    }
                } else {
                    match = input.match(mmRe);
                    if (match) {
                        const mm = Number(match[1])
                        diameter = mm / 25.4
                        setLabel("diameter_note", `Diameter  ${mm} mm=${diameter.toPrecision(4)}"`)
                    } else {
                        setLabel("diameter_note", "Enter diameter like .25, 1/4, 3mm, A or #23")
                    }
                }
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
