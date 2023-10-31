export default function About() {
  return <section className="hero">
    <div className="hero-body">
      <p className="title">
        Meeting room booking Web APP
      </p>
      <p className="subtitle">
        for Blackstone interview
      </p>
      <p>
        <a href="mailto:qihectorzhong@pursuit.org">Send me E-mail.</a>
      </p>
      <p>
        <a href="https://github.com/hector918/meeting-booking">Backend repo on Github.</a>
      </p>
      <p>
        <a href="https://github.com/hector918/meeting-booking">Frontend repo on Github.</a>
      </p>
      <p>by Hector 2023 Fall</p>
      <hr></hr>
      <div className="content">
        <h1>Project Overview</h1>

        <h2>Tech Stack</h2>
        <ul>
          <li>Node.js</li>
          <li>Express</li>
          <li>React</li>
          <li>Postgresql</li>
          <li>Bulma</li>
          <li>Auth0</li>
          <li>Oracle Cloud</li>
          <li>Cloudflare</li>
        </ul>

        <h2>Highlights</h2>
        <ol>
          <li><strong>User Authentication:</strong> Utilize Auth0 for user authorization, allowing users to log in using Google, Apple, Microsoft, and GitHub accounts.</li>
          <li><strong>Security:</strong> All user inputs are validated and filtered, providing a high level of security.</li>
          <li><strong>Logging and Performance Monitoring:</strong> Includes error logging and request logging to files, along with performance timers, making debugging and optimization easier. It can also automatically clean outdated log files.</li>
          <li><strong>Responsive Design:</strong> The user interface can automatically adapt to both mobile and desktop environments.</li>
        </ol>

        <h2>Deployment Guide</h2>
        <ol>
          <li>Register an Auth0 account.</li>
          <li>Deploy <code>/db/schema.txt</code> to a PostgreSQL server.</li>
          <li>Clone the backend repo to the VPS.</li>
          <li>Create a <code>.env</code> file with the following format:
            <pre>
              HTTPS_PORT=
              HTTP_PORT=
              PG_HOST=
              PG_PORT=
              PG_DB=
              PG_USER=
              PG_PASSWORD=
              SINGLE_USER_MODE=false
              AUTH_SECRET=
              AUTH0_BASEURL=
              AUTH0_CLIENTID=
              AUTH0_ISSUERBASEURL=
            </pre>
          </li>
          <li>Update the HTTPS certificate and key under <code>\ssl</code>.</li>
          <li>Run <code>npm i</code>.</li>
          <li>Start the server using <code>npm run server</code> or <code>node server.js</code>.</li>
        </ol>
      </div>
    </div>
  </section>
}