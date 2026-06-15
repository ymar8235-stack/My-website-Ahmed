'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { ChevronDown } from 'lucide-react'

const STATUSES = [
  'new', 'contacted', 'qualified',
  'proposal_sent', 'negotiation', 'won', 'lost', 'archived',
] as const

type Status = typeof STATUSES[number]

interface LeadActionsProps {
  leadId: string
  currentStatus: Status
}

export function LeadActions({ leadId, currentStatus }: LeadActionsProps) {
  const [status, setStatus] = useState<Status>(currentStatus)
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const updateStatus = async (newStatus: Status) => {
    setSaving(true)
    setOpen(false)
    const supabase = createClient()
    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', leadId)

    if (error) {
      toast.error('Failed to update status')
    } else {
      setStatus(newStatus)
      toast.success(`Status updated to "${newStatus.replace('_', ' ')}"`)
      router.refresh()
    }
    setSaving(false)
  }

  const statusLabels: Record<Status, string> = {
    new: 'New Lead', contacted: 'Contacted', qualified: 'Qualified',
    proposal_sent: 'Proposal Sent', negotiation: 'Negotiation',
    won: 'Won', lost: 'Lost', archived: 'Archived',
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        disabled={saving}
        className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl text-sm font-medium text-[var(--text-primary)] hover:border-[var(--accent)] transition-all disabled:opacity-50"
      >
        {saving ? 'Saving...' : `Status: ${statusLabels[status]}`}
        <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow-lg z-50 overflow-hidden">
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => updateStatus(s)}
              className={`w-full px-4 py-2.5 text-sm text-left hover:bg-[var(--bg-elevated)] transition-colors ${
                s === status ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-secondary)]'
              }`}
            >
              {statusLabels[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
