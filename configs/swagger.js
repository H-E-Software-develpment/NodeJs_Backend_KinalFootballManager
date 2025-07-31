import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "KINAL FOOTBALL FIELD MANAGER API",
            version: "1.0.0",
            description:
                "Desarrollar una aplicación web escalable y funcional para la gestión del apartado de canchas en nuestro centro educativo KINAL de forma eficiente y moderna.",
            contact: {
                name: " H.E - Software Development / Anthony Josue Escobar Ponce ",
                email: "anthonyescobarponce@Outlook.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3001/kinalfootballfield/v1",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        "../src/auth/auth.routes.js",
        "../src/user/user.routes.js",
        "../src/field/field.routes.js"
    ],
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };
