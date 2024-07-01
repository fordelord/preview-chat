<template>
  <q-form
    :class="[
      'chat-input',
      {
        'close-input': !inputVisible,
        'input-error': inputRef && inputRef?.hasError,
      },
    ]"
    @submit="onSubmit"
  >
    <q-input
      ref="inputRef"
      outlined
      dense
      v-model="inputValue"
      placeholder="Enter your company and contact information"
      class="chat-input-wrapper"
      autofocus
      :rules="[
    (val: string) => isErrorUnable ? !!val || 'Input is required' : true,
    (val: string) => ( val.length <= 300) || 'The text must be no more than 300 characters in length'
  ]"
    >
      <template v-slot:append>
        <img
          v-if="
            inputValue?.length === 0 ||
            (inputValue && inputValue?.length > 300) ||
            !isErrorUnable
          "
          src="/icons/send-light.svg"
          width="20"
          height="20"
          alt="light-send"
        />
        <img
          v-else
          style="cursor: pointer"
          src="/icons/send-dark.svg"
          width="20"
          height="20"
          alt="dark-send"
          @click="onSubmit"
        />
      </template>
    </q-input>
  </q-form>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useChatStore } from 'stores/chat'
import {QInput, useQuasar} from 'quasar'
import {EMessage} from 'stores/types/chat';

const props = defineProps<{ handleBottomScroll: (props?: {time?: number, offset?: number}) => void }>()

const $q = useQuasar()

const inputRef = ref<QInput | null>(null)
const inputValue = ref<string | null>('')
const isErrorUnable = ref<boolean>(false)
const isMutation = ref<boolean>(false)

const chatStore = useChatStore()

const inputVisible = computed(() => chatStore.getInput)
// const projectState = computed(() => chatStore.getProjectState)

watch(
  () => [inputValue.value],
  () => {
    if (inputValue.value && !isErrorUnable.value) {
      isErrorUnable.value = true
    }
  }
)

watch(
  () => [inputRef.value?.hasError],
  () => {
    chatStore.setInputError(inputRef.value?.hasError ?? false)
  }
)

const onSubmit = async () => {
  try {
    if (inputValue.value && !isMutation.value) {
      isMutation.value = true
      // Send here the data to BE

      // await getInTouchApi.assistantDialogRequest({
      //   text: inputValue.value ?? '',
      //   projectState: projectState.value,
      // })

      chatStore.setInputVisibility(false)
      chatStore.setUserMessage({
        type: EMessage.USER,
        messageText: inputValue.value ?? '',
      })

      chatStore.setAssistantAnswer({
        variantTag: 'success_send_message',
        variantLabel: '',
      })

      inputValue.value = null
      props?.handleBottomScroll?.()

      isErrorUnable.value = false
      isMutation.value = false
    }
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Error: Something went wrong',
    })
  }
}
</script>
<style lang="scss">
.chat-input-wrapper .q-field__inner .q-icon {
  display: none !important;
}

.close-input .q-field__messages {
  display: none !important;
}

.close-input {
  .q-field__control {
    height: 0;

    &:before {
      border-width: 0 !important;
    }

    &:after {
      border-width: 0 !important;
    }
  }

  .q-placeholder {
    opacity: 0;
  }

  .q-field__append {
    opacity: 0;
  }
}

.q-field--with-bottom {
  padding: 0 !important;
}

.q-field__control {
  padding-right: 8px !important;
  padding-left: 16px !important;
  transition: all 0.8s ease;

  &:before {
    border-radius: 8px !important;
    border: #e7e7e7 0.5px solid !important ;
    transition: all 0.8s ease;
  }

  &:after {
    border-width: 1.5px !important;
    transition: all 0.8s ease;
  }
}

.q-field {
  border: none !important;
}

.q-placeholder {
  opacity: 1;
  transition: all 0.8s ease;
}

.q-field__append {
  opacity: 1;
  transition: all 0.8s ease;
}
</style>
<style lang="scss" scoped>
.chat-input {
  max-width: 580px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: -16px;

  padding-left: 8px;
  padding-right: 8px;
  padding-top: 24px;

  height: 74px;

  transition: all 0.8s ease;

  @media (max-width: 1040px) {
    padding-top: 24px;
  }
}

.close-input {
  height: 0;
  padding: 0;
}

.input-error {
  margin-bottom: 0;
}
</style>
