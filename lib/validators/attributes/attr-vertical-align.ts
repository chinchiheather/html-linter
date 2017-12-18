export class AttrVerticalAlign {

  static getIndentation(line: string): number {
    const tagRegex = /<[a-zA-Z0-9-]+\s/;
    if (tagRegex.test(line)) {
      const tagStartIdx = line.search(tagRegex);
      let tagEndIdx = line.indexOf(' ', tagStartIdx);
      if (tagEndIdx !== -1) {
        const tag = line.substring(tagStartIdx + 1, tagEndIdx);
        if (line.indexOf(`>`) === -1) {
          return tagEndIdx + line.substring(tagEndIdx).search(/\S/);
        } else {
          return -1;
        }
      }
    }
  }
}
