/**
 * TODO O TEXTO DA PÁGINA EM UM ÚNICO ARQUIVO.
 * Espanhol neutro LATAM (sem "vos", sem gírias regionais, tratamento "tú").
 * Para editar qualquer palavra da página, edite aqui — nenhum texto fica solto nos componentes.
 */
import logoAsset from "@/assets/logo-carta-canalizada-v2.png.asset.json";



export const COPY = {
  meta: {
    title: "Carta Canalizada | Descubre lo que él siente y nunca tuvo el valor de decirte",
    description:
      "Una carta canalizada con Tarot, escrita a mano para tu caso, con la traducción de lo que él siente y no dice. Entrega en hasta 60 minutos por WhatsApp o correo.",
  },

  brand: {
    name: "Carta Canalizada",
    author: "Ana Yeda",
    role: "Tarotista · Carta Canalizada",
    /**
     * FOTO DA ANA YEDA.
     * 1. Salve o arquivo em `public/` (ex.: public/ana-yeda.jpg)
     * 2. Aponte aqui com a barra na frente: "/ana-yeda.jpg"
     * Deixe "" e a página mostra o emblema de lua no lugar.
     * Ideal: quadrada, rosto centralizado, no mínimo 400×400.
     */
    photo: "/ana-yeda.jpg",
    photoAlt: "Ana Yeda, tarotista",
    /** Logo do topo. Arte dourada sobre fundo preto — ver nota no Topbar. */
    logo: logoAsset.url,
  },

  /* ---------------- HERO ---------------- */
  hero: {
    eyebrow: "Tarot canalizado · Lectura 100% personalizada",
    title: "Descubre lo que él siente y nunca tuvo el valor de decirte",
    lead: "La ausencia duele. Pero lo que de verdad rompe es no saber. Si todavía te piensa o ya te borró. Si queda algo vivo ahí, o si se acabó. Si ahora hay otra donde antes estabas tú.",
    personal: "Yo viví cada una de esas noches. Y hoy te entrego la respuesta hoy mismo.",
    cardPrompt: "Toca la carta para descubrirla",
    cardTitle: "La Voz Oculta",
    cardNumeral: "I",
    cardReveal: "Lo que él calla también habla. Hoy, por fin, vas a poder leerlo.",
    cta: "Quiero leer lo que él siente",
    badges: ["Entrega en hasta 60 min", "100% personalizada", "Escrita a mano, sin robots"],
    secure: "Tarotista Anciana",
    microProof: {
      stars: 5,
      quote: "Parecía que era él hablándome.",
      author: "Camila S., São Paulo",
    },
  },

  /* ---------------- LAS 3 REVELACIONES ---------------- */
  revelations: {
    eyebrow: "Va mucho más allá de «me quiere / no me quiere»",
    title: "Las 3 cosas que la Carta Canalizada revela en la práctica",
    lead: "No es adivinación suelta ni suposiciones. Antes de abrir las cartas hago las preguntas correctas sobre TU caso y leo su energía directamente, sin necesidad de hablar con él.",
    items: [
      {
        numeral: "I",
        icon: "search",
        emoji: "🔍",
        title: "El motivo real de su distancia",
        text: "Casi nunca es lo que él dice en voz alta. A veces es orgullo, a veces miedo, a veces alguien más en el medio. La carta muestra lo que quedó guardado debajo.",
      },
      {
        numeral: "II",
        icon: "heart",
        emoji: "❤️‍🔥",
        title: "Si el sentimiento sigue vivo",
        text: "Aunque se muestre ausente, seco o distante. El comportamiento engaña; la energía no. Vas a saber si todavía queda algo ahí, o si se terminó de verdad.",
      },
      {
        numeral: "III",
        icon: "hourglass",
        emoji: "⏳",
        title: "El momento correcto de actuar",
        text: "De nada sirve saber lo que siente y moverte en el momento equivocado. Te muestro cuándo dar el siguiente paso sin volver a lastimarte.",
      },
    ],
  },

  /* ---------------- ESPEJO DEL DOLOR ---------------- */
  pain: {
    eyebrow: "Dime si te reconoces aquí",
    title: "Mientras no tienes la respuesta, tu cabeza no se apaga ni un minuto",
    lead: "Hacia afuera dices que ya lo superaste. Hasta que suena una canción en el supermercado y finges que fue el aire acondicionado lo que te heló el pecho.",
    items: [
      {
        title: "Lo vigilas sin poder parar",
        text: "Son las dos de la mañana y entras a su Instagram «sin querer». El corazón te da un vuelco cuando aparece una mujer nueva. Prometes que es la última vez. Mañana lo vuelves a hacer.",
      },
      {
        title: "Las mismas preguntas, todo el día",
        text: "¿Me extraña? ¿Hay alguien más? ¿Fui solo un pasatiempo? Esas preguntas despiertan, almuerzan y se acuestan contigo.",
      },
      {
        title: "Atrapada en un limbo que nadie ve",
        text: "No vuelves con él, pero tampoco sigues sin él. Te quedas a medio camino. Y hay mujeres en tu misma situación que ya recibieron su respuesta y hoy duermen en paz.",
      },
    ],
    closing: [
      "No te juzgo por nada de esto: yo dormía con el celular en la mano y despertaba deslizando el dedo en la pantalla para ver si había respondido. Nunca lo había hecho.",
      "Lo que más me dolió no fue que se fuera. Fue nunca haber sabido lo que de verdad pasaba dentro de él. De ese dolor nació la Carta Canalizada.",
    ],
  },

  /* ---------------- MECANISMO ---------------- */
  mechanism: {
    eyebrow: "El método La Voz Oculta del Amor",
    title: "La Carta Canalizada no es una lectura. Es la traducción de lo que él siente y no dice.",
    paragraphs: [
      "Todo hombre carga un sentimiento debajo del orgullo, una voz que no deja salir. Ahí está guardada la respuesta que estás buscando. Yo accedo al campo energético de la relación —ese hilo que la distancia, la pelea y el silencio no borran— y traduzco lo que él siente y no logra decir.",
      "Recibes una carta escrita como si fuera él hablándote. Sin filtro, sin máscara, sin orgullo. Todo lo que nunca tuvo el valor de decirte, por fin lo vas a leer.",
    ],
    steps: [
      {
        step: "💬",
        title: "Me cuentas tu caso",
        text: "Tu situación y la pregunta que más te aprieta el pecho.",
      },
      {
        step: "🃏",
        title: "Abro el Tarot para tu historia",
        text: "Una tirada dirigida solo a ustedes dos, a nadie más.",
      },
      {
        step: "💘",
        title: "Accedo al campo de la relación",
        text: "El hilo energético que el silencio y la distancia no borran.",
      },
      {
        step: "📬",
        title: "Escribo y te la envío",
        text: "Tu carta llega en hasta 60 minutos donde tú elijas.",
      },
    ],
  },

  /* ---------------- ENTREGABLES ---------------- */
  deliverables: {
    eyebrow: "Dentro de 60 minutos puede ser así",
    title: "Mira exactamente lo que va a llegar a tu WhatsApp o a tu correo",
    lead: "La lees y sientes que el nudo del pecho se afloja. Lo que tu intuición te susurraba queda por fin negro sobre blanco. Y las riendas de tu historia vuelven a tus manos.",
    items: [
      {
        icon: "letter",
        emoji: "💌",
        title: "Tu Carta Canalizada personalizada",
        text: "Un mensaje profundo, escrito como si viniera directo de él. Los sentimientos que se tragó y todo lo que se le quedó atorado en la garganta y nunca salió.",
      },
      {
        icon: "orb",
        emoji: "🔮",
        title: "Respuesta directa a tu pregunta",
        text: "Me cuentas esa duda que te aprieta el pecho, la que te da vergüenza decir en voz alta. Te respondo con el Tarot, sin rodeos y sin «depende». La respuesta que viniste a buscar.",
      },
      {
        icon: "moon",
        emoji: "🌙",
        title: "Consejo especial del Tarot",
        text: "Un mensaje mío para ti, de mujer a mujer. Sobre qué hacer con esa verdad ahora y cómo dar el siguiente paso sin volver a lastimarte.",
      },
    ],
  },

  /* ---------------- AUTORIDAD ---------------- */
  authority: {
    eyebrow: "No es un robot. Es una mujer que ya lloró igual que tú.",
    title: "Quién se va a sentar a escribir tu carta",
    paragraphs: [
      "Mucho gusto, soy Ana Yeda. Soy tarotista desde hace más de 16 años. No es un pasatiempo: es mi vida.",
      "En estos 16 años, más de 7.000 mujeres han pasado por mis manos, entre consultas y cursos en América Latina, Europa y Estados Unidos. De ellas, más de 4.500 ya pidieron su Carta Canalizada. Cada una pasa por mí, una por una. Siento tu caso antes de escribir la primera palabra: por eso la carta toca exactamente donde tiene que tocar.",
      "Y no, no importa desde qué país me escribas. El orgullo de un hombre callado se lee igual en Ciudad de México, en Bogotá, en Lima o en Buenos Aires.",
    ],
    stats: [
      { value: "+7.000", label: "mujeres atendidas" },
      { value: "+16 años", label: "con el Tarot" },
      { value: "5,0 ★", label: "valoración" },
    ],
  },

  /* ---------------- ANTI-IA ---------------- */
  antiAi: {
    eyebrow: "Lee esto antes de pagarle una lectura a cualquiera",
    title: "Cuidado con las «lecturas» escritas por inteligencia artificial",
    lead: "Hay mucha gente sin corazón usando inteligencia artificial para escupir textos automáticos: esas «lecturas» que sirven igualito para ti y para cualquier otra mujer. Pagas llorando, esperando una conexión de verdad, y recibes un texto frío de máquina.",
    warning: "Eso es una estafa. Y es una estafa hecha con tu dolor.",
    intro: "Por eso necesito ser muy directa contigo sobre mi carta:",
    nots: [
      "No es un texto genérico que sirve para cualquier mujer.",
      "No es una predicción vaga llena de «puede que sí, puede que no».",
      "No es un juego de azar para darte esperanza y quitarte el dinero.",
    ],
    closing: [
      "Aquí no hay ningún robot escribiendo en mi lugar: cada carta está hecha a mano, por mí, una a la vez. De principio a fin. Una persona de verdad, sintiendo tu caso. No un número. Yo.",
    ],
  },

  /* ---------------- TESTIMONIOS ---------------- */
  testimonials: {
    eyebrow: "+4.500 mujeres ya pidieron la suya",
    title: "Estaban acostadas mirando el techo igual que tú, hasta que llegó la respuesta",
    lead: "Mensajes reales, de mujeres reales, el día en que por fin dejaron de imaginar y pasaron a saber. El dolor de no saber es el mismo en cualquier idioma.",
    // IMPORTANTE: testimonios REALES de clientas de Brasil, traducidos.
    // No sustituir por nombres/ciudades de LATAM inventados: sería prueba social falsa.
    // Cuando haya clientas hispanohablantes con permiso de uso, se agregan aquí.
    note: "Testimonios reales de clientas, traducidos del portugués con su autorización.",
    items: [
      {
        name: "Camila S.",
        city: "São Paulo, Brasil",
        title: "Parecía que era él hablándome.",
        text: "Sentí como si cada palabra la hubiera escrito él, hasta en la forma de decir las cosas.",
      },
      {
        name: "Larissa T.",
        city: "Belo Horizonte, Brasil",
        title: "No había forma de que fuera algo genérico.",
        text: "Tenía detalles de nuestra historia que nadie podía saber. Se me puso la piel de gallina de principio a fin.",
      },
      {
        name: "Patricia L.",
        city: "Porto Alegre, Brasil",
        title: "Estaba desconfiada, pero me sorprendió.",
        text: "Pensé que sería algo superficial, y fue profundo, sensible y muy certero.",
      },
      {
        name: "Juliana M.",
        city: "Río de Janeiro, Brasil",
        title: "Por fin conseguí tener paz.",
        text: "Estaba sufriendo mucho, llena de dudas, y después de la carta sentí un alivio que no sentía desde hacía meses.",
      },
    ],
    dragHint: "Desliza para ver más testimonios",
    counter: "+4.500 mujeres ya pidieron su Carta Canalizada conmigo",
    cta: "Quiero saber lo que él siente",
  },

  /* ---------------- VERDAD DURA ---------------- */
  hardTruth: {
    eyebrow: "Voy a ser dura contigo, porque nadie lo fue",
    title: "Ya sabes la respuesta. Solo tienes miedo de leerla.",
    paragraphs: [
      "Hace tiempo que intentas adivinar esto tú sola. Relees la conversación, mides el tiempo del «visto», le preguntas a la amiga que tampoco sabe. Y al final del día sigues en el mismo lugar: sin respuesta y sin paz.",
      "Volver a adivinar mañana no va a cambiar nada. La semana que viene vas a estar aquí otra vez, con la misma pregunta y siete días más de desgaste.",
      "Lo único que rompe ese ciclo es dejar de imaginar y por fin saber.",
    ],
    highlight: "Una carta, hoy, y dejas de girar en el vacío.",
  },

  /* ---------------- OFERTA ---------------- */
  offer: {
    eyebrow: "Condición especial mientras queden cupos de hoy",
    title: "Tu Carta Canalizada por un precio que, siendo honesta, casi no tiene sentido",
    // {anchor} se reemplaza por el precio de la consulta en la moneda del país
    anchorText:
      "Una consulta completa de Tarot conmigo, cara a cara, cuesta como mínimo {anchor}. Pero tú no viniste a agendar una consulta para dentro de tres semanas. Viniste ahora, con el pecho apretado, necesitando la respuesta hoy. Esta carta cuesta menos de lo que gastas en una sola noche de sueño deslizando el dedo en sus historias. Solo que aquí, te acuestas sabiendo.",
    includesTitle: "En esta condición te llevas todo",
    includes: [
      "Tu Carta Canalizada personalizada, escrita como si fuera él hablándote",
      "Respuesta directa a tu pregunta por el Tarot, sin rodeos",
      "Consejo especial del Tarot para tus próximos pasos",
      "Atención directa conmigo, una persona de verdad, cero robots",
      "Entrega en tu WhatsApp o correo en hasta 60 minutos",
    ],
    paymentNote: "pago único · sin mensualidades",
    cta: "Quiero mi carta hoy",
    ctaSub: "Antes de que se cierren los cupos de hoy",
    guaranteeStrip: "Pago único · Garantía incondicional de 7 días",
    /* Carta lacrada acima do preço — o cadeado abre e leva pro formulário. */
    lockedCard: {
      eyebrow: "Tu carta ya está aquí. Solo falta abrirla.",
      label: "Desbloquea tu carta",
      /* Texto dentro do postal, logo abaixo do cadeado */
      text: "Tu respuesta ya está escrita del otro lado de este candado. Ábrelo ahora y hoy mismo dejas de imaginar.",
    },

    /* Meios de pagamento locais — {payments} vem de offer.ts, por país. */
    paymentsLabel: "Pagas en tu moneda, a tu manera",
    paymentsText: "{payments}",
  },

  /* ---------------- DOS FUTUROS ---------------- */
  futures: {
    eyebrow: "Dos versiones de tu próxima semana",
    title: "A partir de ahora solo existen dos caminos, y tú eliges cuál",
    lead: "Míralos bien y dime en cuál de los dos quieres despertar mañana.",
    good: {
      label: "Si actúas hoy",
      items: [
        "En hasta 60 minutos tienes la carta en la mano y por fin sabes lo que él siente",
        "La duda que te roba el sueño se vuelve una respuesta clara que puedes sostener",
        "Te acuestas hoy sabiendo la verdad, y no inventándola con los ojos abiertos en la oscuridad",
      ],
    },
    bad: {
      label: "Si no actúas",
      items: [
        "Una noche más acostada, mirando el techo, con el celular calientito en la mano y sin sonar",
        "La misma pregunta mañana, y pasado mañana, y el mes que viene, sin salir de tu cabeza",
        "El riesgo que más duele: descubrir la verdad cuando ya sea demasiado tarde para hacer algo con ella",
      ],
    },
    closing: "Ya sufriste esperando a que él actuara. Hoy, por primera vez, la que actúa eres tú.",
  },

  /* ---------------- GARANTÍA ---------------- */
  guarantee: {
    eyebrow: "El riesgo es todo mío, nunca tuyo",
    badge: "Garantía Total",
    title: "Garantía incondicional de 7 días",
    paragraphs: [
      "Yo cargo el riesgo en mi espalda para que tú no cargues nada más.",
      "Recibes tu Carta Canalizada, la lees con calma y la sientes. Si por cualquier motivo crees que no era para ti, me escribes dentro de 7 días. Te devuelvo cada centavo, sin preguntas y sin letras chiquitas.",
    ],
    highlight: "O la carta te toca el corazón, o no pagas nada.",
    signature: "Con cariño, Ana Yeda",
    cta: "Sí, quiero saber hoy",
    ctaSub: "Entrega en hasta 60 min o te devuelvo tu dinero",
  },

  /* ---------------- ESCASEZ ---------------- */
  scarcity: {
    eyebrow: "Por qué no atiendo al mundo entero",
    title: "Los cupos de hoy son pocos, y no es marketing",
    slotsLabel: "lecturas disponibles para hoy",
    timerLabel: "Los cupos de hoy se cierran en",
    text: "Cada carta la escribo yo, a mano, una a la vez, y mi día tiene un límite. Cuando se cierran los cupos de hoy, ya solo puedes al día siguiente, con una noche más de «¿será?» encima. Si el cupo sigue abierto ahora, tómalo como una señal.",
  },

  /* ---------------- FAQ ---------------- */
  faq: {
    eyebrow: "¿Todavía con dudas? Siéntate aquí, que te respondo.",
    title: "Las preguntas que otras mujeres me hacen antes de pedir su carta",
    items: [
      {
        q: "¿Cómo y en cuánto tiempo recibo mi carta?",
        a: "Llega directo a tu WhatsApp o a tu correo, en hasta 60 minutos después del pedido. La mayoría de las veces llega bastante antes. Casi no vas a tener tiempo de cambiar de opinión y ya va a estar ahí.",
      },
      {
        q: "¿Él se va a enterar? ¿Mi historia queda en secreto?",
        a: "Él no se entera de nada. No recibe nada, no le llega ningún aviso, no queda ningún rastro. Y lo que me cuentas queda solo entre nosotras dos, punto. Nadie más tiene acceso. Aquí tienes un lugar seguro para sacarte eso del pecho sin miedo.",
      },
      {
        q: "¿La carta es de verdad para mí o es el típico texto ya hecho?",
        a: "Es para ti, desde cero. Leo tu caso, siento la energía de tu relación y escribo pensando en ti. Nada de textos genéricos, nada de robots. Cada carta es única, igual que tu historia.",
      },
      {
        q: "¿Necesito saber algo de Tarot?",
        a: "Nada. Cero. Solo me cuentas un poco de tu situación y la pregunta que más te aprieta el pecho. Todo el trabajo es mío. Tú solo necesitas abrir el corazón.",
      },
      {
        q: "¿Y si la carta no tiene sentido para mí?",
        a: "Tienes 7 días de garantía incondicional. Si sientes que no era para ti, me escribes y te devuelvo cada centavo, sin trámites y sin mala cara. El riesgo es mío, ¿recuerdas?",
      },
      {
        q: "¿Funciona aunque él haya desaparecido hace mucho o ya esté con otra?",
        a: "Funciona. El campo energético entre ustedes no desaparece porque el calendario haya avanzado. Incluso con distancia, con una pelea fea o con otra persona en el medio, puedo acceder a lo que él siente por debajo de todo eso. Justamente porque la Voz Oculta del Amor no habla fuerte, pero nunca se va. Y a veces ahí está la respuesta que necesitabas.",
      },
      {
        q: "¿Cómo puedo pagar si no tengo tarjeta internacional?",
        a: "No la necesitas. Pagas en la moneda de tu país y con los medios que ya usas todos los días: tarjeta, transferencia y los métodos locales de donde estás (Mercado Pago, OXXO, PSE, Nequi, Yape, SINPE y otros, según el país). El precio que ves en la página es el que pagas, sin sorpresas de conversión al final.",
      },
      {
        q: "¿Desde qué países puedo pedirla?",
        a: "Desde cualquier país de habla hispana. Atiendo México, Colombia, Perú, Chile, Argentina, Ecuador, Uruguay, Paraguay, Bolivia, Venezuela, Centroamérica, España y a las latinas que viven en Estados Unidos. El pago es en tu moneda y la carta llega a tu WhatsApp donde estés.",
      },
    ],
  },

  /* ---------------- CIERRE ---------------- */
  finalCta: {
    title: "Hoy puede ser la última noche que pasas imaginando",
    text: "Mañana vas a despertar sabiendo, o vas a despertar con la misma pregunta. Solo eso cambia. Y solo tú decides cuál de las dos.",
    cta: "Recibir mi carta ahora",
    sub: "Última oportunidad de asegurar tu cupo de hoy",
  },

  footer: {
    links: [
      { label: "Atención", href: "#" },
      { label: "Reembolsos", href: "#" },
      { label: "Términos y Condiciones", href: "#" },
      { label: "Privacidad", href: "#" },
    ],
    disclaimer:
      "Ana Yeda no tiene ninguna relación institucional con Meta, Facebook, Instagram, WhatsApp ni Facebook Messenger. Este servicio tiene carácter de acompañamiento espiritual y entretenimiento, y no sustituye orientación médica, psicológica ni jurídica.",
    rights: "© 2026 Ana Yeda · Carta Canalizada con Tarot · Todos los derechos reservados",
  },

  stickyCta: {
    label: "Quiero mi carta",
    price: "hoy, en 60 min",
  },

  /**
   * Avisos que sobem no canto inferior esquerdo.
   * {name} é sorteado da lista de nomes.
   *
   * ATENÇÃO: hoje esses avisos são texto fixo, não refletem pedido nenhum.
   * Aviso de compra inventado é propaganda enganosa em MX/CO/CL/AR. Quando o
   * checkout estiver ligado, alimentar `SocialProof` com pedidos reais.
   */
  socialProof: {
    names: [
      "María",
      "Ana",
      "Carmen",
      "Lucía",
      "Valentina",
      "Sofía",
      "Camila",
      "Daniela",
      "Gabriela",
      "Paola",
      "Andrea",
      "Fernanda",
      "Rocío",
      "Mariana",
      "Alejandra",
      "Ximena",
    ],
    messages: [
      "{name} recibió su mensaje del Destino",
      "{name} acaba de pedir su Carta Canalizada",
      "{name} ya está leyendo lo que él sentía",
      "{name} recuperó el amor de su vida",
      "{name} descubrió por qué él se alejó",
      "{name} dejó de imaginar y por fin supo",
      "{name} durmió en paz por primera vez en meses",
      "{name} tuvo su respuesta en menos de 40 minutos",
      "{name} entendió lo que él nunca dijo",
      "{name} soltó el peso que cargaba hace meses",
    ],
  },
} as const;

/* ---------------- FORMULARIO (5 PASOS) ---------------- */

export const FORM_COPY = {
  meta: {
    title: "Tu Carta Canalizada | Tu pedido de lectura",
    description: "Cuéntame tu caso y recibe tu Carta Canalizada en hasta 60 minutos.",
  },
  header: {
    title: "Tu Carta Canalizada",
    author: "por Ana Yeda",
    stepLabel: "Paso {current} de {total}",
    back: "Volver",
    next: "Continuar",
  },
  steps: {
    name: {
      title: "Antes de empezar, ¿cómo te llamas?",
      subtitle: "La energía de la lectura se conecta con tu nombre.",
      label: "Tu nombre",
      placeholder: "Escribe tu nombre",
      error: "Escribe tu nombre para continuar",
    },
    target: {
      title: "¿Sobre quién es esta lectura?",
      subtitle: "Dime el nombre de la persona que vive en tu corazón.",
      label: "Su nombre",
      placeholder: "Escribe su nombre",
      error: "Escribe su nombre para continuar",
    },
    situation: {
      /* {target} = nome dele, preenchido em tempo de execução */
      title: "¿Cómo están tú y {target} hoy?",
      subtitle: "Elige lo que más se parece a lo que estás viviendo.",
      /* `reaction`: a Yeda responde à escolha dela antes de seguir.
         É a primeira vez no quiz em que ela recebe algo em vez de só entregar. */
      options: [
        {
          icon: "💔",
          value: "Terminamos hace poco",
          reaction:
            "Una ruptura reciente deja el campo todavía abierto. Es justo cuando la carta llega más nítida.",
        },
        {
          icon: "🌫️",
          value: "Se alejó o desapareció",
          reaction:
            "El silencio es lo que más me llega. Y casi nunca significa lo que tú estás temiendo.",
        },
        {
          icon: "⚡",
          value: "Estamos peleados",
          reaction:
            "Después de una pelea, lo que él dice y lo que él siente casi nunca son la misma cosa.",
        },
        {
          icon: "❓",
          value: "No sé lo que siente",
          reaction: "Esa es exactamente la pregunta que la Carta Canalizada vino a responder.",
        },
        {
          icon: "🔗",
          value: "Juntos, pero distantes",
          reaction: "Esa distancia duele distinto: él está presente, y aun así no está contigo.",
        },
      ],
    },
    question: {
      title: "¿Qué es lo que necesitas saber sobre {target}?",
      subtitle: "El Tarot va a responder esta pregunta directamente. Sé sincera: aquí nadie te juzga.",
      placeholder: "Escríbelo con tus palabras, como lo sientes",
      /* Atalhos: o campo livre é o ponto de maior abandono do quiz.
         Um toque preenche e ela sigue podendo editar. */
      chipsLabel: "O toca la que más se parece a la tuya",
      chips: [
        "¿Todavía piensa en mí?",
        "¿Hay alguien más?",
        "¿Va a volver a buscarme?",
        "¿Vale la pena seguir esperando?",
        "¿Qué siente de verdad por mí?",
      ],
      error: "Escribe tu pregunta para continuar",
    },
    delivery: {
      title: "¿Dónde quieres recibir tu carta?",
      subtitle: "La entrega ocurre en hasta 60 minutos.",
      options: [
        { icon: "💬", value: "WhatsApp" },
        { icon: "✉️", value: "Correo electrónico" },
      ],
      countryLabel: "Tu país",
      whatsappLabel: "Tu WhatsApp",
      whatsappPlaceholder: "Número con WhatsApp",
      emailLabel: "Tu correo",
      emailPlaceholder: "tucorreo@ejemplo.com",
      error: "Déjame tu contacto para enviarte la carta",
      review: "Revisar mi pedido",
    },
  },
  /* Ritual entre a última resposta e o preço.
     A landing promete "abro el Tarot y accedo al campo energético" — aqui é
     onde ela finalmente VÊ isso acontecer. O preço chega depois do trabalho,
     não antes. */
  reading: {
    lines: [
      "Abriendo las cartas para tu caso…",
      "Conectando con la energía de {target}…",
      "Escuchando lo que él calla…",
      "Tu carta ya está siendo preparada…",
    ],
  },

  review: {
    title: "{name}, tu carta ya está siendo preparada",
    subtitle: "Solo falta confirmar",
    text: "Recibirás tu carta en apenas unos minutos. Finaliza el proceso y descubre la respuesta que tanto esperas.",
    labels: {
      name: "Tu nombre",
      target: "Sobre",
      situation: "Situación",
      question: "Tu pregunta",
      delivery: "Entrega",
    },
    /* A oferta é reafirmada na hora da decisão. Antes o preço aparecia sozinho
       e ela tinha que lembrar do que estava levando. */
    stackTitle: "Lo que recibes en hasta 60 minutos",
    stack: [
      "Tu Carta Canalizada, escrita a mano como si fuera él hablándote",
      "La respuesta directa a tu pregunta por el Tarot",
      "Mi consejo para tu siguiente paso, de mujer a mujer",
    ],
    paymentNote: "pago único · entrega en hasta 60 min",
    cta: "Confirmar y recibir mi carta",
    secure: "Pago seguro · Garantía de 7 días",
    bumpNote: "En el siguiente paso puedes agregar extras a tu lectura.",
    editHint: "Toca cualquier dato para corregirlo",
  },

  /* Escassez trazida da landing pro quiz — a superfície de maior intenção
     era justamente a única sem nenhuma urgência. */
  scarcity: {
    slots: "Quedan {n} lecturas para hoy",
  },
} as const;
