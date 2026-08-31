import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Política de privacidade | KNDev's Solutions",
  description: "Entenda como os dados enviados pelo formulário da KNDev's Solutions são tratados.",
};

export default function PrivacyPolicy() {
  return (
    <main className="policy-page">
      <div className="policy-shell">
        <Link className="policy-brand" href="/" aria-label="Voltar ao início">
          <img src="/kndevs-horizontal.png" alt="KNDev's Solutions" width="512" height="192" />
        </Link>
        <Link className="text-link policy-back" href="/"><ArrowLeft aria-hidden="true" />Voltar para a página inicial</Link>
        <article>
          <p className="eyebrow"><span aria-hidden="true" /> Privacidade</p>
          <h1>Política de privacidade</h1>
          <p className="policy-lead">Esta política explica, de forma direta, como os dados enviados pelo formulário de contato são usados.</p>

          <h2>Dados coletados</h2>
          <p>O formulário pode coletar nome, empresa, e-mail ou WhatsApp, tipo de solução desejada e a descrição da ideia ou necessidade.</p>

          <h2>Finalidade</h2>
          <p>Esses dados são solicitados exclusivamente para compreender a necessidade apresentada, responder ao contato e dar continuidade à conversa comercial quando houver interesse.</p>

          <h2>Envio e armazenamento</h2>
          <p>O envio somente acontece quando um canal de contato é configurado pela KNDev&apos;s Solutions. Enquanto isso não ocorrer, o formulário informa claramente que os dados não foram enviados.</p>

          <h2>Compartilhamento</h2>
          <p>Os dados não devem ser vendidos ou usados para finalidades incompatíveis com o contato solicitado. Prestadores técnicos podem processá-los apenas quando necessários para operar o canal configurado.</p>

          <h2>Seus direitos</h2>
          <p>Você pode solicitar informações, correção ou exclusão dos dados pelos canais oficiais que forem publicados nesta página.</p>

          <h2>Atualizações</h2>
          <p>Esta política pode ser atualizada quando o canal de contato, os responsáveis ou as práticas de tratamento forem definidos. A versão publicada nesta página será sempre a vigente.</p>
        </article>
      </div>
    </main>
  );
}
