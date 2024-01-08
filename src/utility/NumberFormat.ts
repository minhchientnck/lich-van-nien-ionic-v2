class NumberFormat {
  public static formatNumber2Digits(n: number) {
    return String('0' + n).slice(-2);
  }
}

export default NumberFormat;
