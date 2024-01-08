import Constant from "./Constants";
import { INT, SunLongitude, convertLunar2Solar, jdnFromDate } from "./LunarUtil";
import { IEvent } from "./LunarSolarDate";
import LunarEvents from "./resource/lunar-holiday.json";

class LunarDate {
  public ldd: number;
  public lmm: number;
  public lyy: number;
  public leap: number;
  public tz: number;
  public jdn: number;

  public viCanChiDd?: string;
  public viCanChiMm?: string;
  public viCanChiYy?: string;
  public isEclipticDay?: boolean;
  public viTietKhi?: string;

  public lmmString?: string;
  public isLackMonth?: boolean;

  public cnLddLmmCombined?: string;
  public cnCanChiDd?: string;
  public cnCanChiMm?: string;
  public cnCanChiYy?: string;
  public cnTietKhi?: string;

  public events?: Array<IEvent>;
  public eclipticTimes?: Array<string>;
  public asterisk?: boolean;

  constructor(ldd: number, lmm: number, lyy: number, leap: number, tz: number) {
    this.ldd = ldd;
    this.lmm = lmm;
    this.lyy = lyy;
    this.leap = leap;
    this.tz = tz;
    const [dd, mm, yy] = convertLunar2Solar(this.ldd, this.lmm, this.lyy, this.leap, this.tz);
    this.jdn = jdnFromDate(dd, mm, yy);
    this.updateLddToCanChi();
    this.updateLmmToCanChi();
    this.updateLyyToCanChi();
    this.updateEclipticTimesAndDate();
    this.updateTietKhi();
    this.updateEvents();
    this.updateRestFields();
  }

  private updateLddToCanChi() {
    const can = Constant.CAN[(this.jdn + 3) % 10];
    const chi = Constant.CHI[(this.jdn + 5) % 10];
    this.viCanChiDd = `${can[0]} ${chi[0]}`;
    this.cnCanChiDd = `${can[1]} ${chi[1]} 日`;
  }

  private updateLmmToCanChi() {
    const canIndex = ((this.lyy * 12) + 7 + this.lmm) % 10;
    const chiIndex = (this.lmm + 5) % 12;
    const can = Constant.CAN[canIndex];
    const chi = Constant.CHI[chiIndex];
    this.viCanChiMm = `${can[0]} ${chi[0]}`;
    this.cnCanChiMm = `${can[1]} ${chi[1]} 月`;
  }

  private updateLyyToCanChi() {
    const can = Constant.CAN[this.lyy % 10];
    const chi = Constant.CHI[this.lyy % 12];
    this.viCanChiYy = `${can[0]} ${chi[0]}`;
    this.cnCanChiYy = `${can[1]} ${chi[1]} 年`;
  }

  private updateTietKhi() {
    const index = INT(SunLongitude(this.jdn - 0.5 - this.tz / 24) / Math.PI * 12);
    this.viTietKhi = Constant.TIET_KHI[index][0];
    this.cnTietKhi = `${Constant.TIET_KHI[index][1]} 节 气`;
  }

  private updateEclipticTimesAndDate() {
    const index = (this.jdn + 5) % 12;
    this.eclipticTimes = Constant.ECLIPTIC_TIME_MATRIX[index].map(i => {
      return Constant.LUNAR_TIMES[i];
    });
    this.isEclipticDay = Constant.ECLIPTIC_DATE_MATRIX[this.lmm - 1].filter(i => i === index).length > 0;
  }

  private updateEvents() {
    const lunarEvents = LunarEvents.find(o => (o.date === this.ldd
      && o.month === this.lmm));
    this.asterisk = lunarEvents?.marked || false;
    this.events = lunarEvents?.events || [];
  }

  private updateRestFields() {
    this.lmmString = Constant.LUNAR_MONTH_TO_STRING[this.lmm - 1][0];
    let _cnLmmString = Constant.LUNAR_MONTH_TO_STRING[this.lmm - 1][1];
    let _cnLddString = Constant.CHINISE_LUNAR_DATE_TO_STRING[this.ldd - 1];
    this.cnLddLmmCombined = `${_cnLmmString} ${_cnLddString}`;
    if (this.leap === 1) {
      this.lmmString = `${this.lmmString} Nhuận`;
      this.cnLddLmmCombined = `闰 ${this.cnLddLmmCombined}`;
    } 
  }

  public setLackMonth(_isLackMonth: boolean) {
    this.isLackMonth = _isLackMonth;
  }
}

export default LunarDate;