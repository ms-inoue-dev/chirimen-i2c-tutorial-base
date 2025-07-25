import {requestI2CAccess} from "chirimen";
import WaterLevelSensor from "@chirimen/grove-water-level-sensor";

const i2cAccess = await requestI2CAccess();

const i2cPort = i2cAccess.ports.get(1);

const waterlevelsensor = new WaterLevelSensor(i2cPort, 0x77, 0x78);

await waterlevelsensor.init();

setInterval(async() => {
    let high12SectionValue = await waterlevelsensor.getHigh12SectionValue();
    let low8SectionValue = await waterlevelsensor.getLow8SectionValue();

    let waterLevel = await waterlevelsensor.getWaterLevel();

    console.dir("high: " + high12SectionValue);
    console.dir("low: " + low8SectionValue);
    console.dir("waterLevel: " + waterLevel + " %");

}, 500);