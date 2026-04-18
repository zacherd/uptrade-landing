'use server';

// Required env vars:
// BREVO_API_KEY       - from Brevo Settings → API Keys
// BREVO_LIST_ID       - from Brevo Contacts → Lists (number)
// BREVO_DOI_TEMPLATE_ID - from Brevo Settings → Double Opt-In (number)
// NEXT_PUBLIC_APP_URL - e.g. https://yourdomain.com

import type { ActionState } from '@/lib/actions';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlistAction(
  _prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = (formData.get('email') as string | null)?.trim() ?? '';
  const consent = formData.get('consent') as string | null;

  if (!EMAIL_REGEX.test(email)) {
    return { success: false, error: 'invalid_email' };
  }

  if (consent !== 'true') {
    return { success: false, error: 'consent_required' };
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;
  const templateId = process.env.BREVO_DOI_TEMPLATE_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';

  if (!apiKey || !listId || !templateId) {
    console.error('Brevo env vars missing: BREVO_API_KEY, BREVO_LIST_ID, BREVO_DOI_TEMPLATE_ID');
    return { success: false, error: 'generic' };
  }

  try {
    const response = await fetch(
      'https://api.brevo.com/v3/contacts/doubleOptinConfirmation',
      {
        method: 'POST',
        headers: {
          'api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          includeListIds: [parseInt(listId, 10)],
          templateId: parseInt(templateId, 10),
          redirectionUrl: `${appUrl}?confirmed=true`,
        }),
      },
    );

    if (response.status === 201 || response.status === 204) {
      return { success: true };
    }

    if (response.status === 400) {
      return { success: false, error: 'invalid_email' };
    }

    if (response.status === 409) {
      return { success: false, error: 'duplicate' };
    }

    if (response.status === 404) {
      console.error('Brevo DOI template not found — check BREVO_DOI_TEMPLATE_ID');
      return { success: false, error: 'generic' };
    }

    const body = await response.text();
    console.error(`Brevo unexpected status ${response.status}:`, body);
    return { success: false, error: 'generic' };
  } catch (err) {
    console.error('Brevo fetch error:', err);
    return { success: false, error: 'generic' };
  }
}
