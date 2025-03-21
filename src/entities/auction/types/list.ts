import { IAuctionItem, IPreAuctionItem } from './item';
import {
  IUserAuctionHistoryItem,
  IUserAuctionLostItem,
  IUserAuctionWonItem
} from './userParticipated';
import {
  IAuctionEndRegisteredItem,
  IAuctionOngoingRegisteredItem,
  IPreAuctionRegisteredItem
} from './userRegistered';

export interface PaginationData<T> {
  hasNext: boolean;
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
}

export interface IAuctionList extends PaginationData<IAuctionItem> {}
export interface IPreAuctionList extends PaginationData<IPreAuctionItem> {}
export interface IAuctionOngoingRegisteredList
  extends PaginationData<IAuctionOngoingRegisteredItem> {}
export interface IAuctionEndRegisteredList
  extends PaginationData<IAuctionEndRegisteredItem> {}
export interface IPreAuctionRegisteredList
  extends PaginationData<IPreAuctionRegisteredItem> {}
export interface IUserAuctionWonList
  extends PaginationData<IUserAuctionWonItem> {}
export interface IUserAuctionHistoryList
  extends PaginationData<IUserAuctionHistoryItem> {}
export interface IUserAuctionLostList
  extends PaginationData<IUserAuctionLostItem> {}
