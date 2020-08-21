module.exports = {
  pages(arr, itemsPerPage, page = 1) {
    const maxPages = Math.ceil(arr.length / itemsPerPage);
    if (page < 1 || page > maxPages) return null;

    return arr.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  },
  is_url(str) {
    let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regexp.test(str)) {
      return true;
    } else {
      return false;
    }
  },
  NumberFormat(format) {
    return new Intl.NumberFormat("pt-BR").format(format);
  },
  Permissions(pm) {
    pm = pm.replace(/create/gi, "Criar");
    pm = pm.replace(/invite/gi, "Convites");
    pm = pm.replace(/read/gi, "Ler");
    pm = pm.replace(/change/gi, "Alterar");
    pm = pm.replace(/_/g, " ");
    pm = pm.replace(/nickname/gi, "Apelido");
    pm = pm.replace(/manage/gi, "Gerenciar");
    pm = pm.replace(/role/gi, "Cargo");
    pm = pm.replace(/member/gi, "Membro");
    pm = pm.replace(/administrator/gi, "Administrador");
    pm = pm.replace(/move/, "Mover");
    pm = pm.replace(/connect/, "Conectar");
    pm = pm.replace(/history/gi, "Histórico");
    pm = pm.replace(/message/gi, "Mensagem");
    pm = pm.replace(/view/gi, "Ver");
    pm = pm.replace(/channel/gi, "Canal");
    pm = pm.replace(/instant/gi, "");
    pm = pm.replace(/reaction/gi, "Reagir");
    pm = pm.replace(/send/gi, "Enviar");
    pm = pm.replace(/add/gi, "Adicionar");
    pm = pm.replace(/kick/gi, "Expulsar");
    pm = pm.replace(/canals|canal/gi, "Canais");
    pm = pm.replace(/mute/gi, "Mutar");
    pm = pm.replace(/MembroS/gi, "Membros");
    pm = pm.replace(/MensagemS/gi, "Mensagens");
    pm = pm.replace(/connect/gi, "Conectar");
    pm = pm.replace(/speak/gi, "Falar");
    pm = pm.replace(/ApelidoS/gi, "Apelidos");
    pm = pm.replace(/  convites/gi, "Convites Instantâneos");
    pm = pm.replace(/audit log/gi, "Registo de Auditoria");
    pm = pm.replace(/move/gi, "Mover");
    pm = pm.replace(/EMOJIS/gi, "Emojis");
    pm = pm.replace(/ReagirS/gi, "Reações");
    pm = pm.replace(/CargoS/gi, "Cargos");
    pm = pm.replace(/USE VAD/gi, "Usar Detecção de voz");
    pm = pm.replace(/USE EXTERNAL Emojis/gi, "Usar Emojis externos");
    pm = pm.replace(/EMBED LINKS/gi, "Inserir Links");
    pm = pm.replace(/ATTACH FILES/gi, "Anexar Arquivos");
    pm = pm.replace(/Mensagem Histórico/gi, "Histórico de Mensagem");
    pm = pm.replace(/ban/gi, "Banir");
    pm = pm.replace(/mention everyone/gi, "Mencionar @everyone");
    pm = pm.replace(/deafen/gi, "Ensurdecer");
    pm = pm.replace(/WEBHOOKS/gi, "Webhooks");
    pm = pm.replace(/TTS Mensagens/gi, "Mensagens em tts");
    pm = pm.replace(/priority falarer/gi, "Prioridade de Voz");
    pm = pm.replace(/stream/gi, "Transmitir Ao Vivo");
    pm = pm.replace(/guild insights/gi, "Informações do Servidor");
    pm = pm.replace(/guild/gi, "Servidor");
    pm = pm.replace(/CriarConvites/, "Criar Convites");

    return pm;
  }
};
