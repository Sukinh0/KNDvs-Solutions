'use client';

import { SyntheticEvent, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, CircleAlert, LoaderCircle } from 'lucide-react';
import { solutionTypes } from '@/lib/site-content';
import {
  ContactErrors,
  ContactFields,
  hasContactErrors,
  validateContact,
} from '@/lib/contact-validation';

const initialFields: ContactFields = {
  name: '', company: '', contact: '', solutionType: '', description: '', consent: false, website: '',
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'unconfigured' | 'cooldown';

export function ContactForm() {
  const [fields, setFields] = useState<ContactFields>(initialFields);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const lastAttempt = useRef(0);
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim();

  function updateField<K extends keyof ContactFields>(key: K, value: ContactFields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
    if (status !== 'idle' && status !== 'loading') setStatus('idle');
  }

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'loading') return;

    const validationErrors = validateContact(fields);
    setErrors(validationErrors);
    if (hasContactErrors(validationErrors)) {
      setStatus('error');
      setStatusMessage('Revise os campos destacados antes de enviar.');
      const firstError = Object.keys(validationErrors)[0];
      document.getElementById(firstError)?.focus();
      return;
    }

    if (fields.website) {
      setStatus('error');
      setStatusMessage('Não foi possível enviar. Atualize a página e tente novamente.');
      return;
    }

    const now = Date.now();
    if (now - lastAttempt.current < 10_000) {
      setStatus('cooldown');
      setStatusMessage('Aguarde alguns segundos antes de tentar um novo envio.');
      return;
    }

    if (!endpoint) {
      setStatus('unconfigured');
      setStatusMessage('O canal de envio ainda não está configurado. Seus dados não foram enviados.');
      return;
    }

    lastAttempt.current = now;
    setStatus('loading');
    setStatusMessage('Enviando sua mensagem…');

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          company: fields.company.trim() || undefined,
          contact: fields.contact.trim(),
          solutionType: fields.solutionType,
          description: fields.description.trim(),
          consent: fields.consent,
          source: "landing-page-kndevs",
        }),
      });

      if (!response.ok) throw new Error(`Contact endpoint returned ${response.status}`);
      setStatus('success');
      setStatusMessage('Mensagem enviada. Obrigado! Vamos analisar sua necessidade.');
      setFields(initialFields);
      setErrors({});
    } catch {
      setStatus('error');
      setStatusMessage('Não foi possível enviar agora. Tente novamente em alguns instantes.');
    }
  }

  const statusIcon = status === 'loading'
    ? <LoaderCircle className="spin" aria-hidden="true" />
    : status === 'success'
      ? <CheckCircle2 aria-hidden="true" />
      : status !== 'idle'
        ? <CircleAlert aria-hidden="true" />
        : null;

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        <div className="field">
          <label htmlFor="name">Nome <span aria-hidden="true">*</span></label>
          <input id="name" name="name" autoComplete="name" value={fields.name}
            onChange={(event) => updateField('name', event.target.value)}
            aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name && <p className="field-error" id="name-error">{errors.name}</p>}
        </div>

        <div className="field">
          <label htmlFor="company">Empresa <small>opcional</small></label>
          <input id="company" name="company" autoComplete="organization" value={fields.company}
            onChange={(event) => updateField('company', event.target.value)} />
        </div>

        <div className="field">
          <label htmlFor="contact">E-mail ou WhatsApp <span aria-hidden="true">*</span></label>
          <input id="contact" name="contact" autoComplete="email" inputMode="email" value={fields.contact}
            onChange={(event) => updateField('contact', event.target.value)}
            aria-invalid={Boolean(errors.contact)} aria-describedby={errors.contact ? 'contact-error' : undefined} />
          {errors.contact && <p className="field-error" id="contact-error">{errors.contact}</p>}
        </div>

        <div className="field">
          <label htmlFor="solutionType">Tipo de solução <span aria-hidden="true">*</span></label>
          <select id="solutionType" name="solutionType" value={fields.solutionType}
            onChange={(event) => updateField('solutionType', event.target.value)}
            aria-invalid={Boolean(errors.solutionType)} aria-describedby={errors.solutionType ? 'solutionType-error' : undefined}>
            <option value="">Selecione uma opção</option>
            {solutionTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
          {errors.solutionType && <p className="field-error" id="solutionType-error">{errors.solutionType}</p>}
        </div>

        <div className="field field-full">
          <label htmlFor="description">Sua ideia ou necessidade <span aria-hidden="true">*</span></label>
          <textarea id="description" name="description" rows={5} value={fields.description}
            placeholder="Conte o que precisa funcionar melhor ou a ideia que deseja tirar do papel."
            onChange={(event) => updateField('description', event.target.value)}
            aria-invalid={Boolean(errors.description)} aria-describedby={errors.description ? 'description-error' : 'description-help'} />
          <p className="field-help" id="description-help">Não precisa usar termos técnicos.</p>
          {errors.description && <p className="field-error" id="description-error">{errors.description}</p>}
        </div>

        <div className="honeypot" aria-hidden="true">
          <label htmlFor="website">Não preencha este campo</label>
          <input id="website" name="website" tabIndex={-1} autoComplete="off" value={fields.website}
            onChange={(event) => updateField('website', event.target.value)} />
        </div>

        <div className="field field-full consent-field">
          <input id="consent" name="consent" type="checkbox" checked={fields.consent}
            onChange={(event) => updateField('consent', event.target.checked)}
            aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} />
          <label htmlFor="consent">
            Li e aceito a <Link href="/politica-de-privacidade">política de privacidade</Link>. <span aria-hidden="true">*</span>
          </label>
          {errors.consent && <p className="field-error" id="consent-error">{errors.consent}</p>}
        </div>
      </div>

      <div className="form-actions">
        <button className="button" type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Enviando…' : 'Quero conversar sobre minha ideia'}
          {status === 'loading' ? <LoaderCircle className="spin" aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}
        </button>
        <p className="form-note">Seus dados serão usados apenas para responder a este contato.</p>
      </div>

      <output className={`form-status ${status}`} aria-live="polite" aria-atomic="true">
        {statusIcon}{statusMessage && <span>{statusMessage}</span>}
      </output>
    </form>
  );
}
