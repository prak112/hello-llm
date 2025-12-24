# Hello, LLM
This is a 5-day crash course project with dedicated 1-2 hours for each day whenever I could find time between my busy schedule.

> To find more information about 5-day crash course newsletter, check out Brian Jenney's newsletter or register directly at https://www.parsity.io/noob

## Day 0
- Prep for crash course by:
  - Scheduling time during the week or whenever you can
  - VS code, if you are new to it

## Day 1 - HTML
- HTML syntax is quite straightforward, so nothing much to add here. 

## Day 2 - CSS
### Topics To Know:
- `id` vs `class`
  - `id`: one id for one element at a time.
  - `class`: one class can be used across multiple elements.
- margin vs padding
  - margin adds space **outside**
  - padding adds space **inside**
- cascading
  - rendering precedence to bottom most element, if element present twice.
- flexbox
  - super useful to accomodate site content to changing screen resolutions.


### Syntax
- Syntax: 
  ```css
  selector { 
    property: value; 
  }
  ```
- `selector`: what you're styling (body, h1, .class, #id)
- `property`: what you change (color, font-family, margin, etc.)
- `value`: how you change it (cornflowerblue, 20px, etc.)

**No need to memorize every property. Learn patterns. Google + MDN = your best friend**

### Go To Resources
- [W3Schools - CSS Center Align](https://www.w3schools.com/csS/css_align.asp)


## Day 3 - JavaScript
- Challenges completed:
  - Stack user inputted text
  - Add like and dislike buttons to act as counters
  - Toggle background color
  - Toggle between Show/Hide content

- Learn by patterns. This is the pattern I followed:
  - Plan HTML element
  - Build it (Wait for the Styles!)
  - Get the element
  - Implement JavaScript functionality (`addEventListener`)
  - If successful, then implement Styles.

- Most common errors or issues I faced:
  - Retrieving NaN values when trying to toggle between modes
  - Forgetting syntax in all languages

- Common troubleshooting that helped:
  - `console.log()` statements
  - Breaking down the issue into multiple micro-issues
  - Web search the micro-issue

- Most successful implementation:
  - Toggle background colors (quite simple) 

- Everything else, more or less I had to look up for the syntax while I laid down the pseudo code for the challenge


## Day 4 - LLM
### Lesson 1 - Convert cURL to JS API call
- Using Gemini AI Studio to get free tier Gemini 2.0 Flash LLM access is the first step.
- Next step is testing the cURL API call in the terminal
- Finally, we figure how to convert the cURL API call to JS Fetch API call, by following the below steps:
  | REST (`curl`) | `fetch` API |
  | ------------  | ----------- |
  | `-X` | `method`   |
  | `-H` | `headers`  |
  | `-d` | `body`     |
  | | |  
  
  1. Always match the HTTP method (`GET`, `POST`, `PUT`, `DELETE`) from curl command.
  2. Convert `-d` JSON strings into JavaScript objects and use `JSON.stringify()` in fetch.
  3. For file uploads (`-F`), use `FormData`.
  4. Use https://curlconverter.com to understand the process and identify the equivalent parameters of `curl`.


### Lesson 2 - Environment Variables
- API Keys are sensitive information.
- Hence, one would prefer saving it in an `.env` file.
- However, static websites expose the complete source code publicly, therefore the API keys do not remain as private information anymore.
- Also they cannot be accessed as an environmental process variable as done in a backend server.
- Based on the above reasons, an alternative measure to implement Gemini API functionality within the static website is required.
- The Answer:
  - Use a *Serverless Backend* or *Proxy Server* to keep API keys hidden from exposing to the client-side.


### Lesson 3 - `window.fetch`
- Apparently there is a simpler way than building an `async` function to build API call and process its response using `window.fetch`
- Similar way, but all of the async function call could be done inside the EventListener function alone.
- Good to know!


### Lesson 4 - Finding the right LLM
- Gemini Flash 2.0 Free Tier requires either billing setup or it just has very low rate limit (i.e., < 1) **LOL!**
- cURL API call was a failure with the same error as the web page - Too Many Requests error (429).
- Gemini API Documentation sucks real bad!!
- Hmm...queerer and queerer!
- Finally, [OpenRouter](https://openrouter.ai/) helped find the most ideal role-playing LLM - *DeepSeek R1T2 Chimera (Free)*
  - Works like a charm!


### Lesson 5 - Finding Serverless Backend framework for Local development
- After extensive distractions with down-the-rabbit-hole research, identified the following options.
1.  AWS Tutorial (too expensive example, remote, non-essential services, like Bedrock,Amplify, etc.)
    - Very thorough and clear steps.
    - Too many non-essential and expensive services w.r.t. my use-case.

2. LocalStack Tutorial (complicated example, local, guided, all updated info. Blog approx 6 months old.)
    - Complex and couple of prerequisites
    - Probably useful for an advanced level project, but too much overhead for a standard serverless backend.

3. Serverless Tutorial (simple example, local, guided, BUT outdated aws-sdk version. Blog approx 10 years old.)
    - Guided steps were pretty clear.
    - `aws-sdk` is outdated, need to use updated version and update `package.json`
    
    *Ding! Ding! Ding! aaand we got a winner!* 
    - Netlify blogs on Serverless JAM Stack [Part 1](https://www.netlify.com/blog/2016/09/15/serverless-jam-a-serverless-framework-tutorial/) and [Part 2](https://www.netlify.com/blog/2016/10/13/serverless-jam-a-serverless-framework-tutorial-part-2/) helps in getting setup.
    - [Getting Started](https://www.serverless.com/framework/docs/getting-started) docs helped in clarifying the "*✖ No configuration file found*" error, where you just have to run `serverless` in command line to setup the CLI config file and register to the service.
    - After that it is smooth ride to setup the "hello world!" project and gives a clarity on what goes where!


### Lesson 6 - Serverless Backend setup and deployment
- After building the "hello world" version of Servereless project in development mode and deployment in AWS, the following are the steps I will be taking to reorganise this project:
1. Store API Keys in `.env` in Serverless Backend which will be a seperate repository
2. Serverless project structure is clear.
```bash
serverless-project
  |
  |-- handler.js  #functions to handle LLM API request and response
  |-- serverless.yml #configuration of functions, related triggers.
  |-- .serverless #directory with essential AWS services config files
        |-- serverless-state.json
        |-- meta.json
        |-- cloudformation-template-update-stack.json
```
3. Based on the file structure, the current project restructuring involves:
    - move `getLlmResponse` function to `handler.js`
    - store API keys in `.env`
    - add `.gitignore`
    - deploy changes
    - use generated AWS endpoint to use for `fetch` API call on static website to request and recieve LLM response

### Lesson 7 - Troubleshoot communication between Server and Client
- CORS policy errors have occurred
- Corrected by defining the request origins or referrer URLs in the headers of `handler.js`
- However, the error persists on Client-side and does not render Server response.
- Server-side `console.log` statements illustrate OpenRouter API calls are handled as expected.
- TODO-Debug client-side issues.

-----
-----  

## TO DO:
- [X] Build local serverless backend to host API secret and handler functions
  - [ ] Debug Client-side issue (textarea, CORS policy, LLM timeout, )

-----
-----