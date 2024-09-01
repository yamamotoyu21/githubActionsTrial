import { calcChange } from "../../src/calcChange";

test("correctly calculates change for exact payment", () => {
  const [status, changes] = calcChange(3000, 3000);
  expect(status).toEqual({ status: "success" });
  expect(changes).toEqual({});
});

test("correctly calculates change for overpayment", () => {
  const [status, changes] = calcChange(3000, 5000);
  expect(status).toEqual({ status: "success" });
  expect(changes).toEqual({
    1000: 2,
  });
});

test("handles complex change calculation", () => {
  const [status, changes] = calcChange(4321, 10000);
  expect(status).toEqual({ status: "success" });
  expect(changes).toEqual({
    5000: 1,
    500: 1,
    100: 1,
    50: 1,
    10: 2,
    5: 1,
    1: 4,
  });
});

test("should throw error when fund is insufficient", () => {
  expect(() => calcChange(5000, 4999)).toThrow("insufficient funds");
});

test("should throw error when total change is 0 or less", () => {
  expect(() => calcChange(0, 5000)).toThrow("totalPrice is 0 or less");
});

test("should throw error when argument 1 is not interger", () => {
  expect(() => calcChange(5000.1, 5001)).toThrow("argument should be interger");
});

test("should throw error when argument 2 is not interger", () => {
  expect(() => calcChange(5000, 5000.1)).toThrow("argument should be interger");
});
