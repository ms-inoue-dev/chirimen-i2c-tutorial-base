import {requestI2CAccess, VL53L0X} from "chirimen";

const i2cAccess = await requestI2CAccess();

const i2cPort = i2cAccess.ports.get(1);

const vl53l0x = new VL53L0X(i2cPort, 0x29);

setInterval(() => {
    getvl53l0xData().then(result => {
        console.dir(result);
    });
}, 1000);

async function getvl53l0xData () {
    await vl53l0x.init();
    let data = await vl53l0x.getRange();
    return data;
}