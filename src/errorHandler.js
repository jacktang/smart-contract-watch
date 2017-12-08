import bluebird from 'bluebird';
import { logError } from './logger';
import { waitingTimeInMilliseconds } from './config';

export const handleError = async (e) => {
  switch (e) {
    case (e.message.includes('Invalid JSON RPC response')):
      logError(e, `Network error occur, retry after ${waitingTimeInMilliseconds / 1000} seconds,
      from block number`, false);
      await bluebird.delay(waitingTimeInMilliseconds);
      break;
    default:
      logError(e);
      process.exit(1);
  }
};
