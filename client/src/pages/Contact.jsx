import React, { useEffect, useRef, useState } from "react";
import { Page } from "../components/Layout";
import { EditorialTitle, useEditorialMotion } from "../components/Editorial";

export default function Contact() {
  const ref = useEditorialMotion("contact");
  const request = useRef(null);
  const [status, setStatus] = useState("");
  const [state, setState] = useState("idle");
  useEffect(() => () => request.current?.abort(), []);

  async function submit(event) {
    event.preventDefault();
    if (request.current) return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    if (form.get("website")) return;
    const payload = Object.fromEntries([...form].map(([key, value]) => [key, String(value).trim()]));
    if (!payload.name || !payload.message) { setState("error"); setStatus("Please include your name and a short project message."); return; }
    const controller = new AbortController();
    request.current = controller;
    const timeout = setTimeout(() => controller.abort(), 15000);
    setState("sending");
    setStatus("Sending your note…");
    try {
      const base = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000/api" : "/api");
      const response = await fetch(`${base.replace(/\/$/, "")}/enquiries`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: controller.signal });
      if (!response.ok) throw new Error(response.status === 429 ? "Please wait before trying again, or email us directly." : "We could not send your note. Please try again or email hello@forma.studio.");
      formElement.reset();
      setState("success");
      setStatus("Thank you. Your note has been received.");
    } catch (error) {
      if (controller.signal.aborted && !formElement.isConnected) return;
      setState("error");
      setStatus(error.name === "AbortError" ? "The request took too long. Your message is still here; try again or email us." : error.message.includes("Please") ? error.message : "We could not connect. Your message is still here; please email hello@forma.studio.");
    } finally {
      clearTimeout(timeout);
      if (request.current === controller) request.current = null;
    }
  }

  return <Page footerLead={false}><div ref={ref} className="contact-editorial-page">
    <section className="contact-editorial-opening"><span className="section-label">Contact</span><EditorialTitle lines={["Every place", "starts with", <em>a conversation.</em>]} /><p>Tell us about your project.</p></section>
    <section className="contact-editorial-body" aria-label="Contact Forma"><aside className="contact-coordinates"><div><span className="section-label">Email</span><a href="mailto:hello@forma.studio">hello@forma.studio ↗</a></div><div><span className="section-label">Studio</span><p>Mumbai, India<br />Visits by appointment</p></div></aside>
      <form className="architectural-form" onSubmit={submit} aria-busy={state === "sending"}>
        <label htmlFor="enquiry-name">Name<input id="enquiry-name" name="name" required maxLength={120} autoComplete="name" placeholder="Your name" /></label>
        <label htmlFor="enquiry-email">Email<input id="enquiry-email" type="email" name="email" required maxLength={254} autoComplete="email" placeholder="name@company.com" /></label>
        <label htmlFor="enquiry-interest">Project type<select id="enquiry-interest" name="interest"><option>New residential project</option><option>Commercial / hospitality project</option><option>Consultation booking</option><option>Press / collaboration</option></select></label>
        <label htmlFor="enquiry-message">Message<textarea id="enquiry-message" name="message" required maxLength={5000} rows={5} placeholder="Location, ambition, timing and scale." /></label>
        <input className="honeypot" aria-hidden="true" name="website" tabIndex={-1} autoComplete="off" />
        <button className="enquiry-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending enquiry…" : "Send enquiry"}<span aria-hidden="true">↗</span></button>
        <p className={`enquiry-feedback enquiry-feedback--${state}`} role="status" aria-live="polite" aria-atomic="true">{status}</p>
      </form>
    </section>
  </div></Page>;
}
