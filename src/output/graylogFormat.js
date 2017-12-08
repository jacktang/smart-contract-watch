import { getEtherNetworkId } from '../web3/utils';
import { networksById } from '../config';
import Decoder from '../decoder';

const formatLogs = (logs) => {
  if (!logs) return [];
  return logs.map((log) => {
    let eventText = `${log.name}(`;
    log.events.forEach((i, idx, events) => {
      eventText += `${events[idx].name}=${events[idx].value}`;
      if (idx !== events.length - 1) {
        eventText += ',';
      }
    });
    eventText += ')';
    return eventText;
  });
};
export default (transaction, decodedTransaction, decodedLogs) => ({
  networkId: networksById[getEtherNetworkId()],
  blockHash: transaction.blockHash,
  blockNumber: transaction.blockNumber,
  fromAddress: transaction.from,
  toAddress: transaction.to,
  transactionHash: transaction.hash,
  input: transaction.creates ?
    Decoder.extractConstructorFromBytecode(transaction.input) : transaction.input,
  gas: transaction.gas,
  gasPrice: transaction.gasPrice,
  gasUsed: transaction.receipt.gasUsed,
  status: transaction.receipt.status,
  value: transaction.value,
  transactionType: transaction.contractAddress ? 'Contract Creation' : 'Transaction',
  contractAddress: transaction.contractAddress,
  methodName: decodedTransaction.name,
  methodParameters: decodedTransaction.params,
  etherscanLink: `https://etherscan.io/tx/${transaction.hash}`,
  events: formatLogs(decodedLogs),
});
