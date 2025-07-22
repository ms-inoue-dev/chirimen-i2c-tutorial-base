class MMA7660{
  constructor(i2cPort,slaveAddress){
    this.i2cPort = i2cPort;
    this.i2cSlave = null;
    this.slaveAddress = slaveAddress;
  }
  async setup(){
    this.i2cSlave = await this.i2cPort.open(this.slaveAddress);
    console.dir("call setup");

  }
  async getXYZ(){
    if (this.i2cSlave == null) {
      throw new Error("i2cSlave is not open yet.");
    }

    return "call getXYZ"
  }
  async getAcceleration(){
    if (this.i2cSlave == null) {
      throw new Error("i2cSlave is not open yet.");
    }

    return "call getAcceleration"
  }
}
export default MMA7660;