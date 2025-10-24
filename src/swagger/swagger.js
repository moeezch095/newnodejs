// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");

// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Doctor & User Appointment API",
//       version: "1.0.0",
//       description: "API documentation for Doctor and User Appointment App",
//     },
//     servers: [
//       { url: "https://docanduser.vercel.app" }, // ✅ your deployed URL
//       { url: "http://192.168.1.34:8080" }, // ✅ local URL (for testing)
//     ],
//     components: {
//       securitySchemes: {
//         bearerAuth: {
//           type: "http",
//           scheme: "bearer",
//           bearerFormat: "JWT",
//         },
//       },
//     },
//     security: [{ bearerAuth: [] }],
//   },
//   apis: ["./src/routes/*.js"],
// };

// const swaggerSpec = swaggerJsdoc(options);

// function swaggerDocs(app) {
//   app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//   console.log("✅ Swagger docs available at /api-docs");
// }
// moeez 
// ksdnjnf
// module.exports = swaggerDocs;
