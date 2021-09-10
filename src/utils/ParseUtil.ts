export default class ParseUtil {
  static convertFieldsToInt(data, fields: string[] = []) {
    for (const field of fields) {
      if (data[field]) {
        data[field] = parseInt(data[field]);
      }
    }
    return data;
  }

  static convertFieldsToFloat(data, fields: string[] = []) {
    for (const field of fields) {
      if (data[field]) {
        data[field] = parseFloat(data[field]);
      }
    }
    return data;
  }

  static convertToInt(value) {
    return parseInt(value);
  }
}
