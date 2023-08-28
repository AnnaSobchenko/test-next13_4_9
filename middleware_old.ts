import { NextRequest, NextResponse } from "next/server";
import langParser from "accept-language-parser";
import acceptLanguage from "accept-language";
import { fallbackLng, languages } from "@/app/i18n/settings";

// acceptLanguage.languages(languages);

const defaultLocale = "en";
let locales = ["en", "ua"];

const findBestMatchingLocale = (acceptLangHeader: string) => {
  // parse the locales acceptable in the header, and sort them by priority (q)
  const parsedLangs = langParser.parse(acceptLangHeader);

  // find the first locale that matches a locale in our list
  for (let i = 0; i < parsedLangs.length; i++) {
    const parsedLang = parsedLangs[i];
    // attempt to match both the language and the country
    const matchedLocale = locales.find((locale) => {
      const localeParts = getLocalePartsFrom({ locale });
      return (
        parsedLang.code === localeParts.lang &&
        parsedLang.region === localeParts.country
      );
    });
    if (matchedLocale) {
      return matchedLocale;
    }
    // if we didn't find a match for both language and country, try just the language
    else {
      const matchedLanguage = locales.find((locale) => {
        const localeParts = getLocalePartsFrom({ locale });
        return parsedLang.code === localeParts.lang;
      });
      if (matchedLanguage) {
        return matchedLanguage;
      }
    }
  }
  // if we didn't find a match, return the default locale
  return defaultLocale;
};

export const config = {
  // matcher: '/:lng*'
  matcher: ["//((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

type PathnameLocale = {
  pathname: string;
  locale?: never;
};
type ISOLocale = {
  pathname?: never;
  locale: string;
};

type LocaleSource = PathnameLocale | ISOLocale;

const getLocalePartsFrom = ({ pathname, locale }: LocaleSource) => {
  if (locale) {
    const localeParts = locale.toLowerCase().split("-");
    return {
      lang: localeParts[0],
      country: localeParts[1],
    };
  } else {
    const pathnameParts = pathname!.toLowerCase().split("/");
    return {
      lang: pathnameParts[1],
      country: pathnameParts[2],
    };
  }
};

const cookieName = "i18next";

export function middleware(request: NextRequest) {
  console.log("request :>> ", request);
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  const defaultLocaleParts = getLocalePartsFrom({ locale: defaultLocale });
  const currentPathnameParts = getLocalePartsFrom({ pathname });

  // Check if the default locale is in the pathname
  if (
    currentPathnameParts.lang === defaultLocaleParts.lang &&
    currentPathnameParts.country === defaultLocaleParts.country
  ) {
    // we want to REMOVE the default locale from the pathname,
    // and later use a rewrite so that Next will still match
    // the correct code file as if there was a locale in the pathname
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}`,
          pathname.startsWith("/") ? "/" : ""
        ),
        request.url
      )
    );
  }

  // Check if the default locale is in the pathname
  if (
    pathname.startsWith(`/${defaultLocale}/`) ||
    pathname === `/${defaultLocale}`
  ) {
    // e.g. incoming request is /en/products
    // The new URL is now /products
    return NextResponse.redirect(
      new URL(
        pathname.replace(
          `/${defaultLocale}`,
          pathname === `/${defaultLocale}` ? "/" : ""
        ),
        request.url
      )
    );
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    // We are on the default locale
    // Rewrite so Next.js understands
    if (pathnameIsMissingValidLocale) {
      // rewrite it so next.js will render `/` as if it was `/en/us`

      const matchedLocale = findBestMatchingLocale(
        request.headers.get("Accept-Language") || defaultLocale
      );

      if (matchedLocale !== defaultLocale) {
        const matchedLocaleParts = getLocalePartsFrom({
          locale: matchedLocale,
        });
        return NextResponse.redirect(
          new URL(
            `/${matchedLocaleParts.lang}/${matchedLocaleParts.country}${pathname}`,
            request.url
          )
        );
      } else {
        return NextResponse.rewrite(
          new URL(
            `/${defaultLocaleParts.lang}/${defaultLocaleParts.country}${pathname}`,
            request.url
          )
        );
      }
    }

    // e.g. incoming request is /products
    // Tell Next.js it should pretend it's /en/products
    return NextResponse.rewrite(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    );
  }
}

// export function middleware(req: NextRequest) {
//   console.log("req :>> ", req);
//   if (
//     req.nextUrl.pathname.indexOf("icon") > -1 ||
//     req.nextUrl.pathname.indexOf("chrome") > -1
//   )
//     return NextResponse.next();
//   let lng: string;
//   if (req.cookies.has(cookieName))
//     lng = acceptLanguage.get(req.cookies.get(cookieName).value);
//   if (!lng) lng = acceptLanguage.get(req.headers.get("Accept-Language"));
//   if (!lng) lng = fallbackLng;

//   // Redirect if lng in path is not supported
//   if (
//     !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
//     !req.nextUrl.pathname.startsWith("/_next")
//   ) {
//     console.log(
//       "`/${lng}${req.nextUrl.pathname}` :>> ",
//       `/${lng}${req.nextUrl.pathname}`
//     );
//     return NextResponse.redirect(
//       new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
//     );
//   }

//   if (req.headers.has("referer")) {
//     const refererUrl = new URL(req.headers.get("referer"));
//     const lngInReferer = languages.find((l) =>
//       refererUrl.pathname.startsWith(`/${l}`)
//     );
//     const response = NextResponse.next();
//     if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
//     console.log("response :>> ", response);
//     return response;
//   }

//   return NextResponse.next();
// }
