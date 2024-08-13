/* eslint-disable import/no-named-as-default */
import { setupWorker } from 'msw/browser';
import { HttpHandler } from 'msw';
import {
  getBestProductsHandler,
  getDeadLineProductsHandler,
  getPreEnrollProductsHandler,
} from './handlers/home';
import getTest from './handlers/test';

export const handlers: HttpHandler[] = [
  getTest,
  getBestProductsHandler,
  getDeadLineProductsHandler,
  getPreEnrollProductsHandler,
];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
