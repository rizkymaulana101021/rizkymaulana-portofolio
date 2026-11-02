import { useRef, useState, type FormEvent, type ReactNode } from 'react'
import { CheckCircle2, Send } from 'lucide-react'

const topics = [
  { value: 'it-support', label: 'IT support' },
  { value: 'website', label: 'A website' },
  { value: 'other', label: 'Something else' },
] as const

function Field({
  n,
  id,
  label,
  children,
}: {
  n: string
  id: string
  label: string
  children: ReactNode
}) {
  return (
    <div className="grid gap-1 sm:grid-cols-[3rem_1fr]">
      <span aria-hidden="true" className="pt-1 font-mono text-xs text-mute">
        {n}
      </span>
      <div>
        <label
          htmlFor={id}
          className="block font-mono text-xs font-bold uppercase tracking-[0.16em]"
        >
          {label}
        </label>
        {children}
      </div>
    </div>
  )
}

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'error' | 'success'
  >('idle')
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || status === 'success') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) =>
      body.append(key, String(value)),
    )
    submitting.current = true
    setStatus('pending')
    try {
      const response = await fetch('/contact.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Message was not accepted')
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  return (
    <div className="border-2 border-ink bg-paper shadow-[10px_10px_0_var(--ink)]">
      <div className="flex items-center justify-between border-b-2 border-ink bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.16em] text-paper">
        <span>New ticket</span>
        <span className="text-signal">Priority: you</span>
      </div>
      {status === 'success' ? (
        <div className="px-6 py-16 text-center">
          <CheckCircle2
            aria-hidden="true"
            className="mx-auto mb-6 size-12 text-ok"
          />
          <h2 className="display text-5xl">Message received</h2>
          <p role="status" className="mx-auto mt-4 mb-8 max-w-sm text-ink-2">
            Thanks for reaching out. Your message was accepted — expect a reply
            within one working day.
          </p>
          <button
            type="button"
            className="contact-button"
            onClick={() => setStatus('idle')}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          action="/contact.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          aria-busy={status === 'pending'}
          onSubmit={submit}
          className="p-6 sm:p-8"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Leave this empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <fieldset
            disabled={status === 'pending'}
            className="min-w-0 space-y-8 disabled:opacity-70"
          >
            <legend className="sr-only">Your message</legend>
            <div className="grid gap-1 sm:grid-cols-[3rem_1fr]">
              <span aria-hidden="true" className="pt-1 font-mono text-xs text-mute">
                00
              </span>
              <div
                role="radiogroup"
                aria-labelledby="topic-label"
              >
                <p
                  id="topic-label"
                  className="font-mono text-xs font-bold uppercase tracking-[0.16em]"
                >
                  What do you need?
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <label key={t.value} className="cursor-pointer">
                      <input
                        type="radio"
                        name="topic"
                        value={t.value}
                        className="peer sr-only"
                      />
                      <span className="inline-block border-2 border-ink px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-ink/10 peer-checked:bg-signal peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal">
                        {t.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <Field n="01" id="name" label="Name">
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                className="contact-input"
                placeholder="Who’s asking?"
              />
            </Field>
            <Field n="02" id="email" label="Email">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className="contact-input"
                placeholder="you@company.com"
              />
            </Field>
            <Field n="03" id="message" label="Message">
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={5}
                className="contact-input resize-y"
                placeholder="What’s broken, what you want built, or what’s on your mind…"
              />
            </Field>
            <div className="flex flex-wrap items-center justify-between gap-4 sm:pl-12">
              <p className="font-mono text-[11px] uppercase tracking-wider text-mute">
                No spam. No newsletter. Just a reply.
              </p>
              <button type="submit" className="contact-button">
                <Send aria-hidden="true" size={16} />
                {status === 'pending' ? 'Sending…' : 'Send message'}
              </button>
            </div>
          </fieldset>
          <p role="status" className="sr-only">
            {status === 'pending' ? 'Sending your message…' : ''}
          </p>
          {status === 'error' && (
            <p
              role="alert"
              className="mt-6 border-2 border-destructive bg-destructive/10 p-4 font-mono text-sm"
            >
              We couldn’t confirm your message. Your details are still here;
              please try again. Local previews don’t process submissions.
            </p>
          )}
        </form>
      )}
    </div>
  )
}
