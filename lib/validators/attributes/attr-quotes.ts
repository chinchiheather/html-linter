export class AttrQuotes {

  static validate(attr: string, quotes: 'single' | 'double'): boolean {
    const quoteVal = quotes === 'single' ? `'` : `"`;
    const split = attr.split('=');
    const attrQuotes = split[1].replace(/\s/g, '').charAt(0);
    return attrQuotes === quoteVal;
  }
}
