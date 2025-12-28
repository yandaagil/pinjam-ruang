type DateInput = string | Date
type FormattedDate = string

export const formatDate = (isoDateString: DateInput): FormattedDate => {
  const date = typeof isoDateString === 'string' ? new Date(isoDateString) : isoDateString

  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date)
}

export const formatDateDetail = (isoDateString: DateInput): FormattedDate => {
  const date = typeof isoDateString === 'string' ? new Date(isoDateString) : isoDateString

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(date)
}

export const formatTime = (isoDateString: DateInput): FormattedDate => {
  const date = typeof isoDateString === 'string' ? new Date(isoDateString) : isoDateString

  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

export const formatDateTime = (isoDateString: DateInput): FormattedDate => {
  const date = typeof isoDateString === 'string' ? new Date(isoDateString) : isoDateString

  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}
