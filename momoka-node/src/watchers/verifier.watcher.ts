import { Deployment, Environment } from '../common/environment';
import { runForever, sleep } from '../common/helpers';
import { consoleLogWithLensNodeFootprint } from '../common/logger';
import { LOCAL_NODE_URL, setupAnvilLocalNode } from '../evm/anvil';
import { EthereumNode } from '../evm/ethereum';
import {
  DataAvailabilityTransactionsOrderTypes,
  getDataAvailabilityTransactionsAPI,
} from '../input-output/bundlr/get-data-availability-transactions.api';
import {
  getLastEndCursorDb,
  getTotalCheckedCountDb,
  saveEndCursorDb,
  saveTotalCheckedCountDb,
  startDb,
} from '../input-output/db';
import { checkDAProofsBatch } from '../proofs/check-da-proofs-batch';
import { retryCheckDAProofsQueue } from '../queue/known.queue';
import { shouldRetry } from '../queue/process-retry-check-da-proofs.queue';
import { startupQueues } from '../queue/startup.queue';
// import { verifierFailedSubmissionsWatcher } from './failed-submissons.watcher';
import { StartDAVerifierNodeOptions } from './models/start-da-verifier-node-options';
import { StreamCallback } from './models/stream.type';

/**
 *  Starts up the verifier node
 * @param ethereumNode The Ethereum node to use for verification.
 * @param concurrency The concurrency to use < this is how many TCP it will run at
 * @param usLocalNode A boolean to indicate whether to use the local node.
 */
const startup = async (
  ethereumNode: EthereumNode,
  concurrency: number,
  usLocalNode: boolean
): Promise<void> => {
  if (usLocalNode) {
    // Start the local node up
    await setupAnvilLocalNode(ethereumNode.nodeUrl);
  }

  // Initialize database.
  await startDb();
  startupQueues(concurrency);
  // verifierFailedSubmissionsWatcher();

  if (usLocalNode) {
    // Switch to local node.
    ethereumNode.nodeUrl = LOCAL_NODE_URL;
  }

  console.log(`

            
  


  
                                                                                                                           
MMMMMMMM               MMMMMMMM     OOOOOOOOO     MMMMMMMM               MMMMMMMM     OOOOOOOOO     KKKKKKKKK    KKKKKKK               AAA               
M:::::::M             M:::::::M   OO:::::::::OO   M:::::::M             M:::::::M   OO:::::::::OO   K:::::::K    K:::::K              A:::A              
M::::::::M           M::::::::M OO:::::::::::::OO M::::::::M           M::::::::M OO:::::::::::::OO K:::::::K    K:::::K             A:::::A             
M:::::::::M         M:::::::::MO:::::::OOO:::::::OM:::::::::M         M:::::::::MO:::::::OOO:::::::OK:::::::K   K::::::K            A:::::::A            
M::::::::::M       M::::::::::MO::::::O   O::::::OM::::::::::M       M::::::::::MO::::::O   O::::::OKK::::::K  K:::::KKK           A:::::::::A           
M:::::::::::M     M:::::::::::MO:::::O     O:::::OM:::::::::::M     M:::::::::::MO:::::O     O:::::O  K:::::K K:::::K             A:::::A:::::A          
M:::::::M::::M   M::::M:::::::MO:::::O     O:::::OM:::::::M::::M   M::::M:::::::MO:::::O     O:::::O  K::::::K:::::K             A:::::A A:::::A         
M::::::M M::::M M::::M M::::::MO:::::O     O:::::OM::::::M M::::M M::::M M::::::MO:::::O     O:::::O  K:::::::::::K             A:::::A   A:::::A        
M::::::M  M::::M::::M  M::::::MO:::::O     O:::::OM::::::M  M::::M::::M  M::::::MO:::::O     O:::::O  K:::::::::::K            A:::::A     A:::::A       
M::::::M   M:::::::M   M::::::MO:::::O     O:::::OM::::::M   M:::::::M   M::::::MO:::::O     O:::::O  K::::::K:::::K          A:::::AAAAAAAAA:::::A      
M::::::M    M:::::M    M::::::MO:::::O     O:::::OM::::::M    M:::::M    M::::::MO:::::O     O:::::O  K:::::K K:::::K        A:::::::::::::::::::::A     
M::::::M     MMMMM     M::::::MO::::::O   O::::::OM::::::M     MMMMM     M::::::MO::::::O   O::::::OKK::::::K  K:::::KKK    A:::::AAAAAAAAAAAAA:::::A    
M::::::M               M::::::MO:::::::OOO:::::::OM::::::M               M::::::MO:::::::OOO:::::::OK:::::::K   K::::::K   A:::::A             A:::::A   
M::::::M               M::::::M OO:::::::::::::OO M::::::M               M::::::M OO:::::::::::::OO K:::::::K    K:::::K  A:::::A               A:::::A  
M::::::M               M::::::M   OO:::::::::OO   M::::::M               M::::::M   OO:::::::::OO   K:::::::K    K:::::K A:::::A                 A:::::A 
MMMMMMMM               MMMMMMMM     OOOOOOOOO     MMMMMMMM               MMMMMMMM     OOOOOOOOO     KKKKKKKKK    KKKKKKKAAAAAAA                   AAAAAAA
                                                                                                                                                                                                                                                                                 
                                                                                                                           
                                                                                                                           
                                                                                                                           
                                                                                                                           
                                                                                                                           
                                                                                                                           
                                                   
  `);
};

export interface BulkDataAvailabilityTransactionsResponse {
  next: string | null;
  txIds: string[];
}

/**
 *  Get the bulk data availability transactions from bundlr
 * @param environment The environment to use.
 * @param deployment The deployment to use.
 * @param endCursor  The end cursor to use.
 * @param maxPulling The maximum number of pulling.
 */
const getBulkDataAvailabilityTransactions = async (
  environment: Environment,
  deployment: Deployment | undefined,
  endCursor: string | null,
  maxPulling: number
): Promise<BulkDataAvailabilityTransactionsResponse | null> => {
  const result: BulkDataAvailabilityTransactionsResponse | null = {
    next: endCursor,
    txIds: [],
  };
  let pullingCounter = 0;

  do {
    const response = await getDataAvailabilityTransactionsAPI(
      environment,
      deployment,
      result.next,
      DataAvailabilityTransactionsOrderTypes.ASC
    );
    if (response.edges.length === 0) {
      break;
    }

    const txIds = response.edges.map((edge) => edge.node.id);

    result.next = response.pageInfo.endCursor;
    result.txIds.push(...txIds);
    pullingCounter++;
  } while (result.next && pullingCounter < maxPulling);

  return result;
};

/**
 *  Process the transactions and do the proof checks
 * @param transactions The transactions
 * @param ethereumNode The ethereum node to use
 * @param concurrency The concurrency to use < this is how many TCP it will run at
 * @param usLocalNode If we are using the local node
 * @param stream The stream callback
 */
const processTransactions = async (
  transactions: BulkDataAvailabilityTransactionsResponse,
  ethereumNode: EthereumNode,
  concurrency: number,
  usLocalNode: boolean,
  stream: StreamCallback | undefined
): Promise<{ totalChecked: number; endCursor: string | null }> => {
  const result = await checkDAProofsBatch(
    transactions.txIds,
    ethereumNode,
    false,
    concurrency,
    usLocalNode,
    stream
  );

  const retryTxids = result
    .filter((c) => !c.success && shouldRetry(c.validatorError!))
    .map((c) => c.txId);

  if (retryTxids.length > 0) {
    void retryCheckDAProofsQueue.enqueueWithDelay(
      {
        txIds: retryTxids,
        ethereumNode,
        stream,
      },
      30000
    );
  }

  return {
    totalChecked: result.length - retryTxids.length,
    endCursor: transactions.next,
  };
};

const waitForNewSubmissions = async (lastCheckNothingFound: boolean): Promise<boolean> => {
  if (!lastCheckNothingFound) {
    consoleLogWithLensNodeFootprint(`waiting for new momoka transactions...`);
  }
  lastCheckNothingFound = true;
  await sleep(100);
  return lastCheckNothingFound;
};

/**
 * Starts the DA verifier node to watch for new data availability submissions and verify their proofs.
 * @param ethereumNode The Ethereum node to use for verification.
 * @param concurrency The concurrency to use < this is how many TCP it will run at
 * @param options An optional object containing options for the node.
 *                   - stream - A callback function to stream the validation results.
 *                   - resync - A boolean to indicate whether to sync from the head of the chain only.
 */
export const startDAVerifierNode = async (
  ethereumNode: EthereumNode,
  concurrency: number,
  { stream, resync }: StartDAVerifierNodeOptions = {}
): Promise<never> => {
  consoleLogWithLensNodeFootprint('DA verification watcher started...');

  // for now you cant turn this on!
  // will move it to .env later when needed
  const usLocalNode = false;

  await startup(ethereumNode, concurrency, usLocalNode);
  let endCursor: string | null = await getLastEndCursorDb();
  let totalChecked: number = await getTotalCheckedCountDb();
  let lastCheckNothingFound = false;

  consoleLogWithLensNodeFootprint('started up..');

  if (!resync) {
    // try to find the last transactions and start syncing from there again
    const lastTransaction = await getDataAvailabilityTransactionsAPI(
      ethereumNode.environment,
      ethereumNode.deployment,
      null,
      DataAvailabilityTransactionsOrderTypes.DESC,
      1
    );

    if (lastTransaction.edges.length > 0) {
      endCursor = lastTransaction.pageInfo.endCursor;
      totalChecked = 0;
    } else {
      endCursor = null;
    }
  }

  return await runForever(async () => {
    try {
      // fetch 10,000 at a time! we can extend this if we wish for now thats plenty.
      const transactions = await getBulkDataAvailabilityTransactions(
        ethereumNode.environment,
        ethereumNode.deployment,
        endCursor,
        10
      );

      if (!transactions || transactions.txIds.length === 0) {
        lastCheckNothingFound = await waitForNewSubmissions(lastCheckNothingFound);
      } else {
        // count++;
        lastCheckNothingFound = false;

        if (resync) {
          consoleLogWithLensNodeFootprint(`Resyncing momoka from start, preparing please wait...`);
          resync = false;
        }

        const { totalChecked: newTotalChecked, endCursor: newEndCursor } =
          await processTransactions(transactions, ethereumNode, concurrency, usLocalNode, stream);

        totalChecked += newTotalChecked;
        endCursor = newEndCursor;

        await Promise.all([saveEndCursorDb(endCursor!), saveTotalCheckedCountDb(totalChecked)]);
      }
    } catch (error: unknown) {
      const message = (error as Error).message || error;
      consoleLogWithLensNodeFootprint('Error while checking for new submissions', message);
      await sleep(100);
    }
  });
};
