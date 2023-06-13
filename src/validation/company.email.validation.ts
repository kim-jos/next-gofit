export function isValidCompanyEmail(
  userEmail: string,
  allowedDomains: string[]
) {
  const userEmailDomain = userEmail.split("@")[1];
  const isAllowedDomain = allowedDomains.includes(userEmailDomain);
  if (isAllowedDomain) return true;
  return false;
}
