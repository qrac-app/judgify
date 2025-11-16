// src/lib/crSentryHelper.js

import * as Sentry from "@sentry/react";
import { CodeRabbit } from "@coderabbitai/javascript-sdk";

/**
 * Initialize both Sentry + Coderabbit
 */
export const initMonitoring = (options = {}) => {
  // --- SENTRY ---

  Sentry.init({
    dsn: options.sentryDsn || import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE || "development",
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });

  // --- CODERABBIT ---

  CodeRabbit.init({
    apiKey: options.coderabbitKey || import.meta.env.VITE_CODERABBIT_API_KEY,
    enableTelemetry: true,
    environment: import.meta.env.MODE || "development",
    ...options.coderabbitOptions,
  });

  CodeRabbit.log("Monitoring Initialized", {
    source: "initMonitoring",
    environment: import.meta.env.MODE,
  });
};

/**
 * Capture exception in both systems
 */
export const captureException = (error, context = {}) => {
  Sentry.captureException(error, { extra: context });

  CodeRabbit.error("Exception captured", {
    error: String(error),
    ...context,
  });
};

/**
 * Capture message (info/warning/error)
 */
export const captureMessage = (message, level = "info", context = {}) => {
  Sentry.captureMessage(message, {
    level,
    extra: context,
  });

  CodeRabbit.log(message, {
    level,
    ...context,
  });
};

/**
 * Breadcrumb-like logging
 */
export const addBreadcrumb = (obj) => {
  Sentry.addBreadcrumb(obj);

  CodeRabbit.log("Breadcrumb", obj);
};

/**
 * Track user context
 */
export const setUser = (user) => {
  Sentry.setUser(user);
  CodeRabbit.setUser(user);
};

export const clearUser = () => {
  Sentry.setUser(null);
  CodeRabbit.clearUser();
};

/**
 * Wrap UI / async handler with monitoring
 */
export const wrap = (fn, name = "WrappedFunction") => {
  return async (...args) => {
    try {
      CodeRabbit.log(`${name} called`, { args });
      return await fn(...args);
    } catch (err) {
      captureException(err, { function: name });
      throw err;
    }
  };
};

/**
 * Tag & metadata management
 */
export const setTag = (key, value) => {
  Sentry.setTag(key, value);
  CodeRabbit.log("Tag set", { key, value });
};

export const setContext = (key, data) => {
  Sentry.setContext(key, data);
  CodeRabbit.log("Context updated", { key, data });
};

/**
 * Graceful shutdown
 */
export const flushMonitoring = async () => {
  try {
    await Sentry.flush(2000);
    CodeRabbit.flush();
  } catch {}
};

export default {
  initMonitoring,
  captureException,
  captureMessage,
  addBreadcrumb,
  setUser,
  clearUser,
  wrap,
  setTag,
  setContext,
  flushMonitoring,
};
