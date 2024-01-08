import Constant from "./Constants";
import { convertSolar2Lunar, jdnFromDate } from "./LunarUtil";
import LunarDate from "./LunarDate";
import SolarEvents from "./resource/solar-holiday.json";
import Quotations from "./resource/good-sentences.json";

export interface IQuotation {
  content?: string,
  author?: string,
}

export interface IEvent {
  name?: string,
  description?: string,
}

class LunarSolarDate {
  public solarDate: Date;
  public isSunday?: boolean;

  public viMonthString?: string;
  public enMonthString?: string;
  public viDay?: string;
  public enDay?: string;
  public cnDay?: string;
  public events?: Array<IEvent>;
  public asterisk?: boolean;
  public quotation?: IQuotation;
  public hasTask?: boolean;

  public lunarDate: LunarDate;

  constructor() {
    this.solarDate = new Date();
    this.lunarDate = this.updateAll();
  }

  private updateAll() {
    this.enMonthString = '';
    this.updateFields();
    this.updateEventOrQuotation();
    this.updateHasTask();
    return this.buildLunarDate();
  }

  private updateFields() {
    let mm = this.solarDate.getMonth();
    this.viMonthString = Constant.MONTH_TO_STRING[mm][0];
    this.enMonthString = Constant.MONTH_TO_STRING[mm][1];
    let dw = this.solarDate.getDay();
    this.viDay = Constant.DAY_TO_FULL_STRING[dw][0];
    this.enDay = Constant.DAY_TO_FULL_STRING[dw][1];
    this.cnDay = Constant.DAY_TO_FULL_STRING[dw][2];
    this.isSunday = false;
    if (dw === 0) {
      this.isSunday = true;
    }
  }

  private updateEventOrQuotation() {
    const solarEvents = SolarEvents.find(o => (o.date === this.solarDate.getDate() && o.month === this.solarDate.getMonth() + 1));
    this.asterisk = solarEvents?.marked || false;
    const events = solarEvents?.events || [];
    if (events.length > 0) {
      this.events = events;
      this.quotation = undefined;
    } else {
      this.events = [];
      this.quotation = this.getQuotation();
    }
  }

  private getQuotation() {
    let dd = this.solarDate.getDate();
    let mm = this.solarDate.getMonth() + 1;
    let yy = this.solarDate.getFullYear();
    const index = jdnFromDate(dd, mm, yy) % Quotations.length;
    return Quotations[index];
  }


  private buildLunarDate() {
    let dd, mm, yy, tz;
    dd = this.solarDate.getDate();
    mm = this.solarDate.getMonth() + 1;
    yy = this.solarDate.getFullYear();
    tz = this.solarDate.getTimezoneOffset() / -60;
    const [ldd, lmm, lyy, leap] = convertSolar2Lunar(dd, mm, yy, tz);
    return new LunarDate(ldd, lmm, lyy, leap, tz);
  }

  private updateHasTask() {
    this.hasTask = false;
  }

  public setDateSolarDate(_dd: number) {
    this.solarDate.setDate(_dd);
    this.lunarDate = this.updateAll();
  }


  public setSolarDateFromString(str: string = '1900-01-01') {
    this.solarDate = new Date(str);
    this.lunarDate = this.updateAll();
  }

  public getLunarDate() {
    return this.lunarDate;
  }

}

export default LunarSolarDate;
