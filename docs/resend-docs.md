# Receiving Emails

> Learn how to receive emails via webhooks.

Resend supports receiving emails (commonly called inbound) in addition to sending emails. This is useful for:

- Receiving support emails from users
- Processing forwarded attachments
- Replying to emails from customers

## How does it work

Resend processes all incoming emails for your receiving domain, parses the contents and attachments, and then sends a `POST` request to an endpoint that you choose.

To receive emails, you can either use a domain managed by Resend, or [set up a custom domain](/dashboard/receiving/custom-domains).

<img alt="Receiving email process" src="https://mintcdn.com/resend/bxWCBKtofKnXvbvf/images/receiving-emails.jpeg?fit=max&auto=format&n=bxWCBKtofKnXvbvf&q=85&s=faa9d79f48a43f320d2b5a800256060e" data-og-width="1590" width="1590" data-og-height="790" height="790" data-path="images/receiving-emails.jpeg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/resend/bxWCBKtofKnXvbvf/images/receiving-emails.jpeg?w=280&fit=max&auto=format&n=bxWCBKtofKnXvbvf&q=85&s=4dd7c6dcb0584289dfbb391a02d20cbc 280w, https://mintcdn.com/resend/bxWCBKtofKnXvbvf/images/receiving-emails.jpeg?w=560&fit=max&auto=format&n=bxWCBKtofKnXvbvf&q=85&s=2f4f5512f4b657ffb8f91d8bf214fdc3 560w, https://mintcdn.com/resend/bxWCBKtofKnXvbvf/images/receiving-emails.jpeg?w=840&fit=max&auto=format&n=bxWCBKtofKnXvbvf&q=85&s=c3e2c1bf6d40cd06f762cae29b20e480 840w, https://mintcdn.com/resend/bxWCBKtofKnXvbvf/images/receiving-emails.jpeg?w=1100&fit=max&auto=format&n=bxWCBKtofKnXvbvf&q=85&s=e8e6c6d2c893b21d735a748293a39127 1100w, https://mintcdn.com/resend/bxWCBKtofKnXvbvf/images/receiving-emails.jpeg?w=1650&fit=max&auto=format&n=bxWCBKtofKnXvbvf&q=85&s=b4ca68047ce86f9b7d40e35fc3c868fe 1650w, https://mintcdn.com/resend/bxWCBKtofKnXvbvf/images/receiving-emails.jpeg?w=2500&fit=max&auto=format&n=bxWCBKtofKnXvbvf&q=85&s=253b284dd951d9647689d34974b75090 2500w" />

<Info>
  Importantly, *any email* sent to your receiving domain will be received by Resend and forwarded to your webhook. You can intelligently route based on the `to` field in the webhook event.

For example, if your domain is `cool-hedgehog.resend.app`, you will receive
emails sent to `anything@cool-hedgehog.resend.app`.

The same applies to [custom domains](/dashboard/receiving/custom-domains). If
your domain is `yourdomain.tld`, you will receive emails sent to
`anything@yourdomain.tld`.
</Info>

Here's how to start receiving emails using a domain managed by Resend.

## 1. Get your `.resend.app` domain

Any emails sent to an `<anything>@<id>.resend.app` address will be received by Resend and forwarded to your webhook.

To see your Resend domain:

1. Go to the [emails page](https://resend.com/emails).
2. Select the ["Receiving" tab](https://resend.com/emails/receiving).
3. Click the three dots button and select "Receiving address."

<img alt="Get your Resend domain" src="https://mintcdn.com/resend/stmz8SfTchQy1hpq/images/inbound-resend-domain.jpg?fit=max&auto=format&n=stmz8SfTchQy1hpq&q=85&s=c26fcec3f9dc5def25041d44cb8c501a" data-og-width="1159" width="1159" data-og-height="297" height="297" data-path="images/inbound-resend-domain.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/resend/stmz8SfTchQy1hpq/images/inbound-resend-domain.jpg?w=280&fit=max&auto=format&n=stmz8SfTchQy1hpq&q=85&s=c91a47ee848bfecab13dce59a3c83846 280w, https://mintcdn.com/resend/stmz8SfTchQy1hpq/images/inbound-resend-domain.jpg?w=560&fit=max&auto=format&n=stmz8SfTchQy1hpq&q=85&s=9a7c1bc9ae16fe2df60d438b6deb4c12 560w, https://mintcdn.com/resend/stmz8SfTchQy1hpq/images/inbound-resend-domain.jpg?w=840&fit=max&auto=format&n=stmz8SfTchQy1hpq&q=85&s=7013411c1d3ee429ce9208305166ca0e 840w, https://mintcdn.com/resend/stmz8SfTchQy1hpq/images/inbound-resend-domain.jpg?w=1100&fit=max&auto=format&n=stmz8SfTchQy1hpq&q=85&s=4d11f57b7a6a41a8bcfb71b12d5d4977 1100w, https://mintcdn.com/resend/stmz8SfTchQy1hpq/images/inbound-resend-domain.jpg?w=1650&fit=max&auto=format&n=stmz8SfTchQy1hpq&q=85&s=05e89a348fbc1e35a00ac5fd1899a035 1650w, https://mintcdn.com/resend/stmz8SfTchQy1hpq/images/inbound-resend-domain.jpg?w=2500&fit=max&auto=format&n=stmz8SfTchQy1hpq&q=85&s=190b3dc9e5ee08f66e4036005b211c70 2500w" />

## 2. Configure webhooks

1. Go to the [Webhooks](https://resend.com/webhooks) page.
2. Click `Add Webhook`.
3. Enter the URL of your webhook endpoint.
4. Select the event type `email.received`.
5. Click `Add`.

<Tip>
  For development, you can create a tunnel to your localhost server using a tool like
  [ngrok](https://ngrok.com/download) or [VS Code Port Forwarding](https://code.visualstudio.com/docs/debugtest/port-forwarding). These tools serve your local dev environment at a public URL you can use to test your local webhook endpoint.

Example: `https://example123.ngrok.io/api/webhook`
</Tip>

<img alt="Add Webhook for Receiving Emails" src="https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=55ae3e35788d91065d59ff4ddebff7e6" data-og-width="1110" width="1110" data-og-height="1016" height="1016" data-path="images/inbound-webhook-setup.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=280&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=c1ab7b7abe91256abe3c6279e6c5fc54 280w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=560&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=056e826ed3f8973769fbcf95e0a4f865 560w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=840&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=1525d4904fe88bd251197962d9945180 840w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=1100&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=bcf3794f7fb2061f779ab89e9ca18a74 1100w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=1650&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=758330d8589abab096d404aa1dba48d6 1650w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=2500&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=461272d7946d358ef8d6459576e11f48 2500w" />

## 3. Receive email events

In your application, create a new route that can accept `POST` requests.

For example, here's how you can add an API route in a Next.js application:

```js app/api/events/route.ts theme={null}
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const event = await request.json();

  if (event.type === "email.received") {
    return NextResponse.json(event);
  }

  return NextResponse.json({});
};
```

Once you receive the email event, you can process the email body and attachments. We also recommend implementing [webhook request verification](/dashboard/webhooks/verify-webhooks-requests) to secure your webhook endpoint.

```json theme={null}
{
  "type": "email.received",
  "created_at": "2024-02-22T23:41:12.126Z",
  "data": {
    "email_id": "56761188-7520-42d8-8898-ff6fc54ce618",
    "created_at": "2024-02-22T23:41:11.894719+00:00",
    "from": "Acme <onboarding@resend.dev>",
    "to": ["delivered@resend.dev"],
    "bcc": [],
    "cc": [],
    "message_id": "<example+123>",
    "subject": "Sending this example",
    "attachments": [
      {
        "id": "2a0c9ce0-3112-4728-976e-47ddcd16a318",
        "filename": "avatar.png",
        "content_type": "image/png",
        "content_disposition": "inline",
        "content_id": "img001"
      }
    ]
  }
}
```

## What can you do with Receiving emails

Once you receive an email, you can process it in a variety of ways. Here are some common actions you can take:

- [Get email content](/dashboard/receiving/get-email-content)
- [Process attachments](/dashboard/receiving/attachments)
- [Forward emails to another address](/dashboard/receiving/forward-emails)
- [Reply to emails in the same thread](/dashboard/receiving/reply-to-emails)

<Info>
  Webhooks do not include the email body, headers, or attachments, only their
  metadata. You must call the the [Received emails
  API](/api-reference/emails/retrieve-received-email) or the [Attachments
  API](/api-reference/emails/list-received-email-attachments) to retrieve them.
  This design choice supports large attachments in serverless environments that
  have limited request body sizes.
</Info>

## FAQ

<AccordionGroup>
  <Accordion title="Will I receive emails for any address at my domain?">
    Yes. Once you add the MX record to your [custom domains](/dashboard/receiving/custom-domains), you will receive emails for
    any address at that domain.

    For example, if your domain is `yourdomain.tld`, you will receive
    emails sent to `<anything>@yourdomain.tld`. You can then filter or
    route based on the `to` field in the webhook event.

    The same applies if you use the domain managed by Resend. If the domain given to you is `cool-hedgehog.resend.app`,
    you'll receive any email send to `<anything>@cool-hedgehog.resend.app`.

  </Accordion>

  <Accordion title="Can I receive emails on a subdomain?">
    Yes. You can add the MX record to any subdomain (e.g.
    `subdomain.yourdomain.tld`) and receive emails there.
  </Accordion>

  <Accordion title="Should I add the `MX` records for my root domain or a subdomain?">
    If you already have existing MX records for your root domain, we recommend
    that you create a subdomain (e.g. `subdomain.yourdomain.tld`) and add the MX
    record there. This way, you can use Resend for receiving emails without
    affecting your existing email service.

    If you still want to use the same domain both in for Resend and your day-to-day
    email service, you can also set up forwarding rules in your existing email service
    to forward emails to an address that's configured in Resend or forward them directly
    to the SMTP server address that appears in the receiving `MX` record.

  </Accordion>

  <Accordion title="Will I lose my emails if my webhook endpoint is down?">
    No, you will not lose your emails. Resend stores emails as soon as they come
    in.

    Even if your webhook endpoint is down, you can still see your emails in
    the dashboard and retrieve them using the [Receiving
    API](/api-reference/emails/retrieve-received-email).

    Additionally, we will retry delivering the webhook event on the schedule
    described in our [webhooks documentation](/dashboard/webhooks/introduction#faq)
    and you can also replay individual webhook events from the
    [webhooks](/dashboard/webhooks/introduction) page in the dashboard.

  </Accordion>

  <Accordion title="How can I make sure that it's Resend who's sending me webhooks?">
    All of Resend's webhooks include a secret and headers that you can use to verify
    the authenticity of the request.

    In our SDKs, you can verify webhooks using
    `resend.webhooks.verify()`, as shown below.

    ```js  theme={null}
    // throws an error if the webhook is invalid
    // otherwise, returns the parsed payload object
    const result = resend.webhooks.verify({
      payload: JSON.stringify(req.body),
      headers: {
        id: req.headers['svix-id'],
        timestamp: req.headers['svix-timestamp'],
        signature: req.headers['svix-signature'],
      },
      webhookSecret: process.env.RESEND_WEBHOOK_SECRET,
    })
    ```

    You can find more code samples and instructions on how to verify webhooks in our
    [webhook verification documentation](/dashboard/webhooks/verify-webhooks-requests).

  </Accordion>
</AccordionGroup>

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://resend.com/docs/llms.txt

# Custom Receiving Domains

> Receive emails using your own domain.

Besides [using Resend-managed domains](/dashboard/receiving/introduction), you can also receive emails using your own custom domain, such as `yourdomain.tld`.

Here's how to receive emails using a _new_ custom domain.

## 1. Add the DNS record

First, [verify your domain](/dashboard/domains/introduction).

Receiving emails requires an extra [MX record](https://resend.com/knowledge-base/how-do-i-avoid-conflicting-with-my-mx-records) to work. You'll need to add this record to your DNS provider.

1. Go to the [Domains](https://resend.com/domains) page
2. Copy the MX record
3. Paste the MX record into your domain's DNS service

<img alt="Add DNS records for Receiving Emails" src="https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-custom-domain-dns.jpg?fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=0bb3258dbd1e9fc5efeb9ead53b219a2" data-og-width="2020" width="2020" data-og-height="1252" height="1252" data-path="images/inbound-custom-domain-dns.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-custom-domain-dns.jpg?w=280&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=a882e60e9e04b274a3c4aea87c1b724a 280w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-custom-domain-dns.jpg?w=560&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=fc842eded7a8e998f7c60229274fbb9b 560w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-custom-domain-dns.jpg?w=840&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=092bab71a2d0346a0f33adf203bd2d7a 840w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-custom-domain-dns.jpg?w=1100&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=5ee81468e5e7d2fcd7750de5c56da2d1 1100w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-custom-domain-dns.jpg?w=1650&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=74c4533ed87b3e90cbea2c2f44592e16 1650w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-custom-domain-dns.jpg?w=2500&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=924697ee58c2aeed93bffdedb8d20bd6 2500w" />

<Info>
  If you already have existing MX records for your domain (because you're already
  using it for a real inbox, for example), we recommend that you
  create a subdomain (e.g. `subdomain.yourdomain.tld`) and add the MX record
  there. This way, you can use Resend for receiving emails without affecting
  your existing email service. Note that you will *not* receive emails at Resend
  if the required `MX` record is not the lowest priority value for the domain.

Alternatively, you can configure your email service to forward emails to an address
that's configured in Resend or forward them directly to the SMTP server address
that appears in the receiving `MX` record.
</Info>

## 2. Configure webhooks

Next, create a new webhook endpoint to receive email events.

1. Go to the [Webhooks](https://resend.com/webhooks) page
2. Click "Add Webhook"
3. Enter the URL of your webhook endpoint
4. Select the event type `email.received`
5. Click "Add"

<img alt="Add Webhook for Receiving Emails" src="https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=55ae3e35788d91065d59ff4ddebff7e6" data-og-width="1110" width="1110" data-og-height="1016" height="1016" data-path="images/inbound-webhook-setup.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=280&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=c1ab7b7abe91256abe3c6279e6c5fc54 280w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=560&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=056e826ed3f8973769fbcf95e0a4f865 560w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=840&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=1525d4904fe88bd251197962d9945180 840w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=1100&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=bcf3794f7fb2061f779ab89e9ca18a74 1100w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=1650&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=758330d8589abab096d404aa1dba48d6 1650w, https://mintcdn.com/resend/1QlhxulUFE6jxYM_/images/inbound-webhook-setup.jpg?w=2500&fit=max&auto=format&n=1QlhxulUFE6jxYM_&q=85&s=461272d7946d358ef8d6459576e11f48 2500w" />

## 3. Receive email events

In your application, create a new route that can accept `POST` requests.

For example, here's how you can add an API route in a Next.js application:

```js app/api/events/route.ts theme={null}
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const event = await request.json();

  if (event.type === "email.received") {
    return NextResponse.json(event);
  }

  return NextResponse.json({});
};
```

Once you receive the email event, you can process the email body and attachments. We also recommend implementing [webhook request verification](/dashboard/webhooks/verify-webhooks-requests) to secure your webhook endpoint.

```json theme={null}
{
  "type": "email.received",
  "created_at": "2024-02-22T23:41:12.126Z",
  "data": {
    "email_id": "56761188-7520-42d8-8898-ff6fc54ce618",
    "created_at": "2024-02-22T23:41:11.894719+00:00",
    "from": "Acme <onboarding@resend.dev>",
    "to": ["delivered@resend.dev"],
    "bcc": [],
    "cc": [],
    "message_id": "<example+123>",
    "subject": "Sending this example",
    "attachments": [
      {
        "id": "2a0c9ce0-3112-4728-976e-47ddcd16a318",
        "filename": "avatar.png",
        "content_type": "image/png",
        "content_disposition": "inline",
        "content_id": "img001"
      }
    ]
  }
}
```

## Enabling receiving for an existing domain

If you already have a verified domain, you can enable receiving by using the toggle in the receiving section of the domain details page.

<img alt="Enable Receiving Emails for a verified domain" src="https://mintcdn.com/resend/cxinN79qDVOa7Vo6/images/inbound-enable-receiving.jpg?fit=max&auto=format&n=cxinN79qDVOa7Vo6&q=85&s=43ea9fce84b46236ce4d58efc6004a24" data-og-width="1982" width="1982" data-og-height="1232" height="1232" data-path="images/inbound-enable-receiving.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/resend/cxinN79qDVOa7Vo6/images/inbound-enable-receiving.jpg?w=280&fit=max&auto=format&n=cxinN79qDVOa7Vo6&q=85&s=3c76eb84c02f6d0a5a890204bae236a9 280w, https://mintcdn.com/resend/cxinN79qDVOa7Vo6/images/inbound-enable-receiving.jpg?w=560&fit=max&auto=format&n=cxinN79qDVOa7Vo6&q=85&s=b79868ee661c6149b78eb181bc40597a 560w, https://mintcdn.com/resend/cxinN79qDVOa7Vo6/images/inbound-enable-receiving.jpg?w=840&fit=max&auto=format&n=cxinN79qDVOa7Vo6&q=85&s=db77934a0b485d02862fb1098b9f494d 840w, https://mintcdn.com/resend/cxinN79qDVOa7Vo6/images/inbound-enable-receiving.jpg?w=1100&fit=max&auto=format&n=cxinN79qDVOa7Vo6&q=85&s=df953f7ff8d363d4942757a7036f45e3 1100w, https://mintcdn.com/resend/cxinN79qDVOa7Vo6/images/inbound-enable-receiving.jpg?w=1650&fit=max&auto=format&n=cxinN79qDVOa7Vo6&q=85&s=ea0d5b5de643c3265e4ae5c3e6569c1b 1650w, https://mintcdn.com/resend/cxinN79qDVOa7Vo6/images/inbound-enable-receiving.jpg?w=2500&fit=max&auto=format&n=cxinN79qDVOa7Vo6&q=85&s=c6ce33152b38b091ea3e93b1f74495b9 2500w" />

After enabling receiving, you'll see a modal showing the MX record that you need to add to your DNS provider to start receiving emails.

Once you add the MX record, confirm by clicking the "I've added the record" button and wait for the receiving record to show as "verified".

## FAQ

<AccordionGroup>
  <Accordion title="What happens if I already have MX records for my domain?">
    If you already have existing MX records for your domain, we recommend that you
    create a subdomain (e.g. `subdomain.yourdomain.tld`) and add the MX record
    there.

    That's because emails will usually only be delivered to the MX record with the lowest
    priority value. Therefore, if you add Resend's MX record to your root domain alongside existing MX records,
    it will either not receive any emails at all (if the existing MX records have a lower priority),
    or it will interfere with your existing email service (if Resend's MX record has a lower priority). If you
    use the same priority, email delivery will be unpredictable and may hit either Resend or your existing email
    service.

    If you still want to use the same domain both in for Resend and your day-to-day
    email service, you can also set up forwarding rules in your existing email service
    to forward emails to an address that's configured in Resend or forward them directly
    to the SMTP server address that appears in the receiving `MX` record.

  </Accordion>

  <Accordion title="I have already verified my domain for sending. Do I need to verify it again for receiving?">
    No, you do not need to verify your entire domain again. If you already have a
    verified domain for sending, you can simply enable receiving for that domain,
    add the required MX record to your DNS provider, and click "I've added the record"
    to start verifying *only* the MX record.
  </Accordion>
</AccordionGroup>

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://resend.com/docs/llms.txt

# Process Receiving Attachments

> Process attachments from receiving emails.

A common use case for Receiving emails is to process attachments.

<Info>
  Webhooks do not include the actual content of attachments, only their
  metadata. You must call the [Attachments
  API](/api-reference/emails/list-received-email-attachments) to retrieve the
  content. This design choice supports large attachments in serverless
  environments that have limited request body sizes.
</Info>

Users can forward airplane tickets, receipts, and expenses to you. Then, you can extract key information from attachments and use that data.

To do this, call the [Attachments API](/api-reference/emails/list-received-email-attachments) after receiving the webhook event. That API will return a list of attachments with their metadata and a `download_url` that you can use to download the actual content.

Note that the `download_url` is valid for 1 hour. After that, you will need to call the
[Attachments API](/api-reference/emails/list-received-email-attachments)
again to get a new `download_url`. You can also check the `expires_at` field on
each attachment to see exactly when it will expire.

Here's an example of getting attachment data in a Next.js application:

```js app/api/events/route.ts theme={null}
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_xxxxxxxxx");

export const POST = async (request: NextRequest) => {
  const event = await request.json();

  if (event.type === "email.received") {
    const { data: attachments } = await resend.attachments.receiving.list({
      emailId: event.data.email_id,
    });

    for (const attachment of attachments) {
      // use the download_url to download attachments however you want
      const response = await fetch(attachment.download_url);
      if (!response.ok) {
        console.error(`Failed to download ${attachment.filename}`);
        continue;
      }

      // get the file's contents
      const buffer = Buffer.from(await response.arrayBuffer());

      // process the content (e.g., save to storage, analyze, etc.)
    }

    return NextResponse.json({ attachmentsProcessed: attachments.length });
  }

  return NextResponse.json({});
};
```

Once you process attachments, you may want to forward the email to another address. Learn more about [forwarding emails](/dashboard/receiving/forward-emails).

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://resend.com/docs/llms.txt

# Get Email Content

> Get the body and headers of a received email.

Receiving emails contain the HTML and Plain Text body of the email, as well as the headers.

<Info>
  Webhooks do not include the actual HTML or Plain Text body of the email. You
  must call the [received emails
  API](/api-reference/emails/retrieve-received-email) to retrieve them. This
  design choice supports large payloads in serverless environments that have
  limited request body sizes.
</Info>

After receiving the webhook event, call the [Receiving API](/api-reference/emails/retrieve-received-email).

Here's an example in a Next.js application:

```js app/api/events/route.ts theme={null}
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_xxxxxxxxx");

export const POST = async (request: NextRequest) => {
  const event = await request.json();

  if (event.type === "email.received") {
    const { data: email } = await resend.emails.receiving.get(
      event.data.email_id
    );

    console.log(email.html);
    console.log(email.text);
    console.log(email.headers);

    return NextResponse.json(email);
  }

  return NextResponse.json({});
};
```

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://resend.com/docs/llms.txt

# Get Email Content

> Get the body and headers of a received email.

Receiving emails contain the HTML and Plain Text body of the email, as well as the headers.

<Info>
  Webhooks do not include the actual HTML or Plain Text body of the email. You
  must call the [received emails
  API](/api-reference/emails/retrieve-received-email) to retrieve them. This
  design choice supports large payloads in serverless environments that have
  limited request body sizes.
</Info>

After receiving the webhook event, call the [Receiving API](/api-reference/emails/retrieve-received-email).

Here's an example in a Next.js application:

```js app/api/events/route.ts theme={null}
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_xxxxxxxxx");

export const POST = async (request: NextRequest) => {
  const event = await request.json();

  if (event.type === "email.received") {
    const { data: email } = await resend.emails.receiving.get(
      event.data.email_id
    );

    console.log(email.html);
    console.log(email.text);
    console.log(email.headers);

    return NextResponse.json(email);
  }

  return NextResponse.json({});
};
```

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://resend.com/docs/llms.txt

# Get Email Content

> Get the body and headers of a received email.

Receiving emails contain the HTML and Plain Text body of the email, as well as the headers.

<Info>
  Webhooks do not include the actual HTML or Plain Text body of the email. You
  must call the [received emails
  API](/api-reference/emails/retrieve-received-email) to retrieve them. This
  design choice supports large payloads in serverless environments that have
  limited request body sizes.
</Info>

After receiving the webhook event, call the [Receiving API](/api-reference/emails/retrieve-received-email).

Here's an example in a Next.js application:

```js app/api/events/route.ts theme={null}
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_xxxxxxxxx");

export const POST = async (request: NextRequest) => {
  const event = await request.json();

  if (event.type === "email.received") {
    const { data: email } = await resend.emails.receiving.get(
      event.data.email_id
    );

    console.log(email.html);
    console.log(email.text);
    console.log(email.headers);

    return NextResponse.json(email);
  }

  return NextResponse.json({});
};
```

---

> To find navigation and other pages in this documentation, fetch the llms.txt file at: https://resend.com/docs/llms.txt
