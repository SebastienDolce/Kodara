// app/page.tsx
import KodaraServer from './components/KodaraServer';

export default function Page() {
  return <><KodaraServer />
  <form name="contact" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
    <input type="text" name="name" />
    <input type="email" name="email" />
    <select name="project_type">
      <option value="General Inquiry">General Inquiry</option>
      <option value="Project Quote">Project Quote</option>
      <option value="Collaboration">Collaboration</option>
      <option value="Feedback">Feedback</option>
    </select>
    <textarea name="message"></textarea>
  </form></>
;
}
