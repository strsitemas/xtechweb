import { NextResponse } from "next/server";
import { Resend } from "resend";

type SistemaAtual =
  | "nenhum"
  | "planilhas"
  | "erp_mudar"
  | "sistema_evoluir";

type Objetivo =
  | "presenca_online"
  | "vender_online"
  | "automatizar_processo"
  | "substituir_integrar";

type LeadPayload = {
  nome?: unknown;
  necessidade?: unknown;
  sistemaAtual?: unknown;
  objetivo?: unknown;
  whatsapp?: unknown;
  email?: unknown;
  consentimento?: unknown;
};

const SISTEMAS_VALIDOS: SistemaAtual[] = [
  "nenhum",
  "planilhas",
  "erp_mudar",
  "sistema_evoluir",
];

const OBJETIVOS_VALIDOS: Objetivo[] = [
  "presenca_online",
  "vender_online",
  "automatizar_processo",
  "substituir_integrar",
];

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

function textoValido(
  valor: unknown,
  minimo: number,
  maximo: number,
): valor is string {
  return (
    typeof valor === "string" &&
    valor.trim().length >= minimo &&
    valor.trim().length <= maximo
  );
}

function escaparHtml(valor: string) {
  return valor
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizarTexto(valor: string) {
  return valor
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function classificarLead(
  necessidade: string,
  sistemaAtual: SistemaAtual,
  objetivo: Objetivo,
) {
  if (
    sistemaAtual === "erp_mudar" ||
    sistemaAtual === "sistema_evoluir"
  ) {
    return "POSSIVEL_STR" as const;
  }

  if (
    objetivo === "automatizar_processo" ||
    objetivo === "substituir_integrar"
  ) {
    return "POSSIVEL_STR" as const;
  }

  const texto = normalizarTexto(necessidade);

  const encontrouTermoSTR = TERMOS_STR.some((termo) =>
    texto.includes(normalizarTexto(termo)),
  );

  return encontrouTermoSTR
    ? ("POSSIVEL_STR" as const)
    : ("XTECHWEB_PADRAO" as const);
}

function descricaoSistema(valor: SistemaAtual) {
  const descricoes: Record<SistemaAtual, string> = {
    nenhum: "Não usamos nada ainda",
    planilhas: "Usamos planilhas/ferramentas soltas",
    erp_mudar: "Usamos um sistema/ERP, mas queremos mudar",
    sistema_evoluir:
      "Já temos um sistema robusto e queremos evoluir ele",
  };

  return descricoes[valor];
}

function descricaoObjetivo(valor: Objetivo) {
  const descricoes: Record<Objetivo, string> = {
    presenca_online: "Ter presença online / atrair clientes",
    vender_online: "Vender produtos ou serviços online",
    automatizar_processo:
      "Organizar/automatizar um processo interno da empresa",
    substituir_integrar:
      "Substituir ou integrar um sistema que já usamos",
  };

  return descricoes[valor];
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();

  console.info("[XTECHWEB][LEAD][INICIO]", {
    requestId,
  });

  try {
    let body: LeadPayload;

    try {
      body = (await request.json()) as LeadPayload;
    } catch {
      console.warn("[XTECHWEB][LEAD][JSON_INVALIDO]", {
        requestId,
      });

      return NextResponse.json(
        {
          ok: false,
          mensagem: "Não foi possível processar os dados enviados.",
        },
        { status: 400 },
      );
    }

    const {
      nome,
      necessidade,
      sistemaAtual,
      objetivo,
      whatsapp,
      email,
      consentimento,
    } = body;

    if (
      !textoValido(nome, 2, 100) ||
      !textoValido(necessidade, 5, 2000) ||
      !textoValido(whatsapp, 8, 30) ||
      !textoValido(email, 5, 254) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      consentimento !== true ||
      typeof sistemaAtual !== "string" ||
      typeof objetivo !== "string" ||
      !SISTEMAS_VALIDOS.includes(sistemaAtual as SistemaAtual) ||
      !OBJETIVOS_VALIDOS.includes(objetivo as Objetivo)
    ) {
      console.warn("[XTECHWEB][LEAD][VALIDACAO_FALHOU]", {
        requestId,
      });

      return NextResponse.json(
        {
          ok: false,
          mensagem:
            "Confira os campos do formulário e tente novamente.",
        },
        { status: 400 },
      );
    }

    const sistema = sistemaAtual as SistemaAtual;
    const meta = objetivo as Objetivo;

    const classificacao = classificarLead(
      necessidade,
      sistema,
      meta,
    );

    console.info("[XTECHWEB][LEAD][CLASSIFICADO]", {
      requestId,
      classificacao,
    });

    const apiKey = process.env.RESEND_API_KEY;
    const destinatario = process.env.LEADS_TO_EMAIL;

    if (!apiKey || !destinatario) {
      console.error("[XTECHWEB][LEAD][CONFIG_AUSENTE]", {
        requestId,
        resendConfigurado: Boolean(apiKey),
        destinatarioConfigurado: Boolean(destinatario),
      });

      return NextResponse.json(
        {
          ok: false,
          mensagem:
            "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.",
        },
        { status: 500 },
      );
    }

    const resend = new Resend(apiKey);

    const possivelSTR = classificacao === "POSSIVEL_STR";

    const assunto = possivelSTR
      ? "⚠️ Possível lead STR Software"
      : "Novo lead XTechWeb";

    const tagInterna = possivelSTR
      ? "⚠️ POSSÍVEL LEAD STR SOFTWARE"
      : "XTECHWEB PADRÃO";

    console.info("[XTECHWEB][LEAD][EMAIL_INICIO]", {
      requestId,
      classificacao,
    });

    const resultado = await resend.emails.send({
      from: "XTechWeb <onboarding@resend.dev>",
      to: [destinatario],
      subject: assunto,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:680px;margin:0 auto;color:#111827;">
          <div style="padding:16px 20px;background:#111827;color:#ffffff;font-weight:700;font-size:18px;">
            ${tagInterna}
          </div>

          <div style="padding:24px;border:1px solid #e5e7eb;">
            <p><strong>Nome:</strong> ${escaparHtml(nome.trim())}</p>

            <p><strong>O que precisa:</strong><br>
            ${escaparHtml(necessidade.trim()).replaceAll("\n", "<br>")}</p>

            <p><strong>Sistema atual:</strong><br>
            ${escaparHtml(descricaoSistema(sistema))}</p>

            <p><strong>Objetivo principal:</strong><br>
            ${escaparHtml(descricaoObjetivo(meta))}</p>

            <p><strong>WhatsApp:</strong><br>
            ${escaparHtml(whatsapp.trim())}</p>

            <p><strong>E-mail:</strong><br>
            ${escaparHtml(email.trim())}</p>

            <p><strong>Consentimento para contato:</strong><br>
            Sim</p>

            <hr style="margin:24px 0;border:0;border-top:1px solid #e5e7eb;">

            <p style="font-size:12px;color:#6b7280;">
              Classificação automática para triagem interna.
              A decisão final de encaminhamento deve ser humana.
            </p>

            <p style="font-size:12px;color:#6b7280;">
              ID da solicitação: ${requestId}
            </p>
          </div>
        </div>
      `,
    });

    if (resultado.error) {
      console.error("[XTECHWEB][LEAD][EMAIL_FALHOU]", {
        requestId,
        erroNome: resultado.error.name,
        erroMensagem: resultado.error.message,
      });

      return NextResponse.json(
        {
          ok: false,
          mensagem:
            "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.",
        },
        { status: 502 },
      );
    }

    console.info("[XTECHWEB][LEAD][EMAIL_OK]", {
      requestId,
      emailId: resultado.data?.id ?? null,
      classificacao,
    });

    return NextResponse.json(
      {
        ok: true,
        mensagem:
          "Recebemos sua mensagem! Nosso time vai analisar e te chamar no WhatsApp/e-mail em breve para entender melhor e sugerir o plano ideal.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[XTECHWEB][LEAD][ERRO_NAO_TRATADO]", {
      requestId,
      erro:
        error instanceof Error
          ? error.message
          : "Erro desconhecido",
    });

    return NextResponse.json(
      {
        ok: false,
        mensagem:
          "Não foi possível enviar sua mensagem agora. Tente novamente em instantes.",
      },
      { status: 500 },
    );
  }
}