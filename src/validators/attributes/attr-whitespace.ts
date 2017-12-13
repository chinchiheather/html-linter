export class AttrWhitespace {

  static errorMsg = `Attributes should have no whitespace around '=' character`;

  static validate(attr: string): boolean {
    // todo: configure
    const whitespace = 0;

    const split = attr.split('=');
    const before = split[0].match(/\s+$/);
    const after = split[1].match(/^\s+/);

    return !before && !after;
  }
}
