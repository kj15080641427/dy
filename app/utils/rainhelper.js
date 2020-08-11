/**
 * 雨量辅助类，用于常规的雨量计算和判断
 */
class RainHelper{
  /**
   * 是否小雨
   */
  static isRainLight(rain){
    return rain > 0 && rain <= 10
  }

  /**
   * 是否中雨
   * @param rain
   * @returns {boolean}
   */
  static isRainModerate(rain){
    return rain > 10 && rain <= 25;
  }

  /**
   * 是否大雨
   * @param rain
   * @returns {boolean}
   */
  static isRainHeavy(rain){
    return rain > 25 && rain <= 50;
  }

  /**
   * 是否暴雨
   * @param rain
   * @returns {boolean}
   */
  static isRainStorm(rain){
    return rain > 50 && rain <= 100;
  }

  /**
   * 是否大暴雨
   * @param rain
   * @returns {boolean}
   */
  static isRainHeavyStorm(rain){
    return rain > 100 && rain <= 250;
  }

  /**
   * 是否特大暴雨
   * @param rain
   * @returns {boolean}
   */
  static isRainHardStorm(rain){
    return rain > 250;
  }

  /**
   * 是否无雨
   * @param rain
   * @returns {boolean}
   */
  static isNoRain(rain){
    return rain <= 0;
  }
}

export default RainHelper
