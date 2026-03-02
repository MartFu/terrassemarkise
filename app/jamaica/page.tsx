import { SITE_URLS } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function Page() {
  redirect(SITE_URLS.AWNINGS + "jamaica");
}
