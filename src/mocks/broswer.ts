import { setupWorker } from 'msw/browser';
import { HttpHandler } from 'msw';
import { test } from './handlers/test';

export const handlers: HttpHandler[] = [test];

export const worker = setupWorker(...handlers);
