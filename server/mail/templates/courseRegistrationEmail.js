function courseRegistrationEmail({ name, courseName, dashboardUrl }) {
  const safeName = name || "Learner";
  const safeCourseName = courseName || "your course";
  const safeDashboardUrl = dashboardUrl || "#";

  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Course Registration Confirmation</title>
    </head>
    <body style="margin:0; padding:0; background-color:#ffffff;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff;">
        <tr>
          <td align="center" style="padding:24px 12px;">
            <table role="presentation" cellpadding="0" cellspacing="0" width="640" style="max-width:640px; width:100%;">
              <tr>
                <td align="center" style="padding: 6px 0 18px;">
                  <div style="display:inline-block; background:#FFD60A; border-radius:6px; padding:10px 18px;">
                    <span style="font-family: Arial, sans-serif; font-weight:700; color:#111827; font-size:18px; letter-spacing:0.2px;">
                      <span style="display:inline-block; width:22px; height:22px; line-height:22px; text-align:center; border-radius:9999px; background:#111827; color:#FFD60A; margin-right:8px; font-size:14px; vertical-align:middle;">S</span>
                      <span style="vertical-align:middle;">StudyNotion</span>
                    </span>
                  </div>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 8px 12px 0;">
                  <h1 style="margin:0; font-family: Arial, sans-serif; font-weight:700; font-size:18px; color:#111827;">
                    Course Registration Confirmation
                  </h1>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 18px 28px 0;">
                  <p style="margin:0; font-family: Arial, sans-serif; font-size:14px; color:#111827;">
                    Dear ${safeName},
                  </p>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 12px 28px 0;">
                  <p style="margin:0; font-family: Arial, sans-serif; font-size:14px; color:#111827; line-height:1.6;">
                    You have successfully registered for the course <b>"${safeCourseName}"</b>. We are excited to have you as a participant!
                  </p>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 14px 28px 0;">
                  <p style="margin:0; font-family: Arial, sans-serif; font-size:14px; color:#111827; line-height:1.6;">
                    Please log in to your learning dashboard to access the course materials and start your learning journey.
                  </p>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 20px 28px 0;">
                  <a href="${safeDashboardUrl}"
                    style="display:inline-block; background:#FFD60A; color:#111827; text-decoration:none; font-family: Arial, sans-serif; font-size:14px; font-weight:700; padding:10px 18px; border-radius:6px;">
                    Go to Dashboard
                  </a>
                </td>
              </tr>

              <tr>
                <td align="center" style="padding: 18px 28px 0;">
                  <p style="margin:0; font-family: Arial, sans-serif; font-size:12px; color:#6B7280; line-height:1.6;">
                    If you have any questions or need assistance, please feel free to reach out to us at
                    <a href="mailto:info@studynotion.com" style="color:#2563EB; text-decoration:none;">info@studynotion.com</a>.
                    We are here to help!
                  </p>
                </td>
              </tr>

              <tr>
                <td style="height:24px;"></td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

module.exports = { courseRegistrationEmail };

