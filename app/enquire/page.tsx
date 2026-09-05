import EnquiryForm from '@/frontend/features/enquiries/components/enquiry-form';
export const metadata = {
  title: 'Enquire',
  description: 'Tell Forma about your architecture or interior design project.',
  alternates: { canonical: '/enquire' },
};
export default function Enquire() {
  return (
    <main id="main" className="wrap">
      <header className="page-head">
        <p className="eyebrow">Start a conversation</p>
        <h1>
          Every space starts
          <br />
          with a possibility.
        </h1>
      </header>
      <div className="form-layout">
        <aside>
          <h2>
            Tell us what
            <br />
            you have in mind.
          </h2>
          <p>
            You don’t need a finished brief. A location, an ambition and a sense
            of what needs to change are a good place to start.
          </p>
          <p className="form-note">
            What happens next
            <br />
            The studio reviews the scope and follows up using the email you
            provide. Fees, availability and project responsibilities are
            discussed before any commitment.
          </p>
        </aside>
        <EnquiryForm />
      </div>
    </main>
  );
}
