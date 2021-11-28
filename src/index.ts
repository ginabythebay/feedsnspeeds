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


        const diameter = Number(this.diameterElement.value);
        const rpm = Math.round((3.8197 / diameter) * sfm)
        const ipr = Math.min(.25, .001 * (diameter / .0625))
        const ipm = ipr * rpm
        console.log("ipr = " + ipr)

        setLabel("sfm", sfm)
        setLabel("rpm", rpm)
        setLabel("ipm", ipm.toFixed(1))
        setLabel("depth", (diameter * 4).toFixed(3))
    }
}

function setLabel(id: string, value: number | string) {
    var output = document.getElementById(id) as HTMLLabelElement;
    output.innerHTML = String(value)
}
