import { NextResponse } from 'next/server';

interface ContactRequestBody {
  name?: string;
  company?: string;
  contact?: string;
  solutionType?: string;
  description?: string;
  consent?: boolean;
  source?: string;
}

/**
 * Resolves an environment variable from available Cloudflare Workers bindings.
 *
 * In Cloudflare Workers, `process.env` is NOT populated with dashboard
 * secrets/vars. The canonical way to access them is via:
 *   import { env } from "cloudflare:workers"
 *
 * We also fall back to process.env for local dev (wrangler dev populates it).
 */
function getEnvVar(key: string): string | undefined {
  // 1. Try cloudflare:workers env (the canonical runtime path)
  try {
    // Dynamic import not possible at top-level in sync context, so we access
    // the global that the Cloudflare runtime exposes.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cfEnv = (globalThis as any).__cf_env__;
    if (cfEnv?.[key]) return String(cfEnv[key]);
  } catch {
    // not in CF runtime
  }

  // 2. Try process.env (works in local wrangler dev with .dev.vars)
  try {
    const val = process.env[key];
    if (val) return val.trim();
  } catch {
    // process may not exist
  }

  return undefined;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequestBody;
    const { name, company, contact, solutionType, description, consent, source } = body;

    if (!name || !contact || !solutionType || !description || !consent) {
      return NextResponse.json(
        { error: 'Campos obrigatórios ausentes.' },
        { status: 400 }
      );
    }

    // --- Resolve env vars ---
    // On Cloudflare Workers the env bindings are injected by the runtime.
    // We read them dynamically to avoid Vite static-replacing them at build time.
    const envKeys = ['RESEND_API_KEY', 'CONTACT_DESTINATION_EMAIL'] as const;
    const resolved: Record<string, string | undefined> = {};

    for (const key of envKeys) {
      resolved[key] = getEnvVar(key);
    }

    // Last resort: read env from the request if the adapter attached it
    try {
      const reqAny = request as unknown as { env?: Record<string, string> };
      if (reqAny.env) {
        for (const key of envKeys) {
          if (!resolved[key] && reqAny.env[key]) {
            resolved[key] = String(reqAny.env[key]).trim();
          }
        }
      }
    } catch {
      // no env on request
    }

    const resendApiKey = resolved['RESEND_API_KEY'];
    const destinationEmail = resolved['CONTACT_DESTINATION_EMAIL'] || 'fabio.sousa8dev@gmail.com';

    const emailSubject = `Novo Lead KNDev's Solutions: ${name} (${solutionType})`;
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #071426; color: #fefefe; padding: 24px; border-radius: 12px;">
        <h2 style="color: #134afb; border-bottom: 2px solid #134afb; padding-bottom: 12px;">
          Novo Contato via Landing Page — KNDev's Solutions
        </h2>
        <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
        <p><strong>Empresa:</strong> ${company ? escapeHtml(company) : 'Não informada'}</p>
        <p><strong>E-mail / WhatsApp:</strong> ${escapeHtml(contact)}</p>
        <p><strong>Tipo de Solução Desejada:</strong> ${escapeHtml(solutionType)}</p>
        <div style="background-color: #0e1a32; padding: 16px; border-radius: 8px; margin-top: 16px; border-left: 4px solid #f9543b;">
          <h4 style="margin-top: 0; color: #f9543b;">Ideia / Necessidade:</h4>
          <p style="white-space: pre-wrap; margin-bottom: 0;">${escapeHtml(description)}</p>
        </div>
        <hr style="border-color: #134afb; margin-top: 24px;" />
        <p style="font-size: 12px; color: #8a99ad;">Origem: ${escapeHtml(source || 'landing-page-kndevs')}</p>
      </div>
    `;

    if (!resendApiKey) {
      console.error('[contact-route] RESEND_API_KEY not found. Checked: __cf_env__, process.env, request.env');
      return NextResponse.json(
        { error: 'RESEND_API_KEY não configurada no servidor. Verifique as variáveis de ambiente na Cloudflare.' },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'KNDevs Landing Page <onboarding@resend.dev>',
        to: [destinationEmail],
        subject: emailSubject,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[contact-route] Resend API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `Erro Resend (${response.status}): ${errorText}` },
        { status: 500 }
      );
    }

    const result = await response.json();
    console.log('[contact-route] Email sent successfully:', JSON.stringify(result));

    return NextResponse.json({ success: true, message: 'Mensagem recebida com sucesso!' });
  } catch (error) {
    console.error('[contact-route] Unhandled error:', error);
    return NextResponse.json({ error: 'Falha interna no servidor.' }, { status: 500 });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
