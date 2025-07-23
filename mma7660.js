const MMA7660_ADDR = 0x4c;
const MMA7660_X    = 0x00;
const MMA7660_Y    = 0x01;
const MMA7660_Z    = 0x02;
const MMA7660_TILT = 0x03;
const MMA7660_SRST = 0x04;
const MMA7660_SPCNT = 0x05;
const MMA7660_INTSU = 0x06;
const MMA7660_SHINTX = 0x80;
const MMA7660_SHINTY = 0x40;
const MMA7660_SHINTZ = 0x20;
const MMA7660_GINT = 0x10;
const MMA7660_ASINT = 0x08;
const MMA7660_PDINT = 0x04;
const MMA7660_PLINT = 0x02;
const MMA7660_FBINT = 0x01;
const MMA7660_MODE = 0x07;
const MMA7660_STAND_BY = 0x00;
const MMA7660_ACTIVE = 0x01;
const MMA7660_SR = 0x08;      //sample rate register
const AUTO_SLEEP_120 = 0X00;  //120 sample per second
const AUTO_SLEEP_64 = 0X01;
const AUTO_SLEEP_32 = 0X02;
const AUTO_SLEEP_16 = 0X03;
const AUTO_SLEEP_8 = 0X04;
const AUTO_SLEEP_4 = 0X05;
const AUTO_SLEEP_2 = 0X06;
const AUTO_SLEEP_1 = 0X07;
const MMA7660_PDET = 0x09;
const MMA7660_PD = 0x0A;

class MMA7660{
  constructor(i2cPort,slaveAddress){
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }
  async init(){
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    setMode(this.i2cSlave, MMA7660_STAND_BY);
    setSampleRate(this.i2cSlave, AUTO_SLEEP_32);
    setMode(this.i2cSlave, MMA7660_ACTIVE);
  }
  async getXYZ(){
    if (this.i2cSlave == null) {
      throw new Error("i2cSlave is not open yet.");
    }

    let val = [64, 64, 64];
    let XYZdata = this.i2cSlave.readBytes(3);

    val[0] = (XYZdata[0] << 2) / 4;
    val[1] = (XYZdata[1] << 2) / 4;
    val[2] = (XYZdata[2] << 2) / 4;

    return val;
  }
  async getAcceleration(){
    if (this.i2cSlave == null) {
      throw new Error("i2cSlave is not open yet.");
    }

    return "call getAcceleration"
  }
}
export default MMA7660;

function setMode (i2cSlave, mode) {
  i2cSlave.write8(MMA7660_MODE, mode);
}

function setSampleRate (i2cSlave, rate) {
  i2cSlave.write8(MMA7660_SR, rate);
}