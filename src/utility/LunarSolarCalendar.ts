import LunarDate from "./LunarDate";
import LunarSolarDate from "./LunarSolarDate";

export const isLackMonth = (date: LunarSolarDate) => {
  const dd = date.solarDate.getDate();
  const mm = date.solarDate.getMonth() + 1;
  const yy = date.solarDate.getFullYear();
  const _date: LunarSolarDate = new LunarSolarDate();
  _date.setSolarDateFromString(`${yy}-${mm}-${dd}`);

  if (_date.lunarDate.ldd === 30) return false;
  while (_date.lunarDate.ldd < 29) {
    _date.setDateSolarDate(_date.solarDate.getDate() + 1)
  }
  _date.setDateSolarDate(_date.solarDate.getDate() + 1)
  if (_date.lunarDate.ldd === 1) return true;
  return false;
}

class LunarSolarCalendar {
  private month: number;
  private year: number;
  private lunarSolarDates: Array<LunarSolarDate | null>;

  constructor(month: number, year: number) {
    this.month = month;
    this.year = year;
    this.lunarSolarDates = this.buildMonth();
  }

  public numDayOfMonth(mm: number, yy: number) {
    switch (mm) {
      case 4: case 6: case 9: case 11:
        return 30;
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        return 31;
      case 2:
        if (yy % 4 === 0) return 29;
        return 28;
    }
    throw new Error('Invalid Month');
  }

  public buildMonth() {
    const NUM_OF_MONTH = this.numDayOfMonth(this.month, this.year) || 0;
    const firstDate: LunarSolarDate = new LunarSolarDate();
    firstDate.setSolarDateFromString(`${this.year}-${this.month}-${1}`);
    let dw = firstDate.solarDate.getDay();
    if (dw === 0) dw = 7;
    const lunarSolarDates: Array<LunarSolarDate | null> = [];
    let count = 0;
    while (count < 42) {
      if (count < dw - 1) {
        lunarSolarDates.push(null);
      } else if (count - dw < NUM_OF_MONTH - 1) {
        const date: LunarSolarDate = new LunarSolarDate();
        date.setSolarDateFromString(`${this.year}-${this.month}-${count - dw + 2}`);
        date.lunarDate.isLackMonth = isLackMonth(date);
        lunarSolarDates.push(date);
      } else {
        lunarSolarDates.push(null);
      }
      count++;
    }
    return lunarSolarDates;
  }

  public setMonth(month: number) {
    this.month = month;
  }

  public setYear(year: number) {
    this.year = year;
  }

  public setMonthAndYear(month: number, year: number) {
    this.month = month;
    this.year = year;
  }

  public getMonth() {
    return this.month;
  }

  public getYear() {
    return this.year;
  }

}

export default LunarSolarCalendar;
