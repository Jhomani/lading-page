import esMessages from "./es_ES.json";
import enMessages from "./en_US.json";

interface Inlang {
  ES: typeof esMessages,
  EN: typeof enMessages,
}

const languages: Inlang = {
  ES: esMessages,
  EN: enMessages
};

export default languages;
