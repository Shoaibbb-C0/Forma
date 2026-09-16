import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Page } from "../components/Layout";
import { EditorialTitle } from "../components/Editorial";

export default function NotFound() {
  useEffect(() => { document.title = "Page not found — Forma"; }, []);
  return <Page footerLead={false}><section className="missing-room"><span className="section-label">404 / Uncharted space</span><EditorialTitle lines={["That room", "isn’t here."]} /><p>The page you’re looking for may have moved, or the address may be incomplete.</p><div><Link className="folio-link" to="/">Return home <span>→</span></Link><Link className="folio-link" to="/work">Project archive <span>↗</span></Link></div></section></Page>;
}
