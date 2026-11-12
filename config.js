/* =====================================================================
   COASTAL PEAK ELITE SERVICES — DIGITAL BUSINESS CARD
   ---------------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT.
   Change any text between the quotes, save, and re-upload the folder.
   Tip: open your live card with ?edit at the end of the address
   (e.g. https://your-card.netlify.app/?edit) to edit visually and
   download a new copy of this file.
   ===================================================================== */

window.CARD = {
  /* ---------- Identity ---------- */
  companyName: "Coastal Peak",
  companySuffix: "Elite Services",
  legalName: "Coastal Peak Elite Services, LLC",
  tagline: "Premium HVAC Services for Elite Comfort.",
  industry: "Heating & Air Conditioning",
  location: "Charleston, South Carolina",

  /* ---------- Logo ----------
     Put your logo file in the "assets" folder and name it logo.png
     (or change the path below). If no file is found, an elegant
     "CP" monogram is shown instead.
     logoPlate: "none"  -> logo sits directly on navy (best for gold/white logos)
                "ivory" -> logo sits on a light square (best for dark logos) */
  logo: "assets/logo.png",            // white-text version for the navy front
  logoPlate: "none",
  hideNameWhenLogo: true,              // logo already shows the name, so hide the big text name
  contactPhoto: "assets/icon.png",     // square image used as the photo on the saved contact

  /* ---------- Contact ---------- */
  phone: "843-327-6669",
  email: "CoastalPeakSC@gmail.com",
  emailSubject: "HVAC Service Inquiry",
  instagram: "CoastalPeaksc",          // without the @

  /* ---------- Website ----------
     Leave website empty "" while under construction.
     When it's live, paste the full address, e.g. "https://coastalpeaksc.com" */
  website: "",
  websitePlaceholder: "Coming soon",   // shown while website is empty ("" to hide the row)

  /* ---------- Card address (for the QR code) ----------
     Leave empty "" to use the card's own address automatically.
     Set this only if you want the QR code to point somewhere specific. */
  cardUrl: "",

  /* ---------- Introduction (set showAbout: false to hide) ---------- */
  showAbout: true,
  aboutTitle: "Comfort, engineered with care.",
  about:
    "Coastal Peak Elite Services is a Charleston-based heating and air conditioning contractor serving homeowners, custom home builders, developers and general contractors across the Lowcountry. We pair meticulous workmanship with clear communication — from the first estimate to final start-up.",
  clients: ["Homeowners", "Custom Home Builders", "Developers", "General Contractors"],

  /* ---------- Services ---------- */
  services: [
    {
      title: "HVAC Installation",
      description: "Properly sized, cleanly installed systems for new homes, renovations and replacements."
    },
    {
      title: "HVAC Repair",
      description: "Accurate diagnostics and dependable repairs that restore comfort with minimal disruption."
    },
    {
      title: "HVAC Maintenance",
      description: "Scheduled tune-ups that protect efficiency, indoor air quality and equipment life."
    },
    {
      title: "New Construction",
      description: "Plan-to-start-up coordination with builders, developers and general contractors."
    }
  ],

  /* ---------- Service area ---------- */
  serviceAreaIntro: "Proudly serving the greater Charleston area",
  serviceArea: [
    "Charleston",
    "Mount Pleasant",
    "Summerville",
    "Goose Creek",
    "North Charleston",
    "James Island"
  ],
  serviceAreaNote: "and surrounding areas in South Carolina",

  /* ---------- Contact file (Save Contact) ---------- */
  vcardFileName: "Coastal-Peak-Elite-Services.vcf",
  city: "Charleston",
  state: "SC",
  country: "USA"
};
