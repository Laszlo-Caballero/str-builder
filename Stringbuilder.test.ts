import { StringBuilder } from "./StringBuilder.js";
import { describe, test, expect } from "vitest";

describe("Constructor", () => {
  test("empty constructor", () => {
    const sb = new StringBuilder();
    expect(sb.toString()).toBe("");
    expect(sb.length()).toBe(0);
  });

  test("constructor with initial string", () => {
    const sb = new StringBuilder("hello");
    expect(sb.toString()).toBe("hello");
    expect(sb.length()).toBe(5);
  });
});

describe("append()", () => {
  test("append string", () => {
    const sb = new StringBuilder("hola");
    sb.append(" mundo");
    expect(sb.toString()).toBe("hola mundo");
  });

  test("append multiple chained", () => {
    const sb = new StringBuilder();
    sb.append("a").append("b").append("c");
    expect(sb.toString()).toBe("abc");
  });

  test("append number", () => {
    const sb = new StringBuilder();
    sb.append(123);
    expect(sb.toString()).toBe("123");
  });

  test("append boolean", () => {
    const sb = new StringBuilder();
    sb.append(true);
    expect(sb.toString()).toBe("true");
  });
});

describe("insert()", () => {
  test("insert at beginning", () => {
    const sb = new StringBuilder("world");
    sb.insert(0, "hello ");
    expect(sb.toString()).toBe("hello world");
  });

  test("insert in middle", () => {
    const sb = new StringBuilder("helo");
    sb.insert(3, "l");
    expect(sb.toString()).toBe("hello");
  });

  test("insert at end", () => {
    const sb = new StringBuilder("hello");
    sb.insert(5, "!");
    expect(sb.toString()).toBe("hello!");
  });

  test("insert out of bounds throws", () => {
    const sb = new StringBuilder("abc");
    expect(() => sb.insert(10, "x")).toThrow();
  });
});

describe("delete()", () => {
  test("delete range", () => {
    const sb = new StringBuilder("hello world");
    sb.delete(5, 11);
    expect(sb.toString()).toBe("hello");
  });

  test("delete full string", () => {
    const sb = new StringBuilder("abc");
    sb.delete(0, 3);
    expect(sb.toString()).toBe("");
  });

  test("delete invalid range throws", () => {
    const sb = new StringBuilder("abc");
    expect(() => sb.delete(5, 2)).toThrow();
  });
});

describe("replace()", () => {
  test("replace middle section", () => {
    const sb = new StringBuilder("hello world");
    sb.replace(6, 11, "node");
    expect(sb.toString()).toBe("hello node");
  });

  test("replace entire string", () => {
    const sb = new StringBuilder("abc");
    sb.replace(0, 3, "xyz");
    expect(sb.toString()).toBe("xyz");
  });
});

describe("charAt()", () => {
  test("valid index", () => {
    const sb = new StringBuilder("abc");
    expect(sb.charAt(1)).toBe("b");
  });

  test("invalid index throws", () => {
    const sb = new StringBuilder("abc");
    expect(() => sb.charAt(5)).toThrow();
  });
});

describe("substring()", () => {
  test("basic substring", () => {
    const sb = new StringBuilder("hello");
    expect(sb.substring(1, 4)).toBe("ell");
  });

  test("substring to end", () => {
    const sb = new StringBuilder("hello");
    expect(sb.substring(2)).toBe("llo");
  });

  test("invalid range throws", () => {
    const sb = new StringBuilder("hello");
    expect(() => sb.substring(4, 2)).toThrow();
  });
});

describe("reverse()", () => {
  test("reverse normal string", () => {
    const sb = new StringBuilder("abc");
    sb.reverse();
    expect(sb.toString()).toBe("cba");
  });

  test("reverse twice returns original", () => {
    const sb = new StringBuilder("abcdef");
    sb.reverse().reverse();
    expect(sb.toString()).toBe("abcdef");
  });
});

describe("Stress test", () => {
  test("append 10000 times", () => {
    const sb = new StringBuilder();
    for (let i = 0; i < 10000; i++) {
      sb.append("a");
    }
    expect(sb.length()).toBe(10000);
  });
});

describe("Java behavior compatibility", () => {
  test("complex chain operation", () => {
    const sb = new StringBuilder("abc");
    sb.append("def").insert(3, "123").delete(0, 2).replace(2, 4, "ZZ");

    expect(sb.toString()).toBe("c1ZZef");
  });
});

describe("Edge cases hardcore", () => {
  test('append null should convert to "null"', () => {
    const sb = new StringBuilder();
    sb.append(null);
    expect(sb.toString()).toBe("null");
  });

  test('append undefined should convert to "undefined"', () => {
    const sb = new StringBuilder();
    sb.append(undefined);
    expect(sb.toString()).toBe("undefined");
  });

  test("insert negative index throws", () => {
    const sb = new StringBuilder("abc");
    expect(() => sb.insert(-1, "x")).toThrow();
  });
});

describe("Edge cases hardcore", () => {
  test('append null should convert to "null"', () => {
    const sb = new StringBuilder();
    sb.append(null);
    expect(sb.toString()).toBe("null");
  });

  test('append undefined should convert to "undefined"', () => {
    const sb = new StringBuilder();
    sb.append(undefined);
    expect(sb.toString()).toBe("undefined");
  });

  test("insert negative index throws", () => {
    const sb = new StringBuilder("abc");
    expect(() => sb.insert(-1, "x")).toThrow();
  });
});

describe("Mutability behavior", () => {
  test("append returns same instance", () => {
    const sb = new StringBuilder("a");
    const result = sb.append("b");
    expect(result).toBe(sb);
  });

  test("insert returns same instance", () => {
    const sb = new StringBuilder("abc");
    const result = sb.insert(1, "X");
    expect(result).toBe(sb);
  });

  test("reverse mutates same object", () => {
    const sb = new StringBuilder("abc");
    const ref = sb;
    sb.reverse();
    expect(sb).toBe(ref);
    expect(sb.toString()).toBe("cba");
  });
});

describe("Boundary correctness", () => {
  test("delete does NOT include end index", () => {
    const sb = new StringBuilder("abcdef");
    sb.delete(2, 4);
    expect(sb.toString()).toBe("abef");
  });

  test("substring does NOT include end index", () => {
    const sb = new StringBuilder("abcdef");
    expect(sb.substring(2, 4)).toBe("cd");
  });

  test("deleteCharAt removes exactly one char", () => {
    const sb = new StringBuilder("abc");
    sb.deleteCharAt(1);
    expect(sb.toString()).toBe("ac");
  });
});

describe("Unicode handling", () => {
  test("handles emojis correctly", () => {
    const sb = new StringBuilder("😀😃😄");
    expect(sb.length()).toBe(3);
    sb.delete(1, 2);
    expect(sb.toString()).toBe("😀😄");
  });

  test("reverse preserves unicode", () => {
    const sb = new StringBuilder("ñáü");
    sb.reverse();
    expect(sb.toString()).toBe("üáñ");
  });
});

describe("Internal invariants", () => {
  test("length matches toString length always", () => {
    const sb = new StringBuilder();

    for (let i = 0; i < 500; i++) {
      sb.append("x");
      expect(sb.length()).toBe(sb.toString().length);
    }
  });

  test("after random mutations length always correct", () => {
    const sb = new StringBuilder("abcdef");

    sb.delete(1, 3);
    sb.insert(2, "ZZZ");
    sb.replace(0, 2, "Q");
    sb.reverse();

    expect(sb.length()).toBe(sb.toString().length);
  });
});

describe("Internal invariants", () => {
  test("length matches toString length always", () => {
    const sb = new StringBuilder();

    for (let i = 0; i < 500; i++) {
      sb.append("x");
      expect(sb.length()).toBe(sb.toString().length);
    }
  });

  test("after random mutations length always correct", () => {
    const sb = new StringBuilder("abcdef");

    sb.delete(1, 3);
    sb.insert(2, "ZZZ");
    sb.replace(0, 2, "Q");
    sb.reverse();

    expect(sb.length()).toBe(sb.toString().length);
  });
});

describe("Interleaved operations hell", () => {
  test("random mixed operations remain deterministic", () => {
    const sb = new StringBuilder();
    let reference = "";

    for (let i = 0; i < 300; i++) {
      const op = i % 4;

      if (op === 0) {
        sb.append("A");
        reference += "A";
      }

      if (op === 1 && reference.length > 0) {
        sb.deleteCharAt(reference.length - 1);
        reference = reference.slice(0, -1);
      }

      if (op === 2) {
        sb.insert(0, "Z");
        reference = "Z" + reference;
      }

      if (op === 3 && reference.length > 2) {
        sb.delete(1, 2);
        reference = reference.slice(0, 1) + reference.slice(2);
      }
    }

    expect(sb.toString()).toBe(reference);
  });
});

describe("Interleaved operations hell", () => {
  test("random mixed operations remain deterministic", () => {
    const sb = new StringBuilder();
    let reference = "";

    for (let i = 0; i < 300; i++) {
      const op = i % 4;

      if (op === 0) {
        sb.append("A");
        reference += "A";
      }

      if (op === 1 && reference.length > 0) {
        sb.deleteCharAt(reference.length - 1);
        reference = reference.slice(0, -1);
      }

      if (op === 2) {
        sb.insert(0, "Z");
        reference = "Z" + reference;
      }

      if (op === 3 && reference.length > 2) {
        sb.delete(1, 2);
        reference = reference.slice(0, 1) + reference.slice(2);
      }
    }

    expect(sb.toString()).toBe(reference);
  });
});

describe("Interleaved operations hell", () => {
  test("random mixed operations remain deterministic", () => {
    const sb = new StringBuilder();
    let reference = "";

    for (let i = 0; i < 300; i++) {
      const op = i % 4;

      if (op === 0) {
        sb.append("A");
        reference += "A";
      }

      if (op === 1 && reference.length > 0) {
        sb.deleteCharAt(reference.length - 1);
        reference = reference.slice(0, -1);
      }

      if (op === 2) {
        sb.insert(0, "Z");
        reference = "Z" + reference;
      }

      if (op === 3 && reference.length > 2) {
        sb.delete(1, 2);
        reference = reference.slice(0, 1) + reference.slice(2);
      }
    }

    expect(sb.toString()).toBe(reference);
  });
});
describe("Very large growth", () => {
  test("100k append performance sanity", () => {
    const sb = new StringBuilder();

    for (let i = 0; i < 100000; i++) {
      sb.append("x");
    }

    expect(sb.length()).toBe(100000);
  });
});

describe("Random index torture", () => {
  test("random inserts stay valid", () => {
    const sb = new StringBuilder("abc");
    let reference = "abc";

    for (let i = 0; i < 50; i++) {
      const pos = Math.floor(Math.random() * (reference.length + 1));
      sb.insert(pos, "X");
      reference = reference.slice(0, pos) + "X" + reference.slice(pos);
    }

    expect(sb.toString()).toBe(reference);
  });
});

describe("Illegal state validation", () => {
  test("delete start < 0 throws", () => {
    const sb = new StringBuilder("abc");
    expect(() => sb.delete(-1, 2)).toThrow();
  });

  test("delete start > length throws", () => {
    const sb = new StringBuilder("abc");
    expect(() => sb.delete(5, 6)).toThrow();
  });

  test("insert negative index throws", () => {
    const sb = new StringBuilder("abc");
    expect(() => sb.insert(-5, "X")).toThrow();
  });
});

describe("Rebuild consistency", () => {
  test("rebuild from scratch equals original", () => {
    const original = "abcdefghijklmnopqrstuvwxyz";
    const sb = new StringBuilder();

    for (const ch of original) {
      sb.append(ch);
    }

    expect(sb.toString()).toBe(original);
  });
});

describe("Search operations", () => {
  test("indexOf finds first occurrence", () => {
    const sb = new StringBuilder("abcabc");
    expect(sb.indexOf("bc")).toBe(1);
  });

  test("lastIndexOf finds last occurrence", () => {
    const sb = new StringBuilder("abcabc");
    expect(sb.lastIndexOf("bc")).toBe(4);
  });

  test("indexOf returns -1 if not found", () => {
    const sb = new StringBuilder("abc");
    expect(sb.indexOf("Z")).toBe(-1);
  });
});
