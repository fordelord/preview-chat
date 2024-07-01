<template>
  <div class="user-message">
    <div class="user-message-text">
      {{ message.messageText }}
    </div>
  </div>
</template>
<script lang="ts" setup>

import {IMessage} from 'stores/types/chat';

defineProps<{ message: IMessage }>()
</script>
<style lang="scss" scoped>
.user-message {
  display: flex;
  justify-content: end;

  &-text {
    width: fit-content;
    padding: 12px 24px 12px 24px;
    border-radius: 32px 32px 0px 32px;
    background-color: #a5a5f7;

    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
  }
}
</style>
