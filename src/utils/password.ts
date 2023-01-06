/**
 * 密碼工具類
 */
class PasswordUtil {
  /**
   * 校驗密碼是否符合要求 (小寫字母、大寫字母、數字、特殊字符，4種滿足其中3種; 且長度至少 8 位)
   * @param {string} password 要進行校驗的密碼
   * @return {boolean} 是否符合要求
   */
  static isValid(password: string): boolean {
    // 定義每種類型的字符的正則表達式
    const lowerCharReg = /[a-z]/;
    const upperCharReg = /[A-Z]/;
    const digitCharReg = /[0-9]/;
    const specialCharReg = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    // 初始化計數器
    let count = 0;

    // 判斷是否包含小寫字母
    if (lowerCharReg.test(password)) {
      count++;
    }

    // 判斷是否包含大寫字母
    if (upperCharReg.test(password)) {
      count++;
    }

    // 判斷是否包含數字
    if (digitCharReg.test(password)) {
      count++;
    }

    // 判斷是否包含特殊字符
    if (specialCharReg.test(password)) {
      count++;
    }

    // 判斷密碼長度是否大於等於 8 個字符並且包含至少 3 種類型的字符
    return password.length >= 8 && count >= 3;
  }
}

export default PasswordUtil;
