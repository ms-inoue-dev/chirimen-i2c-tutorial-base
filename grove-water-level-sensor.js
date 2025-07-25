// @ts-check
// MMA7660 driver for CHIRIMEN
// Based from https://github.com/Seeed-Studio/Accelerometer_MMA7660/blob/master/MMA7660.cpp
// Programmed by Masahito Inoue

const ATTINY1_HIGH_ADDR = 0x78;
const ATTINY2_LOW_ADDR = 0x77;
const SENSORVALUE_MIN = 250;
const SENSORVALUE_MAX = 255;
const THRESHOLD = 100;

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

  async getWaterLevel() {
    if (this.i2cSlave == null) {
      throw new Error("i2cSlave is not open yet.");
    }

    const high_data = await this.getHigh12SectionValue();
    const low_data = await this.getLow8SectionValue();
    let touch_val = 0;
    let trig_section = 0;

    for (let i = 0 ; i < 8; i++) {
      if (low_data[i] > THRESHOLD) {
        touch_val |= 1 << i;

      }
    }
    for (let i = 0 ; i < 12; i++) {
      if (high_data[i] > THRESHOLD) {
        touch_val |= 1 << (8 + i);
      }
    }

    while (touch_val & 0x01)
    {
      trig_section++;
      touch_val >>= 1;
    }

    const value = trig_section * 5;

    return value;
  }
}

export default WaterLevelSensor;