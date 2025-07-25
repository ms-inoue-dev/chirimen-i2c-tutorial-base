import {requestI2CAccess} from "chirimen";
import WaterLevelSensor from "./grove-water-level-sensor.js";

const i2cAccess = await requestI2CAccess();

const i2cPort = i2cAccess.ports.get(1);

const waterlevelsensor = new WaterLevelSensor(i2cPort, 0x77);

await waterlevelsensor.init();

setInterval(async() => {
    let high12SectionValue = await waterlevelsensor.getHigh12SectionValue();
    let low8SectionValue = await waterlevelsensor.getLow8SectionValue();

    console.dir("high: " + high12SectionValue);
    console.dir("low: " + low8SectionValue);

}, 500);