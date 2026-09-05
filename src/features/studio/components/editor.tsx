'use client';
import { useState } from 'react';
import { Content, photos } from '@/src/content/seed-content';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/src/components/ui/tabs';
import Choice from '@/src/components/forms/choice';
type Enquiry = {
  id: string;
  name: string;
  email: string;
  service: string;
  location: string;
  budget: string;
  message: string;
  status: string;
  created_at: string;
};
export default function Editor({
  initial,
  inbox,
}: {
  initial: Content[];
  inbox: Enquiry[];
}) {
  const [items, setItems] = useState(initial);
  const [messages, setMessages] = useState(inbox);
  const [current, setCurrent] = useState<Content | null>(null);
  const [feedback, setFeedback] = useState('');
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState('new');
  function create(kind: 'project' | 'article') {
    setFeedback('');
    setCurrent({
      id: crypto.randomUUID(),
      kind,
      slug: '',
      title: '',
      category:
        kind === 'project' ? 'Residential architecture' : 'Spatial thinking',
      summary: '',
      image: photos.courtyard,
      alt: '',
      status: 'draft',
      updated_at: new Date().toISOString(),
      body: (kind === 'project'
        ? [
            'Context',
            'Challenge',
            'Design response',
            'Spatial approach',
            'Intended experience',
          ]
        : ['The idea']
      ).map((heading) => ({ heading, text: '' })),
    });
  }
  function field(key: keyof Content, value: any) {
    setCurrent((c) => (c ? { ...c, [key]: value } : null));
  }
  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!current) return;
    setBusy(true);
    setFeedback('');
    try {
      const res = await fetch('/api/editor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(current),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? 'Could not save.');
      setItems((old) => [current, ...old.filter((c) => c.id !== current.id)]);
      setFeedback(
        current.status === 'published'
          ? 'Published. The page is now available on the site.'
          : 'Draft saved. It is visible only in the editor.',
      );
    } catch (e) {
      setFeedback(e instanceof Error ? e.message : 'Could not save.');
    } finally {
      setBusy(false);
    }
  }
  async function update(id: string, status: string) {
    setBusy(true);
    try {
      const res = await fetch('/api/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (!res.ok) throw new Error();
      setMessages((items) =>
        items.map((x) => (x.id === id ? { ...x, status } : x)),
      );
      setFeedback('Enquiry updated.');
    } catch {
      setFeedback('Unable to update. Please retry.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      {feedback && (
        <p className="feedback" aria-live="polite">
          {feedback}
        </p>
      )}
      {current ? (
        <form onSubmit={save}>
          <div className="editor-toolbar">
            <button
              className="secondary"
              type="button"
              onClick={() => {
                setCurrent(null);
                setFeedback('');
              }}
            >
              ← Back to content
            </button>
            <button disabled={busy} type="submit" className="button">
              {busy
                ? 'Saving…'
                : current.status === 'published'
                  ? 'Save & publish'
                  : 'Save draft'}
            </button>
          </div>
          <p className="form-note">
            Back to content discards unsaved changes. Published projects remain
            labelled as concept studies. Images must be approved Unsplash
            reference photographs.
          </p>
          <div className="form-grid">
            {(['title', 'slug', 'category', 'image', 'alt'] as const).map(
              (key) => (
                <label className="field" key={key}>
                  {
                    {
                      title: 'Title',
                      slug: 'URL slug',
                      category: 'Category',
                      image: 'Image URL (no query parameters)',
                      alt: 'Image description',
                    }[key]
                  }
                  <input
                    value={current[key]}
                    onChange={(e) => field(key, e.target.value)}
                    required
                    maxLength={key === 'image' ? 500 : 250}
                  />
                </label>
              ),
            )}
            <Choice
              name="status"
              label="Publication status"
              values={['draft', 'published']}
              value={current.status}
              onChange={(v) => field('status', v)}
            />
            <label className="field full">
              Summary / SEO description
              <textarea
                value={current.summary}
                onChange={(e) => field('summary', e.target.value)}
                required
                minLength={10}
                maxLength={400}
              />
            </label>
            {current.body.map((section, i) => (
              <div className="full form-grid" key={i}>
                <label className="field">
                  Section {i + 1} heading
                  <input
                    required
                    value={section.heading}
                    onChange={(e) =>
                      field(
                        'body',
                        current.body.map((s, n) =>
                          n === i ? { ...s, heading: e.target.value } : s,
                        ),
                      )
                    }
                  />
                </label>
                <label className="field full">
                  Section text
                  <textarea
                    required
                    minLength={10}
                    maxLength={8000}
                    value={section.text}
                    onChange={(e) =>
                      field(
                        'body',
                        current.body.map((s, n) =>
                          n === i ? { ...s, text: e.target.value } : s,
                        ),
                      )
                    }
                  />
                </label>
                {current.kind === 'article' && current.body.length > 1 && (
                  <button
                    type="button"
                    className="secondary"
                    onClick={() =>
                      field(
                        'body',
                        current.body.filter((_, n) => n !== i),
                      )
                    }
                  >
                    Remove section
                  </button>
                )}
              </div>
            ))}
            {current.body.length < 15 && (
              <button
                className="secondary"
                type="button"
                onClick={() =>
                  field('body', [...current.body, { heading: '', text: '' }])
                }
              >
                Add section +
              </button>
            )}
          </div>
        </form>
      ) : (
        <Tabs defaultValue="content">
          <TabsList variant="line" className="mb-8">
            <TabsTrigger value="content">Projects & journal</TabsTrigger>
            <TabsTrigger value="inbox">
              Enquiry inbox ({messages.filter((m) => m.status === 'new').length}
              )
            </TabsTrigger>
          </TabsList>
          <TabsContent value="content">
            <div className="editor-toolbar">
              <button className="button" onClick={() => create('project')}>
                New project +
              </button>
              <button className="secondary" onClick={() => create('article')}>
                New article +
              </button>
            </div>
            <div className="editor-list">
              {items.map((item) => (
                <div className="editor-row" key={item.id}>
                  <div>
                    <p className="micro">
                      {item.kind} / {item.status}
                    </p>
                    <h2>{item.title}</h2>
                  </div>
                  <div className="editor-actions">
                    {item.status === 'published' && (
                      <a
                        className="text-link"
                        href={`/${item.kind === 'project' ? 'work' : 'journal'}/${item.slug}`}
                      >
                        View ↗
                      </a>
                    )}
                    <button
                      className="secondary"
                      onClick={() => {
                        setCurrent(structuredClone(item));
                        setFeedback('');
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="inbox">
            <div className="editor-toolbar">
              <Choice
                name="inbox-status"
                label="Show enquiries"
                values={['new', 'read', 'archived']}
                value={filter}
                onChange={setFilter}
              />
            </div>
            {messages.filter((x) => x.status === filter).length === 0 && (
              <p className="feedback">
                No {filter} enquiries. New project conversations will appear
                here.
              </p>
            )}
            {messages
              .filter((x) => x.status === filter)
              .map((m) => (
                <article className="inbox-card" key={m.id}>
                  <p className="micro">
                    {m.created_at.slice(0, 10)} / {m.service} / {m.status}
                  </p>
                  <h2>{m.name}</h2>
                  <a href={`mailto:${m.email}`} className="text-link">
                    {m.email} ↗
                  </a>
                  <p>
                    {m.location} · {m.budget}
                  </p>
                  <p>{m.message}</p>
                  <div className="editor-actions">
                    {['new', 'read', 'archived']
                      .filter((s) => s !== m.status)
                      .map((s) => (
                        <button
                          disabled={busy}
                          className="secondary"
                          onClick={() => update(m.id, s)}
                          key={s}
                        >
                          Mark {s}
                        </button>
                      ))}
                  </div>
                </article>
              ))}
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
