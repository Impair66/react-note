import LoginPage from "../../login/page";

export default function LocalizedLogin() {
  // keep for compatibility; project no longer uses localized routes but
  // keep wrapper to avoid missing route errors if requests hit /[lng]/login
  return <LoginPage />;
}
