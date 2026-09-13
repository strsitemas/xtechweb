"use client";

import { FormEvent, useState } from "react";

type Classificacao =
  | "POSSIVEL_STR"
  | "XTECHWEB_PADRAO";

const TERMOS_STR = [
  "erp",
  "sistema próprio",
  "sistema proprio",
  "integração",
  "integracao",
  "automação",
  "automacao",
  "área de login",
  "area de login",
  "login de cliente",
  "multiusuário",
  "multiusuario",
  "painel administrativo",
  "api",
  "marketplace",
];

function normalizarTexto(valor: string) {
  return valor
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function classificarLead(
  necessidade: string,
  sistemaAtual: string,
  objetivo: string,
): Classificacao {
  if (
    sistemaAtual === "erp_mudar" ||
    sistemaAtual === "sistema_evoluir"
  ) {
    return "POSSIVEL_STR";
  }

  if (
    objetivo === "automatizar_processo" ||
    objetivo === "substituir_integrar"
  ) {
    return "POSSIVEL_STR";
  }

  const texto = normalizarTexto(necessidade);

  const encontrouTermoSTR = TERMOS_STR.some((termo) =>
    texto.includes(normalizarTexto(termo)),
  );

  return encontrouTermoSTR
    ? "POSSIVEL_STR"
    : "XTECHWEB_PADRAO";
}

export function LeadQualificationForm() {
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [sucesso, setSucesso] = useState(false);

  async function enviarFormulario(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (enviando) {
      return;
    }

    setEnviando(true);
    setMensagem("");
    setSucesso(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      nome: String(formData.get("nome") ?? "").trim(),
      necessidade: String(
        formData.get("necessidade") ?? "",
      ).trim(),
      sistemaAtual: String(
        formData.get("sistemaAtual") ?? "",
      ),
      objetivo: String(formData.get("objetivo") ?? ""),
      whatsapp: String(formData.get("whatsapp") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      consentimento: formData.get("consentimento") === "on",
    };

    /*
     * Classificacao client-side exigida pela regra comercial.
     * Ela NAO e mostrada ao visitante e NAO e enviada como
     * fonte de verdade. A API recalcula a classificacao.
     */
    const classificacaoLocal = classificarLead(
      payload.necessidade,
      payload.sistemaAtual,
      payload.objetivo,
    );

    console.info("[XTECHWEB][FORM][ENVIO_INICIO]");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resultado = (await response.json()) as {
        ok?: boolean;
        mensagem?: string;
      };

      if (!response.ok || !resultado.ok) {
        console.error("[XTECHWEB][FORM][ENVIO_FALHOU]", {
          status: response.status,
        });

        setMensagem(
          resultado.mensagem ||
            "Não foi possível enviar sua mensagem agora. Tente novamente.",
        );

        return;
      }

      console.info("[XTECHWEB][FORM][ENVIO_OK]");

      setSucesso(true);
      setMensagem(
        resultado.mensagem ||
          "Recebemos sua mensagem! Nosso time vai analisar e te chamar no WhatsApp/e-mail em breve para entender melhor e sugerir o plano ideal.",
      );

      form.reset();
    } catch {
      console.error("[XTECHWEB][FORM][ERRO_REDE]");

      setMensagem(
        "Não foi possível enviar sua mensagem agora. Tente novamente em alguns instantes.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="lead-qualification">
      <div className="lead-qualification-heading">
        <span className="eyebrow">
          Conte um pouco sobre o projeto
        </span>

        <h3>
          Não encontrou exatamente o que precisa?
        </h3>

        <p>
          Sem problema. Responda estas perguntas rápidas e
          a gente entende melhor o caminho para o seu projeto.
        </p>
      </div>

      <form
        className="lead-qualification-form"
        onSubmit={enviarFormulario}
      >
        <div className="lead-form-field">
          <label htmlFor="lead-nome">Nome</label>

          <input
            id="lead-nome"
            name="nome"
            type="text"
            minLength={2}
            maxLength={100}
            autoComplete="name"
            required
            placeholder="Como podemos te chamar?"
          />
        </div>

        <div className="lead-form-field lead-form-field-wide">
          <label htmlFor="lead-necessidade">
            O que você precisa?
          </label>

          <textarea
            id="lead-necessidade"
            name="necessidade"
            minLength={5}
            maxLength={2000}
            required
            rows={5}
            placeholder="Ex: um site pra apresentar minha empresa, ou algo mais específico que você não encontrou nos planos acima"
          />
        </div>

        <div className="lead-form-field">
          <label htmlFor="lead-sistema">
            Sua empresa já usa algum sistema hoje?
          </label>

          <select
            id="lead-sistema"
            name="sistemaAtual"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Selecione uma opção
            </option>

            <option value="nenhum">
              Não usamos nada ainda
            </option>

            <option value="planilhas">
              Usamos planilhas/ferramentas soltas
            </option>

            <option value="erp_mudar">
              Usamos um sistema/ERP, mas queremos mudar
            </option>

            <option value="sistema_evoluir">
              Já temos um sistema robusto e queremos evoluir ele
            </option>
          </select>
        </div>

        <div className="lead-form-field">
          <label htmlFor="lead-objetivo">
            O que você está buscando, no fundo?
          </label>

          <select
            id="lead-objetivo"
            name="objetivo"
            defaultValue=""
            required
          >
            <option value="" disabled>
              Selecione uma opção
            </option>

            <option value="presenca_online">
              Ter presença online / atrair clientes
            </option>

            <option value="vender_online">
              Vender produtos ou serviços online
            </option>

            <option value="automatizar_processo">
              Organizar/automatizar um processo interno da empresa
            </option>

            <option value="substituir_integrar">
              Substituir ou integrar um sistema que já usamos
            </option>
          </select>
        </div>

        <div className="lead-form-field">
          <label htmlFor="lead-whatsapp">WhatsApp</label>

          <input
            id="lead-whatsapp"
            name="whatsapp"
            type="tel"
            minLength={8}
            maxLength={30}
            autoComplete="tel"
            required
            placeholder="Ex: (11) 99999-9999"
          />
        </div>

        <div className="lead-form-field">
          <label htmlFor="lead-email">E-mail</label>

          <input
            id="lead-email"
            name="email"
            type="email"
            maxLength={254}
            autoComplete="email"
            required
            placeholder="Ex: seuemail@empresa.com"
          />
        </div>

        <div className="lead-form-consent lead-form-field-wide">
          <label>
            <input
              name="consentimento"
              type="checkbox"
              required
            />

            <span>
              Concordo que a XTechWeb utilize meus dados para entrar em
              contato sobre esta solicitação, conforme a Política de
              Privacidade.
            </span>
          </label>
        </div>

        <div className="lead-form-actions lead-form-field-wide">
          <button
            type="submit"
            disabled={enviando}
          >
            {enviando
              ? "Enviando..."
              : "Enviar meu projeto"}
          </button>
        </div>

        {mensagem && (
          <div
            className={
              sucesso
                ? "lead-form-message lead-form-message-success"
                : "lead-form-message lead-form-message-error"
            }
            role="status"
            aria-live="polite"
          >
            {mensagem}
          </div>
        )}
      </form>
    </div>
  );
}