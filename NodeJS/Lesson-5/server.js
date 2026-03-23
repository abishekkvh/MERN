/*
===========================================================
HTTP SERVER (req & res COMPLETE GUIDE)
===========================================================

Covers:
- URL, Method, Headers
- Query params
- Route handling
- Sending HTML, JSON
- Status codes
- Handling POST body (streams)
- Basic routing system
- Content-Type handling
- Favicon ignore
===========================================================
*/

const http = require("http");
const url = require("url");

// Create server
const server = http.createServer((req, res) => {

    /* =========================================
       1. BASIC REQUEST INFO
    ========================================= */
    console.log("URL:", req.url);        // /, /about, /api
    console.log("Method:", req.method);  // GET, POST
    console.log("Headers:", req.headers); // Browser info

    /* =========================================
       2. IGNORE FAVICON REQUEST
    ========================================= */
    if (req.url === "/favicon.ico") {
        res.end();
        return;
    }

    /* =========================================
       3. PARSE URL & QUERY PARAMETERS
    ========================================= */
    const parsedUrl = url.parse(req.url, true);

    const path = parsedUrl.pathname;   // /about
    const query = parsedUrl.query;     // { name: "abishek" }

    console.log("Path:", path);
    console.log("Query:", query);

    /* =========================================
       4. ROUTING (BASIC)
    ========================================= */

    // HOME ROUTE
    if (path === "/" && req.method === "GET") 
    {
        res.statusCode = 200; // success
        res.setHeader("Content-Type", "text/html");

        res.end(`
            <h1>Home Page</h1>
            <p>Welcome to Node Server</p>
        `);
    }

    // ABOUT ROUTE
    else if (path === "/about" && req.method === "GET") 
    {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");

        res.end("<h1>About Page</h1>");
    }

    // API ROUTE (JSON RESPONSE)
    else if (path === "/api" && req.method === "GET") 
    {
        res.statusCode = 301;
        res.setHeader('Location', '/');
        res.end();
        xq
    }

    /* =========================================
       5. QUERY PARAM EXAMPLE
       Example: /user?name=abi
    ========================================= */
    else if (path === "/user" && req.method === "GET") 
    {
        const name = query.name || "Guest";

        res.setHeader("Content-Type", "text/html");
        res.end(`<h1>Hello ${name}</h1>`);
    }

    /* =========================================
       6. HANDLE POST REQUEST (BODY DATA)
    ========================================= */
    else if (path === "/submit" && req.method === "POST") 
    {

        let body = "";

        // Receive data chunks
        req.on("data", chunk => {
            body += chunk.toString();
        });

        // When all data received
        req.on("end", () => {
            console.log("Body received:", body);

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({
                message: "Data received successfully",
                data: body
            }));
        });
    }

    /* =========================================
       7. 404 NOT FOUND
    ========================================= */
    else 
    {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");

        res.end("<h1>404 - Page Not Found</h1>");
    }
});

/* =========================================
   8. START SERVER
========================================= */
server.listen(3000, "localhost", () => {
    console.log("Server running at http://localhost:3000");
});