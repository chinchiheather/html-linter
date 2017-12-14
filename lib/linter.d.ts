import { HtmlLinterConfig } from './interfaces/config';
export declare class Linter {
    static lint(config: HtmlLinterConfig, fileList: string[]): Promise<string[]>;
}
