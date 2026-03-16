import jsPDF from 'jspdf'
import type { Donation } from '@/app/dashboard/(backer)/my-donations/types'

export function downloadReceipt(donation: Donation): void {
  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text('Donation Receipt', 20, 20)

  doc.setFontSize(12)
  doc.text(`Campaign: ${donation.campaignId.title}`, 20, 40)
  doc.text(`Amount: $${donation.amount}`, 20, 52)
  doc.text(`Payment Status: ${donation.paymentStatus}`, 20, 64)
  doc.text(`Transaction ID: ${donation.stripeSessionId}`, 20, 76)
  doc.text(`Date: ${new Date(donation.createdAt).toLocaleString()}`, 20, 88)
  doc.text(
    `Donor: ${donation.donorId.firstName} ${donation.donorId.lastName}`,
    20,
    100,
  )
  doc.text(`Email: ${donation.donorId.email}`, 20, 112)

  doc.save(`receipt-${donation._id}.pdf`)
}
