# 🎯 Google Ads Setup Guide

Your website is now **100% compatible** with Google Ads! Follow these steps to activate tracking.

---

## ✅ What's Already Implemented

1. **Google Ads Global Site Tag (gtag.js)** - Installed on all pages
2. **Conversion Tracking Events** - Set up for:
   - Enquiry Form Submissions
   - Join Application Submissions
   - CTA Button Clicks
3. **Event Tracking** - Lead generation and user actions
4. **Remarketing Tags** - For retargeting campaigns
5. **SEO Optimized** - Meta tags, structured data, Open Graph

---

## 📋 Setup Instructions

### Step 1: Get Your Google Ads Conversion ID

1. Go to [Google Ads](https://ads.google.com)
2. Click **Tools & Settings** → **Measurement** → **Conversions**
3. Click **+ New Conversion Action**
4. Select **Website** → **Form Submission** or **Page View**
5. Copy your **Conversion ID** (format: `AW-XXXXXXXXXX`)
6. Copy your **Conversion Label** (format: `YYYYYYYYYY`)

### Step 2: Replace Placeholder IDs in Your Code

Search and replace these placeholders in all files:

#### In `index.html`:
```html
<!-- Replace this: -->
AW-XXXXXXXXXX

<!-- With your actual Google Ads ID, for example: -->
AW-123456789
```

```html
<!-- Replace this: -->
AW-XXXXXXXXXX/YYYYYYYYYY

<!-- With your conversion ID + label, for example: -->
AW-123456789/AbCdEfGhIj
```

#### In `enquiry.html` and `join.html`:
Same replacements as above in the `<head>` section.

#### In `enquiry-script.js`:
```javascript
// Replace:
'send_to': 'AW-XXXXXXXXXX/YYYYYYYYYY'

// With your enquiry form conversion label:
'send_to': 'AW-123456789/EnquiryLabel'
```

#### In `join-script.js`:
```javascript
// Replace:
'send_to': 'AW-XXXXXXXXXX/ZZZZZZZZZZ'

// With your join form conversion label:
'send_to': 'AW-123456789/JoinLabel'
```

### Step 3: Update Phone Number for Call Tracking (Optional)

In `index.html`, find:
```javascript
'phone_conversion_number': '+91-XXXXXXXXXX'
```

Replace with your actual phone number.

---

## 🎯 Conversion Events Set Up

### 1. **Enquiry Button Click** (index.html)
- **Event**: Button click on "Make an Enquiry"
- **Tracks**: User interest in making enquiry
- **Location**: Contact section CTA

### 2. **Enquiry Form Submission** (enquiry-script.js)
- **Event**: Form submission
- **Tracks**: Complete enquiry submission
- **Value**: 1.0 INR
- **Type**: `generate_lead`

### 3. **Join Application Submission** (join-script.js)
- **Event**: Form submission
- **Tracks**: Craftsman sign-up
- **Value**: 1.0 INR
- **Type**: `sign_up`

---

## 🧪 Testing Your Setup

### Method 1: Google Tag Assistant
1. Install [Google Tag Assistant Chrome Extension](https://tagassistant.google.com/)
2. Visit your website
3. Click the extension icon
4. Check if gtag is firing correctly

### Method 2: Browser Console
1. Open your website
2. Press `F12` (Developer Tools)
3. Go to **Console** tab
4. Type: `dataLayer`
5. You should see Google Ads events

### Method 3: Real-time Reports
1. Go to Google Ads
2. Navigate to **Reports** → **Predefined Reports** → **Other** → **Tracking**
3. Check if conversions are being recorded

---

## 📊 Tracking Overview

| Action | Event Type | Conversion Label | Value |
|--------|-----------|------------------|--------|
| Visit website | Page view | Auto-tracked | - |
| Click "Make Enquiry" button | Click | Custom | - |
| Submit enquiry form | Conversion | YYYYYYYYYY | 1.0 INR |
| Submit join application | Conversion | ZZZZZZZZZZ | 1.0 INR |
| Phone call (optional) | Call conversion | Auto | - |

---

## 🚀 Next Steps

1. ✅ Replace all `AW-XXXXXXXXXX` with your actual Google Ads ID
2. ✅ Create conversion actions in Google Ads dashboard
3. ✅ Get conversion labels for each action
4. ✅ Update conversion labels in JavaScript files
5. ✅ Test using Tag Assistant or console
6. ✅ Create your first Google Ads campaign!

---

## 💡 Tips for Better Performance

### Campaign Optimization
- Target location: India (based on your INR currency)
- Use responsive search ads
- Set up remarketing campaigns for visitors who didn't convert
- Create separate campaigns for:
  - Client enquiries (furniture buyers)
  - Craftsman recruitment (join applications)

### Landing Page Best Practices
- Your website is already optimized with:
  - Fast loading times
  - Mobile responsive design
  - Clear CTAs
  - Trust signals (testimonials, verification badges)
  - Easy navigation
  - Contact forms on multiple pages

### Budget Recommendations
- Start with ₹500-1000/day
- Focus on high-intent keywords
- Use negative keywords to avoid wasted spend
- Monitor conversion rates weekly

---

## 🆘 Troubleshooting

**Issue**: Conversions not showing
- **Solution**: Wait 24-48 hours for data to appear
- **Check**: Verify conversion labels are correct
- **Test**: Use Tag Assistant to debug

**Issue**: Tag not firing
- **Solution**: Check browser console for errors
- **Verify**: gtag.js script is loaded
- **Clear**: Browser cache and test again

**Issue**: Multiple tags detected
- **Solution**: Ensure you only have ONE Google Ads ID
- **Remove**: Any duplicate tracking codes

---

## 📞 Support

If you need help setting up Google Ads:
1. Visit [Google Ads Help Center](https://support.google.com/google-ads)
2. Contact Google Ads Support (available 24/7)
3. Refer to this documentation

---

## ✨ Your Website is Ready for Google Ads!

All technical requirements are met:
- ✅ Tracking code installed
- ✅ Conversion events configured
- ✅ Mobile optimized
- ✅ Fast loading
- ✅ SEO ready
- ✅ Forms working
- ✅ CTAs prominent

**Just replace the placeholder IDs and start your campaigns!** 🎉
