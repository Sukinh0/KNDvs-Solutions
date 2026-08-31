import { describe, expect, it } from 'vitest';
import { validateContact } from './contact-validation';

describe('validateContact', () => {
  it('accepts a complete contact request', () => {
    expect(validateContact({
      name: 'Ana', company: '', contact: 'ana@empresa.com.br', solutionType: 'Sistemas web',
      description: 'Precisamos centralizar os pedidos e o atendimento.', consent: true, website: '',
    })).toEqual({});
  });

  it('returns clear errors for required and invalid fields', () => {
    const errors = validateContact({
      name: 'A', company: '', contact: 'contato inválido', solutionType: '',
      description: 'Curto', consent: false, website: '',
    });
    expect(errors.name).toMatch(/2 caracteres/);
    expect(errors.contact).toMatch(/e-mail ou WhatsApp válido/);
    expect(errors.solutionType).toMatch(/Selecione/);
    expect(errors.description).toMatch(/20 caracteres/);
    expect(errors.consent).toMatch(/política de privacidade/);
  });
});
