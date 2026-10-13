# 🛒 বাজার দর — BazarDor

**নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর, এক নজরে।** বাংলাদেশি ব্যবহারকারীদের জন্য সম্পূর্ণ বাংলায় তৈরি responsive market-price tracker।

## ✨ প্রধান ফিচার

1. **আজকের দাম ও পরিবর্তন:** পণ্যের দাম, একক এবং দাম বাড়া/কমার শতাংশসহ responsive product card।
2. **দাম পরিবর্তনের তালিকা:** আজ দাম বেড়েছে ও কমেছে—দুটি আলাদা বিভাগ।
3. **বিভাগ ও সাজানো:** ক্যাটাগরি অনুযায়ী পণ্য এবং ডিফল্ট/কম থেকে বেশি/বেশি থেকে কম sort; বাংলা সংখ্যাও numeric value হিসেবে parse হয়।
4. **সুরক্ষিত পণ্য বিস্তারিত:** লগইন করা ব্যবহারকারী বাজারভিত্তিক দামের তুলনা দেখতে পারবেন।
5. **Better Auth:** ইমেইল-পাসওয়ার্ড, Google ও GitHub OAuth; সাইন ইন, সাইন আপ, সাইন আউট এবং toast feedback।
6. **প্রোফাইল আপডেট:** Better Auth-এর `updateUser` দিয়ে নাম পরিবর্তন।
7. **Responsive design:** মোবাইল, ট্যাবলেট ও ডেস্কটপে মানানসই layout, ticker ও loading skeleton।
8. **Bangla-first UI:** বাংলা সংখ্যা, তারিখ, লেখা এবং বাজারের উপযোগী emoji illustration।

## 🧰 প্রযুক্তি

- Next.js 15 App Router, React 19, TypeScript
- Tailwind CSS v4 + custom responsive CSS
- Better Auth + MongoDB adapter
- `react-hot-toast`, `lucide-react`
- CSS আলাদা ফাইলে রাখা হয়নি; responsive style মূল `app/layout.tsx`-এর `<style>` ট্যাগে রাখা হয়েছে।
- BazarDor public API

## 📡 API

Primary: `https://api.api-store.workers.dev/api/bazardor`  
Fallback: `https://api.abcz.workers.dev/api/bazardor`

- `GET /products`
- `GET /products?category=chal`
- `GET /products/:id`
- `GET /categories`
- `GET /categories/:slug`

API response keys vary across wrappers, so `lib/api.ts` normalizes common response shapes and tries the fallback endpoint.

## 🚀 লোকালি চালানোর নিয়ম

**প্রয়োজন:** Node.js 20+ এবং একটি MongoDB database (Better Auth-এর persistent account storage-এর জন্য)।

```bash
npm install
cp .env.example .env.local
npm run dev
```

তারপর `http://localhost:3000` খুলুন। Windows CMD-তে `copy .env.example .env.local` ব্যবহার করুন। `.env.local`-এ নিচের মানগুলো দিন:

- `BAZARDOR_API_URL` — চাইলে API base URL বদলান
- `BETTER_AUTH_SECRET` — কমপক্ষে ৩২ অক্ষরের random secret
- `BETTER_AUTH_URL` — local development-এ `http://localhost:3000`
- `MONGODB_URI` — MongoDB connection string
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — Google OAuth
- `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` — GitHub OAuth

OAuth provider credentials না দিলে email/password flow কাজ করবে, কিন্তু সংশ্লিষ্ট social login চালু হবে না। Google/GitHub OAuth console-এ callback URL হিসেবে `http://localhost:3000/api/auth/callback/google` এবং `http://localhost:3000/api/auth/callback/github` যোগ করুন। Deploy করার সময় domain অনুযায়ী URL পরিবর্তন করুন।

## 🌐 Vercel deployment

1. Repository Vercel-এ import করুন।
2. Project Settings → Environment Variables-এ `.env.local`-এর সব প্রয়োজনীয় variable যোগ করুন।
3. `BETTER_AUTH_URL`-এ deployed origin দিন; OAuth callback URL-ও একই domain-এ update করুন।
4. Deploy করুন। App Router dynamic routes server-side / client-side navigation সমর্থন করে; category page client-side fetch করে এবং product detail-এর data API থেকে লোড হয়।

## 📝 নোট

- API-তে বাজারভিত্তিক মূল্য না থাকলে product detail table-এ **আনুমানিক UI demonstration** দেখানো হয় এবং সেটি স্পষ্টভাবে চিহ্নিত থাকে; এগুলোকে প্রকৃত বাজারদর ধরে নেওয়া যাবে না।
- Better Auth-এর production use-এর জন্য MongoDB ও শক্তিশালী secret configure করা বাধ্যতামূলক। `.env.local` কখনো GitHub-এ commit করবেন না।
- API থেকে data না এলে Home page error state দেখায়; sample price silently দেখানো হয় না।
