import { redirect } from 'next/navigation'

export default function DonationFailedRedirectPage() {
  redirect('/dashboard/donation-failed')
}
