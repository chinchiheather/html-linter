export class AttrQuotes {

  static errorMsg = 'Attributes should use single quotes';

  static validate(filePath: string, lines: string[]): string[] {
    const errors: string[] = [];

    // todo: configure which quotes
    const quote = `"`;
    const attrRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;

    lines.forEach((line: string, idx: number) => {
      const attrMatches = line.match(attrRegex);
      if (attrMatches) {
        attrMatches.forEach(attrMatch => {
          const split = attrMatch.split('=');
          const attrQuote = split[1].replace(/s/g, '').charAt(0);
          if (attrQuote !== quote) {
            errors.push(`${filePath}:${idx + 1} ${AttrQuotes.errorMsg}`);
          }
        });
      }
    });

    return errors;
  }
}
