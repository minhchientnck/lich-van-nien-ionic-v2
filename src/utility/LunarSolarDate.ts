import Storage from "../pages/Storage";
import LunarDate from "./LunarDate";
import * as LunarUtil from "./LunarUtil";


export interface EventAlarm {
  id?: string,
  hours?: number,
  minutes?: number,
  title?: string,
}

export default class LunarSolarDate {
  public solarDate: Date;
  public lunarDate: LunarDate;
  public hasNotifications: boolean;

  constructor() {
    this.solarDate = new Date();
    const [dd, mm, yy, dw, tz] = this.convertSolarDateToArray();
    const [ldd, lmm, lyy, leap] = LunarUtil.convertSolar2Lunar(dd, mm, yy, tz);
    this.lunarDate = new LunarDate(ldd, lmm, lyy, leap);
    this.hasNotifications = false;
  }

  public convertSolarDateToArray() {
    let dd = this.solarDate.getDate();
    let dw = this.solarDate.getDay();
    let mm = this.solarDate.getMonth() + 1;
    let yy = this.solarDate.getFullYear();
    let tz = this.solarDate.getTimezoneOffset() / -60;
    return [dd, mm, yy, dw, tz];
  }

  public setDateSolarDate(_dd: number) {
    this.solarDate.setDate(_dd);
    let [dd, mm, yy, dw, tz] = this.convertSolarDateToArray();
    let [ldd, lmm, lyy, leap] = LunarUtil.convertSolar2Lunar(dd, mm, yy, tz);
    this.lunarDate = new LunarDate(ldd, lmm, lyy, leap);
  }

  public setMonthSolarDate(_mm: number) {
    this.solarDate.setMonth(_mm - 1);
    let [dd, mm, yy, dw, tz] = this.convertSolarDateToArray();
    let [ldd, lmm, lyy, leap] = LunarUtil.convertSolar2Lunar(dd, mm, yy, tz);
    this.lunarDate = new LunarDate(ldd, lmm, lyy, leap);
  }

  public setYearSolarDate(_yy: number) {
    this.solarDate.setFullYear(_yy);
    let [dd, mm, yy, dw, tz] = this.convertSolarDateToArray();
    let [ldd, lmm, lyy, leap] = LunarUtil.convertSolar2Lunar(dd, mm, yy, tz);
    this.lunarDate = new LunarDate(ldd, lmm, lyy, leap);
  }

  public async setSolarDateFromString(str: string = '1900-01-01') {
    this.solarDate = new Date(str);
    let [dd, mm, yy, dw, tz] = this.convertSolarDateToArray();
    let [ldd, lmm, lyy, leap] = LunarUtil.convertSolar2Lunar(dd, mm, yy, tz);
    this.lunarDate = new LunarDate(ldd, lmm, lyy, leap);
    const events: EventAlarm[] = await Storage.get(`${yy}_${mm}_${dd}`);
    this.hasNotifications = events.length > 0;
  }

  public setHasNotifications(hasNotifications: boolean) {
    this.hasNotifications = hasNotifications;
  }

  public getSolarDate() {
    return this.solarDate;
  }

  public getLunarDate() {
    return this.lunarDate;
  }

  public getHasNotifications() {
    return this.hasNotifications;
  }

  public toString() {
    return {
      solarDate: this.solarDate.toString(),
      lunarDate: this.lunarDate.toString(),
    }
  }
}
