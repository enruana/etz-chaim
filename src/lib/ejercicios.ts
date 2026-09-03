// Banco de ejercicios curado a mano (nunca generado sin revisión).
// Fuente: content/estudios/marcos/ — secciones 11 (Memoria) y 12 (Preguntas) de cada capítulo.
// Texto bíblico: RVR1960 literal.

export type Ejercicio =
  | { id: string; tipo: "qa"; origen: string; front: string; back: string }
  | { id: string; tipo: "cloze"; origen: string; texto: string; ocultas: string[]; ref: string }
  | { id: string; tipo: "recitar"; origen: string; ref: string; texto: string }
  | { id: string; tipo: "referencia"; origen: string; texto: string; ref: string };

const MC_1_15 =
  "El tiempo se ha cumplido, y el reino de Dios se ha acercado; arrepentíos, y creed en el evangelio.";
const MC_1_17 = "Venid en pos de mí, y haré que seáis pescadores de hombres.";
const MC_2_17 =
  "Al oír esto Jesús, les dijo: Los sanos no tienen necesidad de médico, sino los enfermos. No he venido a llamar a justos, sino a pecadores.";
const MC_2_27_28 =
  "El día de reposo fue hecho por causa del hombre, y no el hombre por causa del día de reposo. Por tanto, el Hijo del Hombre es Señor aun del día de reposo.";

const MC_3_35 =
  "Porque todo aquel que hace la voluntad de Dios, ese es mi hermano, y mi hermana, y mi madre.";
const MC_3_14_15 =
  "Y estableció a doce, para que estuviesen con él, y para enviarlos a predicar, y que tuviesen autoridad para sanar enfermedades y para echar fuera demonios";

const MC_4_39 =
  "Y levantándose, reprendió al viento, y dijo al mar: Calla, enmudece. Y cesó el viento, y se hizo grande bonanza.";
const MC_4_41 =
  "Entonces temieron con gran temor, y se decían el uno al otro: ¿Quién es este, que aun el viento y el mar le obedecen?";

export const EJERCICIOS: Ejercicio[] = [
  // ——— Escalera de memoria: Marcos 1:15 ———
  { id: "v-mc-1-15-c1", tipo: "cloze", origen: "Marcos 1", texto: MC_1_15, ocultas: ["reino", "arrepentíos"], ref: "Marcos 1:15" },
  { id: "v-mc-1-15-c2", tipo: "cloze", origen: "Marcos 1", texto: MC_1_15, ocultas: ["tiempo", "cumplido", "reino", "acercado", "arrepentíos", "creed"], ref: "Marcos 1:15" },
  { id: "v-mc-1-15-rec", tipo: "recitar", origen: "Marcos 1", ref: "Marcos 1:15", texto: MC_1_15 },
  { id: "v-mc-1-15-ref", tipo: "referencia", origen: "Marcos 1", texto: MC_1_15, ref: "Marcos 1:15" },
  // ——— Marcos 1:17 ———
  { id: "v-mc-1-17-c1", tipo: "cloze", origen: "Marcos 1", texto: MC_1_17, ocultas: ["pos", "pescadores"], ref: "Marcos 1:17" },
  { id: "v-mc-1-17-rec", tipo: "recitar", origen: "Marcos 1", ref: "Marcos 1:17", texto: MC_1_17 },
  // ——— Comprensión: Marcos 1 ———
  {
    id: "q-mc1-01", tipo: "qa", origen: "Marcos 1",
    front: "¿Con qué frase abre Marcos su libro y qué dos títulos le da a Jesús desde el primer versículo?",
    back: "«Principio del evangelio de Jesucristo, Hijo de Dios» (1:1). Los títulos: Cristo (Mesías, el Rey ungido) e Hijo de Dios. Todo el libro demuestra esa doble tesis.",
  },
  {
    id: "q-mc1-02", tipo: "qa", origen: "Marcos 1",
    front: "¿Qué dos profetas cita Marcos en 1:2-3 y qué anunciaban esas profecías?",
    back: "Malaquías 3:1 e Isaías 40:3: un mensajero prepararía el camino del Señor. Al aplicarlas a Juan preparando el camino de Jesús, Marcos identifica a Jesús con el Señor mismo.",
  },
  {
    id: "q-mc1-03", tipo: "qa", origen: "Marcos 1",
    front: "En el bautismo de Jesús (1:9-11), ¿cómo aparecen las tres Personas de la Trinidad?",
    back: "El Hijo sube del agua; el Espíritu desciende como paloma; el Padre habla desde los cielos: «Tú eres mi Hijo amado; en ti tengo complacencia».",
  },
  {
    id: "q-mc1-04", tipo: "qa", origen: "Marcos 1",
    front: "¿Quién dijo esto y a quién?: «¿Qué tienes con nosotros, Jesús nazareno? … Sé quién eres, el Santo de Dios».",
    back: "El espíritu inmundo al Jesús, en la sinagoga de Capernaum (1:24). Lección: los demonios tienen la cristología correcta y están perdidos — saber quién es Jesús no es arrepentirse y creer (Stg 2:19).",
  },
  {
    id: "q-mc1-05", tipo: "qa", origen: "Marcos 1",
    front: "Ordena el «día en Capernaum»: (a) sanidades al ponerse el sol; (b) sinagoga y exorcismo; (c) oración de madrugada; (d) suegra de Simón.",
    back: "b → d → a → c: sinagoga en sábado (1:21-28), casa de Simón (1:29-31), al ponerse el sol (1:32-34), muy de mañana (1:35).",
  },
  {
    id: "q-mc1-06", tipo: "qa", origen: "Marcos 1",
    front: "Cuando Simón dice «Todos te buscan» (1:37), ¿por qué Jesús se va a otros pueblos en vez de volver a Capernaum?",
    back: "Su misión prioritaria era predicar el Reino: «Vamos a los lugares vecinos, para que predique también allí; porque para esto he venido» (1:38). Los milagros servían al mensaje. La claridad salió de la oración de madrugada.",
  },
  {
    id: "q-mc1-07", tipo: "qa", origen: "Marcos 1",
    front: "V/F: «Al tocar al leproso, Jesús quedó ceremonialmente inmundo y el milagro quedó invalidado».",
    back: "Falso. Con Jesús la corriente corre al revés: en lugar de contaminarse Él, el leproso quedó limpio (1:41-42). Y Jesús honró la ley enviándolo al sacerdote (1:44, Lv 14).",
  },
  {
    id: "q-mc1-08", tipo: "qa", origen: "Marcos 1",
    front: "¿Por qué Jesús le prohibió al leproso divulgar su sanidad, y qué consecuencia tuvo la desobediencia?",
    back: "Para proteger su predicación y evitar un mesianismo político-espectacular antes de tiempo. Consecuencia (1:45): «ya Jesús no podía entrar abiertamente en la ciudad» — el entusiasmo desobediente estorbó la misión.",
  },
  {
    id: "q-mc1-09", tipo: "qa", origen: "Marcos 1",
    front: "¿Qué paralelo hay entre los 40 días de Jesús en el desierto (1:12-13) y la historia de Israel?",
    back: "Israel, «hijo» de Dios, fue probado 40 años y falló; Jesús, el Hijo amado, es probado 40 días y permanece fiel. Jesús es el verdadero Israel y el nuevo Adán: gana como representante nuestro la batalla que el hombre perdía.",
  },
  {
    id: "q-mc1-10", tipo: "qa", origen: "Marcos 1",
    front: "Según 1:15, ¿cuál es el anuncio de Jesús y cuál es la doble respuesta que exige?",
    back: "Anuncio: «El tiempo se ha cumplido, y el reino de Dios se ha acercado». Respuesta: «arrepentíos, y creed en el evangelio» — cambiar de rumbo y confiar la vida a la buena noticia. Las dos juntas son la conversión.",
  },
  // ——— Escalera de memoria: Marcos 2:17 ———
  { id: "v-mc-2-17-c1", tipo: "cloze", origen: "Marcos 2", texto: MC_2_17, ocultas: ["médico", "pecadores"], ref: "Marcos 2:17" },
  { id: "v-mc-2-17-c2", tipo: "cloze", origen: "Marcos 2", texto: MC_2_17, ocultas: ["sanos", "necesidad", "médico", "enfermos", "llamar", "justos", "pecadores"], ref: "Marcos 2:17" },
  { id: "v-mc-2-17-rec", tipo: "recitar", origen: "Marcos 2", ref: "Marcos 2:17", texto: MC_2_17 },
  { id: "v-mc-2-17-ref", tipo: "referencia", origen: "Marcos 2", texto: MC_2_17, ref: "Marcos 2:17" },
  // ——— Marcos 2:27-28 ———
  { id: "v-mc-2-27-c1", tipo: "cloze", origen: "Marcos 2", texto: MC_2_27_28, ocultas: ["hecho", "Señor"], ref: "Marcos 2:27-28" },
  { id: "v-mc-2-27-rec", tipo: "recitar", origen: "Marcos 2", ref: "Marcos 2:27-28", texto: MC_2_27_28 },
  // ——— Comprensión: Marcos 2 ———
  {
    id: "q-mc2-01", tipo: "qa", origen: "Marcos 2",
    front: "¿Qué «vio» Jesús antes de decirle al paralítico «tus pecados te son perdonados», y en qué consistió visiblemente?",
    back: "«Al ver Jesús la fe de ellos» (2:5): la fe de los cuatro amigos hecha acción — cargarlo, subir al techo, abrirlo y bajarlo hasta Jesús cuando la puerta estaba bloqueada. En Marcos, la fe se ve en lo que hace.",
  },
  {
    id: "q-mc2-02", tipo: "qa", origen: "Marcos 2",
    front: "¿Por qué los escribas concluyeron «blasfemia» (2:7), y cómo respondió Jesús a la objeción?",
    back: "Porque perdonar pecados es exclusivo de Dios — su premisa era correcta. Jesús unió lo inverificable a lo verificable: «para que sepáis que el Hijo del Hombre tiene potestad en la tierra para perdonar pecados», sanó al paralítico a la vista de todos. No era blasfemo: es Dios presente.",
  },
  {
    id: "q-mc2-03", tipo: "qa", origen: "Marcos 2",
    front: "«Hijo del Hombre» aparece por primera vez en Marcos (2:10, 28). ¿De qué pasaje del AT viene y qué reclama Jesús con él aquí?",
    back: "De Daniel 7:13-14: uno «como un hijo de hombre» que recibe de Dios dominio, gloria y reino eternos. Aquí reclama dos prerrogativas divinas: perdonar pecados (2:10) y señorío sobre el día de reposo (2:28).",
  },
  {
    id: "q-mc2-04", tipo: "qa", origen: "Marcos 2",
    front: "¿Quién dijo esto y a quién?: «¿Qué es esto, que él come y bebe con los publicanos y pecadores?»",
    back: "Los escribas y fariseos a los discípulos (2:16), en el banquete de la casa de Leví — todavía no se atreven a encarar a Jesús directamente; la hostilidad sube por etapas a lo largo del capítulo.",
  },
  {
    id: "q-mc2-05", tipo: "qa", origen: "Marcos 2",
    front: "¿Quién era Leví, dónde estaba cuando Jesús lo llamó, y qué hizo después de seguirlo?",
    back: "Leví hijo de Alfeo (el Mateo del primer evangelio), publicano, sentado «al banco de los tributos públicos» de Capernaúm (2:14). Su primer acto de discípulo: un banquete en su casa para sentar a sus amigos «publicanos y pecadores» a la mesa del Médico (2:15).",
  },
  {
    id: "q-mc2-06", tipo: "qa", origen: "Marcos 2",
    front: "¿Qué enseñan las parábolas del remiendo nuevo y del vino nuevo (2:21-22)?",
    back: "Lo que Jesús trae no es un parche para el sistema religioso de mérito ni cabe en sus estructuras rígidas: coserlos o mezclarlos arruina ambos. El vino nuevo exige odre nuevo — la gracia funda un principio de vida distinto, no una mejora del reglamento.",
  },
  {
    id: "q-mc2-07", tipo: "qa", origen: "Marcos 2",
    front: "Según 2:19-20, ¿por qué los discípulos de Jesús no ayunaban, y cuándo ayunarían?",
    back: "Porque el esposo estaba con ellos: su presencia hacía de esos días una boda, y nadie ayuna en la boda. Ayunarían «cuando el esposo les será quitado» (2:20) — primera alusión velada de Jesús a su muerte en Marcos; la iglesia luego ayunó por anhelo, no por reglamento (Hch 13:2-3).",
  },
  {
    id: "q-mc2-08", tipo: "qa", origen: "Marcos 2",
    front: "Ordena las cinco controversias de la serie 2:1–3:6: (a) espigas en sábado; (b) perdón del paralítico; (c) mano seca; (d) pregunta del ayuno; (e) comida en casa de Leví.",
    back: "b → e → d → a → c. Simetría en espejo: sanidad / comida / ayuno al centro / comida en sábado / sanidad en sábado — y cierra con el pacto para destruirle (3:6).",
  },
  {
    id: "q-mc2-09", tipo: "qa", origen: "Marcos 2",
    front: "V/F: «Los discípulos robaron grano ajeno al arrancar las espigas, y por eso los fariseos los acusaron».",
    back: "Falso. Arrancar espigas al pasar estaba permitido por la ley (Dt 23:25). La acusación fue hacerlo en día de reposo: para la tradición oral, arrancar era segar y frotar era trillar. El choque fue con el reglamento humano, no con la ley de Dios.",
  },
  {
    id: "q-mc2-10", tipo: "qa", origen: "Marcos 2",
    front: "¿Qué defendió Jesús con el ejemplo de David y los panes (1 S 21), y qué declaró en 2:27-28?",
    back: "Que la ley ceremonial nunca fue diseñada para aplastar la necesidad humana: si David comió el pan reservado, con más razón los hombres del Ungido mayor que David. Luego declaró el diseño («el día de reposo fue hecho por causa del hombre» — regalo, no carga) y su autoridad («el Hijo del Hombre es Señor aun del día de reposo»).",
  },
  // ——— Escalera de memoria: Marcos 3:35 ———
  { id: "v-mc-3-35-c1", tipo: "cloze", origen: "Marcos 3", texto: MC_3_35, ocultas: ["voluntad", "hermano"], ref: "Marcos 3:35" },
  { id: "v-mc-3-35-c2", tipo: "cloze", origen: "Marcos 3", texto: MC_3_35, ocultas: ["todo", "hace", "voluntad", "hermano", "hermana", "madre"], ref: "Marcos 3:35" },
  { id: "v-mc-3-35-rec", tipo: "recitar", origen: "Marcos 3", ref: "Marcos 3:35", texto: MC_3_35 },
  { id: "v-mc-3-35-ref", tipo: "referencia", origen: "Marcos 3", texto: MC_3_35, ref: "Marcos 3:35" },
  // ——— Marcos 3:14-15 ———
  { id: "v-mc-3-14-c1", tipo: "cloze", origen: "Marcos 3", texto: MC_3_14_15, ocultas: ["doce", "estuviesen", "enviarlos", "autoridad"], ref: "Marcos 3:14-15" },
  { id: "v-mc-3-14-rec", tipo: "recitar", origen: "Marcos 3", ref: "Marcos 3:14-15", texto: MC_3_14_15 },
  // ——— Comprensión: Marcos 3 ———
  {
    id: "q-mc3-01", tipo: "qa", origen: "Marcos 3",
    front: "¿Qué hizo Jesús con el hombre de la mano seca antes de sanarlo, y por qué importa?",
    back: "Le dijo «Levántate y ponte en medio» (3:3): lo puso en el centro de la sinagoga. Convirtió la trampa secreta de los fariseos en escena pública, y al hombre-cebo en persona.",
  },
  {
    id: "q-mc3-02", tipo: "qa", origen: "Marcos 3",
    front: "¿Qué dos emociones tuvo Jesús en 3:5, y qué las provocó?",
    back: "Enojo («mirándolos alrededor con enojo») y tristeza («entristecido»), a la vez. Las provocó «la dureza de sus corazones»: gente religiosa que prefería su reglamento a la restauración de un hombre.",
  },
  {
    id: "q-mc3-03", tipo: "qa", origen: "Marcos 3",
    front: "¿Por qué sorprende que los fariseos se aliaran con los herodianos (3:6)?",
    back: "Eran enemigos políticos: los fariseos despreciaban a Herodes y a Roma; los herodianos eran partidarios de Herodes Antipas. Los unió un enemigo común — y la necesidad del poder del Estado para matar.",
  },
  {
    id: "q-mc3-04", tipo: "qa", origen: "Marcos 3",
    front: "Según 3:14-15, ¿para qué estableció Jesús a los doce? Los tres propósitos, en orden.",
    back: "(1) «para que estuviesen con él»; (2) «para enviarlos a predicar»; (3) «que tuviesen autoridad para sanar enfermedades y para echar fuera demonios». Primero la comunión, después el envío.",
  },
  {
    id: "q-mc3-05", tipo: "qa", origen: "Marcos 3",
    front: "¿Quién dijo esto y de quién?: «Está fuera de sí».",
    back: "«Los suyos» — la familia de Jesús — al enterarse de cómo vivía en Capernaúm (3:21). Vinieron «para prenderle»: llevárselo a casa creyendo que había perdido el juicio.",
  },
  {
    id: "q-mc3-06", tipo: "qa", origen: "Marcos 3",
    front: "¿De qué acusaron a Jesús los escribas de Jerusalén (3:22), y cómo lo refutó?",
    back: "Que «tenía a Beelzebú» y echaba demonios por el príncipe de los demonios. Jesús: una casa dividida no permanece — Satanás no expulsa a Satanás — y con el hombre fuerte (3:27) explicó lo que pasaba: alguien más fuerte lo había atado y saqueaba su casa.",
  },
  {
    id: "q-mc3-07", tipo: "qa", origen: "Marcos 3",
    front: "Según el propio Marcos (3:30), ¿en qué consistía la blasfemia contra el Espíritu Santo en este pasaje?",
    back: "En que los escribas «habían dicho: Tiene espíritu inmundo»: miraron la obra visible del Espíritu Santo en Jesús y la atribuyeron, con conocimiento y de forma sostenida, a un espíritu inmundo.",
  },
  {
    id: "q-mc3-08", tipo: "qa", origen: "Marcos 3",
    front: "V/F: «Quien teme haber cometido la blasfemia contra el Espíritu Santo probablemente la cometió».",
    back: "Falso. Quien llegó a ese endurecimiento no se angustia por su alma; la angustia es obra del Espíritu. Jesús advirtió a los escribas — no se advierte a quien ya está perdido —, y 3:28 promete perdón de «todos los pecados… y las blasfemias cualesquiera que sean».",
  },
  {
    id: "q-mc3-09", tipo: "qa", origen: "Marcos 3",
    front: "Ordena: (a) Jesús establece a doce; (b) los escribas dicen que tiene a Beelzebú; (c) fariseos y herodianos traman destruirle; (d) la madre y los hermanos afuera; (e) los demonios gritan «Tú eres el Hijo de Dios».",
    back: "c → e → a → b → d. El complot (3:6), los demonios junto al mar (3:11), los doce (3:13-19), Beelzebú (3:22-30), la familia afuera (3:31-35).",
  },
  {
    id: "q-mc3-10", tipo: "qa", origen: "Marcos 3",
    front: "¿Cómo se relacionan las dos «rebanadas» del sándwich (3:20-21 y 3:31-35) con el relleno (3:22-30), y qué enseña el conjunto?",
    back: "La familia lo cree loco y se queda afuera; los escribas lo llaman endemoniado; adentro están los que lo escuchan. La cercanía a Jesús no viene por sangre ni credenciales sino por hacer la voluntad de Dios (3:35) — y la puerta siguió abierta: María y sus hermanos terminaron adentro (Hch 1:14).",
  },
  // ——— Escalera de memoria: Marcos 4:39 ———
  { id: "v-mc-4-39-c1", tipo: "cloze", origen: "Marcos 4", texto: MC_4_39, ocultas: ["reprendió", "enmudece"], ref: "Marcos 4:39" },
  { id: "v-mc-4-39-c2", tipo: "cloze", origen: "Marcos 4", texto: MC_4_39, ocultas: ["levantándose", "reprendió", "viento", "Calla", "enmudece", "bonanza"], ref: "Marcos 4:39" },
  { id: "v-mc-4-39-rec", tipo: "recitar", origen: "Marcos 4", ref: "Marcos 4:39", texto: MC_4_39 },
  { id: "v-mc-4-39-ref", tipo: "referencia", origen: "Marcos 4", texto: MC_4_39, ref: "Marcos 4:39" },
  // ——— Marcos 4:41 ———
  { id: "v-mc-4-41-c1", tipo: "cloze", origen: "Marcos 4", texto: MC_4_41, ocultas: ["temor", "viento", "obedecen"], ref: "Marcos 4:41" },
  { id: "v-mc-4-41-rec", tipo: "recitar", origen: "Marcos 4", ref: "Marcos 4:41", texto: MC_4_41 },
  // ——— Comprensión: Marcos 4 ———
  {
    id: "q-mc4-01", tipo: "qa", origen: "Marcos 4",
    front: "¿Desde dónde enseñó Jesús la parábola del sembrador, y de dónde salió ese «púlpito»?",
    back: "Desde una barca, sentado sobre el mar, con la multitud en la orilla (4:1). Es la barca que pidió tener «siempre lista» en 3:9: lo que fue salida de emergencia se volvió púlpito.",
  },
  {
    id: "q-mc4-02", tipo: "qa", origen: "Marcos 4",
    front: "¿Por qué la parábola del sembrador es la llave de todas las parábolas (4:13)?",
    back: "Porque entrega la clave de lectura: la semilla es «la palabra» (4:14) y los terrenos son las maneras de oírla. Quien no entiende que el reino avanza por la palabra sembrada no podrá abrir las demás.",
  },
  {
    id: "q-mc4-03", tipo: "qa", origen: "Marcos 4",
    front: "Menciona los cuatro terrenos y qué impide (o produce) el fruto en cada uno.",
    back: "Camino: Satanás quita la palabra en seguida (4:15). Pedregales: gozo sin raíz, tropiezan ante la tribulación (4:16-17). Espinos: afanes, engaño de las riquezas y codicias la ahogan (4:18-19). Buena tierra: oyen, reciben y dan fruto a treinta, sesenta y ciento por uno (4:20).",
  },
  {
    id: "q-mc4-04", tipo: "qa", origen: "Marcos 4",
    front: "¿Qué es el «misterio del reino de Dios» que «os es dado saber» (4:11)?",
    back: "Algo que solo se conoce si Dios lo revela: el reino ya llegó en Jesús, pero en forma pequeña y sembrada — no con el estruendo que Israel esperaba. Y es «dado»: regalo recibido quedándose cerca a preguntar.",
  },
  {
    id: "q-mc4-05", tipo: "qa", origen: "Marcos 4",
    front: "V/F: «Según Marcos 4, Jesús usaba parábolas para que nadie pudiera entender ni salvarse».",
    back: "Falso. Las parábolas revelan al que busca y velan al que ya se cerró: a los que preguntaban «les declaraba todo» (4:34). El velo de 4:11-12 es juicio sobre un rechazo ya consumado (los escribas del cap. 3), no una trampa para el que quiere oír.",
  },
  {
    id: "q-mc4-06", tipo: "qa", origen: "Marcos 4",
    front: "En la parábola exclusiva de Marcos (4:26-29), ¿qué hace el sembrador después de sembrar y qué hace la semilla?",
    back: "El sembrador duerme y se levanta, «sin que él sepa cómo» crece lo sembrado; la semilla brota «de suyo» — por poder propio — hasta la siega. El crecimiento del reino es obra de Dios, no del músculo del sembrador.",
  },
  {
    id: "q-mc4-07", tipo: "qa", origen: "Marcos 4",
    front: "¿Quién dijo esto y a quién?: «Maestro, ¿no tienes cuidado que perecemos?»",
    back: "Los discípulos a Jesús, al despertarlo en plena tormenta (4:38). Él dormía sobre un cabezal en la popa; el reclamo lleva un filo de acusación: el miedo les hizo dudar de que a Jesús le importaran.",
  },
  {
    id: "q-mc4-08", tipo: "qa", origen: "Marcos 4",
    front: "¿Qué conexión hay entre la orden «Calla, enmudece» (4:39) y el exorcismo de 1:25?",
    back: "«Enmudece» traduce el mismo verbo griego — \"ponerse bozal\" — con que Jesús calló al demonio en la sinagoga, y en ambas escenas Marcos dice que «reprendió». La misma palabra con la misma autoridad somete a los demonios y al mar.",
  },
  {
    id: "q-mc4-09", tipo: "qa", origen: "Marcos 4",
    front: "¿Por qué los discípulos «temieron con gran temor» después de que cesó la tormenta (4:41)?",
    back: "La calma les reveló algo más grande que la tormenta: alguien a quien «aun el viento y el mar le obedecen» — y en el AT solo Dios manda al mar (Sal 107:28-29; 89:9). El miedo a morir se volvió asombro ante quién viajaba en su barca.",
  },
  {
    id: "q-mc4-10", tipo: "qa", origen: "Marcos 4",
    front: "Ordena: (a) explica la parábola a los de adentro; (b) calma la tempestad; (c) enseña el sembrador desde la barca; (d) el grano de mostaza; (e) «Pasemos al otro lado».",
    back: "c → a → d → e → b. El sembrador desde la barca (4:1-9), la explicación a solas (4:10-20), la mostaza (4:30-32), la orden de cruzar al caer la noche (4:35) y la tempestad calmada (4:37-41).",
  },
];

export function ejercicio(id: string) {
  return EJERCICIOS.find((e) => e.id === id);
}

export function clozeTexto(texto: string, ocultas: string[]): string {
  let out = texto;
  for (const palabra of ocultas) {
    out = out.replace(new RegExp(`\\b${palabra}\\b`, "i"), "＿".repeat(Math.max(4, palabra.length)));
  }
  return out;
}
