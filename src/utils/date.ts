/**
 * 日期工具類
 */
class DateUtil {
  /**
   * 將 日期對象 格式化成 字串
   * @param {Date} date 日期對象
   * @return {string} 格式化後的字串
   */
  static format(date: Date): string {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const formattedDate = new Intl.DateTimeFormat('zh-TW', options).format(
      date,
    );
    return formattedDate;
  }
}

export default DateUtil;
