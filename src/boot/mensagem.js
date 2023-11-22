import { Dialog } from "quasar";
import MensagemDialog from "src/components/MensagemDialog.vue";

export default function exibeMensagem(mensagem) {
  return Dialog.create({
    component: MensagemDialog,
    componentProps: {
      messagem: mensagem,
    },
  });
}
