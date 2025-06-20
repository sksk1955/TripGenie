import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <select
      className="rounded border px-2 py-1 text-sm"
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
    >
      <option value="en">English</option>
      <option value="hi">हिन्दी</option>
    </select>
  );
}

export default LanguageSwitcher;