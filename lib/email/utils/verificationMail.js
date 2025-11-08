export const generateMagicLinkEmail = ({
  userName,
  magicLink,
  expiryMinutes = 60,
  supportEmail,
  companyName,
}) => `
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Verify your email</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f6f8;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="min-width:320px;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="width:100%;max-width:600px;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 6px 18px rgba(0,0,0,0.06);">
          <tr>
            <td style="padding:28px 32px 16px;text-align:left;font-family:Arial,Helvetica,sans-serif;">
              <img src="https://via.placeholder.com/120x32?text=Logo" alt="${companyName} logo" width="120" style="display:block;border:0;outline:none;text-decoration:none;">
            </td>
          </tr>

          <tr>
            <td style="padding:0 32px 8px;font-family:Arial,Helvetica,sans-serif;">
              <h1 style="margin:0;font-size:20px;line-height:1.25;color:#0f1724;font-weight:700;">
                Verify your email address
              </h1>
            </td>
          </tr>

          <tr>
            <td style="padding:12px 32px 20px;font-family:Arial,Helvetica,sans-serif;color:#344054;font-size:15px;line-height:1.5;">
              <p style="margin:0 0 12px;">
                Hi <strong>${userName}</strong>,
              </p>
              <p style="margin:0 0 18px;">
                Click the button below to sign in. This magic link is valid for <strong>${expiryMinutes} minutes</strong> (expires in 1 hour).
              </p>

              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:18px 0;">
                <tr>
                  <td align="center">
                    <a href="${magicLink}" target="_blank" rel="noopener" style="display:inline-block;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:600;font-family:Arial,Helvetica,sans-serif;background:#005bcc;color:#ffffff;border:1px solid #005bcc;">
                      Confirm sign in
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 12px;">
                If the button doesn't work, copy and paste this link into your browser:
              </p>
              <p style="word-break:break-all;margin:0 0 4px;font-size:13px;color:#0b1a2b;">
                <a href="${magicLink}" target="_blank" rel="noopener" style="color:#0b1a2b;text-decoration:underline;">${magicLink}</a>
              </p>

              <p style="margin:16px 0 0;color:#667085;font-size:13px;">
                If you didn't request this, you can safely ignore this email or contact <a href="mailto:${supportEmail}" style="color:#0b1a2b;text-decoration:underline;">${supportEmail}</a>.
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding:20px 32px 28px;background:#f8fafc;font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#667085;">
              <p style="margin:0 0 6px;">
                This link will expire in <strong>${expiryMinutes} minutes</strong>.
              </p>
              <p style="margin:0;">
                © ${companyName}. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
