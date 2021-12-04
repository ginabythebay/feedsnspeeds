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

interface FeedRateRange {
    minDiameter: number  // inches, inclusive
    maxDiameter: number  // inches, exclusive
    minFr: number // inches per revolution
    maxFr: number // inches per revolution
}

// Data from Machinery's Handbook 31 page 1128.
const feedRates = [
    {
        minDiameter: 0,
        maxDiameter: .125,
        minFr: .001,
        maxFr: .003,
    },
    {
        minDiameter: .125,
        maxDiameter: .251,
        minFr: .002,
        maxFr: .006,
    },
    {
        minDiameter: .251,
        maxDiameter: .501,
        minFr: .004,
        maxFr: .010,
    },
    {
        minDiameter: .501,
        maxDiameter: 1.01,
        minFr: .007,
        maxFr: .015,
    },
    {
        minDiameter: 1.01,
        maxDiameter: 0,
        minFr: .010,
        maxFr: .025,
    },
];

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
    ipr: number;
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

        // the call to recommend below can throw and error if given an
        // invalid diameter.  To avoid displaying invalid parameters,
        // we start by zeroing out the display before the potential
        // error.
        setLabel("rpm", "--")
        setLabel("ipr", "--")
        setLabel("ipm", "--")
        setLabel("depth", "--")

        let reco = recommend(sfm, diameter, Number(type["fr_offset"]));

        setLabel("rpm", displayNum(reco.rpm))
        setLabel("ipr", fixedDisplayNum(reco.ipr, 3))
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

export function recommend(sfm: number, diameter: number, fr_offset: number): DrillReco {
    const ipr = calcIpr(diameter, fr_offset);
    const rpm = Math.round((3.8197 / diameter) * sfm)
    return { rpm: rpm, ipr: ipr, ipm: ipr * rpm, maxDepth: diameter * 4 }
}

// diameter is inches
// fr_offset is a value between 1 and 5
//
// once we find a range, we apply the fr_offset to it.  Imagining a range of 1 to 11, we distribute it like this:
// range  fr_offset
// 1      1
// 2
// 3
// 3.5    2
// 4
// 5
// 6      3
// 7
// 8
// 8.5    4
// 9
// 10
// 11     5
export function calcIpr(diameter: number, fr_offset: number): number {
    if (fr_offset < 1 || fr_offset > 5) {
        throw new RangeError('fr_offset must bet between 1 and 5: ${fr_offset} is invalid');
    }
    for (let frr of feedRates) {
        if (diameter >= frr.minDiameter && (frr.maxDiameter == 0 || diameter < frr.maxDiameter)) {
            if (fr_offset == 1) {
                return frr.minFr;
            }
            if (fr_offset == 5) {
                return frr.maxFr;
            }
            const offset = .25 * (fr_offset - 1);
            const range = frr.maxFr - frr.minFr;
            return frr.minFr + (range * offset);
        }

    }
    throw new Error(`Unable to find range for diameter of ${diameter}`)
}

function setLabel(id: string, value: string) {
    const output = document.getElementById(id) as HTMLLabelElement;
    output.innerHTML = String(value)
}
