<script setup lang="ts">
type TextInputTypes = 'text' | 'email'
type TextInputSizes = 'sm' | 'md' | 'lg'

const props = defineProps<{
  type: TextInputTypes
  id: string
  size?: TextInputSizes
  icon?: string
  iconColor?: string
  modelValue: string
  placeholder?: string
  bg?: string
  fontColor?: string
  name: string
  ariaLabel: string
  ariaDescribedby?: string
  disabled: boolean
  required: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': [Event]
  'focus': [Event]
}>()
</script>

<template>
  <div class="relative flex items-center">
    <Icon
      v-if="props.icon"
      :name="props.icon"
      class="absolute left-3 pointer-events-none"
      aria-hidden="true"
      focusable="false"
      :class="[
        props.size === 'sm'
          ? 'w-4 h-4'
          : props.size === 'lg'
            ? 'w-6 h-6'
            : 'w-5 h-5',
        props.iconColor ?? 'text-neutral-500',
      ]"
    />

    <input
      :id="props.id"
      :name="props.name"
      :type="props.type"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      :aria-label="props.ariaLabel"
      :aria-describedby="props.ariaDescribedby"
      :disabled="props.disabled"
      :required="props.required"
      class="w-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 border-b border-neutral-300"
      :class="[
        props.icon
          ? props.size === 'sm'
            ? 'pl-10 pr-6'
            : props.size === 'lg'
              ? 'pl-14 pr-6'
              : 'pl-12 pr-6'
          : 'px-6',
        props.size === 'sm'
          ? 'py-3 text-sm'
          : props.size === 'lg'
            ? 'py-5 text-base'
            : 'py-4 text-sm',
        props.bg ?? 'bg-neutral-50',
        props.fontColor ?? 'text-gray-900',
        'font-light',
      ]"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @blur="emit('blur', $event)"
      @focus="emit('focus', $event)"
    >
  </div>
</template>

<style scoped>
</style>
