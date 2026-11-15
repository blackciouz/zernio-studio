import React from 'react'
import { PageHeader, Section, DataTable, Button } from '../components/ui.jsx'
import * as db from '../data/db.js'

export default function WhatsappOverview() {
  return (
    <div className="flex flex-col gap-4">
      <PageHeader title="WhatsApp" />
      <DataTable 
        columns={Object.keys(db.whatsappNumbers[0] || {}).map(k => ({ key: k, label: k.charAt(0).toUpperCase() + k.slice(1) }))}
        rows={db.whatsappNumbers} 
      />
    </div>
  )
}
