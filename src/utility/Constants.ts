
class Constant {
  public static DAY_TO_SHORT_STRING: string[][] = [
    ["T2", "Mon"],
    ["T3", "Tue"],
    ["T4", "Wed"],
    ["T5", "Thu"],
    ["T6", "Fri"],
    ["T7", "Sat"],
    ["CN", "Sun"]
  ];

  public static DAY_TO_FULL_STRING: string[][] = [
    ["Chủ Nhật", "Sunday", "星 期 日"],
    ["Thứ Hai", "Monday", "星 期 一"],
    ["Thứ Ba", "Tuesday", "星 期 二"],
    ["Thứ Tư", "Wednesday", "星 期 三"],
    ["Thứ Năm", "Thursday", "星 期 四"],
    ["Thứ Sáu", "Friday", "星 期 五"],
    ["Thứ Bảy", "Saturday", "星 期 六"]
  ];

  public static MONTH_TO_STRING: string[][] = [
    ["Tháng 1", "January"],
    ["Tháng 2", "February"],
    ["Tháng 3", "March"],
    ["Tháng 4", "April"],
    ["Tháng 5", "May"],
    ["Tháng 6", "June"],
    ["Tháng 7", "July"],
    ["Tháng 8", "August"],
    ["Tháng 9", "September"],
    ["Tháng 10", "October"],
    ["Tháng 11", "November"],
    ["Tháng 12", "December"],
  ];
  
  public static LUNAR_MONTH_TO_STRING: string[][] = [
    ["Tháng Giêng", "正 月"],
    ["Tháng Hai", "二 月"],
    ["Tháng Ba", "三 月"],
    ["Tháng Tư", "四 月"],
    ["Tháng Năm", "五 月"],
    ["Tháng Sáu", "六 月"],
    ["Tháng Bảy", "七 月"],
    ["Tháng Tám", "八 月"],
    ["Tháng Chín", "九 月"],
    ["Tháng Mười", "十 月"],
    ["Tháng Mười Một", "十 一 月"],
    ["Tháng Chạp", "腊 月"],
  ];

  public static CAN: string[][] = [
    ["Canh", "庚"],
    ["Tân", "辛"],
    ["Nhâm", "壬"],
    ["Quý", "癸"],
    ["Giáp", "甲"],
    ["Ất", "乙"],
    ["Bính", "丙"],
    ["Đinh", "丁"],
    ["Mậu", "戊"],
    ["Kỷ", "己"],
    ["Canh", "庚"],
    ["Tân", "辛"],
  ];

  public static CHI: string[][] = [
    ["Thân", "申"],
    ["Dậu", "酉"],
    ["Tuất", "戌"],
    ["Hợi", "亥"],
    ["Tý ", "子"],
    ["Sửu", "丑"],
    ["Dần", "寅"],
    ["Mão", "卯"],
    ["Thìn", "辰"],
    ["Tỵ", "巳"],
    ["Ngọ", "午"],
    ["Mùi", "未"]
  ];

  public static CHINISE_LUNAR_DATE_TO_STRING: string[] = [
    "朔 日",
    "二 日",
    "三 日",
    "四 日",
    "五 日",
    "六 日",
    "七 日",
    "八 日",
    "九 日",
    "十 日",
    "十 一 日",
    "十 二 日",
    "十 三 日",
    "十 四 日",
    "十 五 日",
    "十 六 日",
    "十 七 日",
    "十 八 日",
    "十 九 日",
    "二 十 日",
    "二 十 一 日",
    "二 十 二 日",
    "二 十 三 日",
    "二 十 四 日",
    "二 十 五 日",
    "二 十 六 日",
    "二 十 七 日",
    "二 十 八 日",
    "二 十 九 日",
    "三 十 日"
  ];

  public static TIET_KHI: string[][] = [
    ["Xuân Phân", "春 分"],
    ["Thanh Minh", "清 明"],
    ["Cốc Vũ", "穀 雨"],
    ["Lập Hạ", "立 夏"],
    ["Tiểu Mãn", "小 滿"],
    ["Mang Chủng", "芒 種"],
    ["Hạ Chí", "夏 至"],
    ["Tiểu Thử", "小 暑"],
    ["Đại Thử", "大 暑"],
    ["Lập Thu", "立 秋"],
    ["Xử Thử", "處 暑"],
    ["Bạch Lộ", "白 露"],
    ["Thu Phân", "秋 分"],
    ["Hàn Lộ", "寒 露"],
    ["Sương Giáng", "霜 降"],
    ["Lập Đông", "立 冬"],
    ["Tiểu Tuyết", "小 雪"],
    ["Đại Tuyết", "大 雪"],
    ["Đông Chí", "冬 至"],
    ["Tiểu Hàn", "小 寒"],
    ["Đại Hàn", "大 寒"],
    ["Lập Xuân", "立 春"],
    ["Vũ Thủy", "雨 水"],
    ["Kinh Trập", "驚 蟄"]
  ];

  public static LUNAR_TIMES: string[] = ["Tý(23h-1h)", "Sửu(1h-3h)", "Dần(3h-5h)", "Mão(5h-7h)",
    "Thìn(7h-9h)", "Tỵ(9h-11h)", "Ngọ(11h-13h)", "Mùi(13h-15h)", "Thân(15h-17h)", "Dậu(17h-19h)",
    "Tuất(19h-21h)", "Hợi(21h-23h)"];

  public static ECLIPTIC_TIME_MATRIX: number[][] = [
    [0, 1, 4, 5, 7, 10],
    [0, 2, 3, 6, 7, 9],
    [2, 4, 5, 8, 9, 11],
    [1, 4, 6, 7, 10, 11],
    [0, 1, 3, 6, 8, 9],
    [2, 3, 4, 8, 10, 11],
    [0, 1, 4, 5, 7, 10],
    [0, 2, 3, 6, 7, 9],
    [2, 4, 5, 8, 9, 11],
    [1, 4, 6, 7, 10, 11],
    [0, 1, 3, 6, 8, 9],
    [2, 3, 4, 8, 10, 11]];

  public static ECLIPTIC_DATE_MATRIX: number[][] = [
    [2, 4, 5, 8, 9, 11],
    [1, 4, 6, 7, 10, 11],
    [0, 1, 3, 6, 8, 9],
    [2, 3, 5, 8, 10, 11],
    [0, 1, 4, 5, 7, 10],
    [0, 2, 3, 6, 7, 9],
    [2, 4, 5, 8, 9, 11],
    [1, 4, 6, 7, 10, 11],
    [0, 1, 3, 6, 8, 9],
    [2, 3, 5, 8, 10, 11],
    [0, 1, 4, 5, 7, 10],
    [0, 2, 3, 6, 7, 9]];
}

export default Constant;