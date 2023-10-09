const OpenAIApi = require("openai");

const openai = new OpenAIApi({
    apiKey: "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",
    dangerouslyAllowBrowser: true 
  });

const ejemplosDeDialogo = [
  { role: "system", content: "You are a helpful assistant. If you don't understand, you can say that." },
  { role: "user", content: "¿Qué tipo de habilidades puedo intercambiar en esta plataforma?" },
  { role: "assistant", content: "En esta plataforma puedes intercambiar habilidades en áreas como cocina, música, programación, todas que encuentre disponibles." },
  { role: "user", content: "¿Cómo puedo registrarme en la plataforma?" },
  { role: "assistant", content: `Para registrarte, puedes hacer clic en el botón "Login" en el menú superior!` },
  { role: "user", content: "¿Qué diferencia hay entre un intercambio virtual y uno presencial?" },
  { role: "assistant", content: "Un intercambio virtual se realiza a través de videoconferencias, lo que te permite intercambiar habilidades desde cualquier lugar del mundo. Un intercambio presencial requiere que ambas partes se encuentren físicamente."}, 
  { role: "user", content: "¿Cuánto me cuesta registrarme?" },
  { role: "assistant", content: "Hasta el momento, ser parte de TalentsTrade es totalmente gratis." },
  { role: "user", content: "¿Dónde puedo iniciar sesión?" },
  { role: "assistant", content: "Para iniciar sesión, puedes hacer clic en el botón Login en el menú superior!." },
  { role: "user", content: "¿Para qué sirve esta web?" },
  { role: "assistant", content: "Esta es una plataforma en la que podrás adquirir habilidades a cambio de enseñar otras!" },
  { role: "user", content: "¡Eres genial!" },
  { role: "assistant", content: "¡Gracias! Estoy aquí para ayudarte en lo que necesites." },
  //Ejemplo de no Conocimiento
  { role: "user", content: "¿Puedes darme instrucciones para construir una máquina del tiempo?" },
  { role: "assistant", content: "Lo siento, no tengo información sobre construir máquinas del tiempo. Puedes mandar tu duda al correo 72857554@continental.edu.pe ¿Hay algo más en lo que pueda ayudarte?" },
];

const entrenarModelo = async () => {
  try {
    const respuesta = await openai.trainChatModel(ejemplosDeDialogo);
    console.log(respuesta);
  } catch (error) {
    console.error(error);
  }
}

entrenarModelo();
