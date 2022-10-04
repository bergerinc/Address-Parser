export const parseAddress = (address, delimiter) => {
  const finalAddress = {
    streetAddress: "",
    streetAddress2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  };

  try {
    const partsArray = address.split(delimiter);

    partsArray.map((part) => {
      part = part.trim();

      // Attempt to identify each part. If return value is true from a parser then add to final address object
      // Check for existing object value so we don't overwrite something we have already found
      // City is processed first on purpose because some of the state and country abbreviations are the same. States should be more likely to be present than countries.
      if (!finalAddress.state.length && findState(part)) {
        finalAddress.state = part;
        return;
      } else if (!finalAddress.postalCode.length && findPostalCode(part)) {
        finalAddress.postalCode = part;
        return;
      } else if (!finalAddress.country.length && findCountry(part)) {
        finalAddress.country = part;
        return;
      } else if (
        !finalAddress.streetAddress2.length &&
        findStreetAddress2(part)
      ) {
        finalAddress.streetAddress2 = part;
        return;
      } else if (!finalAddress.city.length && findCity(part)) {
        finalAddress.city = part;
        return;
      } else {
        finalAddress.streetAddress += finalAddress.streetAddress.length
          ? " " + part
          : part;
      }
    });

    return finalAddress;
  } catch (error) {
    console.error(error);
  }
};

function findStreetAddress2(val) {
  //look for po box, suite or apartment values
  const poBoxRegEx = /\b(?:p\.?\s*o\.?|post\s+office)(\s+)?(?:box|[0-9]*)?\b/i;
  const suiteRexEx = /(suite|ste)(\s+)?(?:[0-9a-z]*)?/i;
  const aptRegEx = /(apt|apartment|unit|bldg|building)(\s+)?(?:[0-9a-z]*)?/i;

  return poBoxRegEx.test(val) || suiteRexEx.test(val) || aptRegEx.test(val);
}

function findPOBox(val) {
  const poBoxRegEx = /\b(?:p\.?\s*o\.?|post\s+office)(\s+)?(?:box|[0-9]*)?\b/i;
  return poBoxRegEx.test(val);
}

function findCity(val) {
  const cityRegEx =
    /^[a-zA-Z]+(?:[\s-'.&/][a-zA-Z]+)*(?:[.|\s])?(?:[\(a-z\)])*$/;
  return cityRegEx.test(val);
}

function findPostalCode(val) {
  const postalRegEx = /(^\d{5}$)|(^\d{9}$)|(^\d{5}-\d{4}$)/;
  return postalRegEx.test(val);
}

function findState(val) {
  const stateRegEx =
    /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/i;
  return stateRegEx.test(val);
}

function findCountry(val) {
  //handles iso2 codes
  const iso2RegEx =
    /^(AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW)$/i;

  //handles iso 3 codes
  const iso3RegEx =
    /^(ABW|AFG|AGO|AIA|AL[AB]|AND|AR[EGM]|ASM|AT[AFG]|AU[ST]|AZE|BDI|BE[LNS]|BFA|BG[DR]|BH[RS]|BIH|BL[MRZ]|BMU|BOL|BR[ABN]|BTN|BVT|BWA|CA[FN]|CCK|CH[ELN]|CIV|CMR|CO[DGKLM]|CPV|CRI|CU[BW]|CXR|CYM|CYP|CZE|DEU|DJI|DMA|DNK|DOM|DZA|ECU|EGY|ERI|ES[HPT]|ETH|FIN|FJI|FLK|FR[AO]|FSM|GAB|GBR|GEO|GGY|GHA|GI[BN]|GLP|GMB|GN[BQ]|GR[CDL]|GTM|GU[FMY]|HKG|HMD|HND|HRV|HTI|HUN|IDN|IMN|IND|IOT|IR[LNQ]|IS[LR]|ITA|JAM|JEY|JOR|JPN|KAZ|KEN|KGZ|KHM|KIR|KNA|KOR|KWT|LAO|LB[NRY]|LCA|LIE|LKA|LSO|LTU|LUX|LVA|MA[CFR]|MCO|MD[AGV]|MEX|MHL|MKD|ML[IT]|MMR|M[NGP]|MOZ|MRT|MSR|MTQ|MUS|MWI|MY[ST]|NAM|NCL|NER|NFK|NGA|NI[CU]|NLD|NOR|NPL|NRU|NZL|OMN|PA[KN]|PCN|PER|PHL|PLW|PNG|POL|PR[IKTY]|PSE|PYF|QAT|REU|ROU|RUS|RWA|SAU|SDN|SEN|SG[PS]|SHN|SJM|SL[BEV]|SMR|SOM|SPM|SRB|SSD|STP|SUR|SV[KN]|SW[EZ]|SXM|SY[CR]|TC[AD]|TGO|THA|TJK|TK[LM]|TLS|TON|TTO|TU[NRV]|TWN|TZA|UGA|UKR|UMI|URY|USA|UZB|VAT|VCT|VEN|VGB|VIR|VNM|VUT|WLF|WSM|YEM|ZAF|ZMB|ZWE)$/i;
  return iso2RegEx.test(val) || iso3RegEx.test(val);
}
