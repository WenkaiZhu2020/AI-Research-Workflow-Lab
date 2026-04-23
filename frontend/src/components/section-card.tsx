import type { PropsWithChildren, ReactNode } from 'react'

type SectionCardProps = PropsWithChildren<{
  title: string
  description?: string
  aside?: ReactNode
}>

export function SectionCard({
  title,
  description,
  aside,
  children,
}: SectionCardProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
          {description ? (
            <p className="text-sm leading-6 text-slate-600">{description}</p>
          ) : null}
        </div>
        {aside ? <div>{aside}</div> : null}
      </div>
      {children}
    </section>
  )
}
