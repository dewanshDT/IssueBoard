import React from "react"
import { twMerge } from "tailwind-merge"

interface Props extends React.HtmlHTMLAttributes<HTMLDivElement> {
  tip: string
}

const ToolTip: React.FC<Props> = ({ tip, children, ...props }) => {
  return (
    <div {...props} className={twMerge(props.className, "relative group")}>
      {children}
      <div className="absolute bg-neutral-800 text-xs px-1 py-0.5 rounded-sm border border-neutral-600 top-full translate-x-3 translate-y-3 hidden group-hover:block w-max z-10">
        {tip}
      </div>
    </div>
  )
}

export default ToolTip
