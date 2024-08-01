/* eslint-disable import/no-named-as-default */
import { setupWorker } from 'msw/browser';
import { HttpHandler } from 'msw';
import getTest from './handlers/test';

export const handlers: HttpHandler[] = [getTest];

export const worker = setupWorker(...handlers);
/* eslint-disable import/no-named-as-default */
