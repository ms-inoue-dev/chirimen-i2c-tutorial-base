import {requestI2CAccess} from "chirimen";
import MMA7660 from "@chirimen/mma7660";

const i2cAccess = await requestI2CAccess();

const i2cPort = i2cAccess.ports.get(1);

const mma7660 = new MMA7660(i2cPort, 0x4c);

await mma7660.init();

setInterval(async() => {
    let XYZData = await mma7660.getXYZ();
    let AccelerationData = await mma7660.getAcceleration();

    console.dir("x =" + XYZData[0]);
    console.dir("y =" + XYZData[1]);
    console.dir("z =" + XYZData[2]);

    console.dir("accleration of X/Y/Z: " + AccelerationData[0] + " g/ " + AccelerationData[1] + " g/ " + AccelerationData[2] + " g");

}, 500);