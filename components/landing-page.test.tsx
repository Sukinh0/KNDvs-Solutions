import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LandingPage } from './landing-page';

afterEach(() => {
  cleanup();
  document.body.className = '';
  document.documentElement.className = '';
});

describe('LandingPage interactions', () => {
  it('opens and closes the accessible mobile menu', () => {
    render(<LandingPage />);
    const toggle = screen.getByRole('button', { name: 'Abrir menu' });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Fechar menu' })).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.getByRole('button', { name: 'Abrir menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('switches the highlighted problem-to-solution state', () => {
    render(<LandingPage />);
    const before = screen.getByRole('button', { name: 'Antes' });
    const after = screen.getByRole('button', { name: 'Depois' });
    expect(after).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(before);
    expect(before).toHaveAttribute('aria-pressed', 'true');
    expect(after).toHaveAttribute('aria-pressed', 'false');
  });

  it('shows validation errors without submitting incomplete data', () => {
    render(<LandingPage />);
    fireEvent.click(screen.getByRole('button', { name: /Quero conversar sobre minha ideia/ }));
    expect(screen.getByText('Revise os campos destacados antes de enviar.')).toBeInTheDocument();
    expect(screen.getByText('Informe um e-mail ou WhatsApp válido.')).toBeInTheDocument();
  });

  it('never reports success when the contact endpoint is not configured', () => {
    render(<LandingPage />);
    fireEvent.change(screen.getByLabelText('Nome *'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('E-mail ou WhatsApp *'), { target: { value: 'ana@empresa.com' } });
    fireEvent.change(screen.getByLabelText('Tipo de solução *'), { target: { value: 'Sistemas web' } });
    fireEvent.change(screen.getByLabelText('Sua ideia ou necessidade *'), { target: { value: 'Precisamos centralizar um processo manual importante.' } });
    fireEvent.click(screen.getByLabelText(/Li e aceito a política/));
    fireEvent.click(screen.getByRole('button', { name: /Quero conversar sobre minha ideia/ }));
    expect(screen.getByText('O canal de envio ainda não está configurado. Seus dados não foram enviados.')).toBeInTheDocument();
  });

  it('renders all 6 services and uses the official brand logo', () => {
    render(<LandingPage />);
    expect(screen.getByRole('heading', { name: 'Manutenção e evolução' })).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBeGreaterThanOrEqual(6);
    const logoImgs = screen.getAllByAltText("KNDev's Solutions");
    expect(logoImgs.length).toBeGreaterThanOrEqual(2);
    logoImgs.forEach((img) => expect(img).toHaveAttribute('src', '/logomarca.png'));
  });

  it('does not prepare reveal animations when reduced motion is preferred', () => {
    const defaultMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: vi.fn().mockReturnValue({ matches: true, addEventListener: vi.fn(), removeEventListener: vi.fn() }),
    });
    render(<LandingPage />);
    expect(document.documentElement).not.toHaveClass('reveal-ready');
    Object.defineProperty(window, 'matchMedia', { configurable: true, value: defaultMatchMedia });
  });
});
