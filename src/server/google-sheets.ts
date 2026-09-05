// Server-only helper for appending rows to a Google Sheet through a Google
// Apps Script Web App bound to the spreadsheet. This avoids needing a
// service account key (blocked by org policy) — the script runs as your own
// Google identity, and we authenticate the request with a shared secret.

export async function appendRowToSheet(row: Array<string>) {
  const webAppUrl = process.env.GOOGLE_SHEETS_WEBAPP_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBAPP_SECRET;

  if (!webAppUrl || !secret) {
    throw new Error(
      'Missing GOOGLE_SHEETS_WEBAPP_URL or GOOGLE_SHEETS_WEBAPP_SECRET env vars',
    );
  }

  const response = await fetch(webAppUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret, row }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to append row to sheet: ${response.status} ${await response.text()}`,
    );
  }

  const result = (await response.json()) as { ok?: boolean; error?: string };
  if (!result.ok) {
    throw new Error(result.error || 'Apps Script rejected the request');
  }
}
