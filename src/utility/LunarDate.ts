export default class LunarDate {

  private ldd: number;
  private lmm: number;
  private lyy: number;
  private leap: number;

  constructor(ldd: number, lmm: number, lyy: number, leap: number) {
    this.ldd = ldd;
    this.lmm = lmm;
    this.lyy = lyy;
    this.leap = leap;
  }

  public getLdd() { return this.ldd; }

  public getLmm() { return this.lmm; }

  public getLyy() { return this.lyy; }

  public getLeap() { return this.leap; }

  public convertLunarDateToArray() {
    return [this.ldd, this.lmm, this.lyy, this.leap];
  }

  public toString() {
    return `${this.ldd}-${this.lmm}-${this.lyy}-${this.leap}`;
  }
}