import * as Yup from "yup";

const commonMessages = {
  emailInvalid: "This scroll bears invalid magical runes",
  emailRequired: "A scroll address is required for this quest",
  passwordRequired: "Your sigil is required to enter",
};

const emailValidation = Yup.string()
  .email(commonMessages.emailInvalid)
  .required(commonMessages.emailRequired);

export const loginValidationSchema = Yup.object({
  email: emailValidation,
  password: Yup.string().required(commonMessages.passwordRequired),
});

export const registerValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Names must be at least 2 runes long")
    .max(50, "Names cannot exceed 50 runes")
    .required("A nameless one cannot enter the guild"),
  email: emailValidation,
  password: Yup.string()
    .min(8, "Your sigil must be at least 8 runes long")
    .matches(/[a-z]/, "Include a lesser rune")
    .matches(/[A-Z]/, "Include a greater rune")
    .matches(/[0-9]/, "Include a numerical rune")
    .required(commonMessages.passwordRequired),
});

export const resetPasswordValidationSchema = Yup.object({
  email: emailValidation,
});

const characterValidationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Names must be at least 2 runes long")
    .max(50, "Names cannot exceed 50 runes")
    .required("A nameless one cannot enter the guild"),
  image: Yup.string().url("This scroll bears an invalid URL"),
  class: Yup.string()
    .min(2, "Class must be at least 2 runes long")
    .required("A class is required for this quest"),
  subclass: Yup.string().min(2, "Subclass must be at least 2 runes long"),
  background: Yup.string().min(2, "Background must be at least 2 runes long"),
  backstory: Yup.string().min(10, "Backstory must be at least 10 runes long"),
});

const noteValidationSchema = Yup.object({
  title: Yup.string()
    .min(2, "Titles must be at least 2 runes long")
    .max(100, "Titles cannot exceed 100 runes")
    .required("A title is required for this scroll"),
  date: Yup.date().required("A date is required for this scroll"),
  content: Yup.string()
    .min(10, "Content must be at least 10 runes long")
    .required("Content is required for this scroll"),
  characterName: Yup.string().required(
    "A character name is required for this scroll"
  ),
  campaignName: Yup.string().required(
    "A campaign name is required for this scroll"
  ),
});

export { noteValidationSchema };

export default characterValidationSchema;
