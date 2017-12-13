export class AttrWhitespace {

  static validate(attr: string, whitespace: number): boolean {
    const split = attr.split('=');
    const before = split[0].match(/\s+$/);
    const after = split[1].match(/^\s+/);

    let valid: boolean;
    if (whitespace === 0) {
      valid = !before && !after;
    } else {
      valid = before && before.length === whitespace && after && after.length === whitespace;
    }

    return valid;
  }
}
