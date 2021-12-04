import drillLookup_ from "./data/drill_lookup.json"
const drillLookup = drillLookup_ as {
    [key: string]: number
};
import materialLookup_ from "./data/material_lookup.json"
const materialLookup = materialLookup_ as {
    [key: string]: {
        [key: string]: {
            [key: string]: number
        }
    }
};

const fractionRe = /((\d+)\s+)?(\d+)\/(\d+)/;
const mmRe = /(\d+(\.\d+)?)\s*mm/;

var possibleEvents = new Set(["input", "onpropertychange", "keyup", "change", "paste"]);

window.onload = () => {
    const materialsMenu = document.getElementById("material") as HTMLSelectElement;
    const typesMenu = document.getElementById("material_type") as HTMLSelectElement;
    const drillInput = document.getElementById("drill_diameter") as HTMLInputElement;
    const calculator: Calculator = new Calculator(typesMenu, drillInput);
    const page: DrillPage = new DrillPage(materialsMenu, typesMenu);
    possibleEvents.forEach((eventName: string) => {
        drillInput.addEventListener(eventName, () => {
            calculator.calc()
        })
    });

    for (let m in materialLookup) {
        const option = document.createElement("option") as HTMLOptionElement;
        option.text = m;
        materialsMenu.options.add(option);
    }

    materialsMenu.onchange = () => {
        page.reloadTypes()
        calculator.calc();
    }
    page.reloadTypes();

    typesMenu.onchange = () => {
        calculator.calc();
    }
    // calcs value on page reload if something was already entered
    calculator.calc();
};

interface TypeOption extends HTMLOptionElement {
    type: {
        [key: string]: number
    }
}

class DrillPage {
    materialsMenu: HTMLSelectElement;
    typesMenu: HTMLSelectElement;

    constructor(materialsMenu: HTMLSelectElement, typesMenu: HTMLSelectElement) {
        this.materialsMenu = materialsMenu;
        this.typesMenu = typesMenu;
    }

    reloadTypes() {
        removeOptions(this.typesMenu);
        const material = this.materialsMenu.item(this.materialsMenu.selectedIndex) as HTMLOptionElement;
        const types = materialLookup[material.text];
        Object.keys(types).forEach(name => {
            const option = document.createElement("option") as TypeOption;
            const sfm = types[name]["drill_sfm"]
            option.text = `${name} (${sfm})`;
            option.type = types[name];
            this.typesMenu.options.add(option);
        })
    };

};

function removeOptions(selectElement: HTMLSelectElement) {
    const L = selectElement.options.length - 1;
    for (let i = L; i >= 0; i--) {
        selectElement.remove(i);
    }
};

interface DrillReco {
    rpm: number;
    ipm: number;
    maxDepth: number;
}

class Calculator {
    typesMenu: HTMLOptionsCollection;
    diameterElement: HTMLInputElement;

    constructor(typessMenu: HTMLSelectElement, diameterElement: HTMLInputElement) {
        this.typesMenu = typessMenu.options;
        this.diameterElement = diameterElement;
    }

    calc() {
        const typeOption = this.typesMenu.item(this.typesMenu.selectedIndex) as TypeOption;
        const type = typeOption.type;
        const sfm = Number(type["drill_sfm"]);
        setLabel("sfm", displayNum(sfm))

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
                        setLabel("diameter_note", `Diameter ${inches} ${numerator}/${denominator}=${diameter}"`)
                    } else {
                        setLabel("diameter_note", `Diameter  ${numerator}/${denominator}=${diameter}"`)
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
                setLabel("diameter_note", `Diameter ${diameter}"`)
            }
        }


        let reco = recommend(sfm, diameter);

        setLabel("rpm", displayNum(reco.rpm))
        setLabel("ipm", fixedDisplayNum(reco.ipm, 1))
        setLabel("depth", `${fixedDisplayNum(reco.maxDepth, 3)}"`)
    }
}

function displayNum(value: number): string {
    if (Number.isNaN(value) || value == Infinity || !value) {
        return "--";
    } else {
        return String(value);
    }
}

function fixedDisplayNum(value: number, precision: number): string {
    if (Number.isNaN(value) || value == Infinity || !value) {
        return "--";
    } else {
        return value.toFixed(precision);
    }
}

export function recommend(sfm: number, diameter: number): DrillReco {
    const ipr = Math.min(.25, .001 * (diameter / .0625))
    const rpm = Math.round((3.8197 / diameter) * sfm)
    return { rpm: rpm, ipm: ipr * rpm, maxDepth: diameter * 4 }
}

function setLabel(id: string, value: string) {
    const output = document.getElementById(id) as HTMLLabelElement;
    output.innerHTML = String(value)
}
