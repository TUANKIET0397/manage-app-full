// import { auth } from "@/auth"
import HomePage from "@/components/layout/homepage";

export default async function Page() {
  // const session = await auth()
  // console.log(">>> check session in page:", session)
  return (
    <div>
      {/* <div>{JSON.stringify(session)}</div> */}
      <HomePage />
    </div>
  );
}
