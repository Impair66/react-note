// middleware.js
// i18n middleware removed. Previously this file performed automatic locale
// prefixing. Project was refactored to remove i18n — keep a no-op middleware
// placeholder to avoid runtime errors if Next expects the file to exist.
export function middleware(request) {
  // no-op
  return;
}

export const config = {
  matcher: [],
};
