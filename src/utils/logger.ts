import winston from 'winston';

// 日誌格式
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

// 構建 日誌對象
const logger = winston.createLogger(
    {
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            logFormat,
        ),
    }
)

export { logger };