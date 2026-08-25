'use client';

import { useSyncExternalStore } from 'react';

// Extend Navigator interface for iOS standalone property
declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

const WEBVIEW_PATTERNS = [
  'twitter',
  'fbav',
  'fban',
  'instagram',
  'linkedin',
  'micromessenger',
  'wechat',
  'weibo',
  'line',
  'telegram',
  'snapchat',
  'pinterest',
  'reddit',
  'discord',
  'whatsapp',
];

/**
 * The user agent never changes for the life of the document, so this is a
 * constant external value: subscribing is a no-op and the snapshot is cached.
 * Reading it through useSyncExternalStore rather than a mount effect avoids
 * the extra render pass (react-hooks/set-state-in-effect) and gives SSR an
 * explicit `false`.
 */
const noopSubscribe = () => () => {};

let cached: boolean | null = null;

function detectWebView(): boolean {
  if (cached !== null) return cached;
  const userAgent = navigator.userAgent.toLowerCase();
  cached =
    WEBVIEW_PATTERNS.some((pattern) => userAgent.includes(pattern)) ||
    window.navigator.standalone === false ||
    (!!document.referrer && document.referrer.includes('//t.co/')) ||
    (!!window.matchMedia && window.matchMedia('(display-mode: standalone)').matches === false);
  return cached;
}

export function useWebViewDetection() {
  return useSyncExternalStore(noopSubscribe, detectWebView, () => false);
}
