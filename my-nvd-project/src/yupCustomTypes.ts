declare module "yup" {
  interface StringSchema {
    firstLetterUppercase(message?: string): this;
  }
}
