"use client"
import PdfHome from "./Home/page"
import AddUsers from "./components/AddUsers"
import DisplayUser from "./components/DisplayUser"

export default function Home() {
  return (
    <div>
      <PdfHome />
      <AddUsers />
      <DisplayUser />
    </div>

  )
}
