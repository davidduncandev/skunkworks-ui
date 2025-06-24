'use client'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToggleView } from '@skunkworks-ui/hooks'
import * as React from 'react'
export function ToggleViewHookDemo() {
  const [switched, setSwitched] = React.useState(false)
  const {
    switched: isSwitched,
    onSwitchedToggle,
    focusTargetRef,
  } = useToggleView({
    switched,
    onSwitchedChange: setSwitched,
  })
  return !isSwitched ? (
    <Card className="min-h-[22rem] w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Fake signup for Skunkworks UI</CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="dd@example.com"
                required
                ref={focusTargetRef as React.RefObject<HTMLInputElement>}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full" onClick={onSwitchedToggle}>
          Click to switch view
        </Button>
      </CardFooter>
    </Card>
  ) : (
    <Card className="min-h-[22rem] w-full max-w-sm">
      <CardHeader>
        <CardTitle
          className="focus:outline-violet-500x focus:outline-2 focus:outline-offset-4"
          tabIndex={-1}
          ref={focusTargetRef as React.RefObject<HTMLDivElement>}
        >
          Login Successful
        </CardTitle>
      </CardHeader>
      <CardContent className="grow">
        <p className="text-sm text-muted-foreground">
          Notice the card title was programmatically focused when the view
          switched. Focus styles were only added for demo purposes. The main
          intention is to recover from the destoyed focus from the previous
          view. Clicking &apos;Go Back&apos; will return to the first view where
          focus will be placed on the first input.
        </p>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button variant="outline" className="w-full" onClick={onSwitchedToggle}>
          Go back
        </Button>
      </CardFooter>
    </Card>
  )
}
