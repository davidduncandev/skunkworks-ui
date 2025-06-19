# ToggleView

A headless React component which toggles between two views with correct management of focus. Focus management is orchestrated via the action to switch the view, and not when a particular view is mounted.

## Anatomy

```js {{ title: 'Basic' }}
import * as ToggleView from '@skunkworks-ui/toggle-view';

export default () => (
  <ToggleView.Root>
    <ToggleView.Content>
      <div>
        <ToggleView.TargetFocus>
          {/* The element where focus should target when this view is returned to */}
        </ToggleView.TargetFocus>

        <ToggleView.Trigger>Click to switch view</ToggleView.Trigger>
      </div>
    </ToggleView.Content>
    <ToggleView.SwitchedContent>
      <div>
          <ToggleView.TargetHeading>
            {/* The heading where focus should target when this view toggled to */}
          </ToggleView.TargetHeading>
          <ToggleView.Trigger>
              Go back
            </Button>
      </div>
    </ToggleView.SwitchedContent>
  </ToggleView.Root>
);
```

## API Reference

### Root

Contains all parts of the `ToggleView`.

#### `defaultSwitched`

The switched state of the ToggleView when it is initially rendered. Use when you do not need to control its switched state.

#### `switched`

The controlled switched state of the ToggleView. Must be used in conjunction with `onSwitchedChange`.

#### `onSwitchedChange`

Event handler called when the switched state of the ToggleView changes.

### Trigger

A button that toggles the view.

#### `asChild`

Change the default rendered element for the one passed as a child, merging
their props and behavior.

### Content

Contains content to be rendered in the non-switched view.

### SwitchedContent

Contains content to be rendered in the switched view.

### TargetFocus

Wraps an interactive element which should receive focus when the parent view is switched to.

### TargetHeading

Used to focus a heading tag. This acts much like `TargetFocus`, except that it also applied a `tabIndex = "-1"` to the heading.

## Examples

```js {{ title: 'Controlled API' }}
import React from 'react';
import * as ToggleView from '@skunkworks-ui/toggle-view';

export default () => {
  const [switched, setSwitched] = React.useState(false)
  return (
    <ToggleView.Root switched={switched} onSwitchedChange={setSwitched}>
      <ToggleView.Content>
        <div>
          <ToggleView.TargetFocus>
            {/* The element where focus should target when this view is returned to */}
          </ToggleView.TargetFocus>

          <ToggleView.Trigger>Click to switch view</ToggleView.Trigger>
        </div>
      </ToggleView.Content>
      <ToggleView.SwitchedContent>
        <div>
            <ToggleView.TargetHeading>
              {/* The heading where focus should target when this view toggled to */}
            </ToggleView.TargetHeading>
            <ToggleView.Trigger>
                Go back
              </Button>
        </div>
      </ToggleView.SwitchedContent>
    </ToggleView.Root>
  )
}
```
