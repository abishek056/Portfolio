import React, { useState } from 'react'
import { PERSONAL_INFO } from '../../data/portfolio'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

export const Contact: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  return (
    <section id="contact" className="py-20 border-t border-neutral-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            Get In Touch
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Let's Collaborate
          </p>
          <p className="text-sm sm:text-base text-neutral-400">
            Have a project in mind, a question, or an opportunity? Reach out directly or drop a message below.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Direct channels */}
          <div className="lg:col-span-5 space-y-4">
            <Card className="p-5 space-y-2">
              <span className="text-xs font-mono text-indigo-400">GitHub</span>
              <p className="text-sm font-semibold text-white">Check my repositories</p>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-300 hover:text-indigo-200 break-all inline-block pt-1"
              >
                {PERSONAL_INFO.github} &rarr;
              </a>
            </Card>

            <Card className="p-5 space-y-2">
              <span className="text-xs font-mono text-indigo-400">Email</span>
              <p className="text-sm font-semibold text-white">Send direct email</p>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="text-xs text-indigo-300 hover:text-indigo-200 break-all inline-block pt-1"
              >
                {PERSONAL_INFO.email} &rarr;
              </a>
            </Card>

            <Card className="p-5 space-y-2">
              <span className="text-xs font-mono text-indigo-400">LinkedIn</span>
              <p className="text-sm font-semibold text-white">Professional Network</p>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-300 hover:text-indigo-200 break-all inline-block pt-1"
              >
                {PERSONAL_INFO.linkedin} &rarr;
              </a>
            </Card>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <Card className="p-8">
              {formSubmitted ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-white">Message Sent!</h4>
                  <p className="text-sm text-neutral-400">
                    Thank you for reaching out, {PERSONAL_INFO.name} will get back to you shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFormSubmitted(false)}
                    className="mt-4"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Jane Doe"
                      className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-neutral-300 mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full px-4 py-2.5 rounded-lg bg-neutral-950 border border-neutral-800 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                    />
                  </div>

                  <Button type="submit" variant="primary" className="w-full py-3">
                    Send Message
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
