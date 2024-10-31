import { redirect } from "next/navigation";
import { createClient } from "../../utils/supabase/server";
import Link from "next/link";
import { LargeHeadingCss, ButtonCss } from "./components/form/styling";
import { FlexCenterContainer } from "./components/layout/styling";

async function HomePage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  console.log(error);
  if (error || !data?.user) {
    redirect("/sign-in");
  }

  return (
    <FlexCenterContainer>
      <LargeHeadingCss>Layout engine</LargeHeadingCss>
      <h2>Welcome {data.user.email}</h2>
      <p>
        Hello and welcome to my student bachelor project from Cphbusines. My name is Zuzana Chudinova and this project was done in collaboration with
        my internship company Shape Games.
      </p>
      <p>
        The goal of this project was to remodel and redesign the current Module CMS solution and gain new coding knowledge. The project was done using
        Next.js, Supabase, and Typescript.
      </p>
      <ButtonCss type="primary">
        <Link href="/protected">Enter Layout engine project</Link>
      </ButtonCss>
    </FlexCenterContainer>
  );
}

export default HomePage;
