# Data model

Content: id, kind (project/article), slug (unique), title, category, summary, image, alt, body JSON, status draft/published, updated_at. Story sections use heading/text pairs. Enquiries: id, name, email, service, location, budget, message, status, created_at. Rate limits: hashed key, count, expiry. Editor allowlist is server environment configuration; no self-registration. Public reads only published content; only allowed identities can edit or read enquiries. Validate lengths, enums, slug and HTTPS approved image host; bind all SQL values.
