export interface HtmlLinterConfig {
  files: string[];
  indentation: IndentationConfig;
  attributes: AttributesConfig;
}

export interface IndentationConfig {
  char: 'space' | 'tab';
  number: number;
}

export interface AttributesConfig {
  quotes: 'single' | 'double';
  whitespace: number;
  'vertical-align': boolean;
}
