import {requestI2CAccess} from "chirimen";
import MMA7660 from "./mma7660.js";

const i2cAccess = await requestI2CAccess();

const i2cPort = i2cAccess.ports.get(1);

const mma7660 = new MMA7660(i2cPort, 0x4c);

await mma7660.init();

setInterval(async() => {
    let XYZData = await mma7660.getXYZ();
    let AccelerationData = await mma7660.getAcceleration();

    console.dir(XYZData);
    // console.dir(AccelerationData);

}, 500);