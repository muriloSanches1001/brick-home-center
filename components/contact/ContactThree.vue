<script setup lang="ts">
import BaseTextInput from '~/components/ui/inputs/BaseTextInput.vue'
import BaseArrowButton from '~/components/ui/buttons/BaseArrowButton.vue'
import BaseHeading from '~/components/ui/typography/BaseHeading.vue'
import BaseText from '~/components/ui/typography/BaseText.vue'

const { contacts } = useAppConfig()

const nameInput = ref<string>('')
const subjectInput = ref<string>('')
const emailInput = ref<string>('')

const handleSubmit = () => {
  // TODO: implements a best logic for form

  if (!nameInput.value || !subjectInput.value || !emailInput.value) {
    alert('Por favor, preencha todos os campos')
    return
  }

  alert('Obrigado pelo contato! Em breve retornaremos.')
  console.log('Form submitted:', {
    name: nameInput.value,
    subject: subjectInput.value,
    email: emailInput.value,
  })
}
</script>

<template>
  <div class="flex w-full flex-col gap-16">
    <div class="w-full flex flex-col md:flex-row gap-16">
      <div class="flex flex-col gap-12 w-full md:w-1/2 p-8 md:p-16 bg-neutral-900 rounded-2xl">
        <div class="flex flex-col gap-3">
          <base-heading
            as="h4"
            size="sm"
            class="text-neutral-50 bg-primary px-5 py-2 rounded-full w-fit"
          >
            <span
              aria-hidden="true"
              class="select-none"
            >------ </span>CONTATE-NOS
          </base-heading>
          <base-heading
            as="h3"
            size="display"
            class="text-neutral-50 font-extrabold"
          >
            Vamos Construir o Futuro Juntos
          </base-heading>
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
            type="email"
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
      <div class="flex flex-col gap-4 w-full md:w-1/2">
        <base-heading
          as="h3"
          size="display"
          class="text-neutral-900"
        >
          Informações de Contato
        </base-heading>
        <base-text
          size="lg"
        >
          Estamos sempre à disposição para ajudar na realização dos seus projetos.
        </base-text>
        <ul class="flex flex-col gap-4 mt-4">
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

    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1323.2527166857308!2d-50.54867766707438!3d-20.270283307504446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94982f2e0019f875%3A0x8ad800dad6083108!2sJales%2C%20SP!5e0!3m2!1spt-BR!2sbr!4v1764022277130!5m2!1spt-BR!2sbr"
      title="Mapa com a localização da Brick Home Center em Jales, SP"
      aria-label="Mapa com a localização da Brick Home Center em Jales, SP"
      width="100%"
      height="500"
      class="rounded-2xl"
      :allowfullscreen="false"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
  </div>
</template>

<style scoped>

</style>
