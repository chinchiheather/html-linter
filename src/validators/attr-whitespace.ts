export class AttrWhitespace {

  static errorMsg = `Attributes should have no whitespace around '=' character`;

  static validate(filePath: string, lines: string[]): string[] {
    const errors: string[] = [];

    // todo: configure
    const whitespace = 0;

    const attrRegex = /(\S+)\s?=\s?["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;

    lines.forEach((line: string, idx: number) => {
      const attrMatches = line.match(attrRegex);
      if (attrMatches) {
        attrMatches.forEach(attrMatch => {
          const split = attrMatch.split('=');
          const before = split[0].match(/\s+$/);
          const after = split[1].match(/^\s+/);
          if (before || after) {
            errors.push(`${filePath}:${idx + 1} ${AttrWhitespace.errorMsg}`);
          }
        });
      }
    });

    return errors;
  }
}
