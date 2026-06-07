const TOKEN_KEY = "token";

/**
 * Token store — simple wrapper around localStorage for auth token management.
 *
 * NOTE: This is a simplified imitation of a token store.
 * In a real application the logic would be much more complex:
 * - Integration with state management (Redux, Zustand, etc.)
 * - Refresh token handling
 * - Automatic token refresh
 * - Error handling and logout flows
 * - Possibly context/provider pattern
 */
export const authStore = {
  readToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  },

  removeToken(): void {
    localStorage.removeItem(TOKEN_KEY);
  },
};

// NOTE: Storing JWTs in localStorage is vulnerable to XSS attacks. A safer
// approach is to use httpOnly + Secure cookies set by the server. However,
// the current API returns the token in the response body and expects it in
// the Authorization header, so switching to a cookie-based scheme would
// require backend changes.

// TODO (prod): Migrate authentication to server-managed httpOnly cookies.
