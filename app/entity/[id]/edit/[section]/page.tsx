import { notFound } from 'next/navigation'
import { ENTITIES } from '@/components/data'
import { SECTIONS } from '@/components/sections'
import DocumentEditor from '@/components/DocumentEditor'

export function generateStaticParams() {
  const params: { id: string; section: string }[] = []
  for (const entity of ENTITIES) {
    for (let i = 0; i < SECTIONS.length; i++) {
      params.push({ id: String(entity.id), section: String(i) })
    }
  }
  return params
}

export default function EditPage({
  params,
}: {
  params: { id: string; section: string }
}) {
  const entity = ENTITIES.find(e => e.id === Number(params.id))
  if (!entity) notFound()

  const sectionIndex = Number(params.section)
  if (sectionIndex < 0 || sectionIndex >= SECTIONS.length) notFound()

  return <DocumentEditor entity={entity} sectionIndex={sectionIndex} />
}
