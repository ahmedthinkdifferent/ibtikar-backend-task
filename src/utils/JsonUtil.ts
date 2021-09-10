export default class JsonUtil {
  static removeFields(json, fields = []) {
    for (const field of fields) {
      delete json[field];
    }
    return json;
  }
}
