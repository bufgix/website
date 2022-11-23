import { PAGES } from "./contants";

export const slugify = (text: string) => {
  const trMap = {
    çÇ: "c",
    ğĞ: "g",
    şŞ: "s",
    üÜ: "u",
    ıİ: "i",
    öÖ: "o",
  };

  for (const key in trMap) {
    text = text.replace(new RegExp("[" + key + "]", "g"), trMap[key]);
  }

  return text
    .replace(/[^-a-zA-Z0-9\s]+/gi, "") // remove non-alphanumeric chars
    .replace(/\s/gi, "-") // convert spaces to dashes
    .replace(/[-]+/gi, "-") // trim repeated dashes
    .toLowerCase();
};

export const getRandomCommandPlaceholder = () => {
  const targetTheme =
    localStorage.getItem("theme") === "dark" ? "light" : "dark";
  const randomRoute = PAGES[Math.floor(Math.random() * PAGES.length)].name;
  const commands = [`theme ${targetTheme}`, `go ${randomRoute}`, `help`];

  return `type \`${commands[Math.floor(Math.random() * commands.length)]}\``;
};

export const fixCodeBlock = (code: string) => {
  return code
    .replace(/>{@html `<code class="language-/g, '><code class="language-')
    .replace(/<\/code>`}<\/pre>/g, "</code></pre>");
};
