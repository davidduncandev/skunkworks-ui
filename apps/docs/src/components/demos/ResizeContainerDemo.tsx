'use client'
import * as ResizeContainer from '@skunkworks-ui/resize-container'
import React from 'react'

export function ResizeContainerDemo() {
  const [width, setWidth] = React.useState<number | null>(null)
  return (
    <div className="border-base-900 relative mt-8 flex resize-x flex-wrap gap-4 overflow-auto border-4 border-zinc-300 p-8 *:border-zinc-200 dark:text-white">
      <span className="text-emerald-700 after:absolute after:right-4 after:bottom-0 after:content-['Resize_me!'] dark:text-emerald-400" />
      <ResizeContainer.Root onResize={(size) => setWidth(size?.width ?? null)}>
        <div className="border-base-900 flex flex-wrap gap-4 border-zinc-300 *:border-zinc-200 dark:text-white">
          <div className="absolute top-0 left-2 text-emerald-700 dark:text-emerald-300">{`${width}px`}</div>
          <ResizeContainer.Item>
            <div className="border-2 border-zinc-200 p-6">Layout</div>
          </ResizeContainer.Item>
          <ResizeContainer.Item>
            <div className="border-2 border-zinc-200 p-6 data-[wrapped=true]:border-dashed data-[wrapped=true]:border-emerald-700 data-[wrapped=true]:text-emerald-700 dark:data-[wrapped=true]:border-emerald-400 dark:data-[wrapped=true]:text-emerald-400">
              CSS
            </div>
          </ResizeContainer.Item>
          <ResizeContainer.Item>
            <div className="border-2 border-zinc-200 p-6 data-[wrapped=true]:border-dashed data-[wrapped=true]:border-emerald-700 data-[wrapped=true]:text-emerald-700 dark:data-[wrapped=true]:border-emerald-400 dark:data-[wrapped=true]:text-emerald-400">
              Design Systems
            </div>
          </ResizeContainer.Item>
          <ResizeContainer.Item>
            <div className="border-2 border-zinc-200 p-6 data-[wrapped=true]:border-dashed data-[wrapped=true]:border-emerald-700 data-[wrapped=true]:text-emerald-700 dark:data-[wrapped=true]:border-emerald-400 dark:data-[wrapped=true]:text-emerald-400">
              Front-end
            </div>
          </ResizeContainer.Item>
          <ResizeContainer.Item>
            <div className="border-2 border-zinc-200 p-6 data-[wrapped=true]:border-dashed data-[wrapped=true]:border-emerald-700 data-[wrapped=true]:text-emerald-700 dark:data-[wrapped=true]:border-emerald-400 dark:data-[wrapped=true]:text-emerald-400">
              Development
            </div>
          </ResizeContainer.Item>
        </div>
      </ResizeContainer.Root>
    </div>
  )
}
