<script setup lang="ts">
import BaseSection from '~/components/ui/sections/BaseSection.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'
import BaseTextInput from '~/components/ui/inputs/BaseTextInput.vue'
import BaseArrowButton from '~/components/ui/buttons/BaseArrowButton.vue'

const { contacts } = useAppConfig()

const nameInput = ref<string>('')
const subjectInput = ref<string>('')
const emailInput = ref<string>('')

const handleSubmit = () => {
  console.log('Form submitted:', {
    name: nameInput.value,
    subject: subjectInput.value,
    email: emailInput.value,
  })
}
</script>

<template>
  <div class="w-full min-h-[800px] bg-[url('/images/home/contact/bg.jpg')] bg-cover bg-center bg-no-repeat">
    <base-section
      class="bg-transparent"
      padding-y="lg"
    >
      <div class="w-full flex flex-col md:flex-row gap-12">
        <div class="flex flex-col gap-12 w-full md:w-1/2 p-16 bg-neutral-900 rounded-2xl">
          <div class="flex flex-col gap-3">
            <base-heading
              as="h3"
              size="display"
              class="text-neutral-50"
            >
              Contate-nos
            </base-heading>
            <base-text
              size="sm"
              class="text-neutral-50 max-w-[90%]"
            >
              Trabalhamos ao lado de pessoas e empresas que
              querem construir o futuro — e não apenas imaginá-lo.
            </base-text>
          </div>
          <form
            class="flex flex-col gap-6"
            @submit.prevent="handleSubmit"
          >
            <base-text-input
              id="home-contact-name"
              v-model="nameInput"
              name="name"
              type="text"
              size="md"
              placeholder="Digite seu nome"
              input-aria-label="Campo para digitar seu nome"
              input-aria-describedby="name-field-description"
              :disabled="false"
              :required="true"
              bg="bg-neutral-900"
              class="w-full text-neutral-50"
            />
            <base-text-input
              id="home-contact-subject"
              v-model="subjectInput"
              name="subject"
              type="text"
              size="md"
              placeholder="Digite o assunto"
              input-aria-label="Campo para digitar o assunto"
              input-aria-describedby="subject-field-description"
              :disabled="false"
              :required="true"
              bg="bg-neutral-900"
              class="w-full text-neutral-50"
            />
            <base-text-input
              id="home-contact-email"
              v-model="emailInput"
              name="email"
              type="text"
              size="md"
              placeholder="Digite seu email"
              input-aria-label="Campo para digitar seu email"
              input-aria-describedby="email-field-description"
              :disabled="false"
              :required="true"
              bg="bg-neutral-900"
              class="w-full text-neutral-50"
            />
            <base-arrow-button type="submit">
              Agendar Contato
            </base-arrow-button>
          </form>
        </div>
        <div class="flex flex-col gap-8 w-full md:w-1/2">
          <div class="flex flex-col gap-4">
            <base-heading
              as="h3"
              size="sm"
              class="text-neutral-50 bg-neutral-900 px-5 py-2 rounded-full w-fit"
            >
              <span
                aria-hidden="true"
                class="select-none"
              >------ </span>CONTATE-NOS
            </base-heading>
            <base-heading
              as="h2"
              size="display"
              class="text-neutral-900 font-extrabold"
            >
              Vamos Trabalhar Juntos
            </base-heading>
            <base-text
              size="md"
              class="font-normal"
            >
              Oferecendo soluções completas em construção civil, desde
              materiais de alta qualidade até serviços especializados, entre em contato!
            </base-text>
          </div>
          <ul class="flex flex-col gap-4">
            <li
              v-for="contact in contacts"
              :key="contact.title"
              class="flex items-center gap-4"
            >
              <div class="w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900 text-neutral-50">
                <Icon
                  :name="contact.icon"
                  class="w-6 h-6"
                  aria-hidden="true"
                />
              </div>
              <div class="flex flex-col gap-1 text-neutral-900">
                <base-heading as="h5">
                  {{ contact.title }}
                </base-heading>
                <base-text size="sm">
                  {{ contact.content }}
                </base-text>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </base-section>
  </div>
</template>

<style scoped>

</style>
