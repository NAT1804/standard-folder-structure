export class Validator {
  public static isEmplty(val: string | undefined) {
    return !val || val.replace(/ /g, '').length <= 0;
  }
  public static funcValidValueString(
    value: string,
    validValue: ValidatorItem,
    mess: string
  ) {
    const validRequired = this.isEmplty(value);
    validRequired ? validValue.addMess(mess) : validValue.removeMess(mess);
    return !validRequired;
  }
}

export class DataValidator {
  [key: string]: ValidatorItem;
}

export class ValidatorItem {
  messages: string[];
  isRequired?: boolean;
  constructor() {
    this.messages = [];
  }
  public toMessageString() {
    return this.messages.join(', ');
  }
  public addMess(str: string) {
    if (!this.messages.includes(str)) {
      this.messages.push(str);
    }
  }
  public removeMess(str: string) {
    if (this.messages.includes(str)) {
      this.messages.splice(
        this.messages.findIndex((m) => m === str),
        1
      );
    }
  }
}
