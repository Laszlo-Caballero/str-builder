type RecordType = "undefined" | "null";

export class StringBuilder {
  constructor();
  constructor(str?: string | StringBuilder);
  constructor(str?: string | StringBuilder) {
    if (typeof str === "string") {
      this._strings.push(str);
    } else if (str instanceof StringBuilder) {
      this._strings = [...str.string];
    }
  }

  private _strings: string[] = [];

  public get string(): string[] {
    return this._strings;
  }

  private getString<T extends string | number | boolean | undefined | null>(
    str: T,
  ): string {
    let parsedStr: string;
    const records: Record<RecordType, string> = {
      undefined: "undefined",
      null: "null",
    };

    if (typeof str === "undefined" || str === null) {
      const key = typeof str === "undefined" ? "undefined" : "null";
      parsedStr = records[key];
      return parsedStr;
    }

    if (typeof str === "object") {
      try {
        return JSON.stringify(str);
      } catch {
        return (str as object).toString();
      }
    }

    return str.toString();
  }

  append<T>(str: T): StringBuilder {
    if (typeof str === "undefined") {
      this._strings.push("undefined");
      return this;
    }

    if (str === null) {
      this._strings.push("null");
      return this;
    }

    if (typeof str === "object") {
      try {
        this._strings.push(JSON.stringify(str));
      } catch {
        this._strings.push(str.toString());
      }
      return this;
    }

    this._strings.push(str.toString());
    return this;
  }

  charAt(index: number): string {
    const fullString = this._strings.join("");

    if (index < 0 || index >= fullString.length) {
      throw new RangeError("Index out of bounds");
    }

    return fullString.charAt(index);
  }

  insert<T extends string | number | boolean | undefined | null>(
    index: number,
    str: T,
  ): StringBuilder {
    let parsedStr = this.getString(str);

    const fullString = this._strings.join("");

    if (index < 0 || index > fullString.length) {
      throw new RangeError("Index out of bounds");
    }

    const before = fullString.slice(0, index);
    const after = fullString.slice(index);

    this._strings = [before, parsedStr, after];
    return this;
  }

  reverse(): StringBuilder {
    const fullString = this._strings.join("");
    const reversedString = fullString.split("").reverse().join("");
    this._strings = [reversedString];
    return this;
  }

  replace(start: number, end: number, str: string): StringBuilder {
    const fullString = this._strings.join("");
    const before = fullString.slice(0, start);
    const after = fullString.slice(end + 1);
    this._strings = [before, str, after];
    return this;
  }

  lastIndexOf(searchValue: string, fromIndex?: number): number {
    const fullString = this._strings.join("");
    return fullString.lastIndexOf(searchValue, fromIndex);
  }

  length(): number {
    return Array.from(this._strings.join("")).length;
  }

  toString(): string {
    return this._strings.join("");
  }

  delete(start: number, end: number): StringBuilder {
    const chars = Array.from(this._strings.join(""));

    if (start < 0 || end > chars.length || start > end) {
      throw new RangeError("Invalid start or end index");
    }

    chars.splice(start, end - start);
    this._strings = [chars.join("")];

    return this;
  }

  substring(start: number, end?: number): string {
    const fullString = this._strings.join("");

    if (start < 0 || start > fullString.length) {
      throw new RangeError("Start index out of bounds");
    }

    if (end) {
      if (start > end) {
        throw new RangeError("Start index cannot be greater than end index");
      }
    }

    return fullString.substring(start, end);
  }

  deleteCharAt(index: number): StringBuilder {
    const fullString = this._strings.join("");

    if (index < 0 || index >= fullString.length) {
      throw new RangeError("Index out of bounds");
    }

    const before = fullString.slice(0, index);
    const after = fullString.slice(index + 1);
    this._strings = [before, after];
    return this;
  }

  indexOf(searchValue: string, fromIndex?: number): number {
    const fullString = this._strings.join("");
    return fullString.indexOf(searchValue, fromIndex);
  }
}
