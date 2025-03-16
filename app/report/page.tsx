import Hero from "@/components/hero";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import ReportLineForm from "../report-line-form";
import HeroLatestReport from "@/components/hero-latest-reports";

export default async function Page() {
  return (
    <div className="h-full gap-16 w-full flex flex-col justify-start">
      <Hero />
      <main className="flex-1 flex flex-col gap-6 px-4 self-center">
        <ReportLineForm />
      </main>
    </div>
  );
}
