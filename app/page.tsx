import Hero from "@/components/hero";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ReportLineForm from "./report-line-form";

export default async function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4">
        <ReportLineForm />
      </main>
    </>
  );
}
