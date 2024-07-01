import {EAction, EMessage, EVariantsPlaceType, IMessage} from 'stores/types/chat';

export const CHAT_CONFIG: IMessage[] = [
  {
    answerTag: 'initial_message',
    type: EMessage.ASSISTANT,
    messageText:
      "Hi! 👋 What brings you here today? We'll be happy to assist you!",
    variants: {
      variantsPlaceType: EVariantsPlaceType.COLUMN,
      variantsContent: [
        {
          variantLabel: 'I want to know which service suits my needs',
          variantTag: 'know_services',
        },
        {
          variantLabel: 'I want to contact the manager',
          variantTag: 'contact_manager',
          action: EAction.INPUT,
        },
      ],
    },
  },
  {
    answerTag: 'know_services',
    type: EMessage.ASSISTANT,
    messageText:
      'What best describes the current state of your software project?',
    variants: {
      variantsPlaceType: EVariantsPlaceType.ROW,
      variantsContent: [
        {
          variantLabel: 'Idea',
          variantTag: 'project_state',
        },
        {
          variantLabel: 'PoC',
          variantTag: 'project_state',
        },
        {
          variantLabel: 'Prototype',
          variantTag: 'project_state',
        },
        {
          variantLabel: 'MVP',
          variantTag: 'project_state',
        },
        {
          variantLabel: 'Ready Product',
          variantTag: 'project_state',
        },
        {
          variantLabel: 'Legacy System',
          variantTag: 'project_state',
        },
      ],
    },
  },
  {
    answerTag: 'project_state',
    type: EMessage.ASSISTANT,
    messageText: 'I recommend that you read this information',
    action: EAction.CARDS,
  },
  {
    answerTag: 'contact_us',
    type: EMessage.ASSISTANT,
    messageText: 'Please provide your company and contact information 👇',
    action: EAction.INPUT,
  },
  {
    answerTag: 'contact_manager',
    type: EMessage.ASSISTANT,
    messageText:
      'Please enter your email so that the manager will contact you 👇',
    action: EAction.INPUT,
  },
  {
    answerTag: 'success_send_message',
    type: EMessage.ASSISTANT,
    messageText: 'Thank you 🙌 We will contact you very soon.',
  },
]
