interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: blockchainProp;
}
interface blockchainProp {
  name: string;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
interface BoxProps {}
interface Props extends BoxProps {}

// function external
const useWalletBalances = (): WalletBalance[] => {
  return [];
};
// function external
const usePrices = () => {
  //handle
  return;
};
const WalletPage: React.FC<Props> = (props: Props) => {
  const { ...rest } = props;

  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = (blockchain: blockchainProp): number => {
    switch (blockchain.name) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0;
      })
      .sort(
        (lhs: WalletBalance, rhs: WalletBalance) =>
          getPriority(rhs.blockchain) - getPriority(lhs.blockchain)
      );
  }, [balances]);

  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.amount.toFixed()}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
