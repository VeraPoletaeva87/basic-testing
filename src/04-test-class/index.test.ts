import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    expect(account.getBalance()).toEqual(balance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const balance = 1000;
    const withdraw = 1500;
    const account = getBankAccount(balance);
    expect(() => account.withdraw(withdraw)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const balance1 = 1000;
    const balance2 = 100;
    const transfer = 1500;
    const account1 = getBankAccount(balance1);
    const account2 = getBankAccount(balance2);
    expect(() => account1.transfer(transfer, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const balance1 = 1000;
    const transfer = 500;
    const account1 = getBankAccount(balance1);
    expect(() => account1.transfer(transfer, account1)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const balance = 1000;
    const deposit = 500;
    const account = getBankAccount(balance);
    account.deposit(deposit);
    expect(account.getBalance()).toEqual(balance + deposit);
  });

  test('should withdraw money', () => {
    const balance = 1000;
    const withdraw = 500;
    const account = getBankAccount(balance);
    account.withdraw(withdraw);
    expect(account.getBalance()).toEqual(balance - withdraw);
  });

  test('should transfer money', () => {
    const balance1 = 1000;
    const balance2 = 100;
    const transfer = 500;
    const account1 = getBankAccount(balance1);
    const account2 = getBankAccount(balance2);
    account1.transfer(transfer, account2);
    expect(account2.getBalance()).toEqual(balance2 + transfer);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = 1000;
    const account = getBankAccount(balance);
    expect(account.fetchBalance()).toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const balance = 10;
    const account = getBankAccount(balance);
    try {
      const newBalance = account.synchronizeBalance();
      expect(newBalance).not.toEqual(balance);
    } catch (e) {
      expect(e as Error).toBe(SynchronizationFailedError);
    }
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const balance = 10;
    const account = getBankAccount(balance);
    try {
      account.synchronizeBalance();
    } catch (e) {
      expect(e as Error).toBe(SynchronizationFailedError);
    }
  });
});
