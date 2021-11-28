var possibleEvents = new Set(["input", "onpropertychange", "keyup", "change", "paste"]);

window.onload = () => {
    var drillInput = document.getElementById("drill_diameter") as HTMLInputElement;
    possibleEvents.forEach((eventName: string) => {
        drillInput.addEventListener(eventName, (ev: Event) => {
            var inputElement = ev.target as HTMLInputElement;
            drill(inputElement)
        })
    });
    // calcs value on page reload if something was already entered
    drill(drillInput)
};

function drill(inputElement: HTMLInputElement) {
    const sfm = 250 // for Aluminum
    const diameter = Number(inputElement.value);
    const rpm = Math.round((3.8197 / diameter) * sfm)
    const ipr = Math.min(.25, .001 * (diameter / .0625))
    const ipm = ipr * rpm
    console.log("ipr = " + ipr)

    setLabel("sfm", sfm)
    setLabel("rpm", rpm)
    setLabel("ipm", ipm.toFixed(1))
    setLabel("depth", (diameter * 4).toFixed(3))
}

function setLabel(id: string, value: number | string) {
    var output = document.getElementById(id) as HTMLLabelElement;
    output.innerHTML = String(value)
}
