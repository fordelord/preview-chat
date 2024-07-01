export interface IChat {
  messages: IMessage[]
  input: boolean
  projectState?: string
  inputError: boolean
}

export enum EMessage {
  ASSISTANT = 'assistant',
  USER = 'user',
}

export enum EVariantsPlaceType {
  COLUMN = 'column',
  ROW = 'row',
}

export interface IVariants {
  variantsPlaceType: EVariantsPlaceType
  variantsContent: IVariant[]
}

export interface IVariant {
  variantLabel: string
  variantTag: string
  active?: boolean
  action?: EAction
}

export enum EAction {
  CARDS = 'cards',
  INPUT = 'input',
}

export interface IMessage {
  answerTag?: string
  type: EMessage
  messageText: string
  variants?: IVariants
  loading?: boolean
  action?: EAction
  projectState?: string
}
