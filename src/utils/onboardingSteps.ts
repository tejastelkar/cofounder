export type Step = {
  id: number
  title: string
  description: string
}

export const steps: Step[] = [
  {
    id: 1,
    title: 'Set up your profile',
    description: 'Add your name, photo, and basic company info.',
  },
  {
    id: 2,
    title: 'Invite your team',
    description: 'Send invites to colleagues who will use the portal.',
  },
  {
    id: 3,
    title: 'Connect your tools',
    description: 'Integrate with Slack, Jira, or other tools you use.',
  },
  {
    id: 4,
    title: 'Configure notifications',
    description: 'Choose how and when you want to be notified.',
  },
  {
    id: 5,
    title: 'Review billing details',
    description: 'Confirm your plan and payment method.',
  },
  {
    id: 6,
    title: 'Schedule a kickoff call',
    description: 'Book time with your account manager to get started.',
  },
]
