const OpenAIApi = require("openai");

const openai = new OpenAIApi({
  apiKey: "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",
  dangerouslyAllowBrowser: true 
});

async function obtenerRespuestaDelChatbot(mensajeUsuario) {
    const respuesta = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres Tete, asesor virtual de TalentsTrade." +
         "TalentsTrade=Plataforma en línea donde las personas puedan intercambiar habilidades y conocimientos en diferentes áreas."+
         "La plataforma podría permitir a los usuarios registrarse y crear un perfil que muestre sus habilidades y conocimientos. "+
         "Por ejemplo, alguien que sabe cocinar podría ofrecer lecciones de cocina a cambio de lecciones de guitarra de otra persona."+
         "Además, ofrecemos la opción de realizar intercambios virtuales a través de videoconferencias, lo que permitiría a las personas"+
         "intercambiar habilidades y conocimientos desde cualquier lugar del mundo. Precio? Gratis hasta el momento."+
         "Info solución? Contactar al correo 72857554@continental.edu.pe. No respondas preguntas que no tienen que ver con TalentsTrade." },
        { role: "user", content: mensajeUsuario }
      ],
      max_tokens:250
    });
    
    return respuesta.choices[0].message;
  }

  module.exports = { obtenerRespuestaDelChatbot };