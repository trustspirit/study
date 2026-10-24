// [스택] Valid Parentheses
// '(' ')' '{' '}' '[' ']' 로만 이루어진 문자열이 올바르게 닫혔는지 판별.
// "()[]{}" -> true, "(]" -> false, "([)]" -> false
export function isValid(s: string): boolean {
  const closing = new Map([
    [')', '('],
    ['}', '{'],
    [']', '['],
  ]);
  const stack: string[] = [];

  for (const char of s) {
    if (closing.has(char)) {
      if (stack.pop() !== closing.get(char)) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}
