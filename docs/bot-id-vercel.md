# BotID

BotID is available on [all plans](/docs/plans)

[Vercel BotID](/botid) is an invisible CAPTCHA that protects against sophisticated bots without showing visible challenges or requiring manual intervention. It adds a protection layer for public, high-value routes, such as checkouts, signups, and APIs, that are common targets for bots imitating real users.

## [Sophisticated bot behavior](#sophisticated-bot-behavior)

Sophisticated bots are designed to mimic real user behavior. They can run JavaScript, solve CAPTCHAs, and navigate interfaces in ways that closely resemble human interactions. Tools like Playwright and Puppeteer automate these sessions, simulating actions from page load to form submission.

These bots do not rely on spoofed headers or patterns that typically trigger rate limits. Instead, they blend in with normal traffic, making detection difficult and mitigation costly.

## [Using BotID](#using-botid)

- [Getting Started](/docs/botid/get-started) - Setup guide with complete code examples
- [Verified Bots](/docs/botid/verified-bots) - Information about verified bots and their handling
- [Bypass BotID](#bypass-botid) - Configure bypass rules for BotID detection

BotID includes a [Deep Analysis mode](#how-botid-deep-analysis-works), powered by [Kasada](https://www.kasada.io/). Kasada is a leading bot protection provider trusted by Fortune 500 companies and global enterprises. It delivers advanced bot detection and anti-fraud capabilities.

BotID provides real-time protection against:

- Automated attacks: Shield your application from credential stuffing, brute force attacks, and other automated threats
- Data scraping: Prevent unauthorized data extraction and content theft
- API abuse: Protect your endpoints from excessive automated requests
- Spam and fraud: Block malicious bots while allowing legitimate traffic through
- Expensive resources: Prevent bots from consuming expensive infrastructure, bandwidth, compute, or inventory

## [Key features](#key-features)

- Seamless integration: Works with existing Vercel projects with minimal configuration
- Customizable protection: Define which paths and endpoints require bot protection
- Privacy-focused: Respects user privacy while providing robust protection
- Deep Analysis (Kasada-powered): For the highest level of protection, enable Deep Analyis in your [Vercel Dashboard](/dashboard). This leverages Kasada's advanced detection technology to block even the most sophisticated bots.

## [BotID modes](#botid-modes)

BotID has two modes:

- Basic - Ensures valid browser sessions are accessing your sites
- Deep Analysis - Connects thousands of additional client side signals to further distinguish humans from bots

### [How BotID deep analysis works](#how-botid-deep-analysis-works)

With a few lines of code, you can run BotID on any endpoint. It operates by:

- Giving you a clear yes or no response to each request
- Deploying dynamic detection models based on a deep understanding of bots that validates requests on your server actions and route handlers to ensure only verified traffic reaches your protected endpoints
- Quickly assessing users without disrupting user sessions

BotID counters the most advanced bots by:

1.  Silently collecting thousands of signals that distinguish human users from bots
2.  Changing detection methods on every page load to prevent reverse engineering and sophisticated bypasses
3.  Streaming attack data to a global machine learning system that improves protection for all customers

## [Pricing](#pricing)

| Mode          | Plans Available    | Price                                      |
| ------------- | ------------------ | ------------------------------------------ |
| Basic         | All Plans          | Free                                       |
| Deep Analysis | Pro and Enterprise | $1/1000 `checkBotId()` Deep Analysis calls |

Calling the `checkBotId()` function in your code triggers BotID Deep Analysis charges. Passive page views or requests that don't invoke the `checkBotId()` function are not charged.

## [Bypass BotID](#bypass-botid)

You can add a bypass rule to the [Vercel WAF](https://vercel.com/docs/vercel-firewall/firewall-concepts#bypass) to let through traffic that would have otherwise been detected as a bot by BotID.

### [Checking BotID traffic](#checking-botid-traffic)

You can view BotID checks by selecting BotID on the firewall traffic dropdown filter of the [Firewall tab](/docs/vercel-firewall/firewall-observability#traffic) of a project.

Metrics are also available in [Observability Plus](/docs/observability/observability-plus).

## [More resources](#more-resources)

- [Advanced configuration](/docs/botid/advanced-configuration) - Fine-grained control over detection levels and backend domains
- [Form submissions](/docs/botid/form-submissions) - Handling form submissions with BotID protection
- [Local Development Behavior](/docs/botid/local-development-behavior) - Testing BotID in development environments

# Get Started with BotID

This guide shows you how to add BotID protection to your Vercel project. BotID blocks automated bots while allowing real users through, protecting your APIs, forms, and sensitive endpoints from abuse.

The setup involves three main components:

- Client-side component to run challenges.
- Server-side verification to classify sessions.
- Route configuration to ensure requests are routed through BotID.

## [Step by step guide](#step-by-step-guide)

Before setting up BotID, ensure you have a JavaScript [project deployed](/docs/projects/managing-projects#creating-a-project) on Vercel.

1.  ### [Install the package](#install-the-package)

    Add BotID to your project:

    Terminal

    ![](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/topics/icons/pnpm.svg)pnpmbunyarnnpm

    ```
    pnpm i botid
    ```

    ```
    yarn add botid
    ```

    ```
    npm i botid
    ```

    ```
    bun add botid
    ```

2.  ### [Configure redirects](#configure-redirects)

    Use the appropriate configuration method for your framework to set up proxy rewrites. This ensures that ad-blockers, third party scripts, and more won't make BotID any less effective.

    Next.js (/app)SvelteKitNuxtOther frameworks

    next.config.ts

    TypeScript

    TypeScriptJavaScriptBash

    ```
    import { withBotId } from 'botid/next/config';

    const nextConfig = {
      // Your existing Next.js config
    };

    export default withBotId(nextConfig);
    ```

3.  ### [Add client-side protection](#add-client-side-protection)

    Choose the appropriate method for your framework:

    - Next.js 15.3+: Use `initBotId()` in `instrumentation-client.ts` for optimal performance
    - Other Next.js: Mount the `<BotIdClient/>` component in your layout `head`
    - Other frameworks: Call `initBotId()` during application initialization

    Next.js 15.3+ (Recommended)

    We recommend using `initBotId()` in [`instrumentation-client.ts`](https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client) for better performance in Next.js 15.3+. For earlier versions, use the React component approach.

    Next.js (/app)SvelteKitNuxtOther frameworks

    instrumentation-client.ts

    TypeScript

    TypeScriptJavaScriptBash

    ```
    import { initBotId } from 'botid/client/core';

    // Define the paths that need bot protection.
    // These are paths that are routed to by your app.
    // These can be:
    // - API endpoints (e.g., '/api/checkout')
    // - Server actions invoked from a page (e.g., '/dashboard')
    // - Dynamic routes (e.g., '/api/create/*')

    initBotId({
      protect: [
        {
          path: '/api/checkout',
          method: 'POST',
        },
        {
          // Wildcards can be used to expand multiple segments
          // /team/*/activate will match
          // /team/a/activate
          // /team/a/b/activate
          // /team/a/b/c/activate
          // ...
          path: '/team/*/activate',
          method: 'POST',
        },
        {
          // Wildcards can also be used at the end for dynamic routes
          path: '/api/user/*',
          method: 'POST',
        },
      ],
    });
    ```

    Next.js < 15.3

    Next.js (/app)SvelteKitNuxtOther frameworks

    app/layout.tsx

    TypeScript

    TypeScriptJavaScriptBash

    ```
    import { BotIdClient } from 'botid/client';
    import { ReactNode } from 'react';

    const protectedRoutes = [
      {
        path: '/api/checkout',
        method: 'POST',
      },
    ];

    type RootLayoutProps = {
      children: ReactNode;
    };

    export default function RootLayout({ children }: RootLayoutProps) {
      return (
        <html lang="en">
          <head>
            <BotIdClient protect={protectedRoutes} />
          </head>
          <body>{children}</body>
        </html>
      );
    }
    ```

4.  ### [Perform BotID checks on the server](#perform-botid-checks-on-the-server)

    Use `checkBotId()` on the routes configured in the `<BotIdClient/>` component.

    Important configuration requirements: - Not adding the protected route to `<BotIdClient />` will result in `checkBotId()` failing. The client side component dictates which requests to attach special headers to for classification purposes. - Local development always returns `isBot: false` unless you configure the `developmentOptions` option on `checkBotId()`. [Learn more about local development behavior](/docs/botid/local-development-behavior).

    Using API routes

    Next.js (/app)SvelteKitNuxtOther frameworks

    app/api/sensitive/route.ts

    TypeScript

    TypeScriptJavaScriptBash

    ```
    import { checkBotId } from 'botid/server';
    import { NextRequest, NextResponse } from 'next/server';

    export async function POST(request: NextRequest) {
      const verification = await checkBotId();

      if (verification.isBot) {
        return NextResponse.json({ error: 'Access denied' }, { status: 403 });
      }

      const data = await processUserRequest(request);

      return NextResponse.json({ data });
    }

    async function processUserRequest(request: NextRequest) {
      // Your business logic here
      const body = await request.json();
      // Process the request...
      return { success: true };
    }
    ```

    Using Server Actions

    Next.js (/app)SvelteKitNuxtOther frameworks

    app/actions/create-user.ts

    TypeScript

    TypeScriptJavaScriptBash

    ```
    'use server';

    import { checkBotId } from 'botid/server';

    export async function createUser(formData: FormData) {
      const verification = await checkBotId();

      if (verification.isBot) {
        throw new Error('Access denied');
      }

      const userData = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
      };

      const user = await saveUser(userData);
      return { success: true, user };
    }

    async function saveUser(userData: { name: string; email: string }) {
      // Your database logic here
      console.log('Saving user:', userData);
      return { id: '123', ...userData };
    }
    ```

    BotID actively runs JavaScript on page sessions and sends headers to the server. If you test with `curl` or visit a protected route directly, BotID will block you in production. To effectively test, make a `fetch` request from a page in your application to the protected route.

5.  ### [Enable BotID deep analysis in Vercel (Recommended)](#enable-botid-deep-analysis-in-vercel-recommended)

    BotID Deep Analysis are available on [Enterprise](/docs/plans/enterprise) and [Pro](/docs/plans/pro) plans

    From the [Vercel dashboard](/dashboard)

    - Select your Project
    - Click the Firewall tab
    - Click Rules
    - Enable Vercel BotID Deep Analysis

    [Go to Firewall Rules](/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall%2Frules&title=Open+Firewall+Rules)

## [Complete examples](#complete-examples)

### [Next.js App Router example](#next.js-app-router-example)

Client-side code for the BotID Next.js implementation:

app/checkout/page.tsx

```
'use client';

import { useState } from 'react';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({
          product: formData.get('product'),
          quantity: formData.get('quantity'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Checkout failed');
      }

      const data = await response.json();
      setMessage('Checkout successful!');
    } catch (error) {
      setMessage('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleCheckout}>
      <input name="product" placeholder="Product ID" required />
      <input name="quantity" type="number" placeholder="Quantity" required />
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Checkout'}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
```

Server-side code for the BotID Next.js implementation:

app/api/checkout/route.ts

````
import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Check if the request is from a bot
  const verification = await checkBotId();

  if (verification.isBot) {
    return NextResponse.json(
      { error: 'Bot detected. Access denied.' },
      { status: 403 },
    );
  }

  // Process the legitimate checkout request
  const body = await request.json();

  // Your checkout logic here
  const order = await processCheckout(body);

  return NextResponse.json({
    success: true,
    orderId: order.id,
  });
}

async function processCheckout(data: any) {
  // Implement your checkout logic
  return { id: 'order-123' };
}
```# Handling Verified Bots

Handling verified bots is available in botid@1.5.0 and above.

BotID allows you to identify and handle [verified bots](/docs/bot-management#verified-bots) differently from regular bots. This feature enables you to permit certain trusted bots (like AI assistants) to access your application while blocking others.

Vercel maintains a directory of known and verified bots across the web at [bots.fyi](https://bots.fyi)

### [Checking for Verified Bots](#checking-for-verified-bots)

When using `checkBotId()`, the response includes fields that help you identify verified bots:

````

import { checkBotId } from "botid/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
const botResult = await checkBotId();

const { isBot, verifiedBotName, isVerifiedBot, verifiedBotCategory } = botResult;

// Check if it's ChatGPT Operator
const isOperator = isVerifiedBot && verifiedBotName === "chatgpt-operator";

if (isBot && !isOperator) {
return Response.json({ error: "Access denied" }, { status: 403 });
}

// ... rest of your handler
return Response.json(botResult);
}

```

### [Verified Bot response fields](#verified-bot-response-fields)

View our directory of verified bot names and categories [here](/docs/bot-management#verified-bots-directory).

The `checkBotId()` function returns the following fields for verified bots:

*   `isVerifiedBot`: Boolean indicating whether the bot is verified
*   `verifiedBotName`: String identifying the specific verified bot
*   `verifiedBotCategory`: String categorizing the type of verified bot

### [Example use cases](#example-use-cases)

Verified bots are useful when you want to:

*   Allow AI assistants to interact with your API while blocking other bots
*   Provide different responses or functionality for verified bots
*   Track usage by specific verified bot services
*   Enable AI-powered features while maintaining security
# Advanced BotID Configuration

## [Route-by-Route configuration](#route-by-route-configuration)

When you need fine-grained control over BotID's detection levels, you can specify `advancedOptions` to choose between basic and deep analysis modes on a per-route basis. This configuration takes precedence over the project-level BotID settings in your Vercel dashboard.

Important: The `checkLevel` in both client and server configurations must be identical for each protected route. A mismatch between client and server configurations will cause BotID verification to fail, potentially blocking legitimate traffic or allowing bots through. This feature is available in `botid@1.4.5` and above

### [Client-side configuration](#client-side-configuration)

In your client-side protection setup, you can specify the check level for each protected path:

```

initBotId({
protect: [
{
path: '/api/checkout',
method: 'POST',
advancedOptions: {
checkLevel: 'deepAnalysis', // or 'basic'
},
},
{
path: '/api/contact',
method: 'POST',
advancedOptions: {
checkLevel: 'basic',
},
},
],
});

```

### [Server-side configuration](#server-side-configuration)

In your server-side endpoint that uses `checkBotId()`, ensure it matches the client-side configuration.

```

export async function POST(request: NextRequest) {
const verification = await checkBotId({
advancedOptions: {
checkLevel: 'deepAnalysis', // Must match client-side config
},
});

if (verification.isBot) {
return NextResponse.json({ error: 'Access denied' }, { status: 403 });
}

// Your protected logic here
}

```

## [Separate backend domains](#separate-backend-domains)

By default, BotID validates that requests come from the same host that serves the BotID challenge. However, if your application architecture separates your frontend and backend domains (e.g., your app is served from `vercel.com` but your API is on `api.vercel.com` or `vercel-api.com`), you'll need to configure `extraAllowedHosts`.

The `extraAllowedHosts` parameter in `checkBotId()` allows you to specify a list of frontend domains that are permitted to send requests to your backend:

app/api/backend/route.ts

```

export async function POST(request: NextRequest) {
const verification = await checkBotId({
advancedOptions: {
extraAllowedHosts: ['vercel.com', 'app.vercel.com'],
},
});

if (verification.isBot) {
return NextResponse.json({ error: 'Access denied' }, { status: 403 });
}

// Your protected logic here
}

```

Only add trusted domains to `extraAllowedHosts`. Each domain in this list can send requests that will be validated by BotID, so ensure these are domains you control.

### [When to use `extraAllowedHosts`](#when-to-use-extraallowedhosts)

Use this configuration when:

*   Your frontend is hosted on a different domain than your API (e.g., `myapp.com` → `api.myapp.com`)
*   You have multiple frontend applications that need to access the same protected backend
*   Your architecture uses a separate subdomain for API endpoints

### [Example with advanced options](#example-with-advanced-options)

You can combine `extraAllowedHosts` with other advanced options:

app/api/backend-advanced/route.ts

```

const verification = await checkBotId({
advancedOptions: {
checkLevel: 'deepAnalysis',
extraAllowedHosts: ['app.example.com', 'dashboard.example.com'],
},
});

```

## [Next.js Pages Router configuration](#next.js-pages-router-configuration)

When using [Pages Router API handlers](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) in development, pass request headers to `checkBotId()`:

pages/api/endpoint.ts

```

import type { NextApiRequest, NextApiResponse } from 'next';
import { checkBotId } from 'botid/server';

export default async function handler(
req: NextApiRequest,
res: NextApiResponse,
) {
const result = await checkBotId({
advancedOptions: {
headers: req.headers,
},
});

if (result.isBot) {
return res.status(403).json({ error: 'Access denied' });
}

// Your protected logic here
res.status(200).json({ success: true });
}

```

Pages Router requires explicit headers in development. In production, headers are extracted automatically.

# Form Submissions

BotID does not support traditional HTML forms that use the `action` and `method` attributes, such as:

```

<form id="contact-form" method="POST" action="/api/contact">
  <!-- form fields -->
  <button type="submit">Send</button>
</form>
```

Native form submissions don't work with BotID due to how they are handled by the browser.

To ensure the necessary headers are attached, handle the form submission in JavaScript and send the request using `fetch` or `XMLHttpRequest`, allowing BotID to properly verify the request.

## [Enable form submissions to work with BotID](#enable-form-submissions-to-work-with-botid)

Here's how you can refactor your form to work with BotID:

```
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: formData,
  });
  const data = await response.json();
  // handle response
}

return (
  <form onSubmit={handleSubmit}>
    {/* form fields */}
    <button type="submit">Send</button>
  </form>
);
```

### [Form submissions with Next.js](#form-submissions-with-next.js)

If you're using Next.js, you can [use a server action](https://nextjs.org/docs/app/guides/forms#how-it-works) in your form and use the `checkBotId` function to verify the request:

```
'use server';
import { checkBotId } from 'botid/server';

export async function submitContact(formData: FormData) {
  const verification = await checkBotId();
  if (verification.isBot) {
    throw new Error('Access denied');
  }
  // process formData
  return { success: true };
}
```

And in your form component:

````
'use client';
import { submitContact } from '../actions/contact';

export default function ContactForm() {
  async function handleAction(formData: FormData) {
    return submitContact(formData);
  }

  return (
    <form action={handleAction}>
      {/* form fields */}
      <button type="submit">Send</button>
    </form>
  );
}
```# Local Development Behavior

During local development, BotID behaves differently than in production to facilitate testing and development workflows. In development mode, `checkBotId()` always returns `{ isBot: false }`, allowing all requests to pass through. This ensures your development workflow isn't interrupted by bot protection while building and testing features.

### [Using developmentOptions](#using-developmentoptions)

If you need to test BotID's different return values in local development, you can use the `developmentBypass` option:

app/api/sensitive/route.ts

````

import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
const verification = await checkBotId({
developmentOptions: {
bypass: 'BAD-BOT', // default: 'HUMAN'
},
});

if (verification.isBot) {
return NextResponse.json({ error: 'Access denied' }, { status: 403 });
}

// Your protected logic here
}

```

The `developmentOptions` option only works in development mode and is ignored in production. In production, BotID always performs real bot detection.

This allows you to:

*   Test your bot handling logic without deploying to production
*   Verify error messages and fallback behaviors
*   Ensure your application correctly handles both human and bot traffic
```
