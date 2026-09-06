import React from 'react';
import {Link} from 'react-router-dom';
export default function ContactCta(){return <section className="contact-cta"><div><p className="eyebrow">Begin somewhere</p><p className="contact-intro">A site, a room, a half-formed thought. Good projects often begin before the brief is clear.</p></div><h2>Bring us<br/>your <em>idea.</em></h2><Link className="button" to="/contact">Start a conversation <span>↗</span></Link></section>}
