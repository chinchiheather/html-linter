import { IndentationConfig } from '../interfaces/config';
export declare class Indentation {
    static validate(filePath: string, lines: string[], config: IndentationConfig): string[];
}
