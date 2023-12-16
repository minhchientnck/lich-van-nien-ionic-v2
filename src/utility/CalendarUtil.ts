import LunarSolarDate from "./LunarSolarDate";
import { jdnFromDate, getSunLongitude, SunLongitude, INT } from './LunarUtil';
import SolarHolidayData from './resource/solar-holiday.json';
import LunarHolidayData from './resource/lunar-holiday.json';
import GoodContentData from './resource/good-sentences.json';

class CalendarUtil {

  public static ShortDayStrings: String[][] = [
    ['T2', 'Mon'],
    ['T3', 'Tue'],
    ['T4', 'Wed'],
    ['T5', 'Thu'],
    ['T6', 'Fri'],
    ['T7', 'Sat'],
    ['CN', 'Sun']
  ];

  public static FullDayStrings: String[][] = [
    ['Chủ Nhật', 'Sunday', '星 期 日'],
    ['Thứ Hai', 'Monday', '星 期 一'],
    ['Thứ Ba', 'Tuesday', '星 期 二'],
    ['Thứ Tư', 'Wednesday', '星 期 三'],
    ['Thứ Năm', 'Thursday', '星 期 四'],
    ['Thứ Sáu', 'Friday', '星 期 五'],
    ['Thứ Bảy', 'Saturday', '星 期 六']
  ]

  public static MonthStrings: String[][] = [
    ['Tháng 1', 'January'],
    ['Tháng 2', 'February'],
    ['Tháng 3', 'March'],
    ['Tháng 4', 'April'],
    ['Tháng 5', 'May'],
    ['Tháng 6', 'June'],
    ['Tháng 7', 'July'],
    ['Tháng 8', 'August'],
    ['Tháng 9', 'September'],
    ['Tháng 10', 'October'],
    ['Tháng 11', 'November'],
    ['Tháng 12', 'December'],
  ]

  public static LunarMonthStrings: String[][] = [
    ['Giêng', '正 月'],
    ['Hai', '二 月'],
    ['Ba', '三 月'],
    ['Tư', '四 月'],
    ['Năm', '五 月'],
    ['Sáu', '六 月'],
    ['Bảy', '七 月'],
    ['Tám', '八 月'],
    ['Chín', '九 月'],
    ['Mười', '十 月'],
    ['Mười Một', '十 一 月'],
    ['Chạp', '腊 月'],
  ];

  public static StemList: String[][] = [
    ['Canh', '庚'],
    ['Tân', '辛'],
    ['Nhâm', '壬'],
    ['Quý', '癸'],
    ['Giáp', '甲'],
    ['Ất', '乙'],
    ['Bính', '丙'],
    ['Đinh', '丁'],
    ['Mậu', '戊'],
    ['Kỷ', '己'],
    ['Canh', '庚'],
    ['Tân', '辛'],
  ];

  public static BranchList: String[][] = [
    ['Thân', '申'],
    ['Dậu', '酉'],
    ['Tuất', '戌'],
    ['Hợi', '亥'],
    ['Tý ', '子'],
    ['Sửu', '丑'],
    ['Dần', '寅'],
    ['Mão', '卯'],
    ['Thìn', '辰'],
    ['Tỵ', '巳'],
    ['Ngọ', '午'],
    ['Mùi', '未']
  ];

  public static ChineseLunarDateStrings = [
    '朔 日',
    '二 日',
    '三 日',
    '四 日',
    '五 日',
    '六 日',
    '七 日',
    '八 日',
    '九 日',
    '十 日',
    '十 一 日',
    '十 二 日',
    '十 三 日',
    '十 四 日',
    '十 五 日',
    '十 六 日',
    '十 七 日',
    '十 八 日',
    '十 九 日',
    '二 十 日',
    '二 十 一 日',
    '二 十 二 日',
    '二 十 三 日',
    '二 十 四 日',
    '二 十 五 日',
    '二 十 六 日',
    '二 十 七 日',
    '二 十 八 日',
    '二 十 九 日',
    '三 十 日'
  ];

  public static TietKhiStrings: String[][] = [
    ['Xuân Phân', '春 分'],
    ['Thanh Minh', '清 明'],
    ['Cốc Vũ', '穀 雨'],
    ['Lập Hạ', '立 夏'],
    ['Tiểu Mãn', '小 滿'],
    ['Mang Chủng', '芒 種'],
    ['Hạ Chí', '夏 至'],
    ['Tiểu Thử', '小 暑'],
    ['Đại Thử', '大 暑'],
    ['Lập Thu', '立 秋'],
    ['Xử Thử', '處 暑'],
    ['Bạch Lộ', '白 露'],
    ['Thu Phân', '秋 分'],
    ['Hàn Lộ', '寒 露'],
    ['Sương Giáng', '霜 降'],
    ['Lập Đông', '立 冬'],
    ['Tiểu Tuyết', '小 雪'],
    ['Đại Tuyết', '大 雪'],
    ['Đông Chí', '冬 至'],
    ['Tiểu Hàn', '小 寒'],
    ['Đại Hàn', '大 寒'],
    ['Lập Xuân', '立 春'],
    ['Vũ Thủy', '雨 水'],
    ['Kinh Trập', '驚 蟄']
  ];

  public static convertLunarTime2StemBranch = (date: LunarSolarDate) => {
    let [dd, mm, yy, dw, tz] = date.convertSolarDateToArray();
    let stemIndex = (jdnFromDate(dd, mm, yy) + 3) % 10;
    let index;
    const a = stemIndex % 5;
    if (a === 4) {
      index = 4;
    } else if (a === 0) {
      index = 6;
    } else if (a === 1) {
      index = 8;
    } else if (a === 2) {
      index = 0;
    } else {
      index = 2;
    }
    const stem = this.StemList[index];
    const branch = this.BranchList[4];
    return `${stem} ${branch}`;
  }

  public static convertLunarDate2StemBranch = (date: LunarSolarDate) => {
    let [dd, mm, yy, dw, tz] = date.convertSolarDateToArray();
    const stem = this.StemList[(jdnFromDate(dd, mm, yy) + 3) % 10];
    const branch = this.BranchList[(jdnFromDate(dd, mm, yy) + 5) % 12];
    return [`${stem[0]} ${branch[0]}`, `${stem[1]} ${branch[1]}`];
  }

  public static convertLunarMonth2StemBranch = (lmm: number, lyy: number) => {
    const stemIndex = ((lyy * 12) + 7 + lmm) % 10;
    const branchIndex = (lmm + 5) % 12;
    const stem = this.StemList[stemIndex];
    const branch = this.BranchList[branchIndex];
    return [`${stem[0]} ${branch[0]}`, `${stem[1]} ${branch[1]}`];
  }

  public static convertLunarYear2StemBranch = (yy: number) => {
    return [
      `${this.StemList[yy % 10][0]} ${this.BranchList[yy % 12][0]}`,
      `${this.StemList[yy % 10][1]} ${this.BranchList[yy % 12][1]}`
    ];
  }

  public static getEventsFromDate = (date: LunarSolarDate) => {
    let eventsSolar: any = [];
    let eventsLunar: any = [];
    let marked: any = false;
    let [dd, mm, yy, dw, tz] = date.convertSolarDateToArray();
    SolarHolidayData.find(o => {
      if (o.date === dd && o.month === mm) {
        eventsSolar = o.events;
        marked = o.marked;
      }
    });

    LunarHolidayData.find(o => {
      if (o.date === date.getLunarDate().getLdd() && o.month === date.getLunarDate().getLmm()) {
        eventsLunar = o.events;
        marked = o.marked;
      }
    });
    return {
      eventsSolar,
      eventsLunar,
      marked,
    };
  }

  public static isHoangDaoDate = (d: LunarSolarDate) => {
    let [dd, mm, yy, dw, tz] = d.convertSolarDateToArray();
    const branchIndex = (jdnFromDate(dd, mm, yy) + 5) % 12;
    const gieng_bay = [4, 5, 9, 11];
    const hai_tam = [6, 7, 11, 1];
    const ba_chin = [8, 9, 1, 3];
    const tu_muoi = [10, 11, 5, 1];
    const nam_muoimot = [0, 1, 5, 7];
    const sau_chap = [2, 3, 7, 9];
    switch (mm) {
      case 1: case 7:
        if (gieng_bay.includes(branchIndex)) {
          return true;
        }
        return false;
      case 2: case 8:
        if (hai_tam.includes(branchIndex)) {
          return true;
        }
        return false;
      case 3: case 9:
        if (ba_chin.includes(branchIndex)) {
          return true;
        }
        return false;
      case 4: case 10:
        if (tu_muoi.includes(branchIndex)) {
          return true;
        }
        return false;
      case 5: case 11:
        if (nam_muoimot.includes(branchIndex)) {
          return true;
        }
        return false;
      case 6: case 12:
        if (sau_chap.includes(branchIndex)) {
          return true;
        }
        return false;
    }
  }

  public static getGoodSentence = (d: LunarSolarDate) => {
    let [dd, mm, yy, dw, tz] = d.convertSolarDateToArray();
    const index = jdnFromDate(dd, mm, yy) % GoodContentData.length;
    return GoodContentData[index];
  }

  public static getHoangDaoTimes = (d: LunarSolarDate) => {
    let [dd, mm, yy, dw, tz] = d.convertSolarDateToArray();
    const branchIndex = (jdnFromDate(dd, mm, yy) + 5) % 12;
    const BranchTimeList: String[] = ['Tý', 'Sửu', 'Dần', 'Mẹo', 'Thìn',
      'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
    const LunarTimes = ['23h-1h', '1h-3h', '3h-5h', '5h-7h', '7h-9h', '9h-11h',
      '11h-13h', '13h-15h', '15h-17h', '17h-19h', '19h-21h', '21h-23h'];
    const DanThan = [0, 1, 4, 5, 7, 10];
    const MeoDau = [0, 2, 3, 6, 7, 9];
    const ThinTuat = [2, 4, 5, 8, 9, 11];
    const TyHoi = [1, 4, 6, 7, 10, 11];
    const TiNgo = [0, 1, 3, 6, 8, 9];
    const SuuMui = [2, 3, 4, 8, 10, 11];
    let HoangDaoTimes: any[] = [];
    switch (branchIndex) {
      case 0: case 6:
        HoangDaoTimes = DanThan.map(i => `${BranchTimeList[i]} (${LunarTimes[i]})`);
        break;
      case 1: case 7:
        HoangDaoTimes = MeoDau.map(i => `${BranchTimeList[i]} (${LunarTimes[i]})`);
        break;
      case 2: case 8:
        HoangDaoTimes = ThinTuat.map(i => `${BranchTimeList[i]} (${LunarTimes[i]})`);
        break;
      case 3: case 9:
        HoangDaoTimes = TyHoi.map(i => `${BranchTimeList[i]} (${LunarTimes[i]})`);
        break;
      case 4: case 10:
        HoangDaoTimes = TiNgo.map(i => `${BranchTimeList[i]} (${LunarTimes[i]})`);
        break;
      case 5: case 11:
        HoangDaoTimes = SuuMui.map(i => `${BranchTimeList[i]} (${LunarTimes[i]})`);
        break;
    }
    return [HoangDaoTimes.slice(0, 3), HoangDaoTimes.slice(3, 6)];
  }

  public static getTietKhi = (date: LunarSolarDate) => {
    const [dd, mm, yy, dw, tz] = date.convertSolarDateToArray();
    const JD = jdnFromDate(dd, mm, yy) + 1;
    const index = INT(SunLongitude(JD - 0.5 - tz / 24) / Math.PI * 12);
    return CalendarUtil.TietKhiStrings[index];
  }

  public static formatNumber2Digits = (n: number) => {
    return String('0' + n).slice(-2);
  }

  public static numberDateFromSolarMonth(mm: number, yy: number) {
    switch (mm) {
      case 4: case 6: case 9: case 11:
        return 30;
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        return 31;
      case 2:
        if (yy % 4 === 0) return 29;
        return 28;
    }
    return;
  }

  public static isLackLunarMonth = (date: LunarSolarDate) => {
    let _date: LunarSolarDate = new LunarSolarDate();
    _date.setSolarDateFromString(`${date.getSolarDate().getFullYear()}-${date.getSolarDate().getMonth() + 1}-${date.getSolarDate().getDate()}`)
    if (_date.getLunarDate().getLdd() === 30) return false;
    while (_date.getLunarDate().getLdd() < 29) {
      _date.setDateSolarDate(_date.getSolarDate().getDate() + 1);
    }
    _date.setDateSolarDate(_date.getSolarDate().getDate() + 1);
    if (_date.getLunarDate().getLdd() === 1) return true;
    return false;
  }

  public static async getDatesFromMonth(mm: number, yy: number) {
    const numberDate: any = this.numberDateFromSolarMonth(mm, yy);
    const datelist: any[] = [];
    let startDate = new LunarSolarDate();
    await startDate.setSolarDateFromString(`${yy}-${mm}-${1}`);
    let startDay = startDate.getSolarDate().getDay();
    if (startDay === 0) startDay = 7;
    for (let i = 0; i < startDay - 1; i++) {
      datelist.push(null);
    }
    for (let i = 0; i < numberDate; i++) {
      const date = new LunarSolarDate();
      await date.setSolarDateFromString(`${yy}-${mm}-${i + 1}`);
      datelist.push(date);
    }
    const dategrid: any[] = [];
    for (let i = 0; i < Math.ceil(datelist.length / 7); i++) {
      dategrid[i] = datelist.slice(i * 7, 7 * i + 7);
    }
    const lastrowlength = dategrid[dategrid.length - 1].length;
    for (let i = 0; i < (7 - lastrowlength); i++) {
      dategrid[dategrid.length - 1].push(null);
    }
    if (dategrid.length < 6) {
      dategrid[dategrid.length] = [null, null, null, null, null, null, null];
    }
    return dategrid;
  }
}

export default CalendarUtil;
