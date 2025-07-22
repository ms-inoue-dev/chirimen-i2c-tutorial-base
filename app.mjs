import {requestI2CAccess, SHT40} from "chirimen";

const i2cAccess = await requestI2CAccess();

const i2cPort = i2cAccess.ports.get(1);

const sht40 = new SHT40(i2cPort, 0x44);

setInterval(() => {
    getsht40Data().then(result => {
        console.dir('湿度：' + result.humidity);
        console.dir('温度：' + result.temperature);
    });
}, 1000);

async function getsht40Data () {
    await sht40.init();
    let data = await sht40.readData();
    return data;
}