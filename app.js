const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const BaileysProvider = require("@bot-whatsapp/provider/baileys");
const MockAdapter = require("@bot-whatsapp/database/mock");

const flowEmpleadaDomestica = addKeyword(["D", "d"], { sensitive: true })
    .addAnswer([
        "▫ DNI frente y dorso. ",
        "▫ Debemos comprobar que estés inscrito en el monotributo. ",
        "▫ Clave fiscal  ❕*(Solo se dará uso a la clave fiscal con fines de la afiliación, una vez cargada en el sistema se te notificará en el momento para que puedas cambiarla).*",
    ])
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *ATRAS* - Volver al atras.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("a")) {
                await fallBack();
            } else {
                await gotoFlow(flowComoMeAfilio);
            }
        }
    );

const flowMonotributoSocial = addKeyword(["C", "c"], { sensitive: true })
    .addAnswer([
        "▫ DNI frente y dorso. ",
        "▫ Debemos comprobar que estés inscrito en el monotributo. ",
        "▫ Clave fiscal  ❕*(Solo se dará uso a la clave fiscal con fines de la afiliación, una vez cargada en el sistema se te notificará en el momento para que puedas cambiarla).*",
    ])
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *ATRAS* - Volver al atras.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("a")) {
                await fallBack();
            } else {
                await gotoFlow(flowComoMeAfilio);
            }
        }
    );

const flowRelacionDeDependencia = addKeyword(["B", "b"], { sensitive: true })
    .addAnswer([
        "▫ Recibo quincenal o mensual.",
        "▫ DNI frente y dorso. ",
        "▫ Si tenés hijos, partida de nacimiento.",
        "▫ Si estás casado/a, acta matrimonial o concubinato en caso de que tu pareja no trabaje en blanco y no cobre algún plan social.",
        "▫ Partida de nacimiento de hijos/as.",
        "▫ Clave fiscal  ❕*(Solo se dará uso a la clave fiscal con fines de la afiliación, una vez cargada en el sistema se te notificará en el momento para que puedas cambiarla).*",
    ])
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *ATRAS* - Volver al atras.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("a")) {
                await fallBack();
            } else {
                await gotoFlow(flowComoMeAfilio);
            }
        }
    );

const flowMonotributoDeCategoria = addKeyword(["A", "a"], { sensitive: true })
    .addAnswer([
        "▫ Formulario 152 y 184.",
        "▫ DNI frente y dorso. ",
        "▫ Debes tener si o si incluídos a tu grupo familiar como adherente. En caso de no tenerlo, te sugerimos que lo hagas o te ofrecemos hacerlo nosotros pidiéndote tu clave fiscal.",
        "▫ Concubinato o acta matrimonial.",
        "▫ Partida de nacimiento de hijos/as.",
        "▫ Clave fiscal  ❕*(Solo se dará uso a la clave fiscal con fines de la afiliación, una vez cargada en el sistema se te notificará en el momento para que puedas cambiarla).*",
    ])
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *ATRAS* - Volver al atras.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("a")) {
                await fallBack();
            } else {
                await gotoFlow(flowComoMeAfilio);
            }
        }
    );

// Mensaje que se Desprende de Mi cobertura(D) B
const flowComoMeAfilio = addKeyword(["A", "a"], { sensitive: true })
    .addAnswer([
        "🧑🏻‍💼 Para iniciar tu proceso de afiliación, te vamos a pedir cierta documentación, dependiendo de tu situación laboral. Por favor seleccioná entre las  siguientes opciones para obtener más información:",
    ])
    .addAnswer([
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_",
        "_¡En caso de confundirte empeza de nuevo con un *Hola*!_",
    ])
    .addAnswer(
        [
            "✅ *A* - MONOTRIBUTO CON CATEGORÍA",
            "✅ *B* - RELACIÓN DE DEPENDENCIA",
            "✅ *C* - MONOTRIBUTO SOCIAL",
            "✅ *D* - EMPLEADA DOMÉSTICA",
        ],
        null,
        null,
        [
            flowMonotributoDeCategoria,
            flowRelacionDeDependencia,
            flowMonotributoSocial,
            flowEmpleadaDomestica,
        ]
    );

const flowQuieroHacerUnaConsulta = addKeyword(["B", "b"], { sensitive: true })
    .addAnswer(
        "❔ ¿Tenés dudas sobre el proceso de afiliación? ¿Te interesa conocer más sobre los servicios que ofrecemos? *Podes enviarnos tu consulta* en nuestra página web, o haciendo click en este link https://www.asessaludsrl.com/Contactanos, y te responderemos a la brevedad. "
    )
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *MENÚ* - Volver al menú.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("m")) {
                await fallBack();
            } else {
                await gotoFlow(flowPrincipal);
            }
        }
    );

const flowQuieroAfiliarme = addKeyword(["B", "b"], {
    sensitive: true,
})
    .addAnswer([
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_",
        "_¡En caso de confundirte empeza de nuevo con un *Hola*!_",
    ])
    .addAnswer(
        ["✅ *A* - ¿Como me Afilio?", "✅ *B* - Quiero Hacer Una Consulta"],
        null,
        null,
        [flowComoMeAfilio, flowQuieroHacerUnaConsulta]
    );

const flowFechaDeAlta = addKeyword(["B", "b"], { sensitive: true })
    .addAnswer(
        "📆 Tomando tu *fecha de afiliación*, podes calcular un aproximado de tu *fecha de alta* con la siguiente tabla:"
    )
    .addAnswer([
        "▫️ *Monotributo con categoría - Empleada doméstica - Monotributo social:* Tres meses desde tu afiliación.",
        "▫️ *Régimen - Relación de dependencia:* Dos meses desde tu afiliación.",
        "❔Si tenés una consulta, podés contactarnos en nuestros *canales de atención.*",
    ])
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *MENÚ* - Volver al menú.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("m")) {
                await fallBack();
            } else {
                await gotoFlow(flowPrincipal);
            }
        }
    );

// Mensaje que se Desprende de Soy Afilado(esta dentro de Mi Cobertura) A
const flowMisCredenciales = addKeyword(["A", "a"], { sensitive: true })
    .addAnswer([
        "🪪 Para obtener tu credencial, podes escribir a la casilla 📧 ospida@ospida.org.ar",
        "O comunicarte al número *(011) 43822051/43819521.*",
        "Si querés contar con tu *credencial física*, te podes acercar a la oficina de Ospida, ubicada en 📍 San José 157, C1076AAC, CABA.",
    ])
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *MENÚ* - Volver al menú.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("m")) {
                await fallBack();
            } else {
                await gotoFlow(flowPrincipal);
            }
        }
    );

// Mensaje que se Desprende de Mi cobertura(D) A
const flowSoyAfiliado = addKeyword(["A", "a"], {
    sensitive: true,
})
    .addAnswer([
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_",
        "_¡En caso de confundirte empeza de nuevo con un *Hola*!_",
    ])
    .addAnswer(
        ["✅ *A* - Mis Credenciales", "✅ *B* - Fecha de alta"],
        null,
        null,
        [flowMisCredenciales, flowFechaDeAlta]
    );

//Mensaje que se desprende del PRINCIPAL D
const flowMiCobertura = addKeyword(["D", "d"], { sensitive: true })
    .addAnswer([
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_",
        "_¡En caso de confundirte empeza de nuevo con un *Hola*!_",
    ])
    .addAnswer(
        ["✅ *A* - Soy Afiliado", "✅ *B* - Quiero Afiliarme"],
        null,
        null,
        [flowSoyAfiliado, flowQuieroAfiliarme]
    );

//Mensaje que se desprende del PRINCIPAL C
const flowPmo = addKeyword(["C", "c"], { sensitive: true })
    .addAnswer(
        "✅ El *Programa Médico Obligatorio (PMO)* establece las _prestaciones básicas esenciales_ que deben garantizar las Obras Sociales."
    )
    .addAnswer([
        "❗*Algunas de las prestaciones básicas son*:",
        "🔹 Kinesiología ",
        "🔹 Oftalmología ",
        "🔹 Clínica médica ",
        "🔹 Odontología ",
    ])
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *MENÚ* - Volver al menú.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("m")) {
                await fallBack();
            } else {
                await gotoFlow(flowPrincipal);
            }
        }
    );

//Mensaje que se desprende del PRINCIPAL B
const flowContactanos = addKeyword(["B", "b"], { sensitive: true })
    .addAnswer([
        "📍 *Sede Buenos Aires:* Rivadavia 1367, San Nicolás C1033AAD, Lun. a Vie. de 9:00hs a 16:00hs.",
        "🙌🏼 _Estamos a tu disposición_ . Podes ponerte en contacto con nosotros por los siguientes *canales de atención:* ",
        "📞 *Secretaría sede Buenos Aires:* (+54 9 11) 2034-5484",
        "💬 *Whatsapp oficial:* (+54 9 11) 3045-2581 ",
        "📨 *Correo electrónico:* consultas@asessaludsrl.com",
    ])
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *MENÚ* - Volver al menú.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("m")) {
                await fallBack();
            } else {
                await gotoFlow(flowPrincipal);
            }
        }
    );

//Mensaje que se desprende del PRINCIPAL A
const flowConocenos = addKeyword(["A", "a"])
    .addAnswer(
        "✅ Somos *Asessalud*, una empresa que hace 16 años está en este rubro. Junto con un gran equipo de profesionales _comercializamos y brindamos asesoría_ para que puedas elegir _el mejor plan de salud_ tanto para vos como para tu grupo familiar."
    )
    .addAnswer([
        "❗Podés encontrarnos en:",
        "🔹 *Instagram*  https://www.instagram.com/asessaludsrl/",
        "🔹 *Twitter*   https://twitter.com/AsesSaludSRL",
        "🔹 *Facebook*   https://www.fb.com/profile.php?id=100094507124115",
        "🔹 *Página Web*  https://www.asessaludsrl.com/",
    ])
    .addAnswer(
        "_¡A continuación escribir específicamente las letras o palabras que se le indica!_"
    )
    .addAnswer(
        ["✅ *MENÚ* - Volver al menú.", "✅ *F* - Finalizar Chat!"],
        { capture: true },
        async (ctx, { fallBack, gotoFlow, endFlow }) => {
            let bodyEnMinusculas = ctx.body.toLowerCase();

            if (bodyEnMinusculas.includes("f")) {
                return endFlow({ body: "¡Aquí finalizó el chat😄!" });
            }
            if (!bodyEnMinusculas.includes("m")) {
                await fallBack();
            } else {
                await gotoFlow(flowPrincipal);
            }
        }
    );

// Mensaje PRINCIPAL
const flowPrincipal = addKeyword(
    ["Hola", "ola", "hola", "Menu", "MENU", "menu", "MENÚ", "menú", "Menú"],
    { sensitive: true }
)
    .addAnswer(
        "✨ Te comunicaste con el Whatsapp de *Asessalud* , _¿en qué podemos ayudarte hoy?_ "
    )
    .addAnswer(
        [
            "✅ *A* - _Conócenos_",
            "✅ *B* - _Contactanos_",
            "✅ *C* - _PMO_",
            "✅ *D* - _Mi cobertura_",
            "",
            "_¡A continuación escribir específicamente las letras o palabras que se le indica!_",
            "_¡En caso de confundirte empeza de nuevo con un *Hola*!_",
        ],
        null,
        null,
        [flowConocenos, flowContactanos, flowPmo, flowMiCobertura]
    );

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
