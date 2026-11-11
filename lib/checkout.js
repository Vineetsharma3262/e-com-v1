const CHECKOUT_KEY = "aurelle-checkout";
const PENDING_KEY = "aurelle-pending-pay";

export function saveCheckout(draft) {
  sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(draft));
}

export function readCheckout() {
  try {
    return JSON.parse(sessionStorage.getItem(CHECKOUT_KEY) || "null");
  } catch {
    return null;
  }
}

export function clearCheckout() {
  sessionStorage.removeItem(CHECKOUT_KEY);
}

export function savePendingPayment(draft) {
  sessionStorage.setItem(PENDING_KEY, JSON.stringify(draft));
}

export function readPendingPayment() {
  try {
    return JSON.parse(sessionStorage.getItem(PENDING_KEY) || "null");
  } catch {
    return null;
  }
}

export function clearPendingPayment() {
  sessionStorage.removeItem(PENDING_KEY);
}
