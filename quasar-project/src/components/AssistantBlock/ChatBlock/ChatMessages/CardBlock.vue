<template>
  <div class="cards">
    <a
      class="cards_item"
      :href="card.slug"
      target="_blank"
      v-for="(card, index) in cardsData"
      :key="index"
      :style="{ animationDelay: `${index * 0.3}s` }"
    >
      <div class="cards_item-text">
        {{ card.title }}
      </div>
      <img
        src="/icons/white-arrow.svg"
        width="16"
        height="16"
        alt="white-arrow"
      />
    </a>
    <div
      class="cards_item cards_contact"
      @click="handleContactClick"
      :style="{ animationDelay: `${cardsData.length * 0.3}s` }"
    >
      <div class="cards_contact_top">
        <div class="cards_contact_top-title">Contact us</div>
        <img
          src="/icons/black-arrow.svg"
          width="16"
          height="16"
          alt="white-arrow"
        />
      </div>
      <div class="cards_contact-subtitle">
        If you have any questions, please contact us
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from 'stores/chat'
import { onMounted } from 'vue'

const props = defineProps<{
  handleBottomScroll: (props?: { time?: number; offset?: number }) => void
}>()

const cardsData = [
  {
    title: 'IT team/development build-operate-transfer (BOT) services',
    slug: '/services',
  },
  {
    title: 'Product development and consulting services',
    slug: '/services',
  },
  {
    title: 'Ongoing development and maintenance support',
    slug: '/services',
  },
]

const chatStore = useChatStore()

const handleContactClick = () => {
  chatStore.setAssistantAnswer({ variantTag: 'contact_us', variantLabel: '' })
  chatStore.setInputVisibility(true)
  props.handleBottomScroll({ time: 800 })
}

onMounted(() => {
  props.handleBottomScroll({ time: 300 })
})
</script>

<style lang="scss" scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.cards {
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }

  &_item {
    display: flex;
    gap: 16px;

    max-width: 282px;
    height: 96px;

    background: linear-gradient(100.66deg, #434343 6.56%, #000000 93.57%);
    padding: 16px;
    border-radius: 8px;

    text-decoration: none;

    cursor: pointer;

    color: white;

    animation: fadeIn 1s forwards;
    opacity: 0;

    &-text {
      font-size: 18px;
      font-weight: 500;
      line-height: 22px;
      letter-spacing: -0.01em;
    }

    img {
      margin: 4px;
    }
  }

  &_contact {
    width: 100%;

    display: flex;
    flex-direction: column;
    gap: 8px;

    background: #a5a5f7;

    color: black;

    animation: fadeIn 0.5s forwards;
    opacity: 0;

    &_top {
      display: flex;
      justify-content: space-between;

      &-title {
        font-size: 18px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: -0.01em;
      }
    }

    &-subtitle {
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      letter-spacing: -0.01em;
    }
  }
}
</style>
