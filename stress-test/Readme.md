# Stress Test for the multi-tier application

1. Instanciate as many tiers as you would like.
    * `npm install` -- It will install all dependencies
    * `npm start` -- It will start the application in the port specified in the `.env` file.
    * If running multiple instances in the same host, change the `.env` file, or run as `nodejs index.js PORT`.
2. When generating load to the application it expects a POST request to one of the available routes. It also expects an optional json input that will indicate which tier it should go to next.
    * Example:
      ```json
        {
          "nextTier": "http://localhost:3000/cpu"
        }
      ```

Using the tool Artillery:

1. Install it using npm:
    * `npm install -g artillery`
2. Run the [example](example.yml) script:
    * `artillery run example.yml`
