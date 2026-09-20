export const ACCESS_COOKIE_NAME = "bonaire_toegang";
export const ACCESS_COOKIE_MAX_AGE = 60 * 60 * 24 * 180; // 180 dagen

function getSecret(): string {
  return process.env.AUTH_SECRET || "wijzig-deze-secret-in-productie";
}

function getAccessCode(): string {
  return (process.env.ACCESS_CODE || "bonaire2027").trim();
}

async function hmac(message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Het token dat in het cookie hoort te staan wanneer iemand is ingelogd. */
export async function getExpectedToken(): Promise<string> {
  return hmac(`bonaire-vriendengroep:${getAccessCode()}`);
}

/** Vergelijkt de ingevoerde code met de gedeelde toegangscode. */
export function isCorrectCode(input: string): boolean {
  const expected = getAccessCode();
  const value = (input || "").trim();
  if (value.length !== expected.length) return false;
  // Eenvoudige constant-time vergelijking.
  let mismatch = 0;
  for (let i = 0; i < expected.length; i++) {
    mismatch |= value.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await getExpectedToken();
  return token === expected;
}
