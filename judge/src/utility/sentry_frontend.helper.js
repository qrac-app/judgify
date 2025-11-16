// src/lib/sentryClient.js
import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry in the frontend
 */
export const initSentry = (options = {}) => {
  Sentry.init({
    dsn: options.dsn || import.meta.env.VITE_SENTRY_DSN,
    environment: options.environment || import.meta.env.MODE || "development",
    tracesSampleRate: options.tracesSampleRate ?? 1.0,
    replaysSessionSampleRate: 0.1, // heatmap / replay optimization
    replaysOnErrorSampleRate: 1.0,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],
    ...options,
  });
};

/**
 * Capture any exception
 */
export const captureException = (error, context = {}) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

/**
 * Capture messages
 */
export const captureMessage = (message, level = "info", context = {}) => {
  Sentry.captureMessage(message, {
    level,
    extra: context,
  });
};

/**
 * Add breadcrumb for debugging trail
 */
export const addBreadcrumb = (breadcrumb) => {
  Sentry.addBreadcrumb({
    level: breadcrumb.level || "info",
    timestamp: Date.now(),
    ...breadcrumb,
  });
};

/**
 * Set user for tracking
 */
export const setUser = (user) => {
  Sentry.setUser(user);
};

/**
 * Clear logged-in user context
 */
export const clearUser = () => {
  Sentry.setUser(null);
};

/**
 * Set custom tag
 */
export const setTag = (key, value) => {
  Sentry.setTag(key, value);
};

/**
 * Bulk set tags
 */
export const setTags = (tags) => {
  Sentry.setTags(tags);
};

/**
 * Set context object inside Sentry
 */
export const setContext = (key, context) => {
  Sentry.setContext(key, context);
};

/**
 * Create an isolated Sentry scope
 */
export const withScope = (fn) => {
  Sentry.withScope(fn);
};

/**
 * Wrap async function calls (UI handlers, mutations)
 * Auto-captures exceptions
 */
export const wrap = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (err) {
      captureException(err);
      throw err;
    }
  };
};

/**
 * Flush pending events (useful on logout)
 */
export const flush = async (timeout = 2000) => {
  try {
    return await Sentry.flush(timeout);
  } catch {
    return false;
  }
};

/**
 * Close Sentry on cleanup
 */
export const close = async (timeout = 2000) => {
  try {
    return await Sentry.close(timeout);
  } catch {
    return false;
  }
};

export default {
  initSentry,
  captureException,
  captureMessage,
  addBreadcrumb,
  setUser,
  clearUser,
  setTag,
  setTags,
  setContext,
  withScope,
  wrap,
  flush,
  close,
};
