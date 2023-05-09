import { vi } from "vitest";

const t = (ns: string) => (key: string) => `(${ns}).${key}`;

const useTranslation = (ns: string) => ({
  t: t(ns),
  i18n: {
    changeLanguage: () => new Promise(() => {}),
  },
});

const initReactI18next = {
  type: "3rdParty",
  init: () => {},
};

vi.mock("react-i18next", () => ({
  useTranslation,
  initReactI18next,
}));
