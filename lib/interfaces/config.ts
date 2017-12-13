export interface HtmlLinterConfig {
  files: string[];
  indentation: {
    char: 'space' | 'tab';
    number: number;
  };
  attributes: {
    quotes: 'single' | 'double';
    whitespace: number;
  }
}
