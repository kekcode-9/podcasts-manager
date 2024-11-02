import HomePage from "@/page-components/home"
import { Suspense } from "react"

export default function Home() {
  return (
    <Suspense>
      <HomePage/>
    </Suspense>
  )
}
