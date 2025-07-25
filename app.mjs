import {requestI2CAccess} from "chirimen";
import WaterLevelSensor from "./grove-water-level-sensor.js";

const i2cAccess = await requestI2CAccess();

const i2cPort = i2cAccess.ports.get(1);

const WaterLevelSensor = new WaterLevelSensor(i2cPort, 0x77);

await WaterLevelSensor.init();

setInterval(async() => {
    let high12SectionValue = await WaterLevelSensor.getHigh12SectionValue();
    let low8SectionValue = await WaterLevelSensor.getLow8SectionValue();

    console.dir(high12SectionValue);
    console.dir(low8SectionValue);

}, 500);