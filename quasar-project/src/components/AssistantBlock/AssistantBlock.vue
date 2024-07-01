<template>
  <div class="assistant">
    <div class="assistant_top">
      <h3 class="assistant_top-title">
        See how we can help you reach your goals
      </h3>
      <div class="assistant_top-subtitle">
        Answer three questions to help us match expertise and software solutions
        to your needs
      </div>
    </div>
    <div class="assistant_block">
      <div class="assistant_block_header">
        <div class="assistant_block_header_title">
          <span class="assistant_block_header_title-dot"></span>
          <div class="assistant_block_header_title-text">AI Assistant</div>
        </div>
        <OutlineButton
          v-if="messages.length > 1"
          label="NEW CHAT"
          custom-class="chat-outline"
          :no-wrap="true"
          @click="handleNewChatClick"
        >
          <template v-slot:leftSide>
            <img
              src="icons/careers-menu-close.svg"
              alt="menu_close"
              :width="12"
              :height="12"
              style="transform: rotate(-45deg)"
            />
          </template>
        </OutlineButton>
      </div>
      <div class="chat" ref="chatBlock">
        <ChatBlock :handleBottomScroll="handleBottomScroll" />
      </div>
      <ChatInput :handleBottomScroll="handleBottomScroll" />
      <div
        :class="[
          'assistant_block_mail',
          {
            'assistant_block_mail-input': activeInput,
            'assistant_block_mail-input_error': inputError,
          },
        ]"
        @click="handleMailClick"
      >
        <img
          src="/icons/email-fill-light.svg"
          alt="email-light-fill"
          width="20"
          height="20"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useChatStore } from 'stores/chat'
import { computed, ref } from 'vue'
import OutlineButton from 'components/buttons/OutlineButton.vue';
import ChatInput from 'components/AssistantBlock/ChatBlock/ChatInput.vue';
import ChatBlock from 'components/AssistantBlock/ChatBlock/ChatBlock.vue'

const chatStore = useChatStore()
const messages = computed(() => chatStore.getMessages)
const activeInput = computed(() => chatStore.getInput)
const inputError = computed(() => chatStore.getInputError)

const chatBlock = ref<HTMLDivElement | null>(null)

const handleBottomScroll = (props?: { time?: number; offset?: number }) => {
  if (chatBlock.value) {
    const offsetValue = props?.offset || 0

    setTimeout(() => {
      chatBlock.value?.scrollTo({
        top: chatBlock.value?.scrollHeight - offsetValue,
        behavior: 'smooth',
      })
    }, props?.time || 100)
  }
}

const handleMailClick = () => {
  chatStore.setInputVisibility(true)
  handleBottomScroll({ time: 800 })
}

const handleNewChatClick = () => {
  chatStore.setInputVisibility(false)
  chatStore.resetDialog()
}
</script>
<style>
.chat-outline {
  height: 40px;
  width: 140px;
  button {
    min-width: 140px !important;
    padding-left: 22px !important;
    padding-right: 22px !important;
  }
}
</style>
<style lang="scss" scoped>
.assistant {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;

  @media (max-width: 1040px) {
    gap: 40px;
  }

  &_top {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 24px;

    @media (max-width: 1040px) {
      gap: 16px;
    }

    &-title {
      font-size: 48px;
      font-weight: 500;
      line-height: 54px;
      letter-spacing: -0.01em;
      text-align: center;

      margin: 0;

      @media (max-width: 1040px) {
        font-size: 32px;
        line-height: 40px;
      }
    }

    &-subtitle {
      font-size: 20px;
      font-weight: 400;
      line-height: 26px;
      letter-spacing: -0.01em;
      text-align: center;

      @media (max-width: 1040px) {
        font-size: 16px;
        line-height: 22px;
      }
    }
  }

  &_block {
    position: relative;

    display: flex;
    flex-direction: column;

    box-shadow: 0 4px 32px 0 #0000001a;
    padding: 16px 8px 40px 8px;
    border-radius: 16px;

    max-width: 866px;
    width: 100%;
    height: 520px;

    @media (max-width: 1040px) {
      height: 565px;
    }

    &_header {
      display: flex;
      justify-content: space-between;

      margin-left: 32px;
      margin-right: 32px;

      padding-bottom: 16px;
      border-bottom: 1px solid #e7e7e7;

      height: 56px;

      @media (max-width: 1040px) {
        margin: 0;
        padding-left: 8px;
        padding-right: 8px;
      }

      &_title {
        margin-top: 8px;
        display: flex;
        align-items: center;
        gap: 8px;

        &-dot {
          width: 8px;
          height: 8px;
          background-color: #00cd21;
          border-radius: 50%;
        }

        &-text {
          font-size: 18px;
          font-weight: 500;
          line-height: 24px;
          letter-spacing: -0.01em;
          text-align: left;
        }
      }
    }

    &_mail {
      position: absolute;
      bottom: 40px;
      right: 40px;

      display: flex;
      justify-content: center;
      align-items: center;

      padding: 14px;
      background: black;
      border-radius: 100%;

      cursor: pointer;

      transition: all 1s ease;

      @media (max-width: 1040px) {
        bottom: 16px;
        right: 16px;
      }

      &-input {
        @media (max-width: 1040px) {
          bottom: 70px;
        }
      }

      &-input_error {
        @media (max-width: 1040px) {
          bottom: 88px;
        }
      }
    }
  }
}

.chat {
  display: flex;
  justify-content: center;

  max-height: 408px;
  padding-top: 32px;
  overflow-y: scroll;

  height: 100%;

  @media (max-width: 1040px) {
    padding-left: 8px;
    padding-right: 8px;

    max-height: 452px;
  }

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
}
</style>
