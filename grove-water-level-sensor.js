// @ts-check
// MMA7660 driver for CHIRIMEN
// Based from https://github.com/Seeed-Studio/Accelerometer_MMA7660/blob/master/MMA7660.cpp
// Programmed by Masahito Inoue

const ATTINY1_HIGH_ADDR = 0x78;
const ATTINY2_LOW_ADDR = 0x77;

class WaterLevelSensor {
  constructor(i2cPort, slaveAddress) {
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }

  async init() {
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
  }

  async getHigh12SectionValue() {
    if (this.i2cSlave == null) {
      throw new Error("i2cSlave is not open yet.");
    }

    const high12SectionValue = await this.i2cSlave.readBytes(12);

    return high12SectionValue;
  }

  async getLow8SectionValue() {
    if (this.i2cSlave == null) {
      throw new Error("i2cSlave is not open yet.");
    }

    const low8SectionValue = await this.i2cSlave.readBytes(8);

    return low8SectionValue;
  }
}

export default WaterLevelSensor;