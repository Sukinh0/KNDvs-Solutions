export interface ContactFields {
  name: string;
  company: string;
  contact: string;
  solutionType: string;
  description: string;
  consent: boolean;
  website: string;
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(?:\+?\d[\d\s().-]{7,}\d)$/;

export function validateContact(fields: ContactFields): ContactErrors {
  const errors: ContactErrors = {};
  const name = fields.name.trim();
  const contact = fields.contact.trim();
  const description = fields.description.trim();

  if (name.length < 2) errors.name = 'Informe seu nome com pelo menos 2 caracteres.';
  if (!emailPattern.test(contact) && !phonePattern.test(contact)) {
    errors.contact = 'Informe um e-mail ou WhatsApp válido.';
  }
  if (!fields.solutionType) errors.solutionType = 'Selecione o tipo de solução.';
  if (description.length < 20) {
    errors.description = 'Conte um pouco mais sobre a necessidade (mínimo de 20 caracteres).';
  }
  if (!fields.consent) errors.consent = 'Você precisa aceitar a política de privacidade.';
  return errors;
}

export function hasContactErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
