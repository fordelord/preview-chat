<template>
  <div class="chat_content">
    <div v-for="(message, index) in messages" :key="index">
      <AssistantMessage
        v-if="message.type === EMessage.ASSISTANT"
        :message="message"
        :handleBottomScroll="handleBottomScroll"
      />
      <UserMessage v-if="message.type === EMessage.USER" :message="message" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useChatStore } from 'stores/chat'
import { computed } from 'vue'
import {EMessage} from 'stores/types/chat';
import UserMessage from 'components/AssistantBlock/ChatBlock/ChatMessages/UserMessage.vue';
import AssistantMessage from 'components/AssistantBlock/ChatBlock/ChatMessages/AssistantMessage.vue';

defineProps<{ handleBottomScroll: (props?: {time?: number, offset?: number}) => void }>()

const chatStore = useChatStore()

const messages = computed(() => chatStore.getMessages)
</script>
<style lang="scss" scoped>
.chat {
  display: flex;
  justify-content: center;

  max-height: 408px;
  padding-top: 32px;
  overflow-y: scroll;

  height: 100%;

  &::-webkit-scrollbar-thumb {
    background: #e7e7e7;
    border-radius: 56px;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: none;
  }

  &_content {
    max-width: 580px;

    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 24px;
  }
}
</style>
