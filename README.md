# Coastal Peak Elite Services — Digital Business Card

A fast, mobile-first digital business card. No build tools, no subscriptions, no code knowledge needed to update it.

## What's in the folder

| File | What it does | Do you edit it? |
|---|---|---|
| `config.js` | **All your text**: name, tagline, phone, email, Instagram, website, services, service area, intro | **Yes — this is the only file you edit** |
| `assets/` | Your logo, icons, link-preview image | Replace anytime |
| `index.html` | Page structure | No |
| `styles.css` | Design (colors, fonts, spacing) | Only to change the look |
| `app.js` | Buttons, Save Contact (.vcf), Share, QR code, editor | No |
| `assets/qrcode.js` | Built-in QR generator (works offline, no third-party service) | No |

## Step 1: Your logo (already installed)

| File in `assets` | Used for |
|---|---|
| `logo.png` | White-text logo on the navy front of the card |
| `logo-color.png` | Navy-text version, kept for printing and other uses |
| `icon.png` | Gold mark on navy, used as the photo on the saved contact |
| `apple-touch-icon.png`, `favicon.png` | Home-screen icon and browser tab icon |
| `og-image.jpg` | Preview image when the link is shared in texts, WhatsApp, Facebook or LinkedIn |

**To change the logo later:** replace `assets/logo.png` with a new file of the same name, then re-upload the folder. Use a version that reads well on navy (light text). If you only have a dark version, set `logoPlate: "ivory"` in `config.js`.

The logo already shows the company name, so the large text name is hidden. To show the text name too, set `hideNameWhenLogo: false`.

## Step 2: Publish it free with Netlify (about 3 minutes)

1. Go to **https://app.netlify.com/drop** and create a free account. You can sign up with your Gmail.
2. **Drag the whole `coastal-peak-card` folder** onto the page. On a phone, use a computer for this step.
3. Netlify gives you a live link such as `https://random-name-123.netlify.app`.
4. Go to **Site configuration → Change site name** and rename it to something like `coastalpeak`. Your card is then at **`https://coastalpeak.netlify.app`**.
5. Open that link on your phone. In Safari, tap Share → **Add to Home Screen**. In Chrome, tap ⋮ → **Add to Home screen**. Now it opens like an app.

**To update later:** edit the files on your computer, then in Netlify open your site → **Deploys** → drag the folder onto the "drag and drop" box. The link and QR code stay the same.

### Alternative: GitHub Pages (also free)
1. Create a free account at github.com and make a new **public** repository named `card`.
2. Click **Add file → Upload files**, drag in everything inside the folder, and click **Commit**.
3. Go to **Settings → Pages**, set Source to **main / root**, and save. Your card will be at `https://YOURNAME.github.io/card/`.

### Using your own domain later
When your website domain is ready, you can connect it in Netlify (**Domain management → Add a domain**). For example, you could put the card at `card.coastalpeaksc.com`.

## Step 3: Edit your information

**Option A: the visual editor (easiest).**
Open your live card with `?edit` at the end of the address, like this:
`https://coastalpeak.netlify.app/?edit`
- Change any field and watch the card update as you type.
- Tap **Download config.js** and replace the old `config.js` in your folder with the new one.
- Re-upload the folder to Netlify, as in Step 2.

Your customers never see the editor. Changes only go live after you re-upload.

**Option B: edit `config.js` directly.**
Open it in any text editor (TextEdit, Notepad, or VS Code), change the text between the quotes, save, and re-upload.

### Turning on your website when it launches
In `config.js`, change:
```js
website: "",
```
to:
```js
website: "https://coastalpeaksc.com",
```
The "Coming soon" line becomes a clickable website link, and the address is added to the saved contact automatically.

### Other quick edits
- **Hide the company introduction:** `showAbout: false`
- **Add or remove a service:** copy or delete one `{ title: ..., description: ... }` block in `services`
- **Add a city:** add it to the `serviceArea` list
- **Hide the "Coming soon" website row:** `websitePlaceholder: ""`

## The QR code
- It is generated automatically from your card's live address, so after you publish it already points to the right place.
- Use **Download QR** on the card to get a high-resolution PNG (1200×1200) for printed business cards, truck lettering, yard signs, or invoices.
- Download the QR **from the live site**. If you download it while previewing locally, it will point to your computer.
- If you ever want the QR to point somewhere else, set `cardUrl` in `config.js`.

## How each button behaves
| Button | iPhone | Android | Desktop |
|---|---|---|---|
| Call | Opens the dialer | Opens the dialer | Offers FaceTime or a phone app |
| Email | Opens Mail with the subject pre-filled | Opens Gmail or the default mail app | Opens the default mail app |
| Instagram | Opens the Instagram app or website | Same | Opens in a new tab |
| Save Contact | Downloads a .vcf. Tap it to open the "Add to Contacts" screen | Downloads a .vcf. Tap it to import into Contacts | Downloads a .vcf |
| Share | Native share sheet (Messages, WhatsApp, AirDrop…) | Native share sheet | Copies the link if sharing isn't supported |

If a customer opens your link inside Instagram's own browser, Save Contact switches to the share sheet, because Instagram blocks file downloads. They can also tap ⋯ → "Open in browser".
