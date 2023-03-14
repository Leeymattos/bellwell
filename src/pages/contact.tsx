import Nav from "@/components/nav";
import { useRouter } from "next/router";

export default function Contact() {
  const router = useRouter()
  console.log(router.asPath);

  return (
    <>
      <Nav pageNow={router.asPath} />

      Contato
    </>
  )
}