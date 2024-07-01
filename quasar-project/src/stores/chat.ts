import { defineStore } from 'pinia'
import {IChat, IMessage, IVariant} from 'stores/types/chat';
import {CHAT_CONFIG} from 'src/utils/constants';

export const useChatStore = defineStore('chat', {
  state: () =>
    <IChat>{
      messages: [JSON.parse(JSON.stringify(CHAT_CONFIG[0]))],
      input: false,
      projectState: '',
      inputError: false,
    },
  getters: {
    getMessages: (state) => state.messages,
    getInput: (state) => state.input,
    getProjectState: (state) => state.projectState,
    getInputError: (state) => state.inputError,
  },
  actions: {
    setUserMessage(message: IMessage) {
      this.messages = [...this.messages, message]
    },

    setAssistantAnswer(variant: IVariant) {
      const newMessage = JSON.parse(
        JSON.stringify(
          CHAT_CONFIG.find((answer) => answer?.answerTag === variant.variantTag)
        )
      )

      if (variant.variantTag === 'project_state') {
        this.messages[this.messages.length - 2].projectState =
          variant.variantLabel

        this.projectState = variant.variantLabel
      }

      if (newMessage) {
        this.messages = [...this.messages, newMessage]
      }
    },

    setInputVisibility(state: boolean) {
      this.input = state
    },

    setInputError(state: boolean) {
      this.inputError = state
    },

    resetDialog() {
      this.messages = [JSON.parse(JSON.stringify(CHAT_CONFIG[0]))]
    },
  },
})
