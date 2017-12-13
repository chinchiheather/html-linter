export class AttrQuotes {

  static errorMsg = 'Attributes should use single quotes';

  static validate(attr: string): string[] {
    // todo: configure
    const quote = `"`;

    const split = attr.split('=');
    const attrQuote = split[1].replace(/\s/g, '').charAt(0);
    return attrQuote === quote;
  }
}
