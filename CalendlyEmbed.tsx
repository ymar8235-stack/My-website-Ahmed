'use client'
import { useEffect } from 'react'

interface CalendlyEmbedProps {
  url: string
  prefill?: {
    name?: string
    email?: string
  }
}

export function CalendlyEmbed({ url, prefill }: CalendlyEmbedProps) {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const params = new URLSearchParams({
    hide_event_type_details: '1',
    hide_gdpr_banner: '1',
    background_color: '121212',
    text_color: 'ffffff',
    primary_color: '0071E3',
    ...(prefill?.name ? { name: prefill.name } : {}),
    ...(prefill?.email ? { email: prefill.email } : {}),
  })

  return (
    <div
      className="calendly-inline-widget w-full"
      data-url={`${url}?${params.toString()}`}
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
}
