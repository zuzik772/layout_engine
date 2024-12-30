import { useSearchParams } from "next/navigation";
import { Message } from "../components/FormMessage";

export function getMessage(): Message {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") ?? "";
  const success = searchParams.get("success") ?? "";
  const message = searchParams.get("message") ?? "";
  return { error, success, message };
}
