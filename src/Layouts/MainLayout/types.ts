import { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { ReactNode } from "react"

export type SiderBarButtonProps = {
  icon: IconDefinition
  label: string
  description?: string
  href: string
  children?: SiderBarButtonProps[]
  cardStyles?: string
} & {
  isFirstChild?: boolean
  isLastChild?: boolean
  isMainSidebarBtn?: boolean
}

export type LinkOrButtonProps = {
  href?: string;
  children: ReactNode;
  [x: string]: any; // This line allows additional props
};