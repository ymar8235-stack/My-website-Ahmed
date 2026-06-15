'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2, Loader2, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import type { ContactFormData } from '@/types'

const schema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  company: z.string().optional(),
  country: z.string().optional(),
  industry: z.string().optional(),
  service_requested: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  project_description: z.string().min(20, 'Please describe your project in at least 20 characters'),
  consent: z.boolean().refine((val) => val, 'You must agree to be contacted'),
})

const services = [
  'Logo Design', 'Brand Identity Design', 'Social Media Design',
  'Website Design & Development', 'Print Design', 'Packaging Design',
  'Sticker Design', 'Content Writing', 'Marketing Consultation', 'Other',
]

const budgets = [
  'Under 1,000 EGP', '1,000–5,000 EGP', '5,000–15,000 EGP',
  '15,000–30,000 EGP', '30,000+ EGP', 'Not sure yet',
]

const timelines = [
  'As soon as possible', '1–2 weeks', '1 month', '2–3 months', 'Flexible',
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to submit')
      setSubmitted(true)
      reset()
    } catch {
      toast.error('Something went wrong. Please try again or use WhatsApp.')
    }
  }

  const inputClass = (hasError?: boolean) =>
    `w-full px-4 py-3 text-sm bg-[var(--bg-card)] border rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-colors ${
      hasError ? 'border-[var(--error)]' : 'border-[var(--border)] hover:border-[var(--border-strong)]'
    }`

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4">
          <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h3 className="text-heading-3 text-[var(--text-primary)] mb-2">Message Sent!</h3>
        <p className="text-body-md text-[var(--text-muted)] max-w-sm">
          Thanks for reaching out. Ahmed will reply within 24 hours via your preferred channel.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm text-[var(--accent)] hover:underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">
            Full Name <span className="text-[var(--error)]">*</span>
          </label>
          <input {...register('full_name')} placeholder="Your full name" className={inputClass(!!errors.full_name)} />
          {errors.full_name && <p className="text-[10px] text-[var(--error)] mt-1">{errors.full_name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">
            Email Address <span className="text-[var(--error)]">*</span>
          </label>
          <input {...register('email')} type="email" placeholder="your@email.com" className={inputClass(!!errors.email)} />
          {errors.email && <p className="text-[10px] text-[var(--error)] mt-1">{errors.email.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Phone Number</label>
          <input {...register('phone')} placeholder="+20 xxx xxx xxxx" className={inputClass()} />
        </div>

        {/* Company */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Company Name</label>
          <input {...register('company')} placeholder="Your company (optional)" className={inputClass()} />
        </div>

        {/* Service */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Service Needed</label>
          <select {...register('service_requested')} className={inputClass()}>
            <option value="">Select a service...</option>
            {services.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {/* Budget */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Estimated Budget</label>
          <select {...register('budget')} className={inputClass()}>
            <option value="">Select budget range...</option>
            {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Timeline */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Expected Timeline</label>
          <select {...register('timeline')} className={inputClass()}>
            <option value="">Select timeline...</option>
            {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        {/* Industry */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Industry</label>
          <input {...register('industry')} placeholder="e.g. Restaurant, Tech, Education..." className={inputClass()} />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">
          Project Description <span className="text-[var(--error)]">*</span>
        </label>
        <textarea
          {...register('project_description')}
          rows={5}
          placeholder="Tell me about your project, goals, and what you're looking to achieve..."
          className={inputClass(!!errors.project_description)}
        />
        {errors.project_description && (
          <p className="text-[10px] text-[var(--error)] mt-1">{errors.project_description.message}</p>
        )}
      </div>

      {/* Consent */}
      <div className="flex items-start gap-3">
        <input
          {...register('consent')}
          type="checkbox"
          id="consent"
          className="mt-1 w-4 h-4 rounded border border-[var(--border)] bg-[var(--bg-card)] accent-[var(--accent)] cursor-pointer"
        />
        <label htmlFor="consent" className="text-xs text-[var(--text-muted)] cursor-pointer leading-relaxed">
          I agree to be contacted by Ahmed Ammar regarding my inquiry. My information will be kept private.
        </label>
      </div>
      {errors.consent && <p className="text-[10px] text-[var(--error)]">{errors.consent.message}</p>}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.01]"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  )
}
