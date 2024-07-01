<script lang="ts" setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps<{
  label: string
  isDisabled?: boolean
  isAdminDisabled?: boolean
  customClass?: string
  href?: string
  light?: boolean
  noWrap?: boolean
}>()

const label = computed(() => props.label)

function onButtonClick() {
  emit('click')
}
</script>

<template>
  <div>
    <slot>
      <div :class="['btn_container', customClass || '']">
        <router-link v-if="href" :to="href">
          <button
            :class="{
              ['isDisabled']: isDisabled,
              ['light']: light,
              'no-wrap': noWrap,
            }"
            @click="onButtonClick"
            :disabled="isAdminDisabled"
          >
            <slot name="leftSide" />
            {{ label.toUpperCase() }}
          </button>
        </router-link>
        <button
          v-else
          :class="{
            ['isDisabled']: isDisabled,
            ['light']: light,
            ['no-wrap']: noWrap,
          }"
          @click="onButtonClick"
          :disabled="isAdminDisabled"
        >
          <slot name="leftSide" />
          {{ label.toUpperCase() }}
          <slot name="rightSide" />
        </button>
      </div>
    </slot>
  </div>
</template>

<style lang="scss" scoped>
.btn_container {
  button {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.06em;
    text-align: center;

    padding: 12px 33px;
    min-width: 144px;

    color: black;

    border: 0.5px solid #878787;
    border-radius: 50px;
    background-color: transparent;

    &.light {
      color: white;
    }

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 0.4;
    }
  }
  .isDisabled {
    color: black;
    pointer-events: none;
    &:hover {
      opacity: 1;
    }

    &:active {
      opacity: 1;
    }
  }

  .no-wrap {
    white-space: nowrap;
  }
}
</style>
