type RecordType = "undefined" | "null";

export class StringBuilder {
  /**
   * Creates a new instance of the StringBuilder class. If a string or another StringBuilder instance is provided as an argument, the new StringBuilder will be initialized with the contents of that string or StringBuilder. If no argument is provided, the new StringBuilder will be initialized as an empty string.
   */
  constructor();
  /**
   * @param str A string or another StringBuilder instance to initialize the new StringBuilder with. If a string is provided, the new StringBuilder will contain that string. If another StringBuilder instance is provided, the new StringBuilder will contain the same string as that instance.
   */
  constructor(str?: string | StringBuilder);
  /**
   * @param str A string or another StringBuilder instance to initialize the new StringBuilder with. If a string is provided, the new StringBuilder will contain that string. If another StringBuilder instance is provided, the new StringBuilder will contain the same string as that instance.
   */
  constructor(str?: string | StringBuilder) {
    if (typeof str === "string") {
      this._strings.push(str);
    } else if (str instanceof StringBuilder) {
      this._strings = [...str.strings];
    }
  }

  private _strings: string[] = [];

  /**
   * Returns the array of strings that make up the StringBuilder. This is a read-only property and should not be modified directly.
   * If you want to modify the string, use the append, insert, replace, delete, or deleteCharAt methods instead.
   * @returns An array of strings that make up the StringBuilder.
   */
  public get strings(): string[] {
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

  /**
   * Appends the string representation of the given value to the end of the StringBuilder. If the value is undefined or null, it will be converted to the string "undefined" or "null" respectively. If the value is an object, it will be converted to a JSON string if possible, otherwise it will use the object's toString method.
   * @param str
   * The value to append to the StringBuilder. This can be of any type, and it will be converted to a string before being appended.
   * @returns
   */
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

  /**
   * Returns the character at the specified index in the StringBuilder.
   * @param index The index of the character to return.
   * @returns The character at the specified index.
   */
  charAt(index: number): string {
    const fullString = this._strings.join("");

    if (index < 0 || index >= fullString.length) {
      throw new RangeError("Index out of bounds");
    }

    return fullString.charAt(index);
  }

  /**
   * Inserts the string representation of the given value at the specified index in the StringBuilder. If the value is undefined or null, it will be converted to the string "undefined" or "null" respectively. If the value is an object, it will be converted to a JSON string if possible, otherwise it will use the object's toString method.
   * @param index The index at which to insert the string.
   * @param str The value to insert. This can be of any type, and it will be converted to a string before being inserted.
   * @returns The StringBuilder instance, allowing for method chaining.
   */
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

  /**
   * Reverses the order of the characters in the StringBuilder. This method will reverse the entire string, including any spaces or special characters. After calling this method, the StringBuilder will contain the reversed string.
   * @returns The StringBuilder instance, allowing for method chaining.
   */
  reverse(): StringBuilder {
    const fullString = this._strings.join("");
    const reversedString = fullString.split("").reverse().join("");
    this._strings = [reversedString];
    return this;
  }

  /**
   * Replaces the characters in the StringBuilder from the specified start index to the end index with the given string. The start index is inclusive, while the end index is exclusive. If the end index is not provided, it will replace all characters from the start index to the end of the StringBuilder. If the start or end index is out of bounds, a RangeError will be thrown.
   * @param start
   * The index of the first character to replace.
   * @param end
   * The index of the character after the last character to replace.
   * @param str
   * The string with which to replace the specified characters.
   * @returns The StringBuilder instance, allowing for method chaining.
   */
  replace(start: number, end: number, str: string): StringBuilder {
    const fullString = this._strings.join("");
    const before = fullString.slice(0, start);
    const after = fullString.slice(end + 1);
    this._strings = [before, str, after];
    return this;
  }

  /**
   * Returns the index of the last occurrence of the specified search value in the StringBuilder, or -1 if it is not found. The search starts at the specified fromIndex and continues backwards towards the beginning of the StringBuilder. If fromIndex is not provided, the search starts from the end of the StringBuilder.
   * @param searchValue
   * The string to search for in the StringBuilder.
   * @param fromIndex
   * The index at which to start searching backwards. If not provided, the search starts from the end of the StringBuilder.
   * @returns The index of the last occurrence of the specified search value, or -1 if it is not found.
   * @throws RangeError if fromIndex is out of bounds.
   */
  lastIndexOf(searchValue: string, fromIndex?: number): number {
    const fullString = this._strings.join("");
    return fullString.lastIndexOf(searchValue, fromIndex);
  }

  /**
   * Returns the length of the string represented by the StringBuilder. This is calculated by joining all the strings in the _strings array and returning the length of the resulting string. The length is returned as a number.
   * @returns The length of the string represented by the StringBuilder.
   */
  length(): number {
    return Array.from(this._strings.join("")).length;
  }

  /**
   * Returns a string representation of the StringBuilder by joining all the strings in the _strings array. This method will return the complete string that the StringBuilder represents. If the StringBuilder is empty, it will return an empty string.
   * @returns A string representation of the StringBuilder.
   */
  toString(): string {
    return this._strings.join("");
  }

  /**
   * Deletes the characters in the StringBuilder from the specified start index to the end index. The start index is inclusive, while the end index is exclusive. If the end index is not provided, it will delete all characters from the start index to the end of the StringBuilder. If the start or end index is out of bounds, a RangeError will be thrown.
   * @param start
   * The index of the first character to delete.
   * @param end
   * The index of the character after the last character to delete.
   * @returns The StringBuilder instance, allowing for method chaining.
   * @throws RangeError if start or end index is out of bounds, or if start index is greater than end index.
   */
  delete(start: number, end: number): StringBuilder {
    const chars = Array.from(this._strings.join(""));

    if (start < 0 || end > chars.length || start > end) {
      throw new RangeError("Invalid start or end index");
    }

    chars.splice(start, end - start);
    this._strings = [chars.join("")];

    return this;
  }

  /**
   * Returns a substring of the StringBuilder starting from the specified start index and ending at the specified end index. The start index is inclusive, while the end index is exclusive. If the end index is not provided, it will return the substring from the start index to the end of the StringBuilder. If the start or end index is out of bounds, a RangeError will be thrown.
   * @param start
   * The index of the first character to include in the substring.
   * @param end
   * The index of the character after the last character to include in the substring.
   * @returns A string representation of the substring.
   * @throws RangeError if start or end index is out of bounds, or if start index is greater than end index.
   */
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

  /**
   * Deletes the character at the specified index in the StringBuilder. The index is zero-based, meaning that the first character is at index 0. If the index is out of bounds, a RangeError will be thrown.
   * @param index
   * The index of the character to delete. This must be a non-negative integer that is less than the length of the string represented by the StringBuilder.
   * @returns  The StringBuilder instance, allowing for method chaining
   * @throws RangeError if the index is out of bounds (i.e., if it is negative or greater than or equal to the length of the string represented by the StringBuilder).
   */
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

  /**
   * Returns the index of the first occurrence of the specified search value in the StringBuilder, or -1 if it is not found. The search starts at the specified fromIndex and continues towards the end of the StringBuilder. If fromIndex is not provided, the search starts from the beginning of the StringBuilder.
   * @param searchValue
   * The string to search for in the StringBuilder.
   * @param fromIndex
   * The index at which to start searching. If not provided, the search starts from the beginning of the StringBuilder.
   * @returns
   * @throws RangeError if fromIndex is out of bounds.
   */
  indexOf(searchValue: string, fromIndex?: number): number {
    const fullString = this._strings.join("");
    return fullString.indexOf(searchValue, fromIndex);
  }
}
