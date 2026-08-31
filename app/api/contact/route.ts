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

    const reqEnv = (request as unknown as { env?: Record<string, string> }).env;
    const resendApiKey =
      process.env.RESEND_API_KEY?.trim() ||
      (globalThis as unknown as Record<string, string>).RESEND_API_KEY?.trim() ||
      reqEnv?.RESEND_API_KEY?.trim();

    const destinationEmail =
      process.env.CONTACT_DESTINATION_EMAIL?.trim() ||
      (globalThis as unknown as Record<string, string>).CONTACT_DESTINATION_EMAIL?.trim() ||
      reqEnv?.CONTACT_DESTINATION_EMAIL?.trim() ||
      'fabio.sousa8dev@gmail.com';

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
      console.error('RESEND_API_KEY não foi encontrada no ambiente.');
      return NextResponse.json(
        { error: 'Canal de e-mail em configuração no servidor (RESEND_API_KEY ausente).' },
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
      console.error('Resend API Error:', errorText);
      return NextResponse.json({ error: `Erro no serviço de e-mail Resend: ${errorText}` }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Mensagem recebida com sucesso!' });
  } catch (error) {
    console.error('Erro na API de contato:', error);
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
