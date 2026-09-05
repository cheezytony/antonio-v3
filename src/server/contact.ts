import { createServerFn } from '@tanstack/react-start';
import { appendRowToSheet } from '@/server/google-sheets';

export interface ContactFormInput {
  name: string;
  email: string;
  purpose: string;
  message: string;
}

function assertNonEmptyString(value: unknown, field: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const submitContactForm = createServerFn({ method: 'POST' })
  .inputValidator((data: ContactFormInput) => {
    const name = assertNonEmptyString(data.name, 'Name');
    const email = assertNonEmptyString(data.email, 'Email');
    const purpose = assertNonEmptyString(data.purpose, 'Purpose');
    const message = assertNonEmptyString(data.message, 'Message');

    if (!EMAIL_PATTERN.test(email)) {
      throw new Error('Email address is invalid');
    }

    return { name, email, purpose, message };
  })
  .handler(async ({ data }) => {
    await appendRowToSheet([
      new Date().toISOString(),
      data.name,
      data.email,
      data.purpose,
      data.message,
    ]);

    return { success: true as const };
  });
