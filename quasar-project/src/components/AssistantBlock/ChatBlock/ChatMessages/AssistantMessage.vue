<template>
  <div class="message">
    <div class="loading-message">
      <div v-if="showDots" class="loading-message-wrapper">
        <div class="dot-flashing"></div>
      </div>
      <div v-else class="message-text" ref="messageRef">
        {{ displayedText }}
      </div>
    </div>
    <div
      :class="[
        'message_variants',
        {
          'message_variants-row':
            message?.variants.variantsPlaceType === EVariantsPlaceType.ROW,
          'visible-variants': visibleVariants,
        },
      ]"
      v-if="message?.variants"
    >
      <div
        :class="[
          'message_variants-variant',
          {
            'message_variants-variant-active':
              message?.projectState === messageVariant.variantLabel,
          },
        ]"
        v-for="(messageVariant, index) in message?.variants?.variantsContent"
        :key="index"
        @click="handleVariantClick(messageVariant)"
      >
        {{ messageVariant.variantLabel }}
      </div>
    </div>
    <div v-if="message.action === EAction.CARDS">
      <CardBlock
        v-if="visibleVariants"
        :handle-bottom-scroll="handleBottomScroll"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useChatStore } from 'stores/chat'
import { ref, onMounted, watch } from 'vue'
import {EAction, EMessage, EVariantsPlaceType, IMessage, IVariant} from 'stores/types/chat';
import CardBlock from 'components/AssistantBlock/ChatBlock/ChatMessages/CardBlock.vue';

const props = defineProps<{
  message: IMessage
 handleBottomScroll: (props?: {time?: number, offset?: number}) => void
}>()

const chatStore = useChatStore()

const messageRef = ref<HTMLDivElement | null>(null)
const isFirstTrigger = ref(true)

const visibleVariants = ref(false)

const handleVariantClick = (variant: IVariant) => {
  chatStore.setInputVisibility(false)
  chatStore.setUserMessage({
    type: EMessage.USER,
    messageText: variant.variantLabel,
  })

  chatStore.setAssistantAnswer(variant)

  if (variant.action === EAction.INPUT) {
    chatStore.setInputVisibility(true)
    props.handleBottomScroll({ time: 800 })

    return
  }

  props.handleBottomScroll()
}

const showDots = ref(true)
const displayedText = ref('')
const fullText = props.message.messageText || ''
let textIndex = 0
let previousHeight = 0

onMounted(() => {
  setTimeout(() => {
    showDots.value = false
    displayText()
  }, 1000)
})

const displayText = () => {
  const interval = setInterval(() => {
    if (textIndex < fullText.length) {
      displayedText.value += fullText[textIndex]
      textIndex++
    } else {
      visibleVariants.value = true
      clearInterval(interval)
    }
  }, 30)
}

const detectLineChange = () => {
  const currentHeight = messageRef.value?.offsetHeight || 0

  if (isFirstTrigger.value) {
    isFirstTrigger.value = false

    return
  }

  if (currentHeight > previousHeight && !isFirstTrigger.value) {
    props.handleBottomScroll()
    previousHeight = currentHeight
  }
}

onMounted(() => {
  previousHeight = messageRef.value?.offsetHeight || 0
  watch(displayedText, detectLineChange)
})
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;

  &-assistant {
    width: fit-content;
    padding: 12px 24px;
    gap: 24px;
    border-radius: 32px 32px 32px 0;
    background-color: #ededfd;
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: -0.01em;
  }

  &_variants {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-left: 24px;

    opacity: 0;
    pointer-events: none;

    @media (max-width: 1040px) {
      margin-left: 8px;
    }

    &-variant {
      width: fit-content;
      padding: 9px 16px;
      gap: 8px;
      border-radius: 56px;
      border: #a5a5f7 1px solid;
      cursor: pointer;
      transition: all 0.5s ease;

      &:hover {
        background: #ededfd;
      }

      font-size: 16px;
      font-weight: 400;
      line-height: 22px;
      letter-spacing: -0.01em;

      &-active {
        background: #a5a5f7;
      }
    }
  }

  &_variants-row {
    flex-wrap: wrap;
    flex-direction: row;
  }
}

.loading-message {
  display: flex;
  align-items: center;
  padding: 12px 24px 12px 24px;
  border-radius: 32px 32px 32px 0px;
  background-color: #ededfd;
  width: fit-content;
  max-width: 570px;

  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: -0.01em;

  &-wrapper {
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dot-flashing {
  position: relative;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: #878787;
  color: #878787;
  animation: dot-flashing 1s infinite linear alternate;
  animation-delay: 0.5s;
}

.dot-flashing::before,
.dot-flashing::after {
  content: '';
  display: inline-block;
  position: absolute;
  top: 0;
}

.dot-flashing::before {
  left: -15px;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: #878787;
  color: #878787;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 0s;
}

.dot-flashing::after {
  left: 15px;
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: #878787;
  color: #878787;
  animation: dot-flashing 1s infinite alternate;
  animation-delay: 1s;
}

.visible-variants {
  animation: appear 1s forwards;
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  100% {
    pointer-events: auto;
    opacity: 1;
  }
}

@keyframes dot-flashing {
  0% {
    background-color: #878787;
  }
  50%,
  100% {
    background-color: rgba(135, 135, 135, 0.2);
  }
}
</style>
