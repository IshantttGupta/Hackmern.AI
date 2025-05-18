import Purchase from "../models/Purchase";
import TokenSpend from "../models/TokenSpend";

const FREE_TOKENS = 5;

export const getTotalTokens = async (email: string): Promise<number> => {
  try {
    const tokens = await Purchase.aggregate([
      { $match: { email } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const tokenAmount = tokens.length ? tokens[0].total : 0;

    const tokensSpend = await TokenSpend.countDocuments({ email });

    return tokenAmount - tokensSpend + FREE_TOKENS;
  } catch (e) {
    throw e;
  }
};

export const spendTokens = async (
  amount: number,
  email: string,
  action: string
) => {
  await TokenSpend.create({
    amount,
    email,
    action,
  });
};