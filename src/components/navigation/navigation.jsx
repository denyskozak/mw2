import { TabNav } from '@radix-ui/themes'

export const Navigation = () => {
  return (
    <TabNav.Root  justify="center" color="gold" className="h-[98px] bg-black">
      <TabNav.Link href="/play">Play</TabNav.Link>
      <TabNav.Link href="/matches">Matches</TabNav.Link>
      <TabNav.Link href="#" active>
        Account
      </TabNav.Link>
      <TabNav.Link href="#">Documents</TabNav.Link>
      <TabNav.Link href="#">Settings</TabNav.Link>
    </TabNav.Root>
  )
}