import { EthersContractContextV5 } from 'ethereum-abi-types-generator';
import { BigNumber, BigNumberish, BytesLike as Arrayish, ContractTransaction } from 'ethers';

export type ContractContext = EthersContractContextV5<
  LensHubV1,
  LensHubMethodNames,
  LensHubEventsContext,
  LensHubEvents
>;

export declare type EventFilter = {
  address?: string;
  topics?: Array<string>;
  fromBlock?: string | number;
  toBlock?: string | number;
};

export interface ContractTransactionOverrides {
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;
  /**
   * The price (in wei) per unit of gas
   */
  gasPrice?: BigNumber | string | number | Promise<any>;
  /**
   * The nonce to use in the transaction
   */
  nonce?: number;
  /**
   * The amount to send with the transaction (i.e. msg.value)
   */
  value?: BigNumber | string | number | Promise<any>;
  /**
   * The chain ID (or network ID) to use
   */
  chainId?: number;
}

export interface ContractCallOverrides {
  /**
   * The address to execute the call as
   */
  from?: string;
  /**
   * The maximum units of gas for the transaction to use
   */
  gasLimit?: number;

  /**
   * The block tag!
   */
  blockTag?: string | number;
}
export type LensHubEvents = 'Approval' | 'ApprovalForAll' | 'Transfer';
export interface LensHubEventsContext {
  Approval(...parameters: any): EventFilter;
  ApprovalForAll(...parameters: any): EventFilter;
  Transfer(...parameters: any): EventFilter;
}
export type LensHubMethodNames =
  | 'new'
  | 'approve'
  | 'balanceOf'
  | 'burn'
  | 'burnWithSig'
  | 'collect'
  | 'collectWithSig'
  | 'comment'
  | 'commentWithSig'
  | 'commentWithSig_Dispatcher'
  | 'createProfile'
  | 'defaultProfile'
  | 'emitCollectNFTTransferEvent'
  | 'emitFollowNFTTransferEvent'
  | 'exists'
  | 'follow'
  | 'followWithSig'
  | 'getApproved'
  | 'getCollectModule'
  | 'getCollectNFT'
  | 'getCollectNFTImpl'
  | 'getContentURI'
  | 'getDispatcher'
  | 'getDomainSeparator'
  | 'getFollowModule'
  | 'getFollowNFT'
  | 'getFollowNFTImpl'
  | 'getFollowNFTURI'
  | 'getGovernance'
  | 'getHandle'
  | 'getProfile'
  | 'getProfileIdByHandle'
  | 'getPub'
  | 'getPubCount'
  | 'getPubPointer'
  | 'getPubType'
  | 'getReferenceModule'
  | 'getState'
  | 'initialize'
  | 'isApprovedForAll'
  | 'isCollectModuleWhitelisted'
  | 'isFollowModuleWhitelisted'
  | 'isProfileCreatorWhitelisted'
  | 'isReferenceModuleWhitelisted'
  | 'mintTimestampOf'
  | 'mirror'
  | 'mirrorWithSig'
  | 'mirrorWithSig_Dispatcher'
  | 'name'
  | 'ownerOf'
  | 'permit'
  | 'permitForAll'
  | 'post'
  | 'postWithSig'
  | 'postWithSig_Dispatcher'
  | 'safeTransferFrom'
  | 'setApprovalForAll'
  | 'setDefaultProfile'
  | 'setDefaultProfileWithSig'
  | 'setDispatcher'
  | 'setDispatcherWithSig'
  | 'setEmergencyAdmin'
  | 'setFollowModule'
  | 'setFollowModuleWithSig'
  | 'setFollowNFTURI'
  | 'setFollowNFTURIWithSig'
  | 'setGovernance'
  | 'setProfileImageURI'
  | 'setProfileImageURIWithSig'
  | 'setState'
  | 'sigNonces'
  | 'supportsInterface'
  | 'symbol'
  | 'tokenByIndex'
  | 'tokenDataOf'
  | 'tokenOfOwnerByIndex'
  | 'tokenURI'
  | 'totalSupply'
  | 'transferFrom'
  | 'whitelistCollectModule'
  | 'whitelistFollowModule'
  | 'whitelistProfileCreator'
  | 'whitelistReferenceModule';
export interface ApprovalEventEmittedResponse {
  owner: string;
  approved: string;
  tokenId: BigNumberish;
}
export interface ApprovalForAllEventEmittedResponse {
  owner: string;
  operator: string;
  approved: boolean;
}
export interface TransferEventEmittedResponse {
  from: string;
  to: string;
  tokenId: BigNumberish;
}
export interface BurnWithSigRequest {
  v: BigNumberish;
  r: Arrayish;
  s: Arrayish;
  deadline: BigNumberish;
}
export interface SigRequest {
  v: BigNumberish;
  r: Arrayish;
  s: Arrayish;
  deadline: BigNumberish;
}
export interface CollectWithSigRequest {
  collector: string;
  profileId: BigNumberish;
  pubId: BigNumberish;
  data: Arrayish;
  sig: SigRequest;
}
export interface CommentRequest {
  profileId: BigNumberish;
  contentURI: string;
  profileIdPointed: BigNumberish;
  pubIdPointed: BigNumberish;
  referenceModuleData: Arrayish;
  collectModule: string;
  collectModuleInitData: Arrayish;
  referenceModule: string;
  referenceModuleInitData: Arrayish;
}
export interface CommentWithSigRequest {
  profileId: BigNumberish;
  contentURI: string;
  profileIdPointed: BigNumberish;
  pubIdPointed: BigNumberish;
  referenceModuleData: Arrayish;
  collectModule: string;
  collectModuleInitData: Arrayish;
  referenceModule: string;
  referenceModuleInitData: Arrayish;
  sig: SigRequest;
}
export interface CommentWithSig_DispatcherRequest {
  profileId: BigNumberish;
  contentURI: string;
  profileIdPointed: BigNumberish;
  pubIdPointed: BigNumberish;
  referenceModuleData: Arrayish;
  collectModule: string;
  collectModuleInitData: Arrayish;
  referenceModule: string;
  referenceModuleInitData: Arrayish;
  sig: SigRequest;
}
export interface CreateProfileRequest {
  to: string;
  handle: string;
  imageURI: string;
  followModule: string;
  followModuleInitData: Arrayish;
  followNFTURI: string;
}
export interface FollowWithSigRequest {
  follower: string;
  profileIds: BigNumberish[];
  datas: Arrayish[];
  sig: SigRequest;
}
export interface ProfileResponse {
  pubCount: BigNumber;
  0: BigNumber;
  followModule: string;
  1: string;
  followNFT: string;
  2: string;
  handle: string;
  3: string;
  imageURI: string;
  4: string;
  followNFTURI: string;
  5: string;
}
export interface PublicationResponse {
  profileIdPointed: BigNumber;
  0: BigNumber;
  pubIdPointed: BigNumber;
  1: BigNumber;
  contentURI: string;
  2: string;
  referenceModule: string;
  3: string;
  collectModule: string;
  4: string;
  collectNFT: string;
  5: string;
}
export interface GetPubPointerResponse {
  result0: BigNumber;
  0: BigNumber;
  result1: BigNumber;
  1: BigNumber;
  length: 2;
}
export interface MirrorRequest {
  profileId: BigNumberish;
  profileIdPointed: BigNumberish;
  pubIdPointed: BigNumberish;
  referenceModuleData: Arrayish;
  referenceModule: string;
  referenceModuleInitData: Arrayish;
}
export interface MirrorWithSigRequest {
  profileId: BigNumberish;
  profileIdPointed: BigNumberish;
  pubIdPointed: BigNumberish;
  referenceModuleData: Arrayish;
  referenceModule: string;
  referenceModuleInitData: Arrayish;
  sig: SigRequest;
}
export interface MirrorWithSig_DispatcherRequest {
  profileId: BigNumberish;
  profileIdPointed: BigNumberish;
  pubIdPointed: BigNumberish;
  referenceModuleData: Arrayish;
  referenceModule: string;
  referenceModuleInitData: Arrayish;
  sig: SigRequest;
}
export interface PermitRequest {
  v: BigNumberish;
  r: Arrayish;
  s: Arrayish;
  deadline: BigNumberish;
}
export interface PermitForAllRequest {
  v: BigNumberish;
  r: Arrayish;
  s: Arrayish;
  deadline: BigNumberish;
}
export interface PostRequest {
  profileId: BigNumberish;
  contentURI: string;
  collectModule: string;
  collectModuleInitData: Arrayish;
  referenceModule: string;
  referenceModuleInitData: Arrayish;
}
export interface PostWithSigRequest {
  profileId: BigNumberish;
  contentURI: string;
  collectModule: string;
  collectModuleInitData: Arrayish;
  referenceModule: string;
  referenceModuleInitData: Arrayish;
  sig: SigRequest;
}
export interface PostWithSig_DispatcherRequest {
  profileId: BigNumberish;
  contentURI: string;
  collectModule: string;
  collectModuleInitData: Arrayish;
  referenceModule: string;
  referenceModuleInitData: Arrayish;
  sig: SigRequest;
}
export interface SetDefaultProfileWithSigRequest {
  wallet: string;
  profileId: BigNumberish;
  sig: SigRequest;
}
export interface SetDispatcherWithSigRequest {
  profileId: BigNumberish;
  dispatcher: string;
  sig: SigRequest;
}
export interface SetFollowModuleWithSigRequest {
  profileId: BigNumberish;
  followModule: string;
  followModuleInitData: Arrayish;
  sig: SigRequest;
}
export interface SetFollowNFTURIWithSigRequest {
  profileId: BigNumberish;
  followNFTURI: string;
  sig: SigRequest;
}
export interface SetProfileImageURIWithSigRequest {
  profileId: BigNumberish;
  imageURI: string;
  sig: SigRequest;
}
export interface TokendataResponse {
  owner: string;
  0: string;
  mintTimestamp: BigNumber;
  1: BigNumber;
}
export interface LensHubV1 {
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: constructor
   * @param followNFTImpl Type: address, Indexed: false
   * @param collectNFTImpl Type: address, Indexed: false
   */
  'new'(
    followNFTImpl: string,
    collectNFTImpl: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  approve(
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   */
  balanceOf(owner: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  burn(
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   * @param sig Type: tuple, Indexed: false
   */
  burnWithSig(
    tokenId: BigNumberish,
    sig: BurnWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param pubId Type: uint256, Indexed: false
   * @param data Type: bytes, Indexed: false
   */
  collect(
    profileId: BigNumberish,
    pubId: BigNumberish,
    data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  collectWithSig(
    vars: CollectWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  comment(
    vars: CommentRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  commentWithSig(
    vars: CommentWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  commentWithSig_Dispatcher(
    vars: CommentWithSig_DispatcherRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  createProfile(
    vars: CreateProfileRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param wallet Type: address, Indexed: false
   */
  defaultProfile(wallet: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param pubId Type: uint256, Indexed: false
   * @param collectNFTId Type: uint256, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  emitCollectNFTTransferEvent(
    profileId: BigNumberish,
    pubId: BigNumberish,
    collectNFTId: BigNumberish,
    from: string,
    to: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param followNFTId Type: uint256, Indexed: false
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   */
  emitFollowNFTTransferEvent(
    profileId: BigNumberish,
    followNFTId: BigNumberish,
    from: string,
    to: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  exists(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileIds Type: uint256[], Indexed: false
   * @param datas Type: bytes[], Indexed: false
   */
  follow(
    profileIds: BigNumberish[],
    datas: Arrayish[],
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  followWithSig(
    vars: FollowWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  getApproved(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param pubId Type: uint256, Indexed: false
   */
  getCollectModule(
    profileId: BigNumberish,
    pubId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param pubId Type: uint256, Indexed: false
   */
  getCollectNFT(
    profileId: BigNumberish,
    pubId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getCollectNFTImpl(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param pubId Type: uint256, Indexed: false
   */
  getContentURI(
    profileId: BigNumberish,
    pubId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   */
  getDispatcher(profileId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getDomainSeparator(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   */
  getFollowModule(profileId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   */
  getFollowNFT(profileId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getFollowNFTImpl(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   */
  getFollowNFTURI(profileId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getGovernance(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   */
  getHandle(profileId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   */
  getProfile(profileId: BigNumberish, overrides?: ContractCallOverrides): Promise<ProfileResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param handle Type: string, Indexed: false
   */
  getProfileIdByHandle(handle: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param pubId Type: uint256, Indexed: false
   */
  getPub(
    profileId: BigNumberish,
    pubId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<PublicationResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   */
  getPubCount(profileId: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param pubId Type: uint256, Indexed: false
   */
  getPubPointer(
    profileId: BigNumberish,
    pubId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<GetPubPointerResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param pubId Type: uint256, Indexed: false
   */
  getPubType(
    profileId: BigNumberish,
    pubId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<number>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param pubId Type: uint256, Indexed: false
   */
  getReferenceModule(
    profileId: BigNumberish,
    pubId: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  getState(overrides?: ContractCallOverrides): Promise<number>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param name Type: string, Indexed: false
   * @param symbol Type: string, Indexed: false
   * @param newGovernance Type: address, Indexed: false
   */
  initialize(
    name: string,
    symbol: string,
    newGovernance: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   */
  isApprovedForAll(
    owner: string,
    operator: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param collectModule Type: address, Indexed: false
   */
  isCollectModuleWhitelisted(
    collectModule: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param followModule Type: address, Indexed: false
   */
  isFollowModuleWhitelisted(
    followModule: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param profileCreator Type: address, Indexed: false
   */
  isProfileCreatorWhitelisted(
    profileCreator: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param referenceModule Type: address, Indexed: false
   */
  isReferenceModuleWhitelisted(
    referenceModule: string,
    overrides?: ContractCallOverrides
  ): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  mintTimestampOf(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  mirror(
    vars: MirrorRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  mirrorWithSig(
    vars: MirrorWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  mirrorWithSig_Dispatcher(
    vars: MirrorWithSig_DispatcherRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  name(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  ownerOf(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param spender Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param sig Type: tuple, Indexed: false
   */
  permit(
    spender: string,
    tokenId: BigNumberish,
    sig: PermitRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param operator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   * @param sig Type: tuple, Indexed: false
   */
  permitForAll(
    owner: string,
    operator: string,
    approved: boolean,
    sig: PermitForAllRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  post(vars: PostRequest, overrides?: ContractTransactionOverrides): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  postWithSig(
    vars: PostWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  postWithSig_Dispatcher(
    vars: PostWithSig_DispatcherRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   * @param _data Type: bytes, Indexed: false
   */
  safeTransferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    _data: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param operator Type: address, Indexed: false
   * @param approved Type: bool, Indexed: false
   */
  setApprovalForAll(
    operator: string,
    approved: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   */
  setDefaultProfile(
    profileId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  setDefaultProfileWithSig(
    vars: SetDefaultProfileWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param dispatcher Type: address, Indexed: false
   */
  setDispatcher(
    profileId: BigNumberish,
    dispatcher: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  setDispatcherWithSig(
    vars: SetDispatcherWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newEmergencyAdmin Type: address, Indexed: false
   */
  setEmergencyAdmin(
    newEmergencyAdmin: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param followModule Type: address, Indexed: false
   * @param followModuleInitData Type: bytes, Indexed: false
   */
  setFollowModule(
    profileId: BigNumberish,
    followModule: string,
    followModuleInitData: Arrayish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  setFollowModuleWithSig(
    vars: SetFollowModuleWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param followNFTURI Type: string, Indexed: false
   */
  setFollowNFTURI(
    profileId: BigNumberish,
    followNFTURI: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  setFollowNFTURIWithSig(
    vars: SetFollowNFTURIWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newGovernance Type: address, Indexed: false
   */
  setGovernance(
    newGovernance: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileId Type: uint256, Indexed: false
   * @param imageURI Type: string, Indexed: false
   */
  setProfileImageURI(
    profileId: BigNumberish,
    imageURI: string,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param vars Type: tuple, Indexed: false
   */
  setProfileImageURIWithSig(
    vars: SetProfileImageURIWithSigRequest,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param newState Type: uint8, Indexed: false
   */
  setState(
    newState: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param parameter0 Type: address, Indexed: false
   */
  sigNonces(parameter0: string, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param interfaceId Type: bytes4, Indexed: false
   */
  supportsInterface(interfaceId: Arrayish, overrides?: ContractCallOverrides): Promise<boolean>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  symbol(overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param index Type: uint256, Indexed: false
   */
  tokenByIndex(index: BigNumberish, overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenDataOf(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<TokendataResponse>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param owner Type: address, Indexed: false
   * @param index Type: uint256, Indexed: false
   */
  tokenOfOwnerByIndex(
    owner: string,
    index: BigNumberish,
    overrides?: ContractCallOverrides
  ): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   * @param tokenId Type: uint256, Indexed: false
   */
  tokenURI(tokenId: BigNumberish, overrides?: ContractCallOverrides): Promise<string>;
  /**
   * Payable: false
   * Constant: true
   * StateMutability: view
   * Type: function
   */
  totalSupply(overrides?: ContractCallOverrides): Promise<BigNumber>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param from Type: address, Indexed: false
   * @param to Type: address, Indexed: false
   * @param tokenId Type: uint256, Indexed: false
   */
  transferFrom(
    from: string,
    to: string,
    tokenId: BigNumberish,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param collectModule Type: address, Indexed: false
   * @param whitelist Type: bool, Indexed: false
   */
  whitelistCollectModule(
    collectModule: string,
    whitelist: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param followModule Type: address, Indexed: false
   * @param whitelist Type: bool, Indexed: false
   */
  whitelistFollowModule(
    followModule: string,
    whitelist: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param profileCreator Type: address, Indexed: false
   * @param whitelist Type: bool, Indexed: false
   */
  whitelistProfileCreator(
    profileCreator: string,
    whitelist: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
  /**
   * Payable: false
   * Constant: false
   * StateMutability: nonpayable
   * Type: function
   * @param referenceModule Type: address, Indexed: false
   * @param whitelist Type: bool, Indexed: false
   */
  whitelistReferenceModule(
    referenceModule: string,
    whitelist: boolean,
    overrides?: ContractTransactionOverrides
  ): Promise<ContractTransaction>;
}
