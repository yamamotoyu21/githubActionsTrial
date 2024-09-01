/** Array of Japanese currency denominations in descending order */
const denominations = [10000, 5000, 1000, 500, 100, 50, 10, 5, 1];

/** Represents the status of the change calculation operation */
type StatusInfo = Record<string, string>;

/** Represents the count of each denomination in the calculated change */
type ChangeCountByDenomination = Record<number, number>;

/**
 * Calculates the change to be given based on the total price and cash inserted.
 *
 * This function determines the optimal combination of Japanese currency denominations
 * to provide as change. It handles various error conditions and edge cases.
 *
 * @param {number} totalPrice - The total price of the purchase (must be a positive integer).
 * @param {number} cashInserted - The amount of cash provided by the customer (must be an integer).
 * @returns {[StatusInfo, ChangeCountByDenomination]} A tuple containing:
 *   - StatusInfo: Object indicating the success or failure of the operation.
 *   - ChangeCountByDenomination: Object representing the count of each denomination in the change.
 * @throws {Error} If the funds are insufficient, totalPrice is 0 or negative, or arguments are not integers.
 *
 * @example
 * // Returns: [{ status: "success" }, { 5000: 1, 1000: 2 }]
 * calcChange(2000, 10000);
 *
 * @example
 * // Throws: Error("insufficient funds")
 * calcChange(5000, 3000);
 */
export function calcChange(
  totalPrice: number,
  cashInserted: number
): [StatusInfo, ChangeCountByDenomination] {
  if (totalPrice > cashInserted) {
    throw new Error("insufficient funds");
  } else if (totalPrice <= 0) {
    throw new Error("totalPrice is 0 or less");
  } else if (!Number.isInteger(totalPrice) || !Number.isInteger(cashInserted)) {
    throw new Error("argument should be integer");
  }

  let status: StatusInfo;
  let leftover = cashInserted - totalPrice;
  let changes: ChangeCountByDenomination = {};

  // Iterate through each denomination
  for (const denomination of denominations) {
    // If leftover is greater than or equal to the current denomination
    if (leftover >= denomination) {
      // Calculate the number of coins/bills needed for this denomination
      let countByDenomination = Math.floor(leftover / denomination);
      // Add the count to the changes record
      changes[denomination] = countByDenomination;
      // Update the leftover amount
      leftover -= countByDenomination * denomination;
    }
  }

  // Determine the final status
  if (leftover !== 0) {
    status = { status: "failed", message: "leftover is NOT 0" };
  } else {
    status = { status: "success" };
  }

  return [status, changes];
}
