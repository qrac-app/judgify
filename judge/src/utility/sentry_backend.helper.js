import * as Sentry from '@sentry/node';

/**
 * Initialize Sentry with configuration
 * @param {Object} config - Sentry configuration options
 */
export const initSentry = (config = {}) => {
  Sentry.init({
    dsn: config.dsn || process.env.SENTRY_DSN,
    environment: config.environment || process.env.NODE_ENV || 'development',
    tracesSampleRate: config.tracesSampleRate || 1.0,
    ...config,
  });
};

/**
 * Capture an exception in Sentry
 * @param {Error} error - Error object to capture
 * @param {Object} context - Additional context information
 */
export const captureException = (error, context = {}) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

/**
 * Capture a message in Sentry
 * @param {string} message - Message to capture
 * @param {string} level - Severity level (fatal, error, warning, log, info, debug)
 * @param {Object} context - Additional context information
 */
export const captureMessage = (message, level = 'info', context = {}) => {
  Sentry.captureMessage(message, {
    level,
    extra: context,
  });
};

/**
 * Set user context for Sentry
 * @param {Object} user - User information
 */
export const setUser = (user) => {
  Sentry.setUser(user);
};

/**
 * Clear user context
 */
export const clearUser = () => {
  Sentry.setUser(null);
};

/**
 * Add breadcrumb for debugging
 * @param {Object} breadcrumb - Breadcrumb data
 */
export const addBreadcrumb = (breadcrumb) => {
  Sentry.addBreadcrumb(breadcrumb);
};

/**
 * Set custom tag
 * @param {string} key - Tag key
 * @param {string} value - Tag value
 */
export const setTag = (key, value) => {
  Sentry.setTag(key, value);
};

/**
 * Set multiple tags at once
 * @param {Object} tags - Object with key-value pairs
 */
export const setTags = (tags) => {
  Sentry.setTags(tags);
};

/**
 * Set custom context
 * @param {string} key - Context key
 * @param {Object} context - Context data
 */
export const setContext = (key, context) => {
  Sentry.setContext(key, context);
};

/**
 * Create a transaction for performance monitoring
 * @param {Object} transactionContext - Transaction configuration
 * @returns {Transaction} Sentry transaction
 */
export const startTransaction = (transactionContext) => {
  return Sentry.startTransaction(transactionContext);
};

/**
 * Express error handler middleware
 * @returns {Function} Express middleware
 */
export const errorHandler = () => {
  return Sentry.Handlers.errorHandler();
};

/**
 * Express request handler middleware
 * @returns {Function} Express middleware
 */
export const requestHandler = () => {
  return Sentry.Handlers.requestHandler();
};

/**
 * Express tracing handler middleware
 * @returns {Function} Express middleware
 */
export const tracingHandler = () => {
  return Sentry.Handlers.tracingHandler();
};

/**
 * Wrap async function with error handling
 * @param {Function} fn - Async function to wrap
 * @returns {Function} Wrapped function
 */
export const wrapAsync = (fn) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      captureException(error);
      throw error;
    }
  };
};

/**
 * Close Sentry client (useful for graceful shutdown)
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<boolean>}
 */
export const close = async (timeout = 2000) => {
  return await Sentry.close(timeout);
};

/**
 * Flush pending events
 * @param {number} timeout - Timeout in milliseconds
 * @returns {Promise<boolean>}
 */
export const flush = async (timeout = 2000) => {
  return await Sentry.flush(timeout);
};

/**
 * Create a custom scope for isolated error handling
 * @param {Function} callback - Function to execute within scope
 */
export const withScope = (callback) => {
  Sentry.withScope(callback);
};

export default {
  initSentry,
  captureException,
  captureMessage,
  setUser,
  clearUser,
  addBreadcrumb,
  setTag,
  setTags,
  setContext,
  startTransaction,
  errorHandler,
  requestHandler,
  tracingHandler,
  wrapAsync,
  close,
  flush,
  withScope,
};