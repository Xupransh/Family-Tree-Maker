import "reflect-metadata";

import runStandalone from "./standalone"

const appDiv = document.getElementById('sprotty');
if (appDiv) {
    runStandalone();
}
