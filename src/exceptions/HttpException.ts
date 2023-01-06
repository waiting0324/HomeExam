/**
 * 自定義 HTTP 異常
 */
export class HttpException extends Error {
  public status: number;
  public message: string;

  /**
   * 構造函數
   * @param {number} status HTTP 狀態碼
   * @param {string} message 錯誤消息
   */
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
