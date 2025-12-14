// app/[locale]/cookies/page.tsx
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function CookiesPage() {
  const t = await getTranslations("cookiesPage");

  return (
    <main className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-4xl bg-white shadow-sm rounded-2xl p-8">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            {t("title")}
          </h1>
          <p className="text-sm text-slate-600">{t("description")}</p>
        </header>

        <section className="prose prose-slate mb-8">
          {/* SECTION 1 */}
          <h2 className="!font-semibold !text-xl mt-10">{t("section1Title")}</h2>
          <p>{t("section1Text")}</p>

          {/* SECTION 2 */}
          <h2 className="!font-semibold !text-xl mt-10">{t("section2Title")}</h2>
          <p>{t("section2Intro")}</p>
          <ul>
            <li>{t("section2ListItem1")}</li>
            <li>{t("section2ListItem2")}</li>
            <li>{t("section2ListItem3")}</li>
            <li>{t("section2ListItem4")}</li>
          </ul>
          <p>
            <strong>{t("section2Note")}</strong>
          </p>

          {/* SECTION 3 */}
          <h2 className="!font-semibold !text-xl mt-10">{t("section3Title")}</h2>

          {/* A. STRICTLY NECESSARY */}
          <h3 className="!font-semibold mt-6">{t("section3A")}</h3>
          <p>{t("section3AText")}</p>

          <div className="overflow-x-auto rounded-lg border border-slate-200 mt-4">
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium">
                    {t("cookieTableHeaderName")}
                  </th>
                  <th className="text-left px-4 py-3 font-medium">
                    {t("cookieTableHeaderPurpose")}
                  </th>
                  <th className="text-left px-4 py-3 font-medium">
                    {t("cookieTableHeaderValidity")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-3">better-auth.session_data</td>
                  <td className="px-4 py-3">{t("cookieDataPurpose")}</td>
                  <td className="px-4 py-3">{t("cookieValiditySession")}</td>
                </tr>
                <tr className="border-t bg-slate-50">
                  <td className="px-4 py-3">better-auth.session_token</td>
                  <td className="px-4 py-3">{t("cookieTokenPurpose")}</td>
                  <td className="px-4 py-3">{t("cookieValiditySession")}</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3">NEXT_LOCALE</td>
                  <td className="px-4 py-3">{t("cookieLocalePurpose")}</td>
                  <td className="px-4 py-3">{t("cookieValidityYear")}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* B. ANALYTICS */}
          <h3 className="!font-semibold mt-10">{t("section3B")}</h3>
          <p>{t("section3BText")}</p>

          {/* SECTION 4 */}
          <h2 className="!font-semibold !text-xl mt-10">{t("section4Title")}</h2>
          <p>{t("section4Text1")}</p>
          <p>{t("section4Text2")}</p>

          {/* SECTION 5 */}
          <h2 className="!font-semibold !text-xl mt-10">{t("section5Title")}</h2>
          <p>{t("section5Text")}</p>

          <p className="text-sm mt-4">{t("browserInstructions")}</p>

          <ul className="list-disc ml-6">
            <li>
              <Link
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                className="text-sky-600 hover:underline"
              >
                {t("chrome")}
              </Link>
            </li>
            <li>
              <Link
                href="https://support.mozilla.org/kb/enable-and-disable-cookies-website-preferences"
                target="_blank"
                className="text-sky-600 hover:underline"
              >
                {t("firefox")}
              </Link>
            </li>
            <li>
              <Link
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                className="text-sky-600 hover:underline"
              >
                {t("safari")}
              </Link>
            </li>
            <li>
              <Link
                href="https://support.microsoft.com/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                className="text-sky-600 hover:underline"
              >
                {t("edge")}
              </Link>
            </li>
            <li>
              <Link
                href="https://help.opera.com/en/latest/web-preferences/#cookies"
                target="_blank"
                className="text-sky-600 hover:underline"
              >
                {t("opera")}
              </Link>
            </li>
          </ul>
        </section>

        <footer className="mt-8 text-sm text-slate-500">
          <p>{t("footerNote")}</p>
        </footer>
      </div>
    </main>
  );
}
