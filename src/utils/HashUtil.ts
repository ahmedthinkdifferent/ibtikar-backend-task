import * as bcrypt from 'bcrypt';

export default class HashUtil {
  static async hash(text): Promise<string> {
    return bcrypt.hash(text, 10);
  }

  static async isMatch(plainText, hashedText): Promise<boolean> {
    return bcrypt.compare(plainText, hashedText);
  }
}
