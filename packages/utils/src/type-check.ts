/**
 * Checks whether or not a value is a boolean.
 *
 * @param value
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

/**
 * Checks whether or not a value is a function.
 *
 * @param value
 */
export function isFunction(value: unknown): value is (...args: unknown[]) => unknown {
  return !!(value && {}.toString.call(value) == "[object Function]");
}
/**
 * Checks whether or not a value is a number.
 *
 * @param value
 */
export function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}
/**
 * Checks whether or not a value is a string.
 *
 * @param value
 */
export function isString(value: unknown): value is string {
  return typeof value === "string";
}
